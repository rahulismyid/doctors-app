import React, { useEffect } from 'react';
import RemarkInput from '../../../components/RemarkInput/RemarkInput';
import { checkIfObjectHasRemarksKey } from '../../../utils/utils';
import { MAJOR_DISABILITY, MEDICAL_EXAMINATION_1, MEDICAL_EXAMINATION_2, MEDICAL_EXAMINATION_3, MEDICAL_EXAMINATION_4 } from './constants';
import "./medical-examination.styles.css";


const MedicalExamination = () => {
    useEffect(() => {
        // console.log(MEDICAL_EXAMINATION_1)
    }, []);

    const renderSections1 = () => {
        return (
            <div className="item">
                <p>Details</p>
                <div className="name-item">
                    {
                        MEDICAL_EXAMINATION_1.map(item => {
                            {
                                return <input className='medical-exam-input-fields' type="text" name={item.key} placeholder={item.label} />
                            }
                        })
                    }
                </div>
            </div>
        );
    };

    const renderSections2 = () => {
        return (
            <>
                <p>Details</p>
                <div className="questions-wrapper">
                    <div className='options'>
                        <ul>
                            {MEDICAL_EXAMINATION_2.map((item, idx) => {
                                return (
                                    <>
                                    {!checkIfObjectHasRemarksKey(item) ?
                                        <>
                                            <li key={idx}>
                                                <input
                                                    key={item.key}
                                                    id={item.value.toString()}
                                                    type="checkbox"
                                                    name={item.key}
                                                    checked={item.value}
                                                />
                                                <span key={item.label.toString()}>
                                                    {capitalizeFirstLetter(item.key).replace(/_/g, " ")}
                                                </span>
                                            </li>
                                        </> : <li>
                                            <RemarkInput option={item} />
                                        </li>}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    };

    const renderSections3 = () => {
        return (
            <div className="item">
                <p>Details</p>
                <div className="name-item">
                    {
                        MEDICAL_EXAMINATION_3.map(item => {
                            return (
                                <input className='medical-exam-input-fields' type="text" name={item.key} placeholder={item.label} />
                            )
                        })
                    }
                </div>
            </div>
        );
    };

    const renderQuestions = () => {
        return (
            <>
                <div className='questions-wrapper'>
                    <span className='question'>
                    </span>
                    <div className='options'>
                        {MEDICAL_EXAMINATION_4.map((item, idx) => {
                            return (
                                <ul>
                                    {item.options.map((item, idx) => {
                                        return (
                                            <>
                                                <li key={idx}>
                                                    {renderOptions(item)}
                                                </li>
                                            </>
                                        )})
                                    }
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </>
        );
    };

    const renderOptions = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        const remarkKey = key.toString().includes("remark");
        return (
            <>
                {
                    !remarkKey ?
                    (
                        <>
                            <input
                                key={key}
                                id={option.toString()}
                                type="checkbox"
                                name={key}
                                checked={option}
                                // onChange={() => handleCheckbox(listOfObj, key)}
                                // disabled={!isFirstStepComplete}
                            />
                            <span key={option.toString()}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</span>
                        </>
                    )
                    : <input className='medical-exam-input-fields remark-input' placeholder="Remark" type="text" />
                }
            </>
        )
    });

    function capitalizeFirstLetter(string) {
        if(string) {
            const new_str = string.charAt(0).toUpperCase() + string.slice(1);
            if(new_str.includes("Remark") || new_str.includes("Yes")) {
                return new_str.split("_")[0];
            }
            return new_str;
        }
        return string;
    }

    const renderContagiousDieaseQuestions = () => {
        return (
            <>
                {MAJOR_DISABILITY.map((item, idx) => {
                    return (
                        <div key={idx} className='questions-wrapper'>
                            <span className='question'>
                                {idx+1}. {item.q}
                            </span>
                            <div className='options'>
                                <ul>
                                {!checkIfObjectHasRemarksKey(item) ?
                                    <>
                                        <li key={idx}>
                                            {renderContagiousDieaseOptions(item)}
                                        </li>
                                    </> : <li>
                                        <RemarkInput option={item} />
                                    </li>
                                }
                                    {/* {item.options.map((option, idx) => {
                                        return(
                                            <>
                                                <li key={idx}>
                                                    {renderContagiousDieaseOptions(option)}
                                                </li>
                                            </>
                                        )})
                                    } */}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </>
        );
    };

    const renderContagiousDieaseOptions = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        return (
            <>
                <input
                    key={key}
                    id={option.toString()}
                    type="checkbox"
                    name={key}
                    checked={option}
                    // onChange={() => handleCheckbox(listOfObj, key)}
                    // disabled={!isFirstStepComplete}
                />
                <span key={option.toString()}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</span>
            </>
        )
    });

    return (
        <div className="testbox">
            <form action="/">
                <h1>Medical Examination</h1>
                <div className="item">
                    {/* <p>Complainant's Name</p> */}
                    {renderSections1()}
                </div>
                    {renderSections2()}
                    {renderSections3()}
                <div className="item">
                    <p>Contagiou Disease</p>
                    {renderQuestions()}
                </div>
                <div className="item">
                    <p>Major Disability</p>
                    {renderContagiousDieaseQuestions()}
                </div>

                {/* <div className="item">
                    <p>Email</p>
                    <input className='medical-exam-input-fields' type="text" name="name"/>
                </div>
                <div className="item">
                    <p>Telephone number where you can be reached</p>
                    <input className='medical-exam-input-fields' type="text" name="name"/>
                </div>
                <div className="item">
                    <p>Incident Date</p>
                    <input className='medical-exam-input-fields' type="date" name="name" required/>
                    <i className="fas fa-calendar-alt"></i>
                </div>
                <div className="item">
                    <p>Incident Time</p>
                    <input className='medical-exam-input-fields' type="time" name="name" required/>
                    <i className="fas fa-clock"></i>
                </div>
                <div className="item">
                    <p>What best describes the type of problem encountered</p>
                    <select>
                        <option value="">Please select</option>
                        <option value="1">Dispensing Error</option>
                        <option value="2">Illegal Dispensing</option>
                        <option value="3">Fraud</option>
                        <option value="4">Impairment/Diversion</option>
                        <option value="5">Unethical Conduct</option>
                        <option value="6">Regards Prescriber</option>
                        <option value="6">Other</option>
                    </select>
                </div>
                <div className="item">
                    <p>Pharmacy Personnel Involved</p>
                    <input className='medical-exam-input-fields' type="text" name="name"/>
                </div>
                <div className="item">
                    <p>Pharmacy Involved</p>
                    <input className='medical-exam-input-fields' type="text" name="name"/>
                </div>
                <div className="item">
                    <p>Complaint filed on behalf of</p>
                    <input className='medical-exam-input-fields' type="text" name="name"/>
                </div>
                <div className="item">
                    <p>What happened? Be as specific as possible, including dates, names, etc.</p>
                    <textarea rows="5"></textarea>
                </div>
                <div className="btn-block">
                    <button type="submit" href="/">Next</button>
                </div> */}
            </form>
        </div>
    )
};

export default MedicalExamination;
