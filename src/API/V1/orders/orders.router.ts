import { Router } from "express";
import { createOrder, getOrders } from "./orders.controller";
import { validateOrder } from "./orders.validation";

const ordersRouter = Router();

ordersRouter.post("/", validateOrder, createOrder);
ordersRouter.get("/", getOrders);
export default ordersRouter;
