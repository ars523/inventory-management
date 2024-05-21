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
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed!",
      error: error,
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getProducts();
    res.json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Products fetch failed!",
      error: error,
    });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const result = await ProductService.getProductById(productId);
    res.json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product fetch failed!",
      error: error,
    });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const productData = req.body;

  try {
    const existingProduct = await ProductService.getProductById(productId);

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found!",
      });
      return;
    }

    const newData = {
      name: productData.name || existingProduct.name,
      price: productData.price || existingProduct.price,
      description: productData.description || existingProduct.description,
      category: productData.category || existingProduct.category,
      tags: productData.tags || existingProduct.tags,
      variants: productData.variants || existingProduct.variants,
      inventory: productData.inventory || existingProduct.inventory,
    };

    const zodParsedData = productValidationSchema.parse(newData);
    const result = await ProductService.updateProductById(
      productId,
      zodParsedData
    );
    res.json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product update failed!",
      error: error,
    });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const existingProduct = await ProductService.getProductById(productId);

    if (!existingProduct) {
      res.status(404).json({
        success: false,
        message: "Product not found!",
      });
      return;
    }

    await ProductService.deleteProductById(productId);

    res.json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product delete failed!",
      error: error,
    });
  }
};

export const ProductController = {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
