module.exports = {
    PORT: 8001,
    MONGO_URI: "mongodb://localhost:27017/user-service?retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "***REMOVED***",
    SALT_ROUNDS: 10,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BASE_URL: "http://localhost:",
};
