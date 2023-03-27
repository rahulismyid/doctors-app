import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { LIST_PATIENTS_ROUTE } from '../../../routes/constants';
import PRSInputField from "../PRSInputField/PRSInputField";
import "./add-patient-styles.css";

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

const AddPatientForm = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState();
    const { setFirstStepData, setIsFirstStepComplete} = useContext(GlobalContext)

    useEffect(() => {
        setValues(initialValues);
    }, []);

    const handleSubmit = async (e) => {
        console.log(values)
        setFirstStepData(values);
        setIsFirstStepComplete(true);
        navigate('/app/list-patient', {replace: true});
        // await createPatient({...values, fName: values.name});
    };

    const handleOnClick = () => {
        navigate('/app/list-patient', {replace: true});
    };

    return (
        <div className="multi-field-form-modal border">
            <form className="patient-form" onSubmit={handleSubmit}>
                <div className="form-description">
                    <h2>Add new patient info</h2>
                    <Button navigatingRoute={LIST_PATIENTS_ROUTE} callbackFn={handleOnClick} classNames={'homescreen-btn'} btnText={'View patient list'}/>
                </div>
                {
                    values ?
                    (
                        <>
                            <PRSInputField labelName="Name" value={values.name} onChange={(e) => setValues({...values, name: e.target.value})}/>
                            <PRSInputField labelName="Code" value={values.code} onChange={(e) => setValues({...values, code: e.target.value})}/>
                            <PRSInputField labelName="Age" value={values.age} onChange={(e) => setValues({...values, age: e.target.value})}/>
                            <PRSInputField labelName="Gender" value={values.gender} onChange={(e) => setValues({...values, gender: e.target.value})}/>
                            <PRSInputField labelName="DoJ" value={values.doj} onChange={(e) => setValues({...values, doj: e.target.value})}/>
                            <PRSInputField labelName="Department" value={values.department} onChange={(e) => setValues({...values, department: e.target.value})}/>
                            <PRSInputField labelName="Son Of" value={values.son_of} onChange={(e) => setValues({...values, son_of: e.target.value})}/>
                            <PRSInputField labelName="Mobile" value={values.mobile} onChange={(e) => setValues({...values, mobile: e.target.value})}/>
                            <PRSInputField labelName="Present Address" value={values.present_address} onChange={(e) => setValues({...values, present_address: e.target.value})}/>
                            <PRSInputField labelName="Emergency Contact Person" value={values.emergency_contact_person} onChange={(e) => setValues({...values, emergency_contact_person: e.target.value})}/>
                            <PRSInputField labelName="Emergency Mobile" value={values.emergency_mobile} onChange={(e) => setValues({...values, emergency_mobile: e.target.value})}/>
                        </>
                    )
                    : null
                }
                {/* <div className="error-warning">The form did not submit because there were 2 errors.</div> */}
            </form>
                <button onClick={() => handleSubmit()} className="submit-btn position-add-patient-btn">Next</button>
            <div>
            </div>
        </div>
    )
}

export default AddPatientForm