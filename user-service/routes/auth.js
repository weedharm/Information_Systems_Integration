const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");
const { auth } = require("../middlewares/auth");
const authController = require("../controllers/auth");

router.route("/login").post(authController.login);
router.get("/current", [auth], asyncMiddleware(authController.currentUser));

module.exports = router;
