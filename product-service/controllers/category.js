const Category = require("../models/Category");
const { NOT_FOUND } = require("../config");

const index = async (req, res) => {
    const categories = await Category.find();
    return res.send({ status: 1, result: categories });
};

const store = async (req, res) => {
    let category = new Category();
    category.name = req.body.name;

    category = await category.save();

    return res.send({ status: 1, result: category });
};

const show = async (req, res) => {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1, result: category });
};

const update = async (req, res) => {
    const id = req.params.id;
    let category = await Category.findById(id);
    if (!category) return res.sendStatus(NOT_FOUND);
    category.name = req.body.name;
    category = await category.save();
    return res.send({ status: 1, result: category });
};

const destroy = async () => {
    const id = req.params.id;
    const product = await Store.findByIdAndDelete(id).lean();
    return res.send({ status: 1, result: product });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
};
