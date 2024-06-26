import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getProducts = async (searchTerm: string) => {
  const allQueries: (
    | { name: { $regex: string } }
    | { description: { $regex: string } }
  )[] = [];

  if (searchTerm) {
    searchTerm.split(" ").forEach((element) => {
      allQueries.push({ name: { $regex: String(element) } });
      allQueries.push({ description: { $regex: String(element) } });
    });
  }
  const finalQuery = allQueries.length > 0 ? { $or: allQueries } : {};
  const result = await Product.find(finalQuery);
  return result;
};

const getProductById = async (productId: string) => {
  const result = await Product.findById(productId);
  return result;
};

const updateProductById = async (productId: string, product: TProduct) => {
  const result = await Product.findOneAndUpdate({ _id: productId }, product, {
    new: true,
  });
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
