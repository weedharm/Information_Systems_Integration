const Store = require("../models/Store");

const changeEmployeeCount = async (storeId, delta) => {
    if (!storeId) return;
    const store = await Store.findByIdAndUpdate(storeId, { $inc: { number_employee: delta } });
    if (!store) console.warn(`Store ${storeId} not found, employee counter not updated`);
};

const addUser = async (storeId) => {
    await changeEmployeeCount(storeId, +1);
    console.log("Handled event ADD_USER");
};

const updateUser = async ({ oldId, newId }) => {
    await changeEmployeeCount(oldId, -1);
    await changeEmployeeCount(newId, +1);
    console.log("Handled event UPDATE_USER");
};

module.exports = {
    addUser,
    updateUser,
};
