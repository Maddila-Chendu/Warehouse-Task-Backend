import { Request, Response } from "express";
import database from "../../../database/connect";
import { Order, OrderStatus } from "../../../Entity/schema/app/order.entity";
import { InventoryBatch } from "../../../Entity/schema/app/inventory_batch.entity";
import { InventoryLog } from "../../../Entity/schema/app/inventory_log.entity";
import { Product } from "../../../Entity/schema/app/product.entity";
import { ExpiryStock } from "../../../Entity/schema/app/expiry_stock.entity";

export const createOrder = async (req: Request, res: Response) => {
    const queryRunner = database.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const { productId, quantityRequested } = req.body;
        const productRepository = queryRunner.manager.getRepository(Product);
        const product = await productRepository.findOne({ where: { id: productId } });

        if (!product) {
            await queryRunner.rollbackTransaction();
            return res.status(404).json({ message: "Product not found" });
        }
        const batchRepository = queryRunner.manager.getRepository(InventoryBatch);
        const allBatches = await batchRepository.find({
            where: { productId: productId },
            order: { expiryDate: "ASC" }
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const availableBatches = allBatches.filter(batch => {
            const batchExpiryDate = new Date(batch.expiryDate);
            batchExpiryDate.setHours(0, 0, 0, 0);
            return batchExpiryDate >= today; 
        });

        const expiredBatches = allBatches.filter(batch => {
            const batchExpiryDate = new Date(batch.expiryDate);
            batchExpiryDate.setHours(0, 0, 0, 0);
            return batchExpiryDate < today;
        });

        const totalAvailable = availableBatches.reduce((sum, batch) => sum + batch.remainingQuantity, 0);
        const totalExpired = expiredBatches.reduce((sum, batch) => sum + batch.remainingQuantity, 0);

        if (totalAvailable < quantityRequested) {
            await queryRunner.rollbackTransaction();
            return res.status(400).json({ 
                message: `Insufficient stock available. Non-expired stock: ${totalAvailable}, Expired stock ignored: ${totalExpired}` 
            });
        }

        const expiryStockRepository = queryRunner.manager.getRepository(ExpiryStock);
        
        for (const expiredBatch of expiredBatches) {
            if (expiredBatch.remainingQuantity > 0) {
                const expiryRecord = expiryStockRepository.create({
                    productId: expiredBatch.productId,
                    batchId: expiredBatch.id,
                    quantity: expiredBatch.remainingQuantity,
                    expiryDate: expiredBatch.expiryDate,
                });
                await queryRunner.manager.save(expiryRecord);
            }
        }

        const orderRepository = queryRunner.manager.getRepository(Order);
        const order = orderRepository.create({productId, quantityRequested, status: OrderStatus.COMPLETED});
        const savedOrder = await queryRunner.manager.save(order);
        let remainingQuantity = quantityRequested;
        const allocationDetails = [];
        const logRepository = queryRunner.manager.getRepository(InventoryLog);

        for (const batch of availableBatches) {
            if (remainingQuantity <= 0) break;

            const quantityToAllocate = Math.min(remainingQuantity, batch.remainingQuantity);

            if (quantityToAllocate > 0) {
                batch.remainingQuantity -= quantityToAllocate;
                await queryRunner.manager.save(batch);

                const log = logRepository.create({orderId: savedOrder.id,batchId: batch.id,quantityDeducted: quantityToAllocate});
                await queryRunner.manager.save(log);

                allocationDetails.push({batchId: batch.id,expiryDate: batch.expiryDate,quantityDeducted: quantityToAllocate,remainingInBatch: batch.remainingQuantity});
                remainingQuantity -= quantityToAllocate;
            }
        }

        await queryRunner.commitTransaction();

        return res.status(201).json({
            message: "Order created successfully",
            order: {id: savedOrder.id,productId: savedOrder.productId,quantityRequested: savedOrder.quantityRequested,status: savedOrder.status,createdAt: savedOrder.createdAt},
            allocation: {allocatedBatches: allocationDetails, totalAllocated: quantityRequested}
        });

    } catch (error: any) {
        await queryRunner.rollbackTransaction();
        console.error("Error creating order:", error);
        return res.status(500).json({ 
            message: "Error creating order", 
            errorDetails: error.message 
        });
    } finally {
        await queryRunner.release();
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orderRepository = database.getRepository(Order);
        const orders = await orderRepository.find({ relations: ['product', 'inventoryLogs'] });
        res.status(200).json({ message: "Orders Retrieved Successfully", data: orders });
    }   
    catch (error) {
        console.error("Error at retrieving Orders:", error);
        res.status(500).json({ message: "Error at retrieving Orders", errorDetails: (error as Error).message });
    }
}