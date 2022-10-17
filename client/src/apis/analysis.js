import api from "./api";

const truthDepartment = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/truth/department",
    });

    return datas;
};

const truthSize = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/truth/size",
    });

    return datas;
};

const truthType = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/truth/type",
    });

    return datas;
};

const weeklySaleInStore = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/truth/weeklySaleInStore",
        params: payload,
    });

    return datas;
};

const weeklySaleInDept = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/truth/weeklySaleInDept",
        params: payload,
    });

    return datas;
};

const predictWeeklySaleInStore = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/predict/weeklySaleInStore",
        params: payload,
    });

    return datas;
};

const predictWeeklySaleInDept = async (payload) => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/predict/weeklySaleInDept",
        params: payload,
    });

    return datas;
};

const weeklySaleInYear = async () => {
    const datas = await api({
        method: "GET",
        url: "/sv_5/analysis/predict/weeklySaleInYear",
    });

    return datas;
};

export { truthDepartment, truthSize, truthType, weeklySaleInStore, weeklySaleInDept, predictWeeklySaleInStore, predictWeeklySaleInDept, weeklySaleInYear };
