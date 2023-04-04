import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext';
import "./medical-consent.styles.css";

// eslint-disable
const MedicalConsent = () => {
    const [values, setValues] = useState();
    const { isFirstStepComplete } = useContext(GlobalContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values)
        // const data = await createPatient({...values, fName: values.name});
        // navigate(PRS_ROOT_ROUTE);
    };

    function capitalizeFirstLetter(string) {
        const new_str = string.charAt(0).toUpperCase() + string.slice(1);
        if(new_str.includes("Remark") || new_str.includes("Yes")) {
            return new_str.split("_")[0];
        }
        return new_str;
    }

    const handleCheckbox = (obj, key) => {
        const newData = values.map(item => {
            item.options.map(o => {
                for (const k in o) {
                    if (Object.hasOwnProperty.call(o, k)) {
                        if(k === key) {
                            o[k] = !obj[key];
                        }
                    }
                }
                return o;
            });
            return item;
        });
        setValues([...newData]);
    };

    const renderInputFieldForRemark = (option) => {
        const REMARK = "remark";
        const key = Object.keys(option).find(i => i.includes(REMARK));
        if(option[key]) {
            return (
                // <input className='remark-input' placeholder="Remark" type="text" value={option[key] ? option[key] === true ? "" : option[key] : ""}/>
                <input className='remark-input' placeholder="Remark" type="text" />
            )
        }
        return null;
    };

    const renderQuestions = () => {
        return (
            <>
                {values && values.map((item, idx) => {
                    return (
                        <div key={idx} className='questions-wrapper'>
                            <span className='question'>
                                {idx+1}. {item.q}
                            </span>
                            <div className='options'>
                                <ul>
                                    {item.options.map((option, idx) => {
                                        return(
                                            <>
                                                <li key={idx}>
                                                    {renderOptions(option)}
                                                </li>
                                                {renderInputFieldForRemark(option)}
                                            </>
                                        )})
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    };

    const renderOptions = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        return (
            <>
                <input
                    key={key}
                    id={option.toString()}
                    type="checkbox"
                    name={key}
                    checked={option}
                    onChange={() => handleCheckbox(listOfObj, key)}
                    disabled={!isFirstStepComplete}
                />
                <span key={option.toString()}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</span>
            </>
        )
    });

    return (
        <>
            <div className="declaration-consent-container border">
                <form className="patient-form" onSubmit={handleSubmit}>
                    <div className="form-description">
                        <h2>Medical declaration consent</h2>
                    </div>
                    <div>
                        {renderQuestions()}
                    </div>
                </form>
            </div>
            <button onClick={handleSubmit} className="submit-btn position-prescription-btn" disabled={!isFirstStepComplete}>Submit</button>
        </>
    )
};

export default MedicalConsent;
