import express from "express";
import { productRouter } from "./modules/product/product.route";
import { orderRouter } from "./modules/order/order.route";
const app = express();

//Parser
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

export default app;
