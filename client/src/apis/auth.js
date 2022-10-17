import api from "./api";

const login = async (email, password) => {
    const loginInfo = await api({
        method: "POST",
        url: "/sv_1/login",
        data: { email, password },
    });
    return loginInfo;
};

const currentUser = async () => {
    const currentUser = await api({
        method: "GET",
        url: "/sv_1/current",
    });
    return currentUser;
};

export { login, currentUser };
