import express from "express";
import { productRouter } from "./modules/product/product.route";
const app = express();

//Parser
app.use(express.json());

app.use("/api/products", productRouter);

export default app;
