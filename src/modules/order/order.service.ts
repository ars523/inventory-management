import { TOrder } from "./order.interface";
import { Order } from "./order.model";

type TEmail = string | undefined;
const createOrder = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getOrders = async (email: TEmail) => {
  const query = email ? { email } : {};
  const result = await Order.find(query);
  return result;
};

export const OrderService = {
  createOrder,
  getOrders,
};
