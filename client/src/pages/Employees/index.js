import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useSelector } from "react-redux";
import apis from "../../apis";
import { Wrapper, Title } from "./styles";
import Button from "../../components/Button";
import DetailUser from "../Modal/DetailUser";
import CreateUser from "../Modal/CreateUser";
import UpdateUser from "../Modal/UpdateUser";
import { useDispatch } from "react-redux";
import { getUsersAsync } from "../../redux/userSlice";

const Employee = () => {
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [currentObject, setCurrentObject] = useState({});
    const users = useSelector((state) => state.user);
    const store = useSelector((state) => state.store);
    const hasDetail = true;
    const dispatch = useDispatch();
    const [role, setRole] = useState([]);

    useEffect(() => {
        dispatch(getUsersAsync());
        const getRoles = async () => {
            const roles = await apis.role.getRoles();
            if (roles.status === 1) {
                setRole(roles.result);
            }
        };
        getRoles();
    }, [dispatch]);

    let datas = [];

    users.forEach((user) => {
        let d = new Date(user.createdAt);
        let date = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
        if (user.storeId === store.selectedStore) {
            datas.push({ ...user, createdAt: date, roleName: user.role.name });
        }
    });

    const labels = [
        {
            Header: "Full name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Phone number",
            accessor: "phone",
        },
        {
            Header: "Date of birth",
            accessor: "dateOfBirth",
        },
        {
            Header: "Position",
            accessor: "roleName",
        },
        {
            Header: "Created at",
            accessor: "createdAt",
        },
    ];

    const handleDelete = (id) => {
        alert("Feature is being worked on!");
    };

    return (
        <Wrapper>
            {openDetailModal && <DetailUser setOpenModal={setOpenDetailModal} data={currentObject} stores={store.stores} />}
            {openCreateModal && <CreateUser setOpenModal={setOpenCreateModal} stores={store.stores} roles={role} />}
            {openUpdateModal && <UpdateUser setOpenModal={setOpenUpdateModal} stores={store.stores} roles={role} currentUser={currentObject} />}
            <Title>
                <h1>Employees</h1>
                <Button onClick={() => setOpenCreateModal(true)}>Add new employee</Button>
            </Title>
            <Table
                labels={labels}
                datas={datas}
                hasDetail={hasDetail}
                setOpenDetailModal={setOpenDetailModal}
                setCurrentObject={setCurrentObject}
                setOpenUpdateModal={setOpenUpdateModal}
                deleteObject={handleDelete}
            />
        </Wrapper>
    );
};

export default Employee;
