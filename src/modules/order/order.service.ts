import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getOrders = async () => {
  const result = await Order.find();
  return result;
};

const getOrderByEmail = async (email: string) => {
  const result = await Order.find({ email });
  return result;
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrderByEmail,
};
