import React, { useEffect, useState } from "react";
import apis from "../../apis";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import { GridTwo, Title, OptionField } from "./styles";
import Spinner from "../../components/Spinner";
import Select from "../../components/Select";

const Overview = () => {
    const [truthDepartmentData, setTruthDepartmentData] = useState([]);
    const [truthDepartmentLoading, setTruthDepartmentLoading] = useState(false);
    const [truthDepartmentError, setTruthDepartmentError] = useState(false);

    const [truthSizeData, setTruthSizeData] = useState([]);
    const [truthSizeLoading, setTruthSizeLoading] = useState(false);
    const [truthSizeError, setTruthSizeError] = useState(false);

    const [truthTypeData, setTruthTypeData] = useState([]);
    const [truthTypeLoading, setTruthTypeLoading] = useState(false);
    const [truthTypeError, setTruthTypeError] = useState(false);

    const [weeklySaleInStoreData, setWeeklySaleInStoreData] = useState([]);
    const [weeklySaleInStoreLoading, setWeeklySaleInStoreLoading] = useState(false);
    const [weeklySaleInStoreError, setWeeklySaleInStoreError] = useState(false);
    const [year1, setYear1] = useState("2012");

    const [weeklySaleInDeptData, setWeeklySaleInDeptData] = useState([]);
    const [weeklySaleInDeptLoading, setWeeklySaleInDeptLoading] = useState(false);
    const [weeklySaleInDeptError, setWeeklySaleInDeptError] = useState(false);
    const [year2, setYear2] = useState("2012");
    const [store, setStore] = useState("1");

    const yearData = [
        { value: "2012", label: "2012" },
        { value: "2011", label: "2011" },
        { value: "2010", label: "2010" },
    ];
    let stores = [];
    for (let i = 1; i < 46; i++) {
        stores.push({ value: i + "", label: "Cửa hàng " + i });
    }

    const getTruthDepartmentData = async () => {
        try {
            setTruthDepartmentLoading(true);
            const data = await apis.analysis.truthDepartment();
            if (data.resultCode === 1) {
                setTruthDepartmentData(data.departmentInEachStore);
            }
        } catch (error) {
            setTruthDepartmentError(true);
        }
        setTruthDepartmentLoading(false);
    };

    const getTruthSizeData = async () => {
        try {
            setTruthSizeLoading(true);
            const data = await apis.analysis.truthSize();
            if (data.resultCode === 1) {
                setTruthSizeData(data.sizeInEachStore);
            }
        } catch (error) {
            setTruthSizeError(true);
        }
        setTruthSizeLoading(false);
    };

    const getTruthTypeData = async () => {
        try {
            setTruthTypeLoading(true);
            const data = await apis.analysis.truthType();
            if (data.resultCode === 1) {
                setTruthTypeData(data.numberType);
            }
        } catch (error) {
            setTruthTypeError(true);
        }
        setTruthTypeLoading(false);
    };

    const getWeeklySaleInStoreData = async (payload) => {
        try {
            setWeeklySaleInStoreLoading(true);
            const data = await apis.analysis.weeklySaleInStore(payload);
            if (data.resultCode === 1) {
                setWeeklySaleInStoreData(data.data);
            }
        } catch (error) {
            setWeeklySaleInStoreError(true);
        }
        setWeeklySaleInStoreLoading(false);
    };

    const getWeeklySaleInDeptData = async (payload) => {
        try {
            setWeeklySaleInDeptLoading(true);
            const data = await apis.analysis.weeklySaleInDept(payload);
            if (data.resultCode === 1) {
                setWeeklySaleInDeptData(data.data);
            }
        } catch (error) {
            setWeeklySaleInDeptError(true);
        }
        setWeeklySaleInDeptLoading(false);
    };

    useEffect(() => {
        getTruthSizeData();
        getTruthDepartmentData();
        getTruthTypeData();
    }, []);

    useEffect(() => {
        getWeeklySaleInStoreData({ year: year1 });
    }, [year1]);

    useEffect(() => {
        getWeeklySaleInDeptData({ year: year2, store: store });
    }, [year2, store]);

    const handleChangeYear1 = (e) => {
        setYear1(e.target.value);
    };

    const handleChangeYear2 = (e) => {
        setYear2(e.target.value);
    };

    const handleChangeStore = (e) => {
        setStore(e.target.value);
    };

    return (
        <div>
            <h1>Overview</h1>

            <GridTwo>
                <div>
                    {truthDepartmentLoading ? (
                        <Spinner />
                    ) : truthDepartmentError ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <BarChart
                            title='Number of items in each store'
                            labels={truthDepartmentData.map((data) => data.store)}
                            datas={{
                                label: "number of items",
                                data: truthDepartmentData.map((data) => data.dept),
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            }}
                        />
                    )}
                </div>
                <div>
                    {truthTypeLoading ? (
                        <Spinner />
                    ) : truthTypeError ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <PieChart
                            title='Number of store types'
                            data={{
                                labels: truthTypeData.map((data) => data.type),
                                datasets: [
                                    {
                                        label: "",
                                        data: truthTypeData.map((data) => data.store),
                                        backgroundColor: [
                                            "rgba(255, 99, 132, 0.2)",
                                            "rgba(54, 162, 235, 0.2)",
                                            "rgba(255, 206, 86, 0.2)",
                                            "rgba(75, 192, 192, 0.2)",
                                            "rgba(153, 102, 255, 0.2)",
                                            "rgba(255, 159, 64, 0.2)",
                                        ],
                                        borderColor: [
                                            "rgba(255, 99, 132, 1)",
                                            "rgba(54, 162, 235, 1)",
                                            "rgba(255, 206, 86, 1)",
                                            "rgba(75, 192, 192, 1)",
                                            "rgba(153, 102, 255, 1)",
                                            "rgba(255, 159, 64, 1)",
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        />
                    )}
                </div>
                <div>
                    {truthSizeLoading ? (
                        <Spinner />
                    ) : truthSizeError ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <BarChart
                            title='Size of each store'
                            labels={truthSizeData.map((data) => data.store)}
                            datas={{
                                label: "size",
                                data: truthSizeData.map((data) => data.size),
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            }}
                        />
                    )}
                </div>
                <div></div>
                <div>
                    {weeklySaleInStoreLoading ? (
                        <Spinner />
                    ) : weeklySaleInStoreError ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <BarChart
                            title={"Sales of stores in " + year1}
                            labels={weeklySaleInStoreData.map((data) => data.store)}
                            datas={{
                                label: "sales",
                                data: weeklySaleInStoreData.map((data) => data.weeklySales),
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            }}
                        />
                    )}
                </div>
                <div>
                    <OptionField>
                        <Title>Select year</Title>
                        <Select datas={yearData} current={year1} handleChange={handleChangeYear1} />
                    </OptionField>
                </div>
                <div>
                    {weeklySaleInDeptLoading ? (
                        <Spinner />
                    ) : weeklySaleInDeptError ? (
                        <p>Oops, Something went wrong!</p>
                    ) : (
                        <BarChart
                            title={"Sales of " + store + " store items in " + year2}
                            labels={weeklySaleInDeptData.map((data) => data.dept)}
                            datas={{
                                label: "sales",
                                data: weeklySaleInDeptData.map((data) => data.weeklySales),
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            }}
                        />
                    )}
                </div>
                <div>
                    <OptionField>
                        <Title>Select year</Title>
                        <Select datas={yearData} current={year2} handleChange={handleChangeYear2} />
                    </OptionField>
                    <OptionField>
                        <Title>Select store</Title>
                        <Select datas={stores} current={store} handleChange={handleChangeStore} />
                    </OptionField>
                </div>
            </GridTwo>
        </div>
    );
};

export default Overview;
