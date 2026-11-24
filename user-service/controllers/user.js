const User = require("../models/User");
const { NOT_FOUND, SALT_ROUNDS, BASE_URL } = require("../config");
const bcrypt = require("bcrypt");
const { saveUpload, removeUpload } = require("../uploads");
const { publish } = require("../broker");

const index = async (req, res) => {
    const users = await User.find().populate("role").lean();
    return res.send({ status: 1, result: users });
};

const store = async (req, res) => {
    // Upload image
    let fileName = "";
    if (req.files && req.files.avatar) {
        fileName = await saveUpload(req.files.avatar);
    }
    // Create new user
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.store_id = req.body.store_id;
    user.date_of_birth = req.body.date_of_birth;
    user.password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
    user.role = req.body.role;
    if (fileName !== "") {
        user.avatar_url = BASE_URL + "/uploads/" + fileName;
        user.avatar_name = fileName;
    }
    // Save user
    user = await user.save();

    await publish("STORE", "ADD_USER", req.body.store_id);

    user = await User.findById(user._id).populate("role").lean();

    return res.send({ status: 1, result: user });
};

const show = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.sendStatus(NOT_FOUND);
    return res.send({ status: 1, result: user });
};

const update = async (req, res) => {
    const id = req.params.id;
    let user = await User.findById(id);
    if (!user) return res.sendStatus(NOT_FOUND);
    // Upload image
    let fileName = "";
    if (req.files && req.files.avatar) {
        await removeUpload(user.avatar_name);
        fileName = await saveUpload(req.files.avatar);
    }

    // Only move the employee counter when the user really changes store.
    if (req.body.store_id && String(req.body.store_id) !== String(user.store_id)) {
        await publish("STORE", "UPDATE_USER", { oldId: user.store_id, newId: req.body.store_id });
    }

    const data = {};
    data.email = req.body.email || user.email;
    data.name = req.body.name || user.name;
    data.phone = req.body.phone || user.phone;
    data.date_of_birth = req.body.date_of_birth || user.date_of_birth;
    data.store_id = req.body.store_id || user.store_id;
    data.role = req.body.role || user.role;

    if (fileName !== "") {
        data.avatar_url = BASE_URL + "/uploads/" + fileName;
        data.avatar_name = fileName;
    }

    user = await User.findByIdAndUpdate(id, data, { new: true }).populate("role").lean();
    return res.send({ status: 1, result: user });
};

const destroy = async (req, res) => {
    const id = req.params.id;
    // Find user by id
    let user = await User.findById(id);
    if (!user) return res.sendStatus(NOT_FOUND);

    await removeUpload(user.avatar_name);

    // Delete user from db
    user = await user.deleteOne();
    return res.send({ status: 1, result: user });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
};
