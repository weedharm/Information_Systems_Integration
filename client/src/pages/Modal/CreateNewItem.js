import React from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Content, Wrapper, ButtonLocal } from "./styles";
import SelectField from "../../components/SelectField";
import apis from "../../apis";

const CreateNewItem = ({ setOpenModal, setReload, products, storeId }) => {
    let options = [];
    products.forEach((product) => {
        options.push({ value: product.id, label: product.name });
    });

    const initialValues = {
        product_id: "",
        price: 0,
        count: 0,
    };

    const validationSchema = Yup.object({
        product_id: Yup.string().required("Product is required!"),
        price: Yup.number().required("Price is required!").positive("Price must be a positive number").integer("Price must be an integer"),
        count: Yup.number().required("Count is required!").positive("Count must be a positive number").integer("Count must be an integer"),
    });

    const handleSubmit = (values) => {
        const payload = { ...values, store_id: storeId };
        apis.item.addItem(payload).then((res) => {
            setReload(1);
            setOpenModal(false);
        });
    };
    return (
        <Wrapper>
            <Content>
                <h1>Add new product</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <FastField name='product_id' component={SelectField} label='Product name' placeholder='' options={options} />
                                <FastField
                                    // Formik's props
                                    name='price'
                                    component={Input}
                                    // Additional props
                                    label='Price VNĐ'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />

                                <FastField
                                    // Formik's props
                                    name='count'
                                    component={Input}
                                    // Additional props
                                    label='Number of items'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />

                                <Button type='submit' block>
                                    Add
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default CreateNewItem;
