// Idempotent demo seed: creates the demo stores if they do not exist yet.
// Usage: npm run seed
const mongoose = require("mongoose");
const { MONGO_URI } = require("../config");
const Store = require("../models/Store");
const stores = require("./stores.json");

mongoose.set("strictQuery", true);

async function main() {
    await mongoose.connect(MONGO_URI);
    for (const store of stores) {
        if (!(await Store.exists({ _id: store._id }))) await Store.create(store);
    }
    console.log(`Seeded ${stores.length} demo stores`);
    await mongoose.disconnect();
}

main().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
