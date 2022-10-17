const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error.");
    console.error(err);
    process.exit();
});

mongoose.connection.once("open", () => {
    console.log(`Connected to MongoDB: ${MONGO_URI}`);
});
