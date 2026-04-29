import { Router } from "express";
import { addProduct } from "../products/product.controller";
import { addInventoryBatch } from "./inventory_batch.controller";
import { validateInventoryBatch } from "./inventory_batch.validation";

const inventory_batch_router = Router(); 
inventory_batch_router.post("/", validateInventoryBatch, addInventoryBatch);

export default inventory_batch_router;   
