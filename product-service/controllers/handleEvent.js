const Item = require("../models/Item");

// `lines` is an order's list_product: [{ id: <itemId>, count: <quantity>, ... }]
const changeStock = async (lines, sign) => {
    for (const line of lines || []) {
        const quantity = parseInt(line.count, 10);
        if (!line.id || Number.isNaN(quantity)) continue;
        const item = await Item.findByIdAndUpdate(line.id, { $inc: { count: sign * quantity } });
        if (!item) console.warn(`Item ${line.id} not found, stock not updated`);
    }
};

const addOrder = async (lines) => {
    await changeStock(lines, -1);
    console.log("Handled event ADD_ORDER");
};

const deleteOrder = async (lines) => {
    await changeStock(lines, +1);
    console.log("Handled event DEL_ORDER");
};

module.exports = {
    addOrder,
    deleteOrder,
};
