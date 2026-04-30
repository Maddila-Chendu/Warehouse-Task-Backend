import { Request, Response } from "express";
import { Users } from "../../../../Entity/schema/app/users.entity";
import database from "../../../../database/connect";
import { hashPassword } from "../Register/register.controller";

export const updateUser = async (req: Request, res: Response) => {
  const { FirstName, LastName, username, Password } = req.body;
  const hashedPassword = await hashPassword(Password);
  try {
    const userRepository = database.getRepository(Users);
    const result = await userRepository.query(
      "UPDATE \"Users\" SET \"First_Name\" = $1, \"Last_Name\" = $2, \"Password\" = $3 WHERE \"username\" = $4 RETURNING *",
      [FirstName, LastName, hashedPassword, username]
    );
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found... Please Register" });
    }
    res.status(200).json({ message: "Updated Successfully", data: result[0] });
  } catch (error: any) {
    console.error(error);
    if (error.code === '23505') {
      res.status(400).json({ error: "Error while Updating data..Try again!" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};