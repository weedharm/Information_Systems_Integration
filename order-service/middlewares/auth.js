const asyncMiddleware = require("./async");
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, ACCESS_TOKEN_SECRET } = require("../config");

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(UNAUTHORIZED);

    const [tokenType, accessToken] = authorization.split(" ");

    if (tokenType !== "Bearer") return res.sendStatus(UNAUTHORIZED);

    const { userId, userRole } = await jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    req.userId = userId;
    req.userRole = userRole;
    return next();
};

module.exports = {
    auth: asyncMiddleware(auth),
};
