import { Router } from "express";
import { createOrder } from "./orders.controller";
import { validateOrder } from "./orders.validation";

const ordersRouter = Router();

ordersRouter.post("/", validateOrder, createOrder);
export default ordersRouter;
