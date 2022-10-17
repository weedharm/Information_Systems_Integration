const User = require("../models/User");
const { NOT_FOUND, SALT_ROUNDS } = require("../config");
const bcrypt = require("bcrypt");
const { PORT, BASE_URL } = require("../config");
const fs = require("fs");
const amqp = require("amqplib");

async function connect() {
    const amqpServer = "amqps://cvjtvrgc:aq1ezSv5FghWEQat_9hn1A4m23exrt6O@hawk.rmq.cloudamqp.com/cvjtvrgc";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("USER");
}
connect();

const index = async (req, res) => {
    const users = await User.find().populate("role").lean();
    return res.send({ status: 1, result: users });
};

const store = async (req, res) => {
    // Upload image
    let fileName = "";
    if (req.files != null) {
        let prev = Date.now();
        let file = req.files.avatar;
        fileName = prev + "_" + file.name;
        let uploadDir = "./public/uploads/";
        file.mv(uploadDir + fileName, (error) => {
            if (error) {
                throw error;
            }
        });
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
        user.avatar_url = BASE_URL + PORT + "/uploads/" + fileName;
        user.avatar_name = fileName;
    }
    // Save user
    user = await user.save();

    channel.sendToQueue(
        "STORE",
        Buffer.from(
            JSON.stringify({
                type: "ADD_USER",
                payload: req.body.store_id,
            })
        )
    );

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
    if (req.files != null) {
        if (user.avatar_name !== "default.jpg") {
            fs.unlinkSync("./public/uploads/" + user.avatar_name);
        }
        let prev = Date.now();
        let file = req.files.avatar;
        fileName = prev + "_" + file.name;
        let uploadDir = "./public/uploads/";
        file.mv(uploadDir + fileName, (error) => {
            if (error) {
                throw error;
            }
        });
    }

    if (req.body.store_id !== user.store_id) {
        channel.sendToQueue(
            "STORE",
            Buffer.from(
                JSON.stringify({
                    type: "UPDATE_USER",
                    payload: {
                        oldId: user.store_id,
                        newId: req.body.store_id,
                    },
                })
            )
        );
    }

    const data = {};
    data.email = req.body.email || user.email;
    data.name = req.body.name || user.name;
    data.phone = req.body.phone || user.phone;
    data.date_of_birth = req.body.date_of_birth || user.date_of_birth;
    data.store_id = req.body.store_id || user.store_id;
    data.role = req.body.role || user.role;

    if (fileName !== "") {
        data.avatar_url = BASE_URL + PORT + "/uploads/" + fileName;
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

    if (user.avatar_name !== "default.jpg") {
        fs.unlinkSync("./public/uploads/" + user.avatar_name);
    }

    // Delete user from db
    user = await user.remove();
    return res.send({ status: 1, result: user });
};

module.exports = {
    index,
    store,
    show,
    update,
    destroy,
};
