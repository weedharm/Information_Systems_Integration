const Item = require("../models/Item");

const index = async (req, res) => {
    const items = await Item.find().populate("product_id").lean();
    return res.send({ status: 1, result: items });
};

const store = async (req, res) => {
    // Create new item
    let item = new Item();
    item.product_id = req.body.product_id;
    item.price = req.body.price;
    item.count = req.body.count;
    item.store_id = req.body.store_id;
    // Save user
    item = await item.save();
    return res.send({ status: 1, result: item });
};

const show = async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1, result: item });
};

const update = async (req, res) => {
    const id = req.params.id;
    let item = await Item.findById(id);
    if (!item) return res.sendStatus(NOT_FOUND);
    item.price = req.body.price;
    item.count = req.body.count;
    // Save user
    item = await item.save();
    return res.send({ status: 1, result: item });
};

const destroy = async (req, res) => {
    const id = req.params.id;
    const item = await Item.findByIdAndDelete(id).lean();
    if (!item) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1, result: item });
};

const getItemByStore = async (req, res) => {
    const storeId = req.params.id;
    const items = await Item.find({ store_id: storeId }).populate("product_id").lean();
    return res.send({ status: 1, result: items });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
    getItemByStore,
};
