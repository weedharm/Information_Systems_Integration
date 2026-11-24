// Idempotent demo seed: categories, products (with photos from public/uploads)
// and a stock item of every product in each demo store.
// Usage: npm run seed
const mongoose = require("mongoose");
const { MONGO_URI, BASE_URL } = require("../config");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Item = require("../models/Item");
const { categories, products, stores, initialStock } = require("./catalog.json");

mongoose.set("strictQuery", true);

async function main() {
    await mongoose.connect(MONGO_URI);

    for (const category of categories) {
        if (!(await Category.exists({ _id: category._id }))) await Category.create(category);
    }

    for (const { price, ...product } of products) {
        if (await Product.exists({ _id: product._id })) continue;
        await Product.create({ ...product, photo_url: `${BASE_URL}/uploads/${product.photo_name}` });
        for (const storeId of stores) {
            await Item.create({ product_id: product._id, store_id: storeId, price, count: initialStock });
        }
    }

    console.log(`Seeded ${categories.length} categories and ${products.length} products`);
    await mongoose.disconnect();
}

main().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
