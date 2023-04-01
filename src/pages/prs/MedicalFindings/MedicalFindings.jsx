import React, { useEffect, useState } from 'react';
import RemarkInput from '../../../components/RemarkInput/RemarkInput';
import { checkIfObjectHasRemarksKey } from '../../../utils/utils';
import { MEDICAL_DECLARATION_CONSENT_FIELDS } from '../MedicalConsent/constants';
import { MAJOR_DISABILITY, MEDICAL_EXAMINATION_1, MEDICAL_EXAMINATION_2, MEDICAL_EXAMINATION_3, MEDICAL_EXAMINATION_4 } from '../MedicalExamination/constants';
import { INVESTIGATION_CHECKBOX_QUESTIONS_1, INVESTIGATION_VISUAL_DETAILS_1 } from '../MedicalExamination/test_investigation_constants';
import "./MedicalFindings.styles.css";

function capitalizeFirstLetter(string) {
    const new_str = string.charAt(0).toUpperCase() + string.slice(1);
    if(new_str.includes("Remark") || new_str.includes("Yes")) {
        return new_str.split("_")[0];
    }
    debugger
    return new_str;
}

const MedicalFindings = () => {

    const [medicalDeclarationSectionValues, setMedicalDeclarationSectionValues] = useState();
    const [section1Values, setSection1Values] = useState();
    const [section2Values, setSection2Values] = useState();
    const [section3Values, setSection3Values] = useState();
    const [section4Values, setSection4Values] = useState();
    const [section5Values, setSection5Values] = useState();

    useEffect(() => {
        setMedicalDeclarationSectionValues(MEDICAL_DECLARATION_CONSENT_FIELDS);
        setSection1Values(MEDICAL_EXAMINATION_1);
        setSection2Values(MEDICAL_EXAMINATION_2);
        setSection3Values(MEDICAL_EXAMINATION_3);
        setSection4Values(MEDICAL_EXAMINATION_4);
        setSection5Values(MAJOR_DISABILITY);
    }, []);

    /* MEDICAL_CONSENT */

    const renderConsentQuestions = () => {
        return (
            <>
                {medicalDeclarationSectionValues && medicalDeclarationSectionValues.map((item, idx) => {
                    return (
                        <div key={JSON.stringify(item.options)} className='questions-wrapper'>
                            <span  className='question'>
                                {idx+1}. {item.q}
                            </span>
                            <div key={idx} className='options'>
                                <ul key={idx}>
                                    {item.options.map((option, idx) => {
                                        return (
                                            <>
                                                <li key={idx}>
                                                    {renderMedicalConsentOptions(option)}
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

    const renderMedicalConsentOptions = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
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
                />
                <span key={option.toString()}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</span>
            </>
        )
    });

    const renderInputFieldForRemark = (option) => {
        const REMARK = "remark";
        const key = Object.keys(option).find(i => i.includes(REMARK));
        if(option[key]) {
            return (
                // <input className='remark-input' placeholder="Remark" type="text" value={option[key] ? option[key] === true ? "" : option[key] : ""}/>
                <input key={key} className='remark-input' placeholder="Remark" type="text" />
            )
        }
        return null;
    };

    const handleCheckbox = (obj, key) => {
        const newData = medicalDeclarationSectionValues.map(item => {
            item.options.map(o => {
                for (const k in o) {
                    if (Object.hasOwnProperty.call(o, k) && k === key) {
                        o[k] = !obj[key];
                    }
                }
                return o;
            });
            return item;
        });
        setMedicalDeclarationSectionValues([...newData]);
    };

    const medicalConsentSubmit = async (e) => {
        e.preventDefault();
        console.log(medicalDeclarationSectionValues)
        // const data = await createPatient({...values, fName: values.name});
        // navigate(PRS_ROOT_ROUTE);
    };

    /* MEDICAL_CONSENT */

    /* MEDICAL_EXAMINATION */

    const handleMedicalExam1Change = (obj, value) => {
        const newData = MEDICAL_EXAMINATION_1.map(item => {
            if(obj && item.key === obj.key) {
                item.value = value;
            }
            return item;
        });
        setSection1Values([...newData]);
    };

    const renderSection1 = () => {
        return (
            <div className="item">
                <p>Details</p>
                <div className="name-item">
                    {
                        section1Values.map(item => {
                            return <input
                                    className='medical-exam-input-fields'
                                    type="text"
                                    name={item.key}
                                    placeholder={item.label}
                                    onChange={(e) => handleMedicalExam1Change(item, e.target.value)}
                                />
                        })
                    }
                </div>
            </div>
        );
    };

    const handleMedicalExam2Change = (obj, value) => {
        const newData = section2Values.map(item => {
            if(obj && item.key === obj.key) {
                item.value = value;
            }
            return item;
        });
        setSection2Values([...newData]);
    };

    const handkeMedicalExam2Remark = (value) => {
        const newData = section2Values.map(i => {
            if(i.key == "remarks_2") {
                i.value = value;
            };
            return i;
        })
        setSection2Values([...newData]);
    };

    const renderSection2 = () => {
        return (
            <>
                <div className="item questions-wrapper">
                    <p>Details</p>
                    <div className='options'>
                        <ul>
                            {section2Values && section2Values.map((item, idx) => {
                                return (
                                    <>
                                    {!checkIfObjectHasRemarksKey(item) ?
                                        <>
                                            <li key={idx}>
                                                <input
                                                    key={item.key}
                                                    id={item.key}
                                                    type="checkbox"
                                                    name={item.key}
                                                    onChange={(e) => handleMedicalExam2Change(item, e.target.checked)}
                                                    checked={item.value}
                                                    defaultChecked={false}
                                                    readOnly
                                                />
                                                <span key={item.label}>
                                                    {capitalizeFirstLetter(item.key).replace(/_/g, " ")}
                                                </span>
                                            </li>
                                        </> : <li>
                                            <input onChange={(e) => handkeMedicalExam2Remark(e.target.value)} className='medical-exam-input-fields remark-input' placeholder="Remark" type="text" />
                                        </li>}
                                    </>
                                )
                            })}
                        </ul>
                    </div>
                    {JSON.stringify(section2Values)}
                </div>
            </>
        );
    };

    const handleSection3Input = (obj, value) => {
        const newData = section3Values.map(item => {
            if(obj && item.key === obj.key) {
                item.value = value;
            }
            return item;
        });
        setSection3Values([...newData]);
    };

    const renderSection3 = () => {
        return (
            <div className="item">
                <p>Details</p>
                <div className="name-item">
                    {
                        section3Values && section3Values.map(item => {
                            return (
                                <input className='medical-exam-input-fields' onChange={(e) => handleSection3Input(item, e.target.value)} type="text" name={item.key} placeholder={item.label} />
                            )
                        })
                    }
                </div>
            </div>
        );
    };

    const handleSection4Remark = (value) => {
        const newData = section4Values.map(i => {
            i.remarks_4 = value;
            return i;
        });
        setSection4Values([...newData]);
    };

    const renderSection4 = () => {
        return (
            <>
                <div className='questions-wrapper'>
                    <span className='question'>
                        Contagious skin disease?
                    </span>
                    <div className='options'>
                        {section4Values && section4Values.map((item, idx) => {
                            return (
                                <ul>
                                    {item.options.map((item, idx) => {
                                        return (
                                            <>
                                                <li key={idx}>
                                                    {renderSection4Options(item)}
                                                </li>
                                            </>
                                        )})
                                    }
                                </ul>
                            )
                        })}
                        <input
                            type="text"
                            className="medical-exam-input-fields remark-input"
                            onChange={(e) => handleSection4Remark(e.target.value)}
                            placeholder="Remark"
                        />
                    </div>
                </div>
            </>
        );
    };

    const handleSection4Change = (obj, key, value) => {
        const newOptionsData = section4Values.map(i => {
            i.options.find(i => {
                if(i[key] === obj[key]) {
                    i[key] = value;
                }
                return i;
            })
            return i;
        });
        setSection4Values([...newOptionsData]);
    };

    const renderSection4Options = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        return (
            <>
                <input
                    key={key}
                    id={option.toString()}
                    type="checkbox"
                    name={key}
                    checked={option}
                    onChange={(e) => handleSection4Change(listOfObj, key, e.target.checked)}
                    readOnly
                />
                <span key={option.toString()}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</span>
            </>
        )
    });

    const handleSection5Input = (idx, key, value) => {
        
    };

    const renderSection5Questions = () => {
        let q1 = {}, q2 = {};
        if(section5Values && section5Values.length) {
            q1 = section5Values[0];
            q2 = section5Values[1];
        }

        return (
            <>
                <div className='questions-wrapper'>
                    <span className='question'>
                        {q1.q}
                    </span>
                    <div className='options'>
                        <ul>
                            <li>Have Details? <input type="checkbox" name="yes" id="yes" value={q1.yes} /></li>
                            <li>
                                <input
                                    id="details"
                                    type="text"
                                    className='medical-exam-input-fields'
                                    placeholder='Details'
                                    value={q1.details}
                                    onChange={(e) => handleSection5Input('0', 'details', e.target.value)}
                                />
                            </li>
                            <li><input className='medical-exam-input-fields' placeholder='Remark' type="text" value={q1.remark}/></li>
                        </ul>
                        {JSON.stringify(section5Values)}
                    </div>
                    <div className='questions-wrapper'>
                        <div className='options'>
                            <ul>
                                <li>
                                    <span className='question'>
                                        {q2.q}
                                    </span>
                                    <input
                                        type="checkbox"
                                        name="eye_test_done"
                                        id="eye_test_done"
                                        value={q1.eye_test_done}
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const renderSection5Options_1 = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        debugger
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

    const renderSection5Options = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        return (
            <>
                <input
                    key={key}
                    id={key}
                    type="checkbox"
                    name={key}
                    checked={option}
                    // onChange={() => handleCheckbox(listOfObj, key)}
                    // disabled={!isFirstStepComplete}
                />
                <span key={key}>
                    {key}
                    {/* {capitalizeFirstLetter(key).replace(/_/g, " ")} */}
                </span>
            </>
        )
    });

    /* MEDICAL_EXAMINATION */

    /* TEST_INVESTIGATION */
    const renderTestInvestigationVisualQuestions1 = () => {
        return (
            <>
                <table className='findings-visual-details-table'>
                    <thead>
                        <tr>
                            <th colSpan={1}>Color Vision</th>
                            <th colSpan={2}>Vision With Glasses</th>
                            <th colSpan={2}>Vision Without Glasses</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td>Right Eye</td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Left Eye</td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    };

    const renderTestInvestigationVisualQuestions2 = () => {
        return (
            <>
                <table className='findings-visual-details-table'>
                    <thead>
                        <tr>
                            <th colSpan={1}></th>
                            <th colSpan={4}>Right Eye</th>
                            <th colSpan={4}>Left Eye</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>AXIS</th>
                            <th>VN</th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>AXIS</th>
                            <th>VN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Dist.&gt;&gt;</td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                        </tr>
                        <tr>
                            <td>Near.&gt;&gt;</td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                            <td><input className='findings-table-input' type="text" /></td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    };

    const renderTestInvestigationQuestions3 = () => {
        return (
            <>
                <div className="item questions-wrapper">
                    <p>Details</p>
                    <div className='options'>
                        <ul>
                            <li>
                                <label>ECG Findings</label>
                                <input type="text" name="" id="" />
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    checked={false}
                                />
                            </li>
                            <li>
                                <label>Lab Test Report No.</label>
                                <input type="text" name="" id="" />
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    checked={false}
                                />
                            </li>
                            <li>
                                <label>Audiometry</label>
                                <input type="text" name="" id="" />
                                <input type="text" name="" id="" placeholder='Remark' />
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    checked={false}
                                />
                            </li>
                            <li>
                                <label>Abnormal Reports if any</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                            <li>
                                <label>Deworming (with Albendazole 400mg):</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                            <li>
                                <label>Covid Vaccination</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                            <li>
                                <label>Further Evaluation (if any)</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                            <li>
                                <label>Treatment advised (if any)</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                            <li>
                                <label>Restriction Advised (if any)</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                            <li>
                                <label>Follow-up advised (If any)</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                            <li>
                                <label>Remark</label>
                                <input type="text" name="" id="" placeholder='Remark' />
                            </li>
                        </ul>
                        <div>
                            <label htmlFor="">Opinion Checked: </label>
                            <ul>
                                <li>Fit<input type="checkbox" name="" id="" /></li>
                                <li>Fit With Restrictions<input type="checkbox" name="" id="" /></li>
                                <li>Temporary Unfit<input type="checkbox" name="" id="" /></li>
                                <li>Unfit<input type="checkbox" name="" id="" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    /* TEST_INVESTIGATION */

    return (
        <>
            <div className="declaration-consent-container border">
                <div className="form-description">
                    <h2>Medical declaration consent</h2>
                </div>
                    {/* {medicalDeclarationSectionValues && renderConsentQuestions()} */}
                    {/* {section1Values && renderSection1()} */}
                    {/* {renderSection2()} */}
                    {/* {renderSection3()} */}
                    {/* {renderSection4()} */}
                    {renderSection5Questions()}
                    {/* {renderTestInvestigationVisualQuestions1()}
                    {renderTestInvestigationVisualQuestions2()}
                    {renderTestInvestigationQuestions3()} */}
                {/* <form className="patient-form">
                </form> */}
            </div>
            <button onClick={medicalConsentSubmit} className="submit-btn position-prescription-btn" >Submit</button>
        </>
    )
}

export default MedicalFindings;
