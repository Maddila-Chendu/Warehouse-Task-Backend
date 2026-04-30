import { Router } from "express";
import { updateUser } from "./update.controller";
import { validateUpdate } from "./update.validation";

const router = Router();

router.put("/", validateUpdate, updateUser);

export default router;