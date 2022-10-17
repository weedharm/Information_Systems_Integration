import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Title } from "./styles";
import apis from "../../apis";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import Table from "../../components/Table";
import CreateOrder from "../Modal/CreateOrder";
import UpdateOrder from "../Modal/UpdateOrder";
import DetailOrder from "../Modal/DetailOrder";

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const storeId = useSelector((state) => state.store.selectedStore);
    let datas = [];
    const hasDetail = true;
    const [reload, setReload] = useState(0);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentObject, setCurrentObject] = useState({});
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);
                const orders = await apis.order.getOrdersByStore(storeId);
                if (orders.status === 1) {
                    setOrders(orders.result);
                }
                const items = await apis.item.getItemsByStore(storeId);
                if (items.status === 1) {
                    setItems(items.result.filter((item) => item.count > 0));
                }
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        setReload(0);
        getItems();
    }, [storeId, reload]);

    orders.forEach((order) => {
        let d = new Date(order.createdAt);
        let date = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
        let count = order.listProduct.length;
        datas.push({ ...order, createdAt: date, productCount: count });
    });

    const labels = [
        {
            Header: "Customer name",
            accessor: "customerName",
        },
        {
            Header: "Number of items",
            accessor: "productCount",
        },
        {
            Header: "Total VNĐ",
            accessor: "totalMoney",
        },
        {
            Header: "Created by",
            accessor: "createdBy",
        },
        {
            Header: "Created at",
            accessor: "createdAt",
        },
    ];

    const handleDelete = (item) => {
        if (window.confirm("Order of " + item.customerName + " will be deleted!") === true) {
            apis.order.deleteOrder(item.id).then((res) => {
                setReload(1);
            });
        }
    };

    return (
        <Wrapper>
            {openDetailModal && <DetailOrder setOpenModal={setOpenDetailModal} data={currentObject} />}
            {openCreateModal && <CreateOrder setOpenModal={setOpenCreateModal} setReload={setReload} items={items} storeId={storeId} />}
            {openUpdateModal && <UpdateOrder setOpenModal={setOpenUpdateModal} />}
            <Title>
                <h1>Orders</h1>
                <Button onClick={() => setOpenCreateModal(true)}>Add new order</Button>
            </Title>
            {loading ? (
                <Spinner />
            ) : error ? (
                <p>Oops, Something went wrong!</p>
            ) : (
                <Table
                    labels={labels}
                    datas={datas}
                    hasDetail={hasDetail}
                    setOpenDetailModal={setOpenDetailModal}
                    setCurrentObject={setCurrentObject}
                    setOpenUpdateModal={setOpenUpdateModal}
                    deleteObject={handleDelete}
                />
            )}
        </Wrapper>
    );
};

export default Order;
