import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { Container, Dropdown, Image, Navbar } from 'react-bootstrap'
import banana_img from "../assets/images/banana1.png"
import { useStateContext } from '../context/ContextProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../axios'
import cookie from 'js-cookie';

export default function DefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();

    const navigate = useNavigate();

    if (!userToken) {
        return <Navigate to='/signin' />
    }

    const handleLogout = () => {
        setUserToken();
        localStorage.clear();
        cookie.remove('timer');
        cookie.remove('chances');
        cookie.remove('score');        
        return navigate("/signin");
    }
    return (
        <>
            <Navbar className='nav iq-navbar'>
                <Container fluid className='navbar-inner'>
                    <Image
                        src={banana_img}
                        width={100}
                        height={100}
                        className='navbar-brand m-2'
                    />
                    <h4 className='logo-title m-2'>Welcome,{currentUser.name}</h4>
                    <Dropdown as="li" className="nav-item">
                        <Dropdown.Toggle variant=" nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="caption ms-3 d-none d-md-block ">
                                <h5 className="mb-0 caption-title">{currentUser.name}'s Profile</h5>
                                <p className="mb-0 caption-sub-title"></p>
                            </div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <Dropdown.Divider />
                            <Dropdown.Item href='/game'>Game</Dropdown.Item>
                            <Dropdown.Item href='/history'>History</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}
