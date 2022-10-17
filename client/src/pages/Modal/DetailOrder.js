import React from "react";
import { Content, Wrapper, ButtonLocal } from "./styles";
import { ReactTable, TableBody, TableRow, TableData, TableHead, TableHeader } from "../../components/Table/styles";

const DetailProduct = ({ setOpenModal, data }) => {
    return (
        <Wrapper>
            <Content>
                <h1>Details</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <ReactTable>
                    <TableBody>
                        <TableRow>
                            <TableData>Customer name</TableData>
                            <TableData>
                                <strong>{data.customerName}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Phone number</TableData>
                            <TableData>
                                <strong>{data.customerPhone}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Number of items</TableData>
                            <TableData>
                                <strong>{data.productCount}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Total VNĐ</TableData>
                            <TableData>
                                <strong>{data.totalMoney}</strong>
                            </TableData>
                        </TableRow>
                        <TableRow>
                            <TableData>Created by</TableData>
                            <TableData>
                                <strong>{data.createdBy}</strong>
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
                <h2>List of purchased products</h2>
                <ReactTable>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Product name</TableHeader>
                            <TableHeader>SKU</TableHeader>
                            <TableHeader>Quantity</TableHeader>
                            <TableHeader>Price VNĐ</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.listProduct.map((product) => (
                            <TableRow key={product.sku + "_" + product.price}>
                                <TableData>{product.name}</TableData>
                                <TableData>{product.sku}</TableData>
                                <TableData>{product.count}</TableData>
                                <TableData>{product.price}</TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </ReactTable>
            </Content>
        </Wrapper>
    );
};

export default DetailProduct;
