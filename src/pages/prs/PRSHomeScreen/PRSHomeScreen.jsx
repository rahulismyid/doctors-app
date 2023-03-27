import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import "./prs-homescreen-styles.css";

const PRSHomeScreen = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate('/app/add-patient', {replace: true});
    };

    return (
        <div className="container">
            <main className="signup-container">
                <div className='home-screen-banner-text'>
                    <h1 className="heading-primary">Doctors stuff!<span className="span-blue">.</span></h1>
                    <section className="content">
                        <Button navigatingRoute={'/app/add-patient'} callbackFn={handleOnClick} classNames={'homescreen-btn'} btnText={'Add New Patient'}/>
                        <Button navigatingRoute={'/app/list-patient'} callbackFn={navigate} classNames={'homescreen-btn'} btnText={'View Patient List'}/>
                        <Button navigatingRoute={'/app/medical-examination'} callbackFn={navigate} classNames={'homescreen-btn'} btnText={'Mecidal Form'}/>
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
