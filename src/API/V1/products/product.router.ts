import { Router } from "express";
import { addProduct } from "./product.controller";
import { validateProduct } from "./product.validation";

const productRouter = Router();

productRouter.post("/", validateProduct, addProduct);

export default productRouter;