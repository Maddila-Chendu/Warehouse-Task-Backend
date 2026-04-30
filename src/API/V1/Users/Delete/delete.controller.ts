import { Request, Response } from "express";
import { Users } from "../../../../Entity/schema/app/users.entity";
import database from "../../../../database/connect";

export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const userRepository = database.getRepository(Users);
    const result = await userRepository.query(
      "DELETE FROM \"Users\" WHERE \"username\" = $1 RETURNING *",
      [username]
    );
    if (result.length === 0) {
      return res.status(404).json({ error: "User not found... Please Register" });
    }
    res.status(200).json({ message: "Deleted Successfully", data: result[0] });
  } catch (error: any) {
    console.error(error);
    if (error.code === '23505') {
      res.status(400).json({ error: "Error while Deleting User..Try again!" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};