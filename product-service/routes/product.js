const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");
// const { auth } = require("../middlewares/auth");
// const { hasManageProduct } = require("../middlewares/hasManageProduct");
const productController = require("../controllers/product");

router.get("/", asyncMiddleware(productController.index));
router.post("/", asyncMiddleware(productController.store));
router.get("/:id", asyncMiddleware(productController.show));
router.put("/:id", asyncMiddleware(productController.update));
router.delete("/:id", asyncMiddleware(productController.destroy));

module.exports = router;
