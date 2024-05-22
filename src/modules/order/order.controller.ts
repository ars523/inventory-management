import { Request, Response } from "express";
import { OrderService } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const result = await OrderService.createOrder(orderData);
    res.json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order creation failed!",
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
};
