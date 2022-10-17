import React from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Content, Wrapper, ButtonLocal } from "./styles";
import SelectField from "../../components/SelectField";
import { useDispatch } from "react-redux";
import { updateStoreAsync } from "../../redux/storeSlice";

const UpdateStore = ({ setOpenModal, currentStore, users }) => {
    const dispatch = useDispatch();

    const options = users.map((user) => ({ value: user.id, label: user.name }));

    const { id, name, address, managerId, numberEmployee } = currentStore;

    const initialValues = {
        name: name,
        address: address,
        manager_id: managerId,
        number_employee: numberEmployee,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required!"),
        address: Yup.string().required("Address is required!"),
        manager_id: Yup.string().required("Manager is required!").nullable(),
        number_employee: Yup.number()
            .required("Number of employee is required!")
            .integer("Number of employee must be an integer")
            .positive("Number of employee must be a positive number"),
    });

    const handleSubmit = (values) => {
        const payload = { ...values, id: id };
        dispatch(updateStoreAsync(payload));
        setOpenModal(false);
    };
    return (
        <Wrapper>
            <Content>
                <h1>Update store information</h1>
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
                                    name='number_employee'
                                    component={Input}
                                    // Additional props
                                    label='Number of employee'
                                    type='number'
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
                                    Update
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

export default UpdateStore;
