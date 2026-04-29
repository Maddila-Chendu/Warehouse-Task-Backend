import { Request, Response, NextFunction } from "express";

export const validateInventoryBatch = (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantity, expiryDate } = req.body;
    if (!productId || !quantity || !expiryDate) {
        return res.status(400).json({ message: "Product ID, Quantity, and Expiry Date are required" });
    }
    else if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: "Quantity must be a positive number" });
    }
    else if (isNaN(Date.parse(expiryDate))) {
        return res.status(400).json({ message: "Expiry Date must be a valid date" });
    }
    else if (productId != req.body.productId && productId != req.body.ProductId && productId != req.body.productID) {
        return res.status(400).json({ message: "Enter a correct Product ID" });
    }
    next();
}