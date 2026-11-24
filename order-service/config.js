// Runtime configuration. Every value can be overridden with an environment variable
// (see the root .env.example). Defaults target a local MongoDB / RabbitMQ.
const PORT = Number(process.env.PORT) || 8004;

module.exports = {
    PORT,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/order-service",
    AMQP_URL: process.env.AMQP_URL || "amqp://localhost:5672",
    ACCESS_TOKEN_SECRET: process.env.JWT_SECRET || "dev-only-secret-change-me",
    BASE_URL: process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`,
    HAS_MANAGE_ORDER: "giam-doc",
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};
