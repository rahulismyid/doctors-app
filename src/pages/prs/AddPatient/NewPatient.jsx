import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDB } from '../../../contexts/DbContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { checkIfObjectHasEmptyProperty } from '../../../utils/utils';
import "./new-patient.styles.css";

const generatePid = () => {
    const timestamp = Date.now().toString();
    return timestamp.slice(4,9);
};

const initialValues = {
    pid: generatePid(),
    name: "",
    code: "",
    age: "",
    gender: "",
    doj: "",
    department: "",
    son_of: "",
    mobile: "",
    present_address: "",
    emergency_contact_person: "",
    emergency_mobile: "",
};

const NewPatient = () => {
    const [values, setValues] = useState();
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const { createPatientPersonalDetails } = useDB();
    const ref = useRef();
    const {setFirstStepData, setModalData } = useContext(GlobalContext);

    useEffect(() => {
        setValues(initialValues);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(checkIfObjectHasEmptyProperty(values)) {
            setShowError(true);
        } else {
            setShowError(false);
            setModalData({
                open: true,
                title: 'Confirm',
                msg: 'Are you sure you want to save this patient details?',
                callback: savePatientDetails,
            });
        }
    };

    const submitForNextStep = (e) => {
        e.preventDefault();
        setModalData({
            open: true,
            title: 'Save details.',
            msg: 'Are you sure to you want to save and go to next step?',
            callback: () => savePatientDetails(true)
        });
    };

    const savePatientDetails = (goToNextStep = false) => {
        if(values.pid) {
            createPatientPersonalDetails(values).then((res) => {
                alert('Saved');
                setFirstStepData(values);
                if(goToNextStep) {
                    navigate('/app/medical-findings', {replace: true});
                } else {
                    navigate('/app/list-patient', {replace: true});
                }
            });
        } else {
            setModalData({
                open: true,
                title: 'Error.',
                msg: 'Error occurred. Please try saving again.',
                callback: () => savePatientDetails(true)
            });
        }
    };

    return (
        <>
            <div className="new-patient-form-container">
                <form action="/">
                    <h1><span className='new-patient-form-header-less-than' onClick={() => navigate("/")}>&lt;</span>New Patient Details</h1>
                    <div className="item">
                        <p>Patient's Details</p>
                        <div className="new-patient-input-fields-wrapper">
                            <input className='new-patient-input-fields' type="text" name="name" placeholder="Name" onChange={(e) => setValues({...values, name: e.target.value})} />
                            <input className='new-patient-input-fields' type="text" name="code" placeholder="Code" onChange={(e) => setValues({...values, code: e.target.value})} />
                            <input className='new-patient-input-fields' type="number" name="age" placeholder="Age" onChange={(e) => setValues({...values, age: e.target.value})} />
                            <input
                                className='new-patient-input-fields date-field'
                                ref={ref}
                                type="date"
                                name="doj"
                                placeholder='Date of Joining'
                                id="doj"
                                onChange={(e) => setValues({...values, doj: e.target.value})}
                            />
                            <input className='new-patient-input-fields' type="text" name="department" placeholder="Department" onChange={(e) => setValues({...values, department: e.target.value})} />
                            <input className='new-patient-input-fields' type="text" name="son_of" placeholder="Son Of" onChange={(e) => setValues({...values, son_of: e.target.value})} />
                            <input className='new-patient-input-fields' type="text" name="mobile" placeholder="Mobile" onChange={(e) => setValues({...values, mobile: e.target.value})} />
                            <select className='new-patient-select-fields' onChange={(e) => setValues({...values, gender: e.target.value})}>
                                <option value="">Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <p>Address</p>
                    <div className="new-patient-input-fields-wrapper">
                        <input className='new-patient-input-fields' type="text" name="present_address" placeholder="Present address" onChange={(e) => setValues({...values, present_address: e.target.value})}/>
                        <input className='new-patient-input-fields' type="text" name="emergency_contact_person" placeholder="Emergency Contact" onChange={(e) => setValues({...values, emergency_contact_person: e.target.value})}/>
                        <input className='new-patient-input-fields' type="text" name="emergency_mobile" placeholder="Emergency Mobile" onChange={(e) => setValues({...values, emergency_mobile: e.target.value})}/>
                    </div>
                    {
                        showError
                            ? <p className='new-patient-submit-error'>Error occurred, please fill the form.</p>
                            : null
                    }
                    <div className="new-patient-btn-block">
                        <button onClick={handleSubmit}>Add new patient</button>
                        <button onClick={submitForNextStep}>Proceed to add more details</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewPatient
