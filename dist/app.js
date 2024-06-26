"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/product/product.route");
const order_route_1 = require("./modules/order/order.route");
const app = (0, express_1.default)();
//Parser
app.use(express_1.default.json());
//Routes
app.use("/api/products", product_route_1.productRouter);
app.use("/api/orders", order_route_1.orderRouter);
app.use("/api", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the inventory management API",
    });
});
// Error handling for invalid routes
app.use("/*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
//Global error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
});
exports.default = app;
