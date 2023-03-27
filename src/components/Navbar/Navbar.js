import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { HOME_ROUTE, PRS_ROOT_ROUTE, ROOT_ROUTE } from '../../routes/constants';
import Modal from '../Modal/Modal'
import logo from "../../pages/prs/PRSPrintDocument/target001_cropped.png";
import "./styles.css"

const Navbar = () => {
    const [openModal, setOpenModal] = useState(false);
	const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login', {replace: true});
    }

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
                            <li><Link to="/services"> Services</Link></li>
                            <li><Link to="/about"> About</Link></li>
                            <li><a onClick={() => setOpenModal(true)}>Logout</a></li>
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
            {openModal && <Modal open={openModal} setOpen={setOpenModal} title="Logout" msg="Are you sure to logout?" callback={handleLogout}/>}

        </>
    )
}

export default Navbar