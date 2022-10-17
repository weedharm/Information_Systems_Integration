import React from "react";
import { Grid, Content, Wrapper, ButtonLocal, Avatar, Photo, Info } from "./styles";
import { ReactTable, TableBody, TableRow, TableData } from "../../components/Table/styles";

const DetailProduct = ({ setOpenModal, data }) => {
    return (
        <Wrapper>
            <Content>
                <h1>Details</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Grid>
                    <Avatar>
                        <Photo src={data.photoUrl} />
                        <p>Photo</p>
                    </Avatar>
                    <ReactTable>
                        <TableBody>
                            <TableRow>
                                <TableData>Product name</TableData>
                                <TableData>
                                    <strong>{data.name}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>SKU</TableData>
                                <TableData>
                                    <strong>{data.sku}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Category</TableData>
                                <TableData>
                                    <strong>{data.categoryName}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Unit</TableData>
                                <TableData>
                                    <strong>{data.unit}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Origin</TableData>
                                <TableData>
                                    <strong>{data.origin}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Weight</TableData>
                                <TableData>
                                    <strong>{data.weight}</strong>
                                </TableData>
                            </TableRow>
                            <TableRow>
                                <TableData>Crerated at</TableData>
                                <TableData>
                                    <strong>{data.createdAt}</strong>
                                </TableData>
                            </TableRow>
                        </TableBody>
                    </ReactTable>
                </Grid>
                <Info>
                    <strong>Preserve: </strong> {data.preserve}
                </Info>
                <Info>
                    <strong>Description: </strong> {data.description}
                </Info>
            </Content>
        </Wrapper>
    );
};

export default DetailProduct;
