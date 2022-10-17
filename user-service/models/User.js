const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { PORT, BASE_URL } = require("../config");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    date_of_birth: {
        type: String,
        required: true,
    },

    store_id: {
        type: String,
        required: true,
    },

    avatar_url: {
        type: String,
        default: BASE_URL + PORT + "/uploads/default.jpg",
    },

    password: {
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

    avatar_name: {
        type: String,
        default: "default.jpg",
    },

    role: {
        type: Schema.Types.ObjectId,
        ref: "role",
    },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
