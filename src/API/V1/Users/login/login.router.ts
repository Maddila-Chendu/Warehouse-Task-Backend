import { Router } from "express";
import { loginUser } from "./login.controller";
import { validateLogin } from "./login.valiadation";

const router = Router();
router.post("/", validateLogin, loginUser);

export default router;
