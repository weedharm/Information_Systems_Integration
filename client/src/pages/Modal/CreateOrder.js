import React, { useState } from "react";
import { Content, Wrapper, ButtonLocal, FieldCustom, Label, Input, Grid } from "./styles";
import Select from "react-select";
import apis from "../../apis";
import { ReactTable, TableBody, TableRow, TableData, TableHead, TableHeader } from "../../components/Table/styles";
import Button from "../../components/Button";
import { useSelector } from "react-redux";

const CreateOrder = ({ setOpenModal, setReload, items, storeId }) => {
    const user = useSelector((state) => state.auth.user.name);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [products, setProducts] = useState([]);
    let options = [];

    items.forEach((item) => {
        options.push({
            value: { id: item.id, price: item.price, name: item.productId.name, maxCount: item.count + "", sku: item.productId.sku, count: "1" },
            label: item.productId.name + " | " + item.productId.sku + " | " + item.count,
        });
    });

    const handleCountChange = (id, value) => {
        const newProducts = [...products];
        newProducts.forEach((product) => {
            if (product.value.id === id) {
                if (parseInt(value) > parseInt(product.value.maxCount)) {
                    product.value.count = product.value.maxCount;
                } else {
                    product.value.count = value;
                }
            }
        });

        setProducts(newProducts);
    };

    const totalMoney = () => {
        let total = 0;
        products.forEach(({ value }) => {
            total += value.price * parseInt(value.count);
        });
        return total;
    };

    const handleSubmit = () => {
        let payload = {
            store_id: storeId,
            total_money: totalMoney(),
            created_by: user,
            customer_name: name,
            customer_phone: phone,
            list_product: products.map((product) => product.value),
        };

        apis.order.addOrder(payload).then((res) => {
            setReload(1);
            setOpenModal(false);
        });
    };

    return (
        <Wrapper>
            <Content>
                <h1>Add new order</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Grid>
                    <FieldCustom>
                        <Label htmlFor='customer_name'>Customer name</Label>
                        <Input id='customer_name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </FieldCustom>
                    <FieldCustom>
                        <Label htmlFor='customer_phone'>Phone number</Label>
                        <Input id='customer_phone' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </FieldCustom>
                </Grid>

                <FieldCustom>
                    <Label htmlFor='list_product'>Add products</Label>
                    <Select id='list_product' isMulti options={options} onChange={(e) => setProducts(e)} />
                </FieldCustom>

                {products.length === 0 ? (
                    <></>
                ) : (
                    <ReactTable>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Product name</TableHeader>
                                <TableHeader>Warehourse</TableHeader>
                                <TableHeader>Price VNĐ</TableHeader>
                                <TableHeader>Quantily</TableHeader>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {products.map(({ value }) => (
                                <TableRow key={value.sku + "_" + value.price}>
                                    <TableData>{value.name}</TableData>
                                    <TableData>{value.maxCount}</TableData>
                                    <TableData>{value.price}</TableData>
                                    <TableData>
                                        <Input
                                            type='number'
                                            value={value.count}
                                            onChange={(e) => handleCountChange(value.id, e.target.value)}
                                            min='1'
                                            max={value.maxCount}
                                        />
                                    </TableData>
                                </TableRow>
                            ))}
                            {products.length === 0 ? (
                                <></>
                            ) : (
                                <TableRow>
                                    <TableData></TableData>
                                    <TableData></TableData>
                                    <TableData>Total:</TableData>
                                    <TableData>
                                        <strong>{totalMoney()}</strong>
                                    </TableData>
                                </TableRow>
                            )}
                        </TableBody>
                    </ReactTable>
                )}

                <Button block onClick={handleSubmit}>
                    Add
                </Button>
            </Content>
        </Wrapper>
    );
};

export default CreateOrder;
