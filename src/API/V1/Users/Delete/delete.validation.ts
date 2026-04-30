import { Request, Response, NextFunction } from "express";

export const validateDelete = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  next();
};  
