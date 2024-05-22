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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = require("./order.validation");
const product_service_1 = require("../product/product.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = req.body;
    try {
        const zodParsedData = order_validation_1.orderValidationSchema.parse(orderData);
        const product = yield product_service_1.ProductService.getProductById(zodParsedData.productId);
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
        const result = yield order_service_1.OrderService.createOrder(zodParsedData);
        // Update the product inventory
        product.inventory.quantity -= zodParsedData.quantity;
        product.inventory.inStock =
            product.inventory.quantity - zodParsedData.quantity > 0;
        yield product.save();
        res.json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Order creation failed!",
            error: error,
        });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    try {
        const result = yield order_service_1.OrderService.getOrders(email);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Orders fetch failed!",
            error: error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getOrders,
};
