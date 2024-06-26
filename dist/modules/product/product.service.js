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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
const getProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const allQueries = [];
    if (searchTerm) {
        searchTerm.split(" ").forEach((element) => {
            allQueries.push({ name: { $regex: String(element) } });
            allQueries.push({ description: { $regex: String(element) } });
        });
    }
    const finalQuery = allQueries.length > 0 ? { $or: allQueries } : {};
    const result = yield product_model_1.Product.find(finalQuery);
    return result;
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(productId);
    return result;
});
const updateProductById = (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOneAndUpdate({ _id: productId }, product, {
        new: true,
    });
    return result;
});
const deleteProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(productId);
    return result;
});
exports.ProductService = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};
