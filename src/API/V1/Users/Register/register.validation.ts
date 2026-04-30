import { Request, Response, NextFunction } from "express";
import { Users } from "../../../../Entity/schema/app/users.entity";


export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body is:", req.body);
  const { FirstName, LastName, username, Password, confirmPassword } = req.body;

  if (!FirstName || !LastName || !username || !Password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (Password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  next();
};