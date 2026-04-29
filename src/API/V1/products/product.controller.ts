import { Request, Response } from "express";
import database from "../../../database/connect";
import { Product } from "../../../Entity/schema/app/product.entity";

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const productRepository = database.getRepository(Product);
        const product = productRepository.create({ name, description });
        await productRepository.save(product);
        res.status(201).json({ message: "Product Added Successfully", data: product });
    } catch (error: any) {
        if (error.code === '23505' || (error.message && error.message.includes('duplicate key'))) {
            res.status(409).json({ message: "A product with this name already exists!" });
            return;
        }
        console.error("Error at adding Product:", error);
        res.status(500).json({ message: "Error at adding Product", errorDetails: error.message });
    }
}