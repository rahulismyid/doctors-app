import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal/Modal';
import { useDB } from '../../../contexts/DbContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import "./new-patient.styles.css";

const initialValues = {
    name: "",
    code: "",
    age: "",
    gender: "",
    doj: Date.now("en-GB", "toLocaleString"),
    department: "",
    son_of: "",
    mobile: "",
    present_address: "",
    emergency_contact_person: "",
    emergency_mobile: "",
};

const NewPatient = () => {
    const [values, setValues] = useState();
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { createPatient } = useDB();
    const ref = useRef();
    const {setFirstStepData } = useContext(GlobalContext);

    useEffect(() => {
        setValues(initialValues);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const savePatientDetails = async () => {
        console.log(values);
        setFirstStepData(values);
        await createPatient(values);
        alert('Saved');
        navigate('/app', {replace: true});
    };

    const _onFocus = (e) => {
        e.currentTarget.type = "date";
    };

    const _onBlur = (e) => {
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Date of Joining";
    };

    return (
        <>
        {
            showModal ? <Modal open={showModal} setOpen={setShowModal} title={'Confirm'} msg={'Are you sure you want to save this patient details?'} callback={savePatientDetails} /> : null
        }
            <div className="new-patient-form-container">
                <form action="/">
                    <h1>New Patient Details</h1>
                    <div className="item">
                        <p>Patient's Details</p>
                        <div className="new-patient-input-fields-wrapper">
                            <input className='new-patient-input-fields' type="text" name="name" placeholder="Name" onChange={(e) => setValues({...values, name: e.target.value})} />
                            <input className='new-patient-input-fields' type="text" name="code" placeholder="Code" onChange={(e) => setValues({...values, code: e.target.value})} />
                            <input className='new-patient-input-fields' type="text" name="age" placeholder="Age" onChange={(e) => setValues({...values, age: e.target.value})} />
                            <input
                                className='new-patient-input-fields date-field'
                                ref={ref}
                                type="date"
                                name="doj"
                                placeholder='Date of Joining'
                                id="doj"
                                // onFocus={_onFocus}
                                // onBlur={_onBlur}
                                // onFocus={() => (ref.current.type = "date")}
                                // onBlur={() => (ref.current.type = "date")}
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
                    <div className="new-patient-btn-block">
                        <button onClick={handleSubmit} href="/">Add patient</button>
                        <button onClick={handleSubmit} href="/">Proceed to add more details</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewPatient
