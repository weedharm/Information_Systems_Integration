import api from "./api";

const getOrders = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_4/orders",
    });

    return datas;
};

const addOrder = async (payload) => {
    const datas = await api({
        method: "POST",
        url: "/sv_4/orders",
        data: payload,
    });

    return datas;
};

const updateItem = async (payload) => {
    const datas = await api({
        method: "PUT",
        url: "/sv_3/items/" + payload.id,
        data: payload.data,
    });

    return datas;
};

const deleteOrder = async (payload) => {
    const datas = await api({
        method: "DELETE",
        url: "/sv_4/orders/" + payload,
    });
    return datas;
};

const getOrdersByStore = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/sv_4/orders/in-store/" + payload,
    });
    return datas;
};

export { getOrders, addOrder, updateItem, deleteOrder, getOrdersByStore };
