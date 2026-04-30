import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Users } from "../../../../Entity/schema/app/users.entity";
import database from "../../../../database/connect";

async function compare(inputPassword:any, storedPassword:any) {
  const isCompare = await bcrypt.compare(inputPassword, storedPassword);
  return isCompare;
}

export const loginUser = async (req: Request, res: Response) => {
  const { username, Password } = req.body;
   try {
    const userRepository = database.getRepository(Users);
    const result = await userRepository.query(
      "SELECT * FROM \"Users\" WHERE \"username\" = $1",
      [username]
    );
    console.log(result);
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found... Please Register" });
    }

    const user = result[0];
    const isValid = await compare(Password, user.Password);
   
    if (!isValid) {
      return res.status(401).json({ error: "Invalid Username (or) Password" });
    } res.status(200).json({ message: "Login Successfull", user});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
