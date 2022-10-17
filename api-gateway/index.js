const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const logger = require("morgan");
const { PORT, userServiceUrl, storeServiceUrl, productServiceUrl, orderServiceUrl, analysisServiceUrl } = require("./config");

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.get("/api", (req, res, next) => {
    return res.status(200).json({
        message: "Api gateway server is OK!",
    });
});

app.use("/api/sv_1", proxy(userServiceUrl));
app.use("/api/sv_2", proxy(storeServiceUrl));
app.use("/api/sv_3", proxy(productServiceUrl));
app.use("/api/sv_4", proxy(orderServiceUrl));
app.use("/api/sv_5", proxy(analysisServiceUrl));

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
