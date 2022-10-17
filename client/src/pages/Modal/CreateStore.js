import React from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Content, Wrapper, ButtonLocal } from "./styles";
import SelectField from "../../components/SelectField";
import { useDispatch } from "react-redux";
import { addStoreAsync } from "../../redux/storeSlice";

const CreateStore = ({ setOpenModal, users }) => {
    const dispatch = useDispatch();

    const options = users.map((user) => ({ value: user.id, label: user.name }));

    const initialValues = {
        name: "",
        address: "",
        manager_id: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required!"),
        address: Yup.string().required("Address is required!"),
        manager_id: Yup.string().required("Manager is required!").nullable(),
    });

    const handleSubmit = (values) => {
        const payload = { ...values, number_employee: 0 };
        dispatch(addStoreAsync(payload));
        setOpenModal(false);
    };
    return (
        <Wrapper>
            <Content>
                <h1>Add new store</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <FastField
                                    // Formik's props
                                    name='name'
                                    component={Input}
                                    // Additional props
                                    label='Name'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />

                                <FastField
                                    // Formik's props
                                    name='address'
                                    component={Input}
                                    // Additional props
                                    label='Address'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />

                                <FastField name='manager_id' component={SelectField} label='Manager' placeholder='' options={options} />

                                <Button type='submit' block>
                                    Add
                                </Button>
                                {/* <p className='bottom-text'>
                                    By clicking the Sign Up button, you agree to our
                                    <a href='/#'>Terms & Conditions</a> and
                                    <a href='/#'>Privacy Policy</a>
                                </p> */}
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default CreateStore;
