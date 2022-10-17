import React from "react";
import { Content, Wrapper, ButtonLocal, Avatar, Image } from "./styles";
import { ReactTable, TableBody, TableRow, TableData } from "../../components/Table/styles";

const DetailUser = ({ setOpenModal, data, stores }) => {
    let storeName = "";
    stores.forEach((store) => {
        if (store.id === data.storeId) {
            storeName = store.name;
        }
    });

    return (
        <Wrapper>
            <Content>
                <h1>Details</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Avatar>
                    <Image src={data.avatarUrl} />
                    <p>Avatar</p>
                </Avatar>
                <ReactTable>
                    <TableBody>
                        <TableRow>
                            <TableData>Full name</TableData>
                            <TableData>
                                <strong>{data.name}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Email</TableData>
                            <TableData>
                                <strong>{data.email}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Phone number</TableData>
                            <TableData>
                                <strong>{data.phone}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Date of birth</TableData>
                            <TableData>
                                <strong>{data.dateOfBirth}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Store</TableData>
                            <TableData>
                                <strong>{storeName}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Position</TableData>
                            <TableData>
                                <strong>{data.roleName}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Created at</TableData>
                            <TableData>
                                <strong>{data.createdAt}</strong>
                            </TableData>
                        </TableRow>
                    </TableBody>
                </ReactTable>
            </Content>
        </Wrapper>
    );
};

export default DetailUser;
