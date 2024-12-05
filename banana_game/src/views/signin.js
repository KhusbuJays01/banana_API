import React from 'react'
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import banana_logo from "../assets/images/banana_img1.png"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateContext } from '../context/ContextProvider';
import axiosClient from '../axios';
import cookie from 'js-cookie';

const signinSchema = Yup.object({
  email: Yup.string().email("Email is invalid.").required("Email is required."),
  password: Yup.string().required("Password is required."),
})

const SignIn = () => {
  // const navigate = useNavigate();
  // const { setCurrentUser, setUserToken } = useStateContext();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const { setCurrentUser, setUserToken, showToast } = useStateContext();

  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitLogin();
    }
  }
  const submitLogin = (values) => {
    let email = formik.values.email;
    let password = formik.values.password;
    let item = { email, password };
    axiosClient.post("/login", item)
      .then((response) => {
        setCurrentUser(response.data.user);
        setUserToken(response.data.token);
        cookie.set('timer', false);
        navigate("/game");
      })
      .catch((err) => {
        if (err.response) {
          const finalErrors = Object.values(err.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          const errorHtml = finalErrors.join("<br>");
          showToast(err, "error");
        } else {
          console.error(err);
        }
      })
  }

  const formik = useFormik({
    initialValues: data,
    validationSchema: signinSchema,
    onSubmit: submitLogin,
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
          <p className="text-center">Login to play with numbers.</p>
          <Form onKeyPress={handleKeyPress} onSubmit={formik.handleSubmit}>
            <Row>
              <Col lg="12">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="email" className="">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    aria-describedby="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && !!formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg="12" className="">
                <Form.Group className="form-group">
                  <Form.Label htmlFor="password" className="">
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    className=""
                    name="password"
                    aria-describedby="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-grid m-3 gap-2 col-6 mx-auto">
              <Button
                onClick={submitLogin}
                type="submit"
                variant="btn btn-primary"
              >
                Sign In
              </Button>
              <Link to='/signup' className='text-center'>Register to PLAY!!</Link>
            </div>
            {/* To display the message for popup */}

          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default SignIn;
