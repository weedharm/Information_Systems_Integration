const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customer_name: {
        type: String,
        required: false,
    },

    customer_phone: {
        type: String,
        required: false,
    },

    created_at: {
        type: Date,
        default: Date.now(),
    },

    created_by: {
        type: String,
        require: true,
    },

    total_money: {
        type: Number,
        require: true,
    },

    list_product: {
        type: Array,
        require: true,
        default: [],
    },

    store_id: {
        type: String,
        require: true,
    },
});

const Order = mongoose.model("order", OrderSchema);

module.exports = Order;
