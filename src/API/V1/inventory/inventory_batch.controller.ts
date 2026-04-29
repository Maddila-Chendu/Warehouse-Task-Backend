import { Request,Response } from "express";
import database from "../../../database/connect";
import { InventoryBatch } from "../../../Entity/schema/app/inventory_batch.entity";
import { Product } from "../../../Entity/schema/app/product.entity";    

export const addInventoryBatch = async (req: Request, res: Response) => {
    try {
        const { productId, quantity, expiryDate } = req.body;
        const productRepository = database.getRepository(Product);
        const product = await productRepository.findOneBy({ id: productId });
        if (!product) {
            res.status(404).json({ message: "Product not found!" });
            return;
        }
        const batchRepository = database.getRepository(InventoryBatch);
        const batch = batchRepository.create({
            product,
            quantity,
            remainingQuantity: quantity,
            expiryDate: new Date(expiryDate)
        });
        await batchRepository.save(batch);
        res.status(201).json({ message: `Quantity Added Successfully`, data: batch });
    } catch (error) {   
        console.error("Error at adding Inventory Batch:", error);
        res.status(500).json({ message: "Error at adding Inventory Batch", errorDetails: (error as Error).message });
    }
}