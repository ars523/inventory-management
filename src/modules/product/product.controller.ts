import { Request, Response } from "express";
import { ProductService } from "./product.service";
import { productValidationSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  try {
    const zodParsedData = productValidationSchema.parse(productData);
    const result = await ProductService.createProduct(zodParsedData);
    res.json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: error,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getProducts();
    res.json({
      success: true,
      message: "Products fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Products fetch failed",
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getProducts,
};
