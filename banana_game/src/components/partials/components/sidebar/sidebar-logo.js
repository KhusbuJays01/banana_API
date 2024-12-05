import {memo,Fragment} from 'react'

// Components
import Logo from '../../components/logo'

//React-router-dom
import {Link} from 'react-router-dom'

const Sidebarlogo = memo((props) => {

    const minisidebar =() =>{
        document.getElementsByTagName('ASIDE')[0].classList.toggle('sidebar-mini')
    }
    

    return (
        <Fragment>
            <div className="sidebar-header d-flex align-items-center justify-content-start">
                <Link to="/dashboard" className="navbar-brand">
                    <Logo />
                    <h4 className="logo-title">{props.app_name}</h4>
                </Link>
                <div className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
                    <i className="icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </i>
                </div>
            </div>
        </Fragment>
    )
})

Sidebarlogo.displayName="Sidebarlogo"
export default Sidebarlogo
