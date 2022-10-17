const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");
// const { auth } = require("../middlewares/auth");
// const { hasManageOrder } = require("../middlewares/hasManageOrder");
const orderController = require("../controllers/order");

router.get("/", asyncMiddleware(orderController.index));
router.post("/", asyncMiddleware(orderController.store));
router.get("/:id", asyncMiddleware(orderController.show));
router.put("/:id", asyncMiddleware(orderController.update));
router.delete("/:id", asyncMiddleware(orderController.destroy));
router.get("/in-store/:id", asyncMiddleware(orderController.getOrderByStore));

module.exports = router;
