import express from "express";
import validateBody from "../helper/validateBody.js";
import postOrders from "../controllers/orders/postOrders.js";
import { createOrderSchema } from "../models/order.js";

const orderRouter = express.Router();

orderRouter.post("/", validateBody(createOrderSchema), postOrders);

export default orderRouter;
