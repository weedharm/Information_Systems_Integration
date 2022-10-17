const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PORT, BASE_URL } = require("../config");

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    sku: {
        type: String,
        required: true,
    },

    unit: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    origin: {
        type: String,
    },

    preserve: {
        type: String,
    },

    weight: {
        type: String,
    },

    created_at: {
        type: Date,
        default: Date.now(),
    },

    updated_at: {
        type: Date,
        default: Date.now(),
    },

    photo_url: {
        type: String,
        default: BASE_URL + PORT + "/uploads/default.jpg",
    },

    photo_name: {
        type: String,
        default: "default.jpg",
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "category",
    },
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
