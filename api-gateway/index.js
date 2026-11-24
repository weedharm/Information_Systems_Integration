const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const logger = require("morgan");
const { PORT, userServiceUrl, storeServiceUrl, productServiceUrl, orderServiceUrl, analysisServiceUrl } = require("./config");

const app = express();

app.use(logger("dev"));
app.use(cors());

// Routes
app.get("/api", (req, res, next) => {
    return res.status(200).json({
        message: "Api gateway server is OK!",
    });
});

// Stream request bodies untouched so JSON and multipart uploads both reach the services.
const forward = (url) => proxy(url, { parseReqBody: false });

app.use("/api/sv_1", forward(userServiceUrl)); // users, roles, auth
app.use("/api/sv_2", forward(storeServiceUrl)); // stores
app.use("/api/sv_3", forward(productServiceUrl)); // products, categories, stock items
app.use("/api/sv_4", forward(orderServiceUrl)); // orders
app.use("/api/sv_5", forward(analysisServiceUrl)); // sales analysis & forecast

// 404
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

// Handle error
app.use((err, req, res, next) => {
    const error = app.get("env") === "development" ? err : {};
    const status = err.status || 500;

    return res.status(status).json({
        error: {
            message: error.message,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Api gateway server is listening to port ${PORT}`);
});
