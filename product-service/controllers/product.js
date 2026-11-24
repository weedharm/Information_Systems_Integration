const Product = require("../models/Product");
const { BASE_URL, NOT_FOUND } = require("../config");
const { saveUpload, removeUpload } = require("../uploads");

const index = async (req, res) => {
    const products = await Product.find().sort({ created_at: -1 }).populate("category").lean();
    return res.send({ status: 1, result: products });
};

const store = async (req, res) => {
    let product = new Product();
    // Upload image
    if (req.files && req.files.photo) {
        product.photo_name = await saveUpload(req.files.photo);
        product.photo_url = BASE_URL + "/uploads/" + product.photo_name;
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
    if (req.files && req.files.photo) {
        await removeUpload(product.photo_name);
        product.photo_name = await saveUpload(req.files.photo);
        product.photo_url = BASE_URL + "/uploads/" + product.photo_name;
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
    await removeUpload(product.photo_name);

    product = await product.deleteOne();
    return res.send({ status: 1, result: product });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
};
