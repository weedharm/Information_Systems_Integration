const { FORBIDDEN, HAS_MANAGE_PRODUCT } = require("../config");

const hasManageStore = (req, res, next) => {
    if (req.userRole === HAS_MANAGE_PRODUCT) {
        return next();
    }
    return res.sendStatus(FORBIDDEN);
};

module.exports = {
    hasManageStore,
};
