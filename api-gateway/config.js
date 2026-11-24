// Upstream service URLs. Override with environment variables when running in Docker.
module.exports = {
    PORT: Number(process.env.PORT) || 8000,
    userServiceUrl: process.env.USER_SERVICE_URL || "http://localhost:8001",
    storeServiceUrl: process.env.STORE_SERVICE_URL || "http://localhost:8002",
    productServiceUrl: process.env.PRODUCT_SERVICE_URL || "http://localhost:8003",
    orderServiceUrl: process.env.ORDER_SERVICE_URL || "http://localhost:8004",
    analysisServiceUrl: process.env.ANALYSIS_SERVICE_URL || "http://localhost:8005",
};
