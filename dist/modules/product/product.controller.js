"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productData = req.body;
    try {
        const zodParsedData = product_validation_1.productValidationSchema.parse(productData);
        const result = yield product_service_1.ProductService.createProduct(zodParsedData);
        res.json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product creation failed!",
            error: error,
        });
    }
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductService.getProducts();
        res.json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Products fetch failed!",
            error: error,
        });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const result = yield product_service_1.ProductService.getProductById(productId);
        res.json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product fetch failed!",
            error: error,
        });
    }
});
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const productData = req.body;
    try {
        const existingProduct = yield product_service_1.ProductService.getProductById(productId);
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
        const zodParsedData = product_validation_1.productValidationSchema.parse(newData);
        const result = yield product_service_1.ProductService.updateProductById(productId, zodParsedData);
        res.json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Product update failed!",
            error: error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
};
