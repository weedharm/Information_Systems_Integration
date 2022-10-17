import api from "./api";

const getUsers = async () => {
    const users = await api({
        method: "GET",
        url: "/sv_1/users",
    });
    return users;
};

const addUser = async (payload) => {
    const user = await api({
        method: "POST",
        url: "/sv_1/users",
        data: payload,
    });

    return user;
};

const updateUser = async (payload) => {
    const user = await api({
        method: "PUT",
        url: "/sv_1/users/" + payload.id,
        data: payload,
    });

    return user;
};

export { getUsers, addUser, updateUser };
