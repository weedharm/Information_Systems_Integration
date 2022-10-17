const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const path = require("path");
const fileUpload = require("express-fileupload");
const { PORT } = require("./config");
const authRoute = require("./routes/auth");
const roleRoute = require("./routes/role");
const userRoute = require("./routes/user");

require("./models");

// Middleware
app.use(fileUpload());
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "User service server is OK",
    });
});

app.use("/", authRoute);
app.use("/roles", roleRoute);
app.use("/users", userRoute);

// 404
app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});

// Handle error
app.use((err, req, res, next) => {
    const error = err || {};
    const status = err.status || 500;

    return res.status(status).json({
        error: {
            message: error.message,
        },
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`User service server is listening on port ${PORT}`);
});
