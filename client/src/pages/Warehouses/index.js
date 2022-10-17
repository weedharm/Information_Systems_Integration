import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Title } from "./styles";
import apis from "../../apis";
import Spinner from "../../components/Spinner";
import Button from "../../components/Button";
import Table from "../../components/Table";
import CreateNewItem from "../Modal/CreateNewItem";
import UpdateItem from "../Modal/UpdateItem";

const Warehouse = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const storeId = useSelector((state) => state.store.selectedStore);
    let datas = [];
    const hasDetail = false;
    const [reload, setReload] = useState(0);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentObject, setCurrentObject] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            try {
                setLoading(true);
                const items = await apis.item.getItemsByStore(storeId);
                if (items.status === 1) {
                    setItems(items.result);
                }
                const products = await apis.product.getProducts();
                if (products.status === 1) {
                    setProducts(products.result);
                }
            } catch (error) {
                setError(true);
            }
            setLoading(false);
        };
        setReload(0);
        getItems();
    }, [storeId, reload]);

    items.forEach((item) => {
        let d = new Date(item.createdAt);
        let date = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
        datas.push({ ...item, createdAt: date, productName: item.productId.name, productUnit: item.productId.unit, productSku: item.productId.sku });
    });

    const labels = [
        {
            Header: "Product name",
            accessor: "productName",
        },
        {
            Header: "SKU",
            accessor: "productSku",
        },
        {
            Header: "Price VNĐ",
            accessor: "price",
        },
        {
            Header: "Unit",
            accessor: "productUnit",
        },
        {
            Header: "Number of items",
            accessor: "count",
        },
        {
            Header: "Created at",
            accessor: "createdAt",
        },
    ];

    const handleDelete = (item) => {
        if (window.confirm(item.productName + " will be deleted!") === true) {
            apis.item.deleteItem(item.id).then((rea) => {
                setReload(1);
            });
        }
    };

    return (
        <Wrapper>
            {openCreateModal && <CreateNewItem setOpenModal={setOpenCreateModal} setReload={setReload} products={products} storeId={storeId} />}
            {openUpdateModal && <UpdateItem setOpenModal={setOpenUpdateModal} currentObject={currentObject} setReload={setReload} />}
            <Title>
                <h1>Products in the store</h1>
                <Button onClick={() => setOpenCreateModal(true)}>Add new product</Button>
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
                    setOpenDetailModal
                    setCurrentObject={setCurrentObject}
                    setOpenUpdateModal={setOpenUpdateModal}
                    deleteObject={handleDelete}
                />
            )}
        </Wrapper>
    );
};

export default Warehouse;
