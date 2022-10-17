import React, { useEffect } from "react";
import { Formik, Form, FastField } from "formik";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as Yup from "yup";
import { Wrapper, Content } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../redux/authSlice";
import { useHistory } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address!").required("Email is required!"),
        password: Yup.string().min(8, "Password must be at least 8 characters!").required("Password is required!"),
    });

    const handleSubmit = (values) => {
        dispatch(loginAsync(values));
        history.push("/dashboard");
    };

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/dashboard");
        } else {
            history.push("/login");
        }
    }, [history, isAuthenticated]);

    return (
        <Wrapper>
            <Content>
                <h1>Login</h1>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                    {(props) => {
                        return (
                            <Form>
                                <FastField
                                    // Formik's props
                                    name='email'
                                    component={Input}
                                    // Additional props
                                    label='Email'
                                    type='email'
                                    placeholder=''
                                    disable={false}
                                />

                                <FastField
                                    // Formik's props
                                    name='password'
                                    component={Input}
                                    // Additional props
                                    label='Password'
                                    type='password'
                                    placeholder=''
                                    disable={false}
                                />

                                <Button type='submit' block>
                                    Login
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
            {/* <footer>
                <p>
                    Already have an account? <a href='/#'>Login here</a>
                </p>
            </footer> */}
        </Wrapper>
    );
};

export default Login;
