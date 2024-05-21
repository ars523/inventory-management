import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getProducts = async () => {
  const result = await Product.find();
  return result;
};

export const ProductService = {
  createProduct,
  getProducts,
};
