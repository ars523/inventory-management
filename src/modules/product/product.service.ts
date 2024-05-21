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

const getProductById = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductById = async (productId: string, product: TProduct) => {
  const result = await Product.findByIdAndUpdate(productId, product);
  return result;
};

const deleteProductById = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
