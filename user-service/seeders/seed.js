// Idempotent demo seed: upserts the roles and the demo accounts.
// Usage: npm run seed   (password comes from DEMO_PASSWORD, default "admin123")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { MONGO_URI, SALT_ROUNDS } = require("../config");
const Role = require("../models/Role");
const User = require("../models/User");
const roles = require("./roles.json");
const users = require("./users.json");

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "admin123";

mongoose.set("strictQuery", true);

async function main() {
    await mongoose.connect(MONGO_URI);

    for (const role of roles) {
        await Role.updateOne({ slug: role.slug }, { $set: role }, { upsert: true });
    }

    const password = bcrypt.hashSync(DEMO_PASSWORD, SALT_ROUNDS);
    for (const { role: slug, ...user } of users) {
        const role = await Role.findOne({ slug });
        const exists = await User.exists({ _id: user._id });
        if (!exists) await User.create({ ...user, role: role._id, password });
    }

    console.log(`Seeded ${roles.length} roles and ${users.length} demo users`);
    await mongoose.disconnect();
}

main().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
