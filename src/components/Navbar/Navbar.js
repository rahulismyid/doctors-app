import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from "../../components/images/target001_cropped.png";
import { GlobalContext } from '../../contexts/GlobalContext';
import { ADD_PATIENT_ROUTE, HOME_ROUTE, LIST_PATIENT_ROUTE, LOGIN_ROUTE, ROOT_ROUTE } from '../../routes/constants';
import "./styles.css"

const Navbar = () => {
	const { logout } = useAuth();
    const navigate = useNavigate();
    const [openNavBar, setOpenNavBar] = useState(false);
    const { setModalData } = useContext(GlobalContext);

    const handleLogout = async () => {
        await logout();
        navigate(LOGIN_ROUTE, {replace: true});
    };

    const handleModalClick = () => {
        setOpenNavBar(false);
        setModalData({
            open: true,
            title: 'Logout',
            msg: 'Are you sure to you want to logout?',
            callback: handleLogout
        });
    };

    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <a className='brand' onClick={() => navigate(HOME_ROUTE, {replace: true})}>
                        <i className="fas fa-chess-knight"></i>
                        <img width={55} height={55} src={logo} alt="fireSpot"/>
                    </a>
                    <input type="checkbox" id="nav" checked={openNavBar} className="hidden" readOnly />
                    <label htmlFor="nav" className="nav-toggle" onClick={() => setOpenNavBar(!openNavBar)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                    <div className="wrapper">
                        <ul className="menu">
                            <li className="menu-item"><Link to={ROOT_ROUTE} onClick={() => setOpenNavBar(false)}> Home</Link></li>
                            <li className="menu-item hide-wide"><Link to={ADD_PATIENT_ROUTE} onClick={() => setOpenNavBar(false)}> Add New Patient</Link></li>
                            <li className="menu-item hide-wide"><Link to={LIST_PATIENT_ROUTE} onClick={() => setOpenNavBar(false)}> View Patient List</Link></li>
                            <li className="menu-item"><Link onClick={() => handleModalClick()}>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
            {/* <footer>
                © Copyright {new Date().getFullYear()}. All rights reserved <span><a href='https://www.linkedin.com/in/rahul-ajarekar/'>Rahul</a></span>
            </footer> */}
        </>
    )
}

export default Navbar