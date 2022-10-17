const Product = require("../models/Product");
const { PORT, BASE_URL, NOT_FOUND } = require("../config");
const fs = require("fs");

const index = async (req, res) => {
    const products = await Product.find().sort({ created_at: -1 }).populate("category").lean();
    return res.send({ status: 1, result: products });
};

const store = async (req, res) => {
    let product = new Product();
    // Upload image
    if (req.files != null) {
        let prev = Date.now();
        let file = req.files.photo;
        product.photo_name = prev + "_" + file.name;
        product.photo_url = BASE_URL + PORT + "/uploads/" + product.photo_name;
        let uploadDir = "./public/uploads/";
        file.mv(uploadDir + product.photo_name, (error) => {
            if (error) {
                throw error;
            }
        });
    }
    // Create new product
    product.name = req.body.name;
    product.sku = req.body.sku;
    product.unit = req.body.unit;
    product.description = req.body.description;
    product.origin = req.body.origin;
    product.preserve = req.body.preserve;
    product.weight = req.body.weight;
    product.category = req.body.category;
    // Save user
    product = await product.save();
    product = await Product.findById(product._id).populate("category").lean();
    return res.send({ status: 1, result: product });
};

const show = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate("category").lean();
    if (!product) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1, result: product });
};

const update = async (req, res) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) return res.sendStatus(NOT_FOUND);
    // Upload image
    if (req.files != null) {
        if (product.photo_name !== "default.jpg") {
            fs.unlinkSync("./public/uploads/" + product.photo_name);
        }
        let prev = Date.now();
        let file = req.files.photo;
        product.photo_name = prev + "_" + file.name;
        product.photo_url = BASE_URL + PORT + "/uploads/" + product.photo_name;
        let uploadDir = "./public/uploads/";
        file.mv(uploadDir + product.photo_name, (error) => {
            if (error) {
                throw error;
            }
        });
    }

    product.name = req.body.name;
    product.sku = req.body.sku;
    product.unit = req.body.unit;
    product.description = req.body.description;
    product.origin = req.body.origin;
    product.preserve = req.body.preserve;
    product.weight = req.body.weight;
    product.category = req.body.category;
    // Save user
    product = await product.save();
    product = await Product.findById(product._id).populate("category").lean();
    return res.send({ status: 1, result: product });
};

const destroy = async (req, res) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if (!product) return res.sendStatus(NOT_FOUND);
    if (product.photo_name !== "default.jpg") {
        fs.unlinkSync("./public/uploads/" + product.photo_name);
    }

    product = await product.remove();
    return res.send({ status: 1, result: product });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
};
