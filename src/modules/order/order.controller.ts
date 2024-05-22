import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { orderValidationSchema } from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const zodParsedData = orderValidationSchema.parse(orderData);
    const result = await OrderService.createOrder(zodParsedData);
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

const getOrders = async (req: Request, res: Response) => {
  const email = req.query.email as string;
  try {
    const result = await OrderService.getOrders(email);
    if (email) {
      res.json({
        success: true,
        message: "Orders fetched successfully for user email!",
        data: result,
      });
      return;
    }
    res.json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Orders fetch failed!",
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getOrders,
};
