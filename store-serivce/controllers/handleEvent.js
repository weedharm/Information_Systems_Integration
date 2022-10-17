const Store = require("../models/Store");

const addUser = (id) => {
    Store.findById(id).then((store) => {
        store.number_employee++;
        store.save().then(() => {
            console.log("Handle event ADD_USER success!");
        });
    });
};

const updateUser = ({ oldId, newId }) => {
    Store.findById(oldId).then((oldStore) => {
        oldStore.number_employee--;
        oldStore.save().then(() => {
            Store.findById(newId).then((newStore) => {
                newStore.number_employee++;
                newStore.save().then(() => {
                    console.log("Handle event UPDATE_USER success!");
                });
            });
        });
    });
};

module.exports = {
    addUser,
    updateUser,
};
