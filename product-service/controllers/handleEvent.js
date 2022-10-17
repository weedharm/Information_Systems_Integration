const Item = require("../models/Item");

const addOrder = (payload) => {
    payload.forEach((order) => {
        Item.findById(order.id).then((item) => {
            item.count -= parseInt(order.count);
            item.save().then((res) => {
                console.log("Handle event ADD_ORDER success!");
            });
        });
    });
};

const deleteOrder = (payload) => {
    payload.forEach((order) => {
        Item.findById(order.id).then((item) => {
            item.count += parseInt(order.count);
            item.save().then((res) => {
                console.log("Handle event DEL_ORDER success!");
            });
        });
    });
};

module.exports = {
    addOrder,
    deleteOrder,
};
