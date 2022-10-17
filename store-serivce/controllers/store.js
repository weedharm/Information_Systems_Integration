const Store = require("../models/Store");

const index = async (req, res) => {
    const stores = await Store.find();
    return res.send({ status: 1, result: stores });
};

const store = async (req, res) => {
    let store = new Store(req.body);
    store = await store.save();
    return res.send({ status: 1, result: store });
};

const show = async (req, res) => {
    const id = req.params.id;
    const store = await Store.findById(id);
    if (!store) return res.sendStatus(NOTFOUND);
    return res.send({ status: 1, result: store });
};

const update = async (req, res) => {
    const id = req.params.id;

    let store = await Store.findById(id);
    if (!store) return res.sendStatus(NOTFOUND);

    const data = {
        name: req.body.name || store.name,
        number_employee: req.body.number_employee || store.number_employee,
        address: req.body.address || store.address,
        manager_id: req.body.manager_id || store.manager_id,
    };

    store = await Store.findByIdAndUpdate(id, data, { new: true });
    return res.send({ status: 1, result: store });
};

const destroy = async (req, res) => {
    const id = req.params.id;
    const store = await Store.findByIdAndDelete(id).lean();
    if (!store) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1, result: store });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
};
