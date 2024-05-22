import express, { NextFunction, Request, Response } from "express";
import { productRouter } from "./modules/product/product.route";
import { orderRouter } from "./modules/order/order.route";
const app = express();

//Parser
app.use(express.json());

//Routes
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the inventory management API",
  });
});

// Error handling for invalid routes
app.use("/*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//Global error handler

// eslint-disable-next-line
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

export default app;
