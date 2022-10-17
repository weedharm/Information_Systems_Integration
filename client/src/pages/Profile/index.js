import React from "react";
import { Wrapper } from "./styles";
import { ReactTable, TableBody, TableRow, TableData } from "../../components/Table/styles";
import { useSelector } from "react-redux";
import { Avatar, Image } from "../Modal/styles";

const Profile = () => {
    let user = useSelector((state) => state.auth.user);
    const stores = useSelector((state) => state.store.stores);
    stores.forEach((store) => {
        if (store.id === user.storeId) {
            user = { ...user, storeName: store.name };
        }
    });
    let d = new Date(user.createdAt);
    let date = `${d.getDay()}.${d.getMonth()}.${d.getFullYear()}`;
    user = { ...user, createdAt: date };
    return (
        <Wrapper>
            <h2>My profile</h2>
            <Avatar>
                <Image src={user.avatarUrl} />
                <p>Avatar</p>
            </Avatar>
            <ReactTable>
                <TableBody>
                    <TableRow>
                        <TableData>Full name</TableData>
                        <TableData>
                            <strong>{user.name}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Email</TableData>
                        <TableData>
                            <strong>{user.email}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Phone number</TableData>
                        <TableData>
                            <strong>{user.phone}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Date of birth</TableData>
                        <TableData>
                            <strong>{user.dateOfBirth}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Store</TableData>
                        <TableData>
                            <strong>{user.storeName}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Position</TableData>
                        <TableData>
                            <strong>{user.role.name}</strong>
                        </TableData>
                    </TableRow>
                    <TableRow>
                        <TableData>Created at</TableData>
                        <TableData>
                            <strong>{user.createdAt}</strong>
                        </TableData>
                    </TableRow>
                </TableBody>
            </ReactTable>
        </Wrapper>
    );
};

export default Profile;
