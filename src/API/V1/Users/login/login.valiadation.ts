import {Request, Response, NextFunction} from "express";

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { username, Password } = req.body;
    if (!username || !Password) {
        return res.status(400).json({ error: "Username and Password are required" });
    }
    next();
};