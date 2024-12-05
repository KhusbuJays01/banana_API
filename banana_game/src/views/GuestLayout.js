import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useStateContext } from '../context/ContextProvider'
import { Col, Container, Row } from 'react-bootstrap';
import background from '../assets/images/background.avif'

export default function GuestLayout() {

    const { currentUser, userToken } = useStateContext();

    if (userToken) {
        return <Navigate to='/game' />
    }
    return (
        <section className='login-content' style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
        }}>
            <Row className='max-w-sm mx-auto flex-1 flex flex-col items-center justify-content-center px-2'>
                <Col md="5">
                    <Outlet />
                </Col>
            </Row>
        </section>
    )
}
