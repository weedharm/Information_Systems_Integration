const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, ACCESS_TOKEN_SECRET } = require("../config");

const auth = (req, res, next) => {
    const [tokenType, accessToken] = (req.headers.authorization || "").split(" ");
    if (tokenType !== "Bearer" || !accessToken) return res.sendStatus(UNAUTHORIZED);

    try {
        const { userId, userRole } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
        req.userId = userId;
        req.userRole = userRole;
        return next();
    } catch (err) {
        return res.sendStatus(UNAUTHORIZED);
    }
};

module.exports = { auth };
