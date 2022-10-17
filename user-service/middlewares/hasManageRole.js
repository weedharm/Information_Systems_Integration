const { FORBIDDEN } = require("../config");

const hasManageRole = (req, res, next) => {
    if (req.userRole === 'giam-doc' || req.userRole === 'quan-ly-cua-hang') {
        return next();
    }
    return res.sendStatus(FORBIDDEN);
};

module.exports = {
    hasManageRole,
};
