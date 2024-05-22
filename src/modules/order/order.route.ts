import express from "express";
import { OrderController } from "./order.controller";

const route = express.Router();
route.post("/", OrderController.createOrder);

export const orderRouter = route;
