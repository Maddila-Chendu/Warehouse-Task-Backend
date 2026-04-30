import { Router } from "express";
import { validateRegister } from "./register.validation";
import { registerUser } from "./register.controller";

const router = Router();

router.post("/", validateRegister, registerUser);

export default router;