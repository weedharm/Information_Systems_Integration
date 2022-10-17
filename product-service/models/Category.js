const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
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

const Categoty = mongoose.model("category", CategorySchema);

module.exports = Categoty;
