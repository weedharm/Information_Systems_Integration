const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");
const { auth } = require("../middlewares/auth");
const { hasManageStore } = require("../middlewares/hasManageStore");
const storeController = require("../controllers/store");

router.get("/", [auth], asyncMiddleware(storeController.index));
router.post("/", [auth, hasManageStore], asyncMiddleware(storeController.store));
router.get("/:id", [auth, hasManageStore], asyncMiddleware(storeController.show));
router.put("/:id", [auth, hasManageStore], asyncMiddleware(storeController.update));
router.delete("/:id", [auth, hasManageStore], asyncMiddleware(storeController.destroy));

module.exports = router;
