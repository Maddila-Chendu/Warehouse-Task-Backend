import { Router } from "express";
import { addBin, getBins } from "./bins.controller";
import { addBinValidation } from "./bins.validation";

const router = Router();

router.post('/', addBinValidation, addBin);
router.get('/', getBins);


export default router;