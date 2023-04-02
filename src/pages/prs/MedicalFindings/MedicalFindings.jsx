import React, { useEffect, useState } from 'react';
import { checkIfObjectHasRemarksKey } from '../../../utils/utils';
import { MEDICAL_DECLARATION_CONSENT_FIELDS } from '../MedicalConsent/constants';
import { MAJOR_DISABILITY, MEDICAL_EXAMINATION_1, MEDICAL_EXAMINATION_2, MEDICAL_EXAMINATION_3, MEDICAL_EXAMINATION_4, VISUAL_ACTIVITY } from '../MedicalExamination/constants';
import { INVESTIGATION_CHECKBOX_QUESTIONS, INVESTIGATION_VISUAL_DETAILS, INVESTIGATION_VISUAL_DETAILS_2 } from '../MedicalExamination/test_investigation_constants';
import "./MedicalFindings.styles.css";

function capitalizeFirstLetter(string) {
    const new_str = string.charAt(0).toUpperCase() + string.slice(1);
    if(new_str.includes("Remark") || new_str.includes("Yes")) {
        return new_str.split("_")[0];
    }
    return new_str;
}

const MedicalFindings = () => {

    const [medicalDeclarationSectionValues, setMedicalDeclarationSectionValues] = useState();
    const [section1Values, setSection1Values] = useState();
    const [section2Values, setSection2Values] = useState();
    const [section3Values, setSection3Values] = useState();
    const [section4Values, setSection4Values] = useState();
    const [section5Values, setSection5Values] = useState();
    const [section6Values, setSection6Values] = useState();
    const [tiSection1Values, setTISection1Values] = useState();
    const [tiSection2Values, setTISection2Values] = useState();
    const [tiChecboxQuestionsValues, setTIChecboxQuestionsValues] = useState();

    useEffect(() => {
        setMedicalDeclarationSectionValues(MEDICAL_DECLARATION_CONSENT_FIELDS);
        setSection1Values(MEDICAL_EXAMINATION_1);
        setSection2Values(MEDICAL_EXAMINATION_2);
        setSection3Values(MEDICAL_EXAMINATION_3);
        setSection4Values(MEDICAL_EXAMINATION_4);
        setSection5Values(MAJOR_DISABILITY);
        setSection6Values(VISUAL_ACTIVITY);
        setTISection1Values(INVESTIGATION_VISUAL_DETAILS);
        setTISection2Values(INVESTIGATION_VISUAL_DETAILS_2);
        setTIChecboxQuestionsValues(INVESTIGATION_CHECKBOX_QUESTIONS);
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

    const handleSection5Input = (key, value) => {
        const section5Data = section5Values;
        section5Data[key] = value;
        setSection5Values({...section5Data});
    };

    const renderSection5Questions = () => {
        return (
            <>
                <div className='questions-wrapper'>
                    <span className='question'>
                        {section5Values.q}
                    </span>
                    <div className='options'>
                        <ul>
                            <li>Have Details?
                                <input
                                    type="checkbox"
                                    name="yes"
                                    id="yes"
                                    value={section5Values.yes}
                                    onChange={(e) => setSection5Values({...section5Values, yes: e.target.checked})}
                                    readOnly
                                />
                            </li>
                            <li>
                                <input
                                    id="details"
                                    type="text"
                                    className='medical-exam-input-fields'
                                    placeholder='Details'
                                    onChange={(e) => handleSection5Input('details', e.target.value)}
                                    value={section5Values.details}
                                />
                            </li>
                            <li>
                                <input
                                    id="remark"
                                    type="text"
                                    className='medical-exam-input-fields'
                                    placeholder='Remark'
                                    onChange={(e) => handleSection5Input('remark', e.target.value)}
                                    value={section5Values.remark}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className='questions-wrapper'>
                        <div className='options'>
                            <ul>
                                <li>
                                    <span className='question'>
                                        {section6Values.q}
                                    </span>
                                    <input
                                        type="checkbox"
                                        name="eye_test_done"
                                        id="eye_test_done"
                                        onChange={(e) => setSection6Values({...section6Values, eye_test_done: e.target.checked})}
                                        value={section6Values.eye_test_done}
                                        readOnly
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    /* MEDICAL_EXAMINATION */

    /* TEST_INVESTIGATION */

    const handleTITableData = (key, eye, options, value) => {
        const newData = tiSection1Values.map((item) => {
            if(key == "color_vision") {
                item[key] = value;
            } else {
                item.options.map(i => {
                    if(i['m_key'] == key && i['key'] == eye) {
                        i.value = value;
                    } else if(i['m_key'] == key && i['key'] == eye) {
                        i.value = value;
                    }
                    return i;
                });
            }
            return item;
        });
        setTISection1Values([...newData]);
    };

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
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('color_vision',"color_vision", false, e.target.value)}
                                />
                            </td>
                            <td>Right Eye</td>
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('vision_with_glasses',"right_eye", true, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('vision_without_glasses',"right_eye", true, e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Left Eye</td>
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('vision_with_glasses',"left_eye", true, e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('vision_without_glasses',"left_eye", true, e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    };

    const handleTableChange = (eye_type, key, value) => {
        const newData = tiSection2Values.filter(i => {
            if(i.eye.toLowerCase() == eye_type) {
                i.eye_power.map(i => {
                    i.options[key] = value;
                    return i;
                });
            }
            return i;
        });
        setTISection2Values([...newData]);
    };

    const renderTable = () => {
        return (
            <>
                {
                    tiSection2Values && tiSection2Values.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td key={item.eye}>{item.eye}</td>
                                {item.eye_power.map((i, idx) => {
                                    const cell = i.options;
                                    return (
                                        <>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text"  className='findings-table-input' value={cell.r_sph} onChange={(e) => handleTableChange(i.power_type, "r_sph", e.target.value)} />
                                            </td>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text" className='findings-table-input' value={cell.r_cyl}  onChange={(e) => handleTableChange(i.power_type, "r_cyl", e.target.value)} />
                                            </td>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text" className='findings-table-input' value={cell.r_axis} onChange={(e) => handleTableChange(i.power_type, "r_axis", e.target.value)} />
                                            </td>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text" className='findings-table-input' value={cell.r_vn} onChange={(e) => handleTableChange(i.power_type, "r_vn", e.target.value)} />
                                            </td>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text"  className='findings-table-input' value={cell.l_sph} onChange={(e) => handleTableChange(i.power_type, "l_sph", e.target.value)} />
                                            </td>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text" className='findings-table-input' value={cell.l_cyl}  onChange={(e) => handleTableChange(i.power_type, "l_cyl", e.target.value)} />
                                            </td>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text" className='findings-table-input' value={cell.l_axis} onChange={(e) => handleTableChange(i.power_type, "l_axis", e.target.value)} />
                                            </td>
                                            <td key={`${i.power_type}${idx}`}>
                                                <input type="text" className='findings-table-input' value={cell.l_vn} onChange={(e) => handleTableChange(i.power_type, "l_vn", e.target.value)} />
                                            </td>
                                        </>
                                    )
                                })}
                            </tr>
                        )
                    })
                }
            </>
        )
    }

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
                        {renderTable()}
                    </tbody>
                </table>
            </>
        );
    };

    const handleTiCheckboxQuestion = (key, value) => {
        const newData = tiChecboxQuestionsValues;
        newData[key] = value;
        setTIChecboxQuestionsValues({...newData});
    }

    const renderTestInvestigationQuestions3 = () => {
        return (
            <>
                <div className="item questions-wrapper">
                    <p>Details</p>
                    <div className='options'>
                        <ul>
                            <li>
                                <label>ECG Findings</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.ecg_done_remark}
                                    onChange={(e) => handleTiCheckboxQuestion("ecg_done_remark", e.target.value)}
                                />
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    value={tiChecboxQuestionsValues.ecg_done}
                                    onChange={(e) => handleTiCheckboxQuestion("ecg_done", e.target.checked)}
                                />
                            </li>
                            <li>
                                <label>Lab Test Report No.</label>
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    value={tiChecboxQuestionsValues.lab_sample_taken}
                                    onChange={(e) => handleTiCheckboxQuestion("lab_sample_taken", e.target.checked)}
                                />
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.lab_sample_taken_value}
                                    onChange={(e) => handleTiCheckboxQuestion("lab_sample_taken_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Audiometry</label>
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    value={tiChecboxQuestionsValues.audiometry_done_checked}
                                    onChange={(e) => handleTiCheckboxQuestion("audiometry_done_checked", e.target.checked)}
                                />
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.audiometry_done_value}
                                    onChange={(e) => handleTiCheckboxQuestion("audiometry_done_value", e.target.value)}
                                    placeholder='Remark'
                                />
                            </li>
                            <li>
                                <label>Abnormal Reports if any</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.abnormal_reports_value}
                                    onChange={(e) => handleTiCheckboxQuestion("abnormal_reports_value", e.target.value)}
                                    placeholder='Remark'
                                />
                            </li>
                            <li>
                                <label>Deworming (with Albendazole 400mg):</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.deworming_value}
                                    onChange={(e) => handleTiCheckboxQuestion("deworming_value", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.deworming_remark}
                                    onChange={(e) => handleTiCheckboxQuestion("deworming_remark", e.target.value)}
                                    placeholder='Remark'
                                />
                            </li>
                            <li>
                                <label>Covid Vaccination</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.covid_value}
                                    onChange={(e) => handleTiCheckboxQuestion("covid_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Further Evaluation (if any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.evaluation_value}
                                    onChange={(e) => handleTiCheckboxQuestion("evaluation_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Treatment advised (if any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.treatment_value}
                                    onChange={(e) => handleTiCheckboxQuestion("treatment_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Restriction Advised (if any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.restriction_value}
                                    onChange={(e) => handleTiCheckboxQuestion("restriction_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Follow-up advised (If any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.follow_up_value}
                                    onChange={(e) => handleTiCheckboxQuestion("follow_up_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Remark</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={tiChecboxQuestionsValues.remark_value}
                                    onChange={(e) => handleTiCheckboxQuestion("remark_value", e.target.value)}
                                />
                            </li>
                        </ul>
                        <div>
                            <label htmlFor="">Opinion Checked: </label>
                            <ul>
                                <li>Fit
                                    <input
                                        type="checkbox"
                                        name='ecg_findings'
                                        value={tiChecboxQuestionsValues.fit}
                                        onChange={(e) => handleTiCheckboxQuestion("fit", e.target.checked)}
                                    />
                                </li>
                                <li>Fit With Restrictions
                                    <input
                                        type="checkbox"
                                        name='ecg_findings'
                                        value={tiChecboxQuestionsValues.fit_with_restrictions}
                                        onChange={(e) => handleTiCheckboxQuestion("fit_with_restrictions", e.target.checked)}
                                    />
                                </li>
                                <li>Temporary Unfit
                                    <input
                                        type="checkbox"
                                        name='ecg_findings'
                                        value={tiChecboxQuestionsValues.temporary_unfit}
                                        onChange={(e) => handleTiCheckboxQuestion("temporary_unfit", e.target.checked)}
                                    />
                                </li>
                                <li>Unfit
                                    <input
                                        type="checkbox"
                                        name='ecg_findings'
                                        value={tiChecboxQuestionsValues.unfit}
                                        onChange={(e) => handleTiCheckboxQuestion("unfit", e.target.checked)}
                                    />
                                </li>
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
                    {medicalDeclarationSectionValues && renderConsentQuestions()}
                    {section1Values && renderSection1()}
                    {renderSection2()}
                    {renderSection3()}
                    {renderSection4()}
                    {section5Values && renderSection5Questions()}
                    {renderTestInvestigationVisualQuestions1()}
                    {renderTestInvestigationVisualQuestions2()}
                    {tiChecboxQuestionsValues && renderTestInvestigationQuestions3()}
            </div>
            <button onClick={medicalConsentSubmit} className="submit-btn position-prescription-btn" >Submit</button>
        </>
    )
}

export default MedicalFindings;
