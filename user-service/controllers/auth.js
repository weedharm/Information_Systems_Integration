const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET, BAD_REQUEST } = require("../config");
const Role = require("../models/Role");

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email }).populate("role").lean();

        if (!user) {
            return res.status(BAD_REQUEST).json({
                messsge: "User not found with this email.",
            });
        }

        if (bcrypt.compareSync(password, user.password)) {
            const userRole = user.role.slug ? user.role.slug : "nhan-vien";
            const accessToken = jwt.sign({ userId: user._id, userRole: userRole }, ACCESS_TOKEN_SECRET, {
                expiresIn: "24h",
            });

            res.send({ user: user, token: accessToken });
        } else {
            return res.status(BAD_REQUEST).json({
                messsge: "Invalid email or password.",
            });
        }
    } catch (e) {
        // statements
        next(e);
    }
};

const currentUser = async (req, res, next) => {
    console.log(req.userId);
    const currentUser = await User.findById(req.userId);
    return res.send({
        status: 1,
        result: currentUser,
    });
};

module.exports = {
    login,
    currentUser,
};
