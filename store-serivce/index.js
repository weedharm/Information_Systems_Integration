const express = require("express");
const cors = require("cors");
const app = express();
const logger = require("morgan");
const { PORT } = require("./config");
const storeRoute = require("./routes/store");
const amqp = require("amqplib");
require("./models");
const { addUser, updateUser } = require("./controllers/handleEvent");

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

async function connect() {
    const amqpServer = "amqps://cvjtvrgc:aq1ezSv5FghWEQat_9hn1A4m23exrt6O@hawk.rmq.cloudamqp.com/cvjtvrgc";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("STORE");
}
connect().then(() => {
    channel.consume("STORE", (data) => {
        const { type, payload } = JSON.parse(data.content);
        switch (type) {
            case "ADD_USER":
                addUser(payload);
                break;
            case "UPDATE_USER":
                updateUser(payload);
                break;
            default:
                break;
        }
        channel.ack(data);
    });
});

// Routes
app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Store service server is OK",
    });
});

app.use("/stores", storeRoute);

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
    console.log(`Store service server is listening on port ${PORT}`);
});
