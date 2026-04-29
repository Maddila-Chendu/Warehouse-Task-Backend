import { Request, Response, NextFunction } from "express";

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantityRequested } = req.body;
    
    if (!productId || !quantityRequested) {
        return res.status(400).json({message: "productId and quantity are required"});
    }
    
    if (typeof quantityRequested !== 'number' || quantityRequested <= 0) {
        return res.status(400).json({message: "quantityRequested must be a positive number" });
    }
    
    next();
};
