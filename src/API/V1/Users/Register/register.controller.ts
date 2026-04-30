import { Request, Response } from "express";
import { Users } from "../../../../Entity/schema/app/users.entity";
import database from "../../../../database/connect";
import { error } from "node:console";

const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function hashPassword(Password:any) {
    const hashedPassword = await bcrypt.hash(Password, saltRounds)
    return hashedPassword;
}
    
export const registerUser = async (req: Request, res: Response) => {
  const { FirstName, LastName, username, Password } = req.body;
  
  try {
    if (!FirstName || !LastName || !username || !Password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await hashPassword(Password);
    
    const userRepository = database.getRepository(Users);

    const checkResult = await userRepository.query(
      "SELECT * FROM \"Users\" WHERE \"username\" = $1",
      [username]
    );
    if (checkResult && checkResult.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const result = await userRepository.query(
      "INSERT INTO \"Users\" (\"First_Name\", \"Last_Name\", \"username\", \"Password\") VALUES ($1, $2, $3, $4) RETURNING *",
      [FirstName, LastName, username, hashedPassword]
    );
    res.status(201).json({ message: "Registered successfully", data: result[0] });
   
  } 
  catch (error: any) {
    console.error("Error code:", error.code);
     if (error.code === '23505') {
      return res.status(400).json({ error: "Error while creating Password..create new one" });
    }
    res.status(500).json({ 
      error: "Internal server error",
      details: error.message || "Unknown error"
    });
  }
};
