import React from 'react';
import AddPatientForm from '../AddPatient/AddPatientForm';
import Prescription from '../Prescription/Prescription';
import PRSHomeScreen from "../PRSHomeScreen/PRSHomeScreen";

const PatientDashboard = () => {
    return (
        <>
            <PRSHomeScreen />
			{/* <div className="patient-info-wrapper">
				<AddPatientForm />
				<Prescription />
			</div> */}
        </>
    )
};

export default PatientDashboard
