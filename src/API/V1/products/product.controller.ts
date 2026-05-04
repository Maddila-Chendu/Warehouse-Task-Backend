import { Request, Response } from "express";
import database from "../../../database/connect";
import { Product } from "../../../Entity/schema/app/product.entity";

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const productRepository =  database.getRepository(Product);
        const product = await productRepository.create({ name, description });
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

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productRepository = database.getRepository(Product);  
        const products = await productRepository.find();
        res.status(200).json({ message: "Products Retrieved Successfully", data: products });
    }
    catch (error) {
        console.error("Error at retrieving Products:", error);
        res.status(500).json({ message: "Error at retrieving Products", errorDetails: error instanceof Error ? error.message : String(error) });
    }   
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const productRepository = database.getRepository(Product);
        const product = await productRepository.findOneBy({ id: productId as string });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        await productRepository.remove(product);
        res.status(200).json({ message: "Product Deleted Successfully" });
    } catch (error) {
        console.error("Error at deleting Product:", error);
        res.status(500).json({ message: "Error at deleting Product", errorDetails: error instanceof Error ? error.message : String(error) });
    }   
}