import { Request, Response } from "express";
import database from "../../../database/connect";
import { BinEntity } from "../../../Entity/schema/app/bins.entity";

export const addBin = async (req: Request, res: Response) => {
    try {

        const binRepository = database.getRepository(BinEntity);
        const existingBin = await binRepository.findOneBy({ bin_name: req.body.bin_name });
        if (existingBin) {
            return res.status(409).json({ message: "Bin already exists" });
        }

        const { bin_name, max_quantity, location } = req.body;
        const bin = binRepository.create({
            bin_name: bin_name,
            max_quantity: max_quantity,
            location: location
        });
        await binRepository.save(bin);
        res.status(201).json({ message: `Bin Added Successfully`, data: bin });
    } catch (error) {
        console.error("Error at adding Bin:", error);
        res.status(500).json({ message: "Error at adding Bin", errorDetails: (error as Error).message });
    }
}

export const getBins = async (req: Request, res: Response) => {
    try {
        const binRepository = database.getRepository(BinEntity);
        const bins = await binRepository.find();
        res.status(200).json({ message: "Bins retrieved successfully", data: bins });
    } catch (error) {
        console.error("Error at retrieving Bins:", error);
        res.status(500).json({ message: "Error at retrieving Bins", errorDetails: (error as Error).message });
    }
}