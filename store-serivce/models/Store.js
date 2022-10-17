const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    number_employee: {
        type: Number,
        default: 0,
    },
    address: {
        type: String,
        required: true,
    },
    manager_id: {
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

const Store = mongoose.model("store", StoreSchema);

module.exports = Store;
