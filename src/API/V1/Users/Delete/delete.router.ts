import { Router } from "express";
import { deleteUser } from "./delete.controller";
import { validateDelete } from "./delete.validation";
const router = Router();

router.delete("/", deleteUser, validateDelete);

export default router;