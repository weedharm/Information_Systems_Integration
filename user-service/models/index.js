const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");

mongoose.set("strictQuery", true);

mongoose.connect(MONGO_URI);

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
});

mongoose.connection.once("open", () => {
    console.log(`Connected to MongoDB database "${mongoose.connection.name}"`);
});
