const express = require("express");
const router = express.Router();
const asyncMiddleware = require("../middlewares/async");
const { auth } = require("../middlewares/auth");
const { hasManageRole } = require("../middlewares/hasManageRole");
const roleController = require("../controllers/role");

router.get("/", [auth, hasManageRole], asyncMiddleware(roleController.index));
router.post("/", [auth, hasManageRole], asyncMiddleware(roleController.store));
router.get("/:id", [auth, hasManageRole], asyncMiddleware(roleController.show));
router.put("/:id", [auth, hasManageRole], asyncMiddleware(roleController.update));
router.delete("/:id", [auth, hasManageRole], asyncMiddleware(roleController.destroy));

module.exports = router;
