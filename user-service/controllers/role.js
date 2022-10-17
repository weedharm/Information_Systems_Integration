const Role = require("../models/Role");
const { NOT_FOUND } = require("../config");

const index = async (req, res) => {
    const roles = await Role.find();
    return res.send({ status: 1, result: roles });
};

const store = async (req, res) => {
    const newRole = new Role(req.body);
    const role = await newRole.save();
    return res.send({ status: 1, result: role });
};

const show = async (req, res) => {
    const id = req.params.id;
    const role = await Role.findById(id);
    if (!role) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1, result: role });
};

const update = async (req, res) => {
    const id = req.params.id;
    let role = await Role.findById(id);
    if (!role) return res.sendStatus(NOT_FOUND);
    role.name = req.body.name;
    role.slug = req.body.slug;
    role.description = req.body.description;
    role = await role.save();
    return res.send({ status: 1, result: role });
};

const destroy = async (req, res) => {
    const id = req.params.id;
    const role = await Role.findByIdAndDelete(id).lean();
    if (!role) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1 });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
};
