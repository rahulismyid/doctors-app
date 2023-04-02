import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import logo from "../../pages/prs/PRSPrintDocument/target001_cropped.png";
import { GlobalContext } from '../../contexts/GlobalContext';
import "./styles.css"

const Navbar = () => {
	const { logout } = useAuth();
    const navigate = useNavigate();
    const { setModalData } = useContext(GlobalContext);

    const handleLogout = async () => {
        await logout();
        navigate('/login', {replace: true});
    };

    const handleModalClick = () => {
        setModalData({
            open: true,
            title: 'Logout',
            msg: 'Are you sure to you want to logout?',
            callback: handleLogout
        });
    };

    return (
        <>
            <nav id="navbar" className="">
                <div className="nav-wrapper">
                    <div className="logo">
                        <a onClick={() => navigate('/app/home', {replace: true})}><i className="fas fa-chess-knight"></i>
                            <img width={55} height={55} src={logo} alt="fireSpot"/>
                        </a>
                    </div>

                    <ul id="menu">
                        <ul id="menu">
                            <li><Link to="/"> Home</Link></li>
                            <li><a onClick={() => handleModalClick()}>Logout</a></li>
                        </ul>
                        {/* <a href="#myModal" className="trigger-btn" data-toggle="modal">Click to Open Confirm Modal</a> */}
                    </ul>
                </div>
            </nav>

            <div className="menuIcon">
                <span className="icon icon-bars"></span>
                <span className="icon icon-bars overlay"></span>
            </div>

            <div className="overlay-menu">
                <ul id="menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#logout">Logout</a></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar