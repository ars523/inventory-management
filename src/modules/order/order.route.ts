import express from "express";
import { OrderController } from "./order.controller";

const route = express.Router();
route.post("/", OrderController.createOrder);
route.get("/", OrderController.getOrders);
export const orderRouter = route;
