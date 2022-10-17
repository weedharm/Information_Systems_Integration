import React from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Content, Wrapper, ButtonLocal, Grid } from "./styles";
import SelectField from "../../components/SelectField";
import axios from "axios";
const UpdateProduct = ({ setOpenModal, currentObject, setReload, categories }) => {
    let options = [];

    categories.forEach((category) => {
        options.push({ value: category.id, label: category.name });
    });

    const initialValues = {
        name: currentObject.name,
        sku: currentObject.sku,
        unit: currentObject.unit,
        description: currentObject.description,
        origin: currentObject.origin,
        preserve: currentObject.preserve,
        weight: currentObject.weight,
        photo: "",
        category: currentObject.category.id,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required!"),
        sku: Yup.string().required("SKU is required!"),
        unit: Yup.string().required("Unit is required!"),
        description: Yup.string(),
        origin: Yup.string(),
        weight: Yup.string(),
        preserve: Yup.string(),
        category: Yup.string().required("Category is required!"),
    });

    const handleSubmit = (values) => {
        let formData = new FormData();
        formData.append("name", values.name);
        formData.append("sku", values.sku);
        formData.append("unit", values.unit);
        formData.append("description", values.description);
        formData.append("origin", values.origin);
        formData.append("preserve", values.preserve);
        formData.append("weight", values.weight);
        formData.append("photo", values.photo);
        formData.append("category", values.category);
        axios.put("http://localhost:8003/products/" + currentObject.id, formData);
        setReload(1);
        setOpenModal(false);
    };
    return (
        <Wrapper>
            <Content>
                <h1>Update information</h1>
                <ButtonLocal onClick={() => setOpenModal(false)}>
                    <span className='ti-close'></span>
                </ButtonLocal>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='name'
                                        component={Input}
                                        // Additional props
                                        label='Product name'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />

                                    <FastField
                                        // Formik's props
                                        name='sku'
                                        component={Input}
                                        // Additional props
                                        label='SKU'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                </Grid>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='unit'
                                        component={Input}
                                        // Additional props
                                        label='Unit'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                    <FastField
                                        // Formik's props
                                        name='origin'
                                        component={Input}
                                        // Additional props
                                        label='Origin'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                </Grid>
                                <Grid>
                                    <FastField
                                        // Formik's props
                                        name='weight'
                                        component={Input}
                                        // Additional props
                                        label='Weight'
                                        type='text'
                                        placeholder=''
                                        disable={false}
                                    />
                                    <div>
                                        <label className='label-photo'>Photo</label>
                                        <input
                                            className='upload-photo'
                                            type='file'
                                            name='photo'
                                            onChange={(e) => props.setFieldValue("photo", e.target.files[0])}
                                        />
                                    </div>
                                </Grid>
                                <FastField name='category' component={SelectField} label='Category' placeholder='' options={options} />
                                <FastField
                                    // Formik's props
                                    name='preserve'
                                    component={Input}
                                    // Additional props
                                    label='Preserve'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />
                                <FastField
                                    // Formik's props
                                    name='description'
                                    component={Input}
                                    // Additional props
                                    label='Description'
                                    type='text'
                                    placeholder=''
                                    disable={false}
                                />
                                <Button type='submit' block>
                                    Update
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Content>
        </Wrapper>
    );
};

export default UpdateProduct;
