const { FORBIDDEN, HAS_MANAGE_ORDER } = require("../config");

const hasManageOrder = (req, res, next) => {
    if (req.userRole === HAS_MANAGE_ORDER) {
        return next();
    }
    return res.sendStatus(FORBIDDEN);
};

module.exports = {
    hasManageOrder,
};
