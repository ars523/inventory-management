import { Request, Response } from "express";
import { OrderService } from "./order.service";
import { orderValidationSchema } from "./order.validation";
import { ProductService } from "../product/product.service";

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const zodParsedData = orderValidationSchema.parse(orderData);
    const product = await ProductService.getProductById(
      zodParsedData.productId
    );

    //check if product exists
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found!",
      });
      return;
    }
    // Check if the quantity requested is available in inventory
    if (product.inventory.quantity < zodParsedData.quantity) {
      res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
      return;
    }
    const result = await OrderService.createOrder(zodParsedData);

    // Update the product inventory
    product.inventory.quantity -= zodParsedData.quantity;
    product.inventory.inStock =
      product.inventory.quantity - zodParsedData.quantity > 0;
    await product.save();

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
