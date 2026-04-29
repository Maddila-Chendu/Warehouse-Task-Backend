import { Request, Response, NextFunction } from "express";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: "Name and Description are required" });
    }
    else if(name != req.body.name && name != req.body.Name && name != req.body.name){
        return res.status(400).json({ message: "Enter a correct Name" });
    }
    next();
}