import {useState,useEffect,memo} from 'react'

//react-bootstrap
import { Navbar,Container, Nav, Dropdown, Form, Image, Button,Collapse} from 'react-bootstrap'

//router
import { Link,useLocation } from 'react-router-dom'

//component
import CustomToggle from "../../../dropdowns"
import Card from "../../../bootstrap/card"

//img
import img1 from "../../../../assets/images/shapes/01.png"
import img2 from "../../../../assets/images/shapes/02.png"
import img3 from "../../../../assets/images/shapes/03.png"
import img4 from "../../../../assets/images/shapes/04.png"

// logo
import Logo from '../../components/logo'

// Redux Selector / Action
import { useSelector } from 'react-redux';


// Import selectors & action from setting store
import * as SettingSelector from '../../../../store/setting/selectors'

import RadioBtn from '../../../setting/elements/radio-btn'

const Headerpro = memo((props) => {
    const navbarHide = useSelector(SettingSelector.navbar_show); // array
    const themeFontSize = useSelector(SettingSelector.theme_font_size)
    const headerNavbar = useSelector(SettingSelector.header_navbar)
    useEffect(() =>{
        
         if(headerNavbar === 'navs-sticky' || headerNavbar === 'nav-glass')
         {
             window.onscroll=() =>{
                if (document.documentElement.scrollTop > 50) {
                    document.getElementsByTagName('nav')[0].classList.add( 'menu-sticky')
                  } else {
                    document.getElementsByTagName('nav')[0].classList.remove('menu-sticky')
                  }
             }
          }
          
          document.getElementsByTagName('html')[0].classList.add(themeFontSize) 

         
          //offcanvase code
          const result = window.matchMedia("(max-width: 1200px)");
          window.addEventListener('resize', 
                                        () =>{ 
                                            if(result.matches === true){
                                                if(show1 === true){
                                                    document.documentElement.style.setProperty('overflow' ,'hidden');
                                                }
                                                else{
                                                    document.documentElement.style.removeProperty('overflow')
                                                }
                                            
                                            }
                                            else{
                                            document.documentElement.style.removeProperty('overflow')
                                            }
                                    
                                        }
                         )
            if(window.innerWidth <= '1200'){
                    if(show1 === true){
                        document.documentElement.style.setProperty('overflow' ,'hidden');
                    }
                    else{
                        document.documentElement.style.removeProperty('overflow')
                    }

                }
                else{
                    document.documentElement.style.removeProperty('overflow')
                }
       
    })

    const[show, setShow] = useState(true)
      
    const [show1, setShow1] = useState(false);
    
    //collapse
    const [open, setOpen] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [open5, setOpen5] = useState(false);
    const [open10, setOpen10] = useState(false);

    //fullscreen
    const fullscreen= () => {
        if (!document.fullscreenElement &&
          !document.mozFullScreenElement &&
          !document.webkitFullscreenElement &&
          !document.msFullscreenElement) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        }
    }




       
    const minisidebar =() =>{
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }
    
    let location = useLocation();

    return (
        <Navbar expand="xl" className={`nav iq-navbar ${headerNavbar} ${navbarHide.join( " " )}`}>
            <Container fluid className="navbar-inner">
                <Link to="/" className="navbar-brand">
                    <Logo color={true} />
                    <h4 className="logo-title d-none d-sm-block">{props.app_name}</h4>
                </Link>
                <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                    <i className="icon d-flex">
                        <svg width="20px" viewBox="0 0 24 24" className="icon-20" >
                        <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                    </i>
                </div>
                <div className="d-flex align-items-center justify-content-between product-offcanvas">
                    <div className="breadcrumb-title border-end me-3 pe-3 d-none d-xl-block">
                        <small className="mb-0 text-capitalize">Home</small>
                    </div>
                    <div className={`offcanvas offcanvas-end shadow-none iq-product-menu-responsive ${show1 === true ? 'show' : '' } `} tabIndex="-1" id="offcanvasBottom" style={{visibility: `${show1 === true ? 'visible' : 'hidden'}`}}>
                        <div className="offcanvas-body">
                        <ul className="iq-nav-menu list-unstyled">
                            <Nav.Item as="li" className="active">
                                <Nav.Link className="menu-arrow justify-content-start"   onClick={() => setOpen(!open)}  aria-controls="homeData"aria-expanded={open} role="button" >
                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z" fill="currentColor"/>
                                    </svg>
                                    <span className="nav-text ms-2">Home</span>
                                </Nav.Link>
                                <Collapse in={open}>
                                <ul className="iq-header-sub-menu list-unstyled " id="homeData">
                                    <Nav.Item as="li">
                                        <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} to="/">Default Dashboard</Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link className="menu-arrow" onClick={() => setOpen4(!open4)}  aria-expanded={open4}   role="button"  aria-controls="authSkins">
                                            Auth skins
                                            <i className="right-icon">
                                                <svg width="20"  className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                </svg>
                                            </i>
                                        </Nav.Link>
                                        <Collapse in={open4}>
                                        <ul className="iq-header-sub-menu left list-unstyled" id="authSkins">
                                            <Nav.Item as="li">
                                                <Nav.Link className="menu-arrow"  onClick={() => setOpen5(!open5)}  aria-expanded={open5}   role="button"  aria-controls="defaultAuth">
                                                    Defalut
                                                    <i className="right-icon">
                                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                                    </svg>
                                                    </i>
                                                </Nav.Link>
                                                <Collapse in={open5}>
                                                    <ul className="iq-header-sub-menu left list-unstyled" id="defaultAuth">
                                                        <Nav.Item as="li"><Link className={`${location.pathname === '/default/auth/sign-in' ? 'active' : ''} nav-link`} to="/default/auth/sign-in">Sign In</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link className={`${location.pathname === '/default/auth/sign-up' ? 'active' : ''} nav-link`} to="/default/auth/sign-up">Sign Up</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link className={`${location.pathname === '/default/auth/confirm-mail' ? 'active' : ''} nav-link`} to="/default/auth/confirm-mail">Email Verified</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link className={`${location.pathname === '/default/auth/recoverpw' ? 'active' : ''} nav-link`} to="/default/auth/recoverpw">Reset Password</Link></Nav.Item>
                                                        <Nav.Item as="li"><Link className={`${location.pathname === '/default/auth/lock-screen' ? 'active' : ''} nav-link`} to="/default/auth/lock-screen">Lock Screen</Link></Nav.Item>
                                                    </ul>
                                                </Collapse>
                                            </Nav.Item>
                                        </ul>
                                        </Collapse>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                    <Nav.Link className="menu-arrow" onClick={() => setOpen10(!open10)}  aria-expanded={open10}   role="button"  aria-controls="utilities">
                                        Utilities
                                        <i className="right-icon">
                                            <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                            </svg>
                                        </i>
                                    </Nav.Link>
                                    <Collapse in={open10}>
                                        <ul className="iq-header-sub-menu left list-unstyled" id="utilities">
                                            <Nav.Item as="li"><Link className={`${location.pathname === '/errors/maintenance' ? 'active' : ''} nav-link`} to="/errors/maintenance">Maintenance</Link></Nav.Item>
                                            <Nav.Item as="li"><Link className={`${location.pathname === '/errors/error404' ? 'active' : ''} nav-link`} to="/errors/error404">404</Link></Nav.Item>
                                            <Nav.Item as="li"><Link className={`${location.pathname === '/errors/error500' ? 'active' : ''} nav-link`} to="/errors/error500">505</Link></Nav.Item>
                                        </ul>
                                    </Collapse>
                                    </Nav.Item>
                                </ul>
                                </Collapse>
                            </Nav.Item>
                        </ul>
                        </div>   
                    </div> 
                    <div className={`offcanvas-backdrop fade  ${show1 === true ? 'show d-block':'d-none' }`} onClick={() =>setShow1(false)}></div>
                </div>          
                <div className="d-flex align-items-center">
                    <Button id="navbar-toggle" bsPrefix="navbar-toggler"  type="button" aria-expanded={show1} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" onClick={() => setShow1(!show1)} >
                        <span className="navbar-toggler-icon">
                        <span className="mt-1 navbar-toggler-bar bar1"></span>
                        <span className="navbar-toggler-bar bar2"></span>
                        <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Button>
                </div>
                <div className={` navbar-collapse ${show1 === true ? 'collapse show' : 'collapse'}`}   id="navbarSupportedContent">
                    <ul className="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
                        <li className="nav-item dropdown me-0 me-xl-3">
                            <div className="d-flex align-items-center mr-2 iq-font-style" role="group" aria-label="First group">
                                <RadioBtn btnName="theme_font_size" labelclassName="  border-0 btn-icon btn-sm" id="font-size-sm" defaultChecked={themeFontSize} value="theme-fs-sm" >
                                    <span className="mb-0 h6" style={{color: "inherit"}} >A</span>
                                </RadioBtn>
                                <RadioBtn btnName="theme_font_size" labelclassName="  border-0 btn-icon" id="theme-fs-md" defaultChecked={themeFontSize} value="theme-fs-md" >
                                    <span className="mb-0 h4" style={{color :'inherit'}}  >A</span>
                                </RadioBtn>
                                <RadioBtn btnName="theme_font_size" labelclassName="  border-0 btn-icon" id="theme-fs-lg" defaultChecked={themeFontSize} value="theme-fs-lg" >
                                    <span className="mb-0 h2" style={{color :'inherit'}}  >A</span>
                                </RadioBtn>
                            </div>
                        </li>
                        <Dropdown as="li" className="nav-item border-end pe-3 d-none d-xl-block">
                            <div className="form-group input-group mb-0 search-input">
                                <Form.Control type="text"  placeholder="Search..." />
                                <span className="input-group-text">
                                    <svg width="20" className="icon-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></circle>
                                        <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                    </svg>
                                </span>
                            </div>
                        </Dropdown>
                        <Dropdown as="li" className="nav-item  iq-responsive-menu border-end d-block d-xl-none">
                            <Dropdown.Toggle as={CustomToggle} className="btn btn-sm bg-body" >
                                <svg className="icon-20" width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                    <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </Dropdown.Toggle>
                            <Dropdown.Menu  variant="end" aria-labelledby="navbarDropdown-search-11" style={{width: '25rem'}}>
                                <div className="px-3 py-0">
                                    <div className="form-group input-group mb-0">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <span className="input-group-text">
                                        <svg className="icon-20" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11.7669" cy="11.7666" r="8.98856" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                            <path d="M18.0186 18.4851L21.5426 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                        </span>
                                    </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Item className=" iq-full-screen d-none d-xl-block"  onClick={() => setShow(!show)}>
                            <Nav.Link  id="btnFullscreen"   onClick={fullscreen}>
                                <div className="btn btn-primary btn-icon btn-sm rounded-pill" >
                                    <span className="btn-inner"  >
                                        <svg className={`normal-screen ${ show === true ? '' : 'd-none'} icon-24`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.5528 5.99656L13.8595 10.8961" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                        <path d="M14.8016 5.97618L18.5524 5.99629L18.5176 9.96906" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                        <path d="M5.8574 18.896L10.5507 13.9964" stroke="white" strokeWidth="1.5" strokeLinejoin="round" ></path>
                                        <path d="M9.60852 18.9164L5.85775 18.8963L5.89258 14.9235" stroke="white" strokeWidth="1.5"strokeLinejoin="round"></path>
                                        </svg>
                                        <svg className={`full-normal-screen ${ show === false ? '' : 'd-none'} icon-24`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.7542 10.1932L18.1867 5.79319" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                        <path d="M17.2976 10.212L13.7547 10.1934L13.7871 6.62518" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                        <path d="M10.4224 13.5726L5.82149 18.1398" stroke="white" strokeWidth="1.5" strokeLinejoin="round"></path>
                                        <path d="M6.74391 13.5535L10.4209 13.5723L10.3867 17.2755" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"></path>
                                        </svg>
                                    </span>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Dropdown as="li" className="nav-item iq-tour ps-3 ps-lg-0">
                            <Dropdown.Toggle  as={CustomToggle}  variant="py-0  d-flex align-items-center nav-link"  >
                                <div className="btn btn-primary btn-icon btn-sm rounded-pill">
                                    <span className="btn-inner">
                                        <svg width="32" className="icon-32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                                        <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="end">
                                <Dropdown.Item href="/dashboard/app/user-profile">Profile</Dropdown.Item>
                                <Dropdown.Item href="/dashboard/app/user-privacy-setting">Privacy Setting</Dropdown.Item>
                                <hr className="dropdown-divider" />
                                <Dropdown.Item href="/auth/sign-in">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle  as={CustomToggle}  variant="nav-link ">
                                <div className="btn btn-primary btn-icon btn-sm rounded-pill btn-action">
                                    <span className="btn-inner">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M5.91064 20.5886C5.91064 19.7486 6.59064 19.0686 7.43064 19.0686C8.26064 19.0686 8.94064 19.7486 8.94064 20.5886C8.94064 21.4186 8.26064 22.0986 7.43064 22.0986C6.59064 22.0986 5.91064 21.4186 5.91064 20.5886ZM17.1606 20.5886C17.1606 19.7486 17.8406 19.0686 18.6806 19.0686C19.5106 19.0686 20.1906 19.7486 20.1906 20.5886C20.1906 21.4186 19.5106 22.0986 18.6806 22.0986C17.8406 22.0986 17.1606 21.4186 17.1606 20.5886Z" fill="currentColor"></path>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M20.1907 6.34909C20.8007 6.34909 21.2007 6.55909 21.6007 7.01909C22.0007 7.47909 22.0707 8.13909 21.9807 8.73809L21.0307 15.2981C20.8507 16.5591 19.7707 17.4881 18.5007 17.4881H7.59074C6.26074 17.4881 5.16074 16.4681 5.05074 15.1491L4.13074 4.24809L2.62074 3.98809C2.22074 3.91809 1.94074 3.52809 2.01074 3.12809C2.08074 2.71809 2.47074 2.44809 2.88074 2.50809L5.26574 2.86809C5.60574 2.92909 5.85574 3.20809 5.88574 3.54809L6.07574 5.78809C6.10574 6.10909 6.36574 6.34909 6.68574 6.34909H20.1907ZM14.1307 11.5481H16.9007C17.3207 11.5481 17.6507 11.2081 17.6507 10.7981C17.6507 10.3781 17.3207 10.0481 16.9007 10.0481H14.1307C13.7107 10.0481 13.3807 10.3781 13.3807 10.7981C13.3807 11.2081 13.7107 11.5481 14.1307 11.5481Z" fill="currentColor"></path>
                                        </svg>
                                    </span>
                                    <span className="notification-alert"></span>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="end p-0 sub-drop">
                                <Card className="m-0 shadow-none ">
                                    <Card.Header className="py-3 d-flex justify-content-between bg-primary">
                                        <div className="header-title">
                                        <h5 className="mb-0 text-white">All Carts</h5>
                                        </div>
                                    </Card.Header>
                                    <Card.Body className="p-0 max-17 scroll-thin">
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img1} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Biker’s Jacket</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button  variant="icon text-danger " size="sm">
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img2} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Casual Shoes</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button  variant="icon text-danger " size="sm">
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div  className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img3} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Knitted Shrug</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="icon text-danger">
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div  className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img4} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Blue Handbag</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button  variant="icon text-danger" size="sm">
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div  className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img1} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Biker’s Jacket</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button  variant="icon text-danger" size="sm">
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div  className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img2} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Casual Shoes</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button  variant="icon text-danger " size="sm">
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img3} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Knitted Shrug</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button  variant="icon text-danger " size="sm" >
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                        <div  className="iq-sub-card">
                                            <div className="d-flex align-items-center">
                                                <Image className="p-1 avatar-40 rounded-pill bg-soft-primary" src={img4} alt="" loading="lazy" />
                                                <div className="ms-3 flex-grow-1">
                                                    <h6 className="mb-0 ">Blue Handbag</h6>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <p className="mb-0">$56.00</p>
                                                    </div>
                                                </div>
                                                <Button  variant="icon text-danger " size="sm">
                                                    <div className="btn-inner">
                                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="currentColor"></path>
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="currentColor"></path>
                                                        </svg>
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="p-0">
                                        <div className="d-grid">
                                            <Link to="#" className="btn btn-primary">View All</Link>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
})

Headerpro.displayName="Headerpro"
export default Headerpro
