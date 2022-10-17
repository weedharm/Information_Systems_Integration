import api from "./api";

const getProducts = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_3/products",
    });

    return datas;
};

const addProduct = async (payload) => {
    const datas = await api({
        method: "POST",
        url: "/sv_3/products",
        data: payload,
    });

    return datas;
};

const updateProduct = async (payload) => {
    const datas = await api({
        method: "PUT",
        url: "/sv_3/products/" + payload.id,
        data: payload,
    });

    return datas;
};

const deleteProduct = async (payload) => {
    const datas = await api({
        method: "DELETE",
        url: "/sv_3/products/" + payload,
    });
    return datas;
};

export { getProducts, addProduct, updateProduct, deleteProduct };
