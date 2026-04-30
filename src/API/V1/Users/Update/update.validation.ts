import { Request, Response, NextFunction } from 'express';

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { FirstName, LastName, username, Password } = req.body;

  if (!FirstName || !LastName || !username || !Password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
};  