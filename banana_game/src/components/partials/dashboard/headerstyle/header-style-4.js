import {memo,Fragment} from 'react'

//Router
import {Link} from 'react-router-dom'

//React-bootstrap
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'

// Logo
import Logo from '../../components/logo'

const HeaderStyle4 = memo(() => {
    return (
        <Fragment>
            <Navbar bg='dark' expand="lg" variant="dark" className="fixed-top iq-navbar" aria-label="Main navigation">
                <Container fluid>
                    <Link to="/dashboard" className="navbar-brand d-flex align-items-center">
                        <Logo color={true} />
                        <h4 className="logo-title text-light ms-3 mb-0">Hope UI</h4>
                    </Link>
                    <Navbar.Toggle className="p-0 border-0"  aria-controls="navbarSupportedContent"  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
                        <span className="navbar-toggler-icon">
                            <span className="navbar-toggler-bar bar1 mt-2"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="offcanvas-collapse" >
                        <Nav as="ul" className=" me-auto mb-2 mb-lg-0">
                            <Nav.Item as="li">
                                <Nav.Link  active aria-current="page" href="#">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link  href="#">Notifications</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link  href="#">Profile</Nav.Link>
                            </Nav.Item>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Link className="nav-link active" aria-current="page" to="#">Dashboard</Link>
                    <Link className="nav-link" to="#">
                    Friends
                    <span className="badge bg-light text-dark rounded-pill align-text-bottom">27</span>
                    </Link>
                    <Link className="nav-link" to="#">Explore</Link>
                    <Link className="nav-link" to="#">Suggestions</Link>
                    <Link className="nav-link" to="#">Link</Link>
                    <Link className="nav-link" to="#">Link</Link>       
                    <Link className="nav-link" to="#">Link</Link>
                    <Link className="nav-link" to="#">Link</Link>
                    <Link className="nav-link" to="#">Link</Link>
                </nav>
            </div>   
        </Fragment>
    )
})

HeaderStyle4.displayName="HeaderStyle4"
export default HeaderStyle4
