import { Request, Response, NextFunction } from "express";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "Name and Description are required" });
    }
    else if (!req.body.name) {
        return res.status(400).json({ message: "Name is required" });
    }
    next();
}