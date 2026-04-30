import { Router } from "express";
import { addProduct, getProducts,deleteProduct } from "./product.controller";
import { validateProduct } from "./product.validation";

const productRouter = Router();

productRouter.post("/", validateProduct, addProduct);
productRouter.get("/", getProducts);
productRouter.delete("/", deleteProduct);

export default productRouter;