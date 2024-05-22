import express, { Request, Response } from "express";
import { productRouter } from "./modules/product/product.route";
import { orderRouter } from "./modules/order/order.route";
const app = express();

//Parser
app.use(express.json());

//Routes
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

// Error handling for invalid routes
app.use("/*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
