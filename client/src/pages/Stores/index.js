import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
import apis from "../../apis";
import { Wrapper, Title } from "./styles";
import Button from "../../components/Button";
import CreateStore from "../Modal/CreateStore";
import UpdateStore from "../Modal/UpdateStore";
import { useDispatch } from "react-redux";
import { deleteStoreAsync } from "../../redux/storeSlice";

const Store = () => {
    const [users, setUsers] = useState([]);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentObject, setCurrentObject] = useState({});
    const stores = useSelector((state) => state.store.stores);
    const hasDetail = false;
    const dispatch = useDispatch();

    useEffect(() => {
        const getUsers = async () => {
            const res = await apis.user.getUsers();
            setUsers(res.result);
        };
        getUsers();
    }, []);

    let datas = [];

    stores.forEach((store) => {
        let d = new Date(store.createdAt);
        let date = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
        users.forEach((user) => {
            if (store.managerId === user.id) {
                datas.push({ ...store, manager: user.name, createdAt: date });
            }
        });
    });

    const labels = [
        {
            Header: "Store name",
            accessor: "name",
        },
        {
            Header: "Number of employees",
            accessor: "numberEmployee",
        },
        {
            Header: "Address",
            accessor: "address",
        },
        {
            Header: "Manager",
            accessor: "manager",
        },
        {
            Header: "Created at",
            accessor: "createdAt",
        },
    ];

    const handleDelete = (store) => {
        if (store.numberEmployee > 0) {
            window.alert(store.name + " store has " + store.numberEmployee + " employees. Let's move them to other stores!");
            return;
        }
        if (window.confirm(store.name + " store will be deleted!") === true) {
            dispatch(deleteStoreAsync(store.id));
        }
    };

    return (
        <Wrapper>
            {openCreateModal && <CreateStore setOpenModal={setOpenCreateModal} users={users} />}
            {openUpdateModal && <UpdateStore setOpenModal={setOpenUpdateModal} currentStore={currentObject} users={users} />}
            <Title>
                <h1>Stores</h1>
                <Button onClick={() => setOpenCreateModal(true)}>Add new store</Button>
            </Title>
            <Table
                labels={labels}
                datas={datas}
                hasDetail={hasDetail}
                setOpenDetailModal
                setCurrentObject={setCurrentObject}
                setOpenUpdateModal={setOpenUpdateModal}
                deleteObject={handleDelete}
            />
        </Wrapper>
    );
};

export default Store;
