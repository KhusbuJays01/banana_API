import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Form, Image, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axiosClient from '../axios';
import { useStateContext } from '../context/ContextProvider';
import axios from 'axios';
import authServices from '../service/auth.services';
import banana_logo from "../assets/images/banana_img1.png"

const signupSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    email: Yup.string().email("Email is invalid.").required("Email is required."),
    password: Yup.string().required("Password is required.").min(8, "Password should be 8 characters long."),
    password_confirmation: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password'), null], 'Password must match'),
})

const SignUp = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const { showToast } = useStateContext();

    const { setCurrentUser, setUserToken } = useStateContext();

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            submitForm();
        }
    }
    const navigate = useNavigate();

    const submitForm = (values) => {
        axios.post("http://localhost:8000/api/users", values)
            .then((response) => {
                showToast("User created.", "success");
                navigate("/signin");
            })
            .catch((response) => {
                showToast("Regiration failed.", "response");
            });
    }

    useEffect(() => {

    })

    const formik = useFormik({
        initialValues: data,
        validationSchema: signupSchema,
        onSubmit: submitForm,
    })
    return (
        <>
            <Card className='m-5' style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                <Card.Body>
                    <Image
                        src={banana_logo}
                        width={300}
                        height={300}
                        className='rounded mx-auto d-block'
                    />
                    <h2 className="m-2 text-center">Banana Game</h2>
                    <p className="text-center">Register to play with numbers.</p>
                    <Form onKeyPress={handleKeyPress} onSubmit={formik.handleSubmit} className='m-2'>
                        <Form.Label htmlFor='name'>
                            Name
                        </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter your name'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.name && !!formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                        <Form.Label htmlFor='email'>
                            Email
                        </Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter your Email'
                            name='email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.email && !!formik.errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                        </Form.Control.Feedback>
                        <Form.Label htmlFor='password'>
                            Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter your password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.password && !!formik.errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                        </Form.Control.Feedback>
                        <Form.Label htmlFor='password_confirmation'>
                            Confirm Password
                        </Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter your password'
                            name='password_confirmation'
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.password_confirmation && !!formik.errors.password_confirmation}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.password_confirmation}
                        </Form.Control.Feedback>
                        <div className='d-grid m-3 gap-2 col-6 mx-auto'>
                            <Button type="submit" variant='btn btn-primary' onClick={submitForm}>Register</Button>
                            <Link to="/signin" className='text-center'>Go to Login</Link>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}

export default SignUp;
