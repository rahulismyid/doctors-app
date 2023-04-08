import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDB } from '../../../contexts/DbContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { LIST_PATIENT_ROUTE, MEDICAL_FINDINGS_ROUTE, ROOT_ROUTE } from '../../../routes/constants';
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
    const { id } = useParams();
    const {
        createPatientPersonalDetails,
        fetchPatientPersonalDetails,
        updatePatientPersonalDetails,
    } = useDB();
    const defaultValue = new Date().toLocaleString('default', {day: "2-digit", month: "long", year: "numeric"});

    const {setFirstStepData, setModalData } = useContext(GlobalContext);

    useEffect(() => {
        if(id) {
            fetchPatientById(id);
        } else {
            setValues(initialValues);
        }
    }, []);

    useEffect(() => {
        setShowError(false);
    },[values]);

    const fetchPatientById = async (id) => {
        const data = await fetchPatientPersonalDetails(id);
        setValues(data[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!values.name || !values.age || !values.gender || !values.mobile) {
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
        if(!values.name || !values.age || !values.gender || !values.mobile) {
            setShowError(true);
        } else {
            setShowError(false);
            setModalData({
                open: true,
                title: 'Save details.',
                msg: 'Are you sure to you want to save and go to next step?',
                callback: () => savePatientDetails(true)
            });
        }
    };

    const savePatientDetails = (goToNextStep = false) => {
        if(values.pid) {
            createPatientPersonalDetails(values).then((id) => {
                alert('Saved');
                setFirstStepData(values);
                if(goToNextStep) {
                    navigate(MEDICAL_FINDINGS_ROUTE.replace(":pid?", values.pid).replace(":id?", id), {replace: true});
                } else {
                    navigate(LIST_PATIENT_ROUTE, {replace: true});
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

    const handleUpdate = (e) => {
        e.preventDefault();
        if(!values.name || !values.age || !values.gender || !values.mobile) {
            setShowError(true);
        } else {
            setShowError(false);
            setModalData({
                open: true,
                title: 'Confirm',
                msg: 'Are you sure you want to upddate this patient details?',
                callback: () => updatePatientDetails(id),
            });
        }
    };

    const updatePatientDetails = (id) => {
        if(id) {
            updatePatientPersonalDetails(values, id).then((res) => {
                alert('Saved');
                navigate(LIST_PATIENT_ROUTE, {replace: true});
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
                {
                    values && (
                        <form>
                            <h1><span className='new-patient-form-header-less-than' onClick={() => navigate(ROOT_ROUTE)}>&lt;</span>{!id ? "New" : "Update"} Patient Details</h1>
                            <div className="item">
                                <p>Patient's Details</p>
                                <div className="new-patient-input-fields-wrapper">
                                    <div className='input-wrapper'>
                                        <label htmlFor="name">Name</label>
                                        <input id='name' type="text" name="name" className='new-patient-input-fields' placeholder="Name" value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} />
                                    </div>
                                    <div className='input-wrapper'>
                                        <label htmlFor="code">Code</label>
                                        <input id='code' type="number" name="code" className='new-patient-input-fields' placeholder="Code" value={values.code} onChange={(e) => setValues({...values, code: e.target.value})} />
                                    </div>
                                    <div className='input-wrapper'>
                                        <label htmlFor="age">Age</label>
                                        <input id='age' type="number" name="age" className='new-patient-input-fields' placeholder="Age" value={values.age} onChange={(e) => setValues({...values, age: e.target.value})} />
                                    </div>
                                    <div className='input-wrapper'>
                                        <label htmlFor="doj">Date of Joining</label>
                                        <input
                                            id="doj"
                                            className='new-patient-input-fields date-field'
                                            type="date"
                                            name="doj"
                                            placeholder='Date of Joining'
                                            defaultValue={defaultValue}
                                            value={values.doj} onChange={(e) => setValues({...values, doj: e.target.value})}
                                        />
                                    </div>
                                    <div className='input-wrapper'>
                                        <label htmlFor="department">Department</label>
                                        <input id='department' type="text" name="department" className='new-patient-input-fields' placeholder="Department" value={values.department} onChange={(e) => setValues({...values, department: e.target.value})} />
                                    </div>
                                    <div className='input-wrapper'>
                                        <label htmlFor="son_of">Son of</label>
                                        <input id='son_of' type="text" name="son_of" className='new-patient-input-fields' placeholder="Son Of" value={values.son_of} onChange={(e) => setValues({...values, son_of: e.target.value})} />
                                    </div>
                                    <div className='input-wrapper'>
                                        <label htmlFor="mobile">Mobile</label>
                                        <input id='mobile' type="tel" name="mobile" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="10" className='new-patient-input-fields' placeholder="Mobile" value={values.mobile} onChange={(e) => setValues({...values, mobile: e.target.value})} />
                                    </div>
                                    <div className='input-wrapper'>
                                        <label htmlFor="gender">Gender</label>
                                        <select id='gender' className='new-patient-select-fields' value={values.gender} onChange={(e) => setValues({...values, gender: e.target.value})}>
                                            <option value="">Select</option>
                                            <option value="MALE">MALE</option>
                                            <option value="FEMALE">FEMALE</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <p>Address</p>
                            <div className="new-patient-input-fields-wrapper">
                                <div className='input-wrapper'>
                                    <label htmlFor="present_address">Present Address</label>
                                    <input id='present_address' type="text" name="present_address" className='new-patient-input-fields' placeholder="Present address" value={values.present_address} onChange={(e) => setValues({...values, present_address: e.target.value})}/>
                                </div>
                                <div className='input-wrapper'>
                                    <label htmlFor="emergency_contact_person">Emergency Contact Person</label>
                                    <input id='emergency_contact_person' type="text" name="emergency_contact_person" className='new-patient-input-fields' placeholder="Emergency Contact" value={values.emergency_contact_person} onChange={(e) => setValues({...values, emergency_contact_person: e.target.value})}/>
                                </div>
                                <div className='input-wrapper'>
                                    <label htmlFor="emergency_mobile">Emergency Mobile</label>
                                    <input id='emergency_mobile' type="tel" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="10" name="emergency_mobile" className='new-patient-input-fields' placeholder="Emergency Mobile" value={values.emergency_mobile} onChange={(e) => setValues({...values, emergency_mobile: e.target.value})}/>
                                </div>
                            </div>
                            {
                                showError
                                    ? <p className='new-patient-submit-error'>Error, please add
                                        {!values.name ? " name," : ""} {!values.age ? "age," : ""} {!values.gender ? "gender," : ""} {!values.mobile ? "mobile" : ""} field(s).</p>
                                    : null
                            }
                            {
                                !id ? (
                                    <div className="new-patient-btn-block">
                                        <button onClick={handleSubmit}>Add new patient</button>
                                        <button onClick={submitForNextStep}>Proceed to add more details</button>
                                    </div>
                                ) : (
                                    <div className="new-patient-btn-block">
                                        <button onClick={handleUpdate}>Update</button>
                                    </div>
                                )
                            }
                        </form>
                    )
                }
            </div>
        </>
    )
}

export default NewPatient
