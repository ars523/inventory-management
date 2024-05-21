"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const inventorySchema = new mongoose_1.Schema({
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    inStock: {
        type: Boolean,
        required: [true, "Stock status is required"],
    },
});
const variantSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: [true, "Variant type is required"],
    },
    value: {
        type: String,
        required: [true, "Variant value is required"],
    },
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: [true, "Product name must be unique"],
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    tags: {
        type: [String],
        required: [true, "Product tags are required"],
    },
    variants: [variantSchema],
    inventory: {
        type: inventorySchema,
        required: [true, "Inventory is required"],
    },
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
