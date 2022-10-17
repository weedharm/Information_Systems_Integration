const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");
// const { auth } = require("../middlewares/auth");
// const { hasManageProduct } = require("../middlewares/hasManageProduct");
const itemController = require("../controllers/item");

router.get("/", asyncMiddleware(itemController.index));
router.post("/", asyncMiddleware(itemController.store));
router.get("/:id", asyncMiddleware(itemController.show));
router.put("/:id", asyncMiddleware(itemController.update));
router.delete("/:id", asyncMiddleware(itemController.destroy));
router.get("/in-store/:id", asyncMiddleware(itemController.getItemByStore));

module.exports = router;
