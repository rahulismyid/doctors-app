import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { ADD_PATIENT_ROUTE, LIST_PATIENT_ROUTE } from '../../../routes/constants';
import "./homescreen-styles.css";

const PRSHomeScreen = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(ADD_PATIENT_ROUTE, {replace: true});
    };

    return (
        <div className="container">
            <main className="home-screen-container">
                <div className='home-screen-banner-text'>
                <h1 className="heading-primary wecome-text"><div>Welcome to</div><span className="lg">Aaradhya Polyclinic and Diagnostic Center<span className="span-blue">.</span></span></h1>
                    <h1 className="heading-primary doctors-stuff">Doctors stuff!<span className="span-blue">.</span></h1>
                    <section className="content">
                        <ul className='home-screen-grid-wrapper'>
                            <li>
                                <Button navigatingRoute={ADD_PATIENT_ROUTE} callbackFn={handleOnClick} classNames={'homescreen-btn'} btnText={'Add New Patient'}/>
                            </li>
                            <li>
                                <Button navigatingRoute={LIST_PATIENT_ROUTE} callbackFn={navigate} classNames={'homescreen-btn'} btnText={'View Patient List'}/>
                            </li>
                            {/* <li>
                                <Button navigatingRoute={'/app/medical-findings'} callbackFn={navigate} classNames={'homescreen-btn'} btnText={'Mecidal Form'}/>
                            </li>
                            <li>
                                <Button navigatingRoute={'/app/print'} callbackFn={navigate} classNames={'homescreen-btn'} btnText={'Print Form'}/>
                            </li> */}
                        </ul>
                    </section>
                </div>
            </main>
            <div className="welcome-container">
                <h1 className="heading-secondary"><div>Welcome to</div><span className="lg">Aaradhya Polyclinic and Diagnostic Center<span className="span-blue">.</span></span></h1>
            </div>
        </div>
    );
}

export default PRSHomeScreen;
