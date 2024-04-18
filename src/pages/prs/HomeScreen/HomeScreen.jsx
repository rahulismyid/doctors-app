import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_PATIENT_ROUTE, LIST_PATIENT_ROUTE } from '../../../routes/constants';
import banner_img from '../../../components/images/home-screen-2.png';
// import "./homescreen-styles.css";
import "./homescreen.styles.css";

const PRSHomeScreen = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(ADD_PATIENT_ROUTE, {replace: true});
    };

    return (
        <section className="home-screen-container">
            <div className='image-content-container'>
                <div className='image-container'>
                    <img src={banner_img} alt='banner-image' />
                </div>
                <div className='brand-name'>
                    <h1>Aaradhya Polyclinic and Diagnostic</h1>
                </div>
            </div>

            <div className='home-screen-button-container'>
                <button onClick={() => navigate(ADD_PATIENT_ROUTE)}>
                    Add New Patient
                </button>
                <button onClick={() => navigate(LIST_PATIENT_ROUTE)} >
                    View Patient List
                </button>
            </div>
        </section>
        // <div className="container">
        //     <main className="home-screen-container">
        //         <div className='home-screen-banner-text'>
        //         <h1 className="heading-primary wecome-text"><div>Welcome to</div><span className="lg">Aaradhya Polyclinic and Diagnostic Center<span className="span-blue">.</span></span></h1>
        //             <h1 className="heading-primary doctors-stuff">Doctors stuff!<span className="span-blue">.</span></h1>
        //             <section className="content">
        //                 <ul className='home-screen-grid-wrapper'>
        //                     <li>
        //                         <Button navigatingRoute={ADD_PATIENT_ROUTE} callbackFn={handleOnClick} classNames={'homescreen-btn'} btnText={'Add New Patient'}/>
        //                     </li>
        //                     <li>
        //                         <Button navigatingRoute={LIST_PATIENT_ROUTE} callbackFn={navigate} classNames={'homescreen-btn'} btnText={'View Patient List'}/>
        //                     </li>
        //                 </ul>
        //             </section>
        //         </div>
        //     </main>
        //     <div className="welcome-container">
        //         <h1 className="heading-secondary"><div>Welcome to</div><span className="lg">Aaradhya Polyclinic and Diagnostic Center<span className="span-blue">.</span></span></h1>
        //     </div>
        // </div>
    );
}

export default PRSHomeScreen;
