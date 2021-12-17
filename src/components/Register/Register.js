import style from './Register.module.css';
import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config.js';
import { Redirect } from 'react-router-dom';
import { onSuccessNotify, onErrorNotify } from '../../Notifications/Notifications';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { UserContext } from '../../Helper/Context.js';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';

function Register({ history }) {

    const context = useContext(UserContext);
    let user = context.user;

    // function onRegister(e) {
    //     e.preventDefault();
    //     let formData = new FormData(e.currentTarget);
    //     console.log(formData.get('email'))
    // }

   

    // const validate = values => {

    //     const errors = {};

    //     if (!values.email) {
    //         errors.email = 'E-mail is Required.';
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //         errors.email = 'Invalid e-mail format.';
    //     }

    //     if (!values.password) {
    //         errors.password = 'Password is Required';
    //     } else if (values.password.length < 5) {
    //         errors.password = 'Password must not be less than 5 symbols';
    //     }

    //     if (!values.confirmPassword) {
    //         errors.confirmPassword = 'Confirm password is Required';
    //     } else if (values.password.length < 5) {
    //         errors.confirmPassword = 'Confirm password must not be less than 5 symbols';
    //     }

    //     return errors;
    // };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid e-mail format.').required('Email is required.'),
        password: Yup.string().min(6).required('Password is required.'),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), ''], 'Passwords must match').min(6).required('Confirm Password is required.')
    });

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    const onSubmit = async (values) => {

        try {
            await createUserWithEmailAndPassword(auth,
                values.email,
                values.password);
            history.push("/")
            onSuccessNotify("Registration Successfull !");
        } catch (error) {
            onErrorNotify("Registration failed !");
        }

    }

    // const formik = useFormik({
    //     initialValues,
    //     validationSchema,
    //     onSubmit
    // });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <div className={style.registerContainer} >
            <title>Register</title>
                {!user ?
                    <Form className={style.register} >
                        <h2 className={style.registerTitle}>Create new account</h2>

                        <label className={style.label} htmlFor="email">
                            <i style={{ color: "white", marginRight: 10 }} className="far fa-envelope login-icon" >
                            </i>
                            <Field name="email"
                                id="email"
                                type="text"
                                className={style.input}
                                placeholder="Type your E-mail"
                                autoFocus
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.email}
                            //{...formik.getFieldProps('email')}
                            />
                        </label>
                        <ErrorMessage name='email' className={style.errorMessage} >
                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        < label className={style.label} htmlFor="password" >
                            <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" >
                            </i>
                            <Field name="password"
                                id="password"
                                type="password"
                                className={style.input}
                                placeholder="Type your Password"
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // onSubmit={formik.values.password}
                            //{...formik.getFieldProps('password')}
                            />
                        </label >
                        <ErrorMessage name='password' className={style.errorMessage} >
                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        < label className={style.label} htmlFor="confirmPassword" >
                            <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" >
                            </i>
                            <Field name="confirmPassword"
                                id="confirmPassword"
                                type="password"
                                className={style.input}
                                placeholder="Repeat your Password"
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // onSubmit={formik.values.confirmPassword}
                            //{...formik.getFieldProps('confirmPassword')}
                            />
                        </label >
                        <ErrorMessage name='confirmPassword' className={style.errorMessage} >
                            {msg => <div style={{ color: 'red' }}>{msg}</div>}
                        </ErrorMessage>

                        <input type="submit" value="Register" className={style.button}></input>
                    </Form >
                    :
                    <Redirect to="/" />
                }
            </div >
        </Formik>
    )
}

export default Register;
