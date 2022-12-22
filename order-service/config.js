module.exports = {
    PORT: 8004,
    MONGO_URI: "mongodb://localhost:27017/orders-service?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "***REMOVED***",
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    HAS_MANAGE_ORDER: "giam-doc",
    BASE_URL: "http://localhost:",
};
