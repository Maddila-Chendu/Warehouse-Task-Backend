import { Request,Response } from "express";
import database from "../../../database/connect";
import { InventoryBatch } from "../../../Entity/schema/app/inventory_batch.entity";
import { Product } from "../../../Entity/schema/app/product.entity";
import { BinEntity } from "../../../Entity/schema/app/bins.entity";

export const addInventoryBatch = async (req: Request, res: Response) => {
    try {
        const { productId, quantity, bin_name, expiryDate } = req.body;
        const productRepository = database.getRepository(Product);
        const product = await productRepository.findOneBy({ id: productId });
        if (!product) {
            res.status(404).json({ message: "Product not found!" });
            return;
        }
        const binRepository = database.getRepository(BinEntity);
        const bin = await binRepository.findOneBy({ bin_name });
        if (!bin) {
            res.status(404).json({ message: "Bin not found!" });
            return;
        }
        const batchRepository = database.getRepository(InventoryBatch);
        const batch = batchRepository.create({
            product,
            quantity,
            bin_name,
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

export const getInventoryBatches = async (req: Request, res: Response) => {
    try {
        const batchRepository = database.getRepository(InventoryBatch);
        const batches = await batchRepository.find({ relations: ['product'] });
        res.status(200).json({ message: "Inventory Batches Retrieved Successfully", data: batches });
    }
    catch (error) {
        console.error("Error at retrieving Inventory Batches:", error);
        res.status(500).json({ message: "Error at retrieving Inventory Batches", errorDetails: (error as Error).message });
    }
}


