const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");
// const { auth } = require("../middlewares/auth");
// const { hasManageProduct } = require("../middlewares/hasManageProduct");
const categoryController = require("../controllers/category");

router.get("/", asyncMiddleware(categoryController.index));
router.post("/", asyncMiddleware(categoryController.store));
router.get("/:id", asyncMiddleware(categoryController.show));
router.put("/:id", asyncMiddleware(categoryController.update));
router.delete("/:id", asyncMiddleware(categoryController.destroy));

module.exports = router;
