import {Request,Response,NextFunction} from "express";

export const addBinValidation = (req: Request, res: Response, next: NextFunction) => {
    const { bin_name, max_quantity, location } = req.body;
    if (!bin_name || !max_quantity || !location) {
        return res.status(400).json({ message: "Bin Name, Max Quantity, and Location are required" });
    }
    else if (isNaN(max_quantity) || max_quantity <= 0) {
        return res.status(400).json({ message: "Max Quantity must be a positive number" });
    }
    else if (max_quantity > 1000) {
        return res.status(400).json({ message: "Maximum Capacity should be 1000" });
    }
    next();
}