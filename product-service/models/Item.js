const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "product",
    },

    price: {
        type: Number,
        required: true,
    },

    count: {
        type: Number,
        required: true,
    },

    store_id: {
        type: String,
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now(),
    },

    updated_at: {
        type: Date,
        default: Date.now(),
    },
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
