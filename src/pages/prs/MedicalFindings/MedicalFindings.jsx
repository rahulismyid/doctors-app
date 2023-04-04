import { Fragment, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDB } from '../../../contexts/DbContext';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { checkIfObjectHasRemarksKey } from '../../../utils/utils';
import {
    AILMENT_HISTORY_DETAILS,
    BODY_EXAMINATION_AILMENTS,
    BODY_EXAMINATION_METRICS,
    BODY_ORGANS_AND_TESTS,
    CONTAGIOUS_SKIN_DISEASES,
    EYE_SIGHT_DETAILS,
    MAJOR_DISABILITY,
    TEST_EVALUATIONS_AND_FINDINGS,
    VISION_TEST_DETAILS,
} from './constants';
import "./MedicalFindings.styles.css";

function capitalizeFirstLetter(string) {
    const new_str = string.charAt(0).toUpperCase() + string.slice(1);
    if(new_str.includes("Remark") || new_str.includes("Yes")) {
        return new_str.split("_")[0];
    }
    return new_str;
}

const MedicalFindings = () => {

    const [ailmentsHistoryDetails, setAilmentsHistoryDetails] = useState();
    const [bodyExaminationMetrics, setBodyExaminationMetrics] = useState();
    const [bodyExaminationAilments, setBodyExaminationAilments] = useState();
    const [bodyOrgansAndTests, setBodyOrgansAndTests] = useState();
    const [contagiuosSkinDiseases, setContagiuosSkinDiseases] = useState();
    const [majorDisability, setMajorDisability] = useState();
    const [visualTestDetails, setVisualTestDetails] = useState();
    const [eyeSightDetails, setEyeSightDetails] = useState();
    const [testEvaluationsAndFindings, setTestEvaluationsAndFindings] = useState();
    const [patientPersonalDetails, setPatientPersonalDetails] = useState();
    const [medicalDetailId, setMedicalDetailId] = useState();
    const { setModalData } = useContext(GlobalContext);
    const {
        addPatientMedicalDetails,
        fetchPatientMedicalDetails,
        updatePatientDetails,
        updatePatientPersonalDetails,
        fetchPatientPersonalDetails,
    } = useDB();
    const navigate = useNavigate();
    const { pid, id } = useParams();

    useEffect(() => {
        setAilmentsHistoryDetails(AILMENT_HISTORY_DETAILS);
        setBodyExaminationMetrics(BODY_EXAMINATION_METRICS);
        setBodyExaminationAilments(BODY_EXAMINATION_AILMENTS);
        setBodyOrgansAndTests(BODY_ORGANS_AND_TESTS);
        setContagiuosSkinDiseases(CONTAGIOUS_SKIN_DISEASES);
        setMajorDisability(MAJOR_DISABILITY);
        setVisualTestDetails(VISION_TEST_DETAILS);
        setEyeSightDetails(EYE_SIGHT_DETAILS);
        setTestEvaluationsAndFindings(TEST_EVALUATIONS_AND_FINDINGS);
    }, []);

    useEffect(() => {
        if(pid) {
            getPatientMedicalDetails();
            fetchPatient();
        }
    },[]);

    const fetchPatient = async () => {
        const data = await fetchPatientPersonalDetails(id);
        setPatientPersonalDetails(data[0]);
    }

    const getPatientMedicalDetails = async () => {
        const data = await fetchPatientMedicalDetails(pid);
        if(data && data[0]) {
            const newData = data[0];
            setMedicalDetailId(data[0].id);
            setAilmentsHistoryDetails(newData.ailmentsHistoryDetails)
            setBodyExaminationMetrics(newData.bodyExaminationMetrics)
            setBodyExaminationAilments(newData.bodyExaminationAilments)
            setBodyOrgansAndTests(newData.bodyOrgansAndTests)
            setContagiuosSkinDiseases(newData.contagiuosSkinDiseases)
            setMajorDisability(newData.majorDisability)
            setVisualTestDetails(newData.visualTestDetails)
            setEyeSightDetails(newData.eyeSightDetails)
            setTestEvaluationsAndFindings(newData.testEvaluationsAndFindings)
        }
    };

    /* MEDICAL_CONSENT */

    const renderConsentQuestions = () => {
        return (
            <>
                {ailmentsHistoryDetails && ailmentsHistoryDetails.map((item, idx) => {
                    return (
                        <div key={JSON.stringify(item.options)} className='questions-wrapper'>
                            <span className='question'>
                                {idx+1}. {item.q}
                            </span>
                            <div key={idx} className='options'>
                                <ul key={idx}>
                                    {item.options.map((option, index) => {
                                        return (
                                            <li key={`${idx}${index}`}>
                                                {renderMedicalConsentOptions(option)}
                                                {renderInputFieldForRemark(option)}
                                            </li>
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
            <Fragment key={`${key}${idx}`}>
                <input
                    id={option.toString()}
                    type="checkbox"
                    name={key}
                    checked={option}
                    onChange={() => handleCheckbox(listOfObj, key)}
                />
                <span key={`${idx}${key}`}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</span>
            </Fragment>
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
        const newData = ailmentsHistoryDetails.map(item => {
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
        setAilmentsHistoryDetails([...newData]);
    };

    /* MEDICAL_CONSENT */

    /* MEDICAL_EXAMINATION */

    const handleMedicalExam1Change = (obj, value) => {
        const newData = BODY_EXAMINATION_METRICS.map(item => {
            if(obj && item.key === obj.key) {
                item.value = value;
            }
            return item;
        });
        setBodyExaminationMetrics([...newData]);
    };

    const renderSection1 = () => {
        return (
            <div className="item">
                <p>Details</p>
                <div className="name-item">
                    {
                        bodyExaminationMetrics.map((item, idx) => {
                            return <input
                                    key={idx}
                                    className='medical-exam-input-fields'
                                    type="text"
                                    name={item.key}
                                    placeholder={item.label}
                                    value={item.value}
                                    onChange={(e) => handleMedicalExam1Change(item, e.target.value)}
                                />
                        })
                    }
                </div>
            </div>
        );
    };

    const handleMedicalExam2Change = (obj, value) => {
        const newData = bodyExaminationAilments.map(item => {
            if(obj && item.key === obj.key) {
                item.value = value;
            }
            return item;
        });
        setBodyExaminationAilments([...newData]);
    };

    const handkeMedicalExam2Remark = (value) => {
        const newData = bodyExaminationAilments.map(i => {
            if(i.key == "remarks_2") {
                i.value = value;
            };
            return i;
        })
        setBodyExaminationAilments([...newData]);
    };

    const renderSection2 = () => {
        return (
            <>
                <div className="item questions-wrapper">
                    <p>Details</p>
                    <div className='options'>
                        <ul>
                            {bodyExaminationAilments && bodyExaminationAilments.map((item, idx) => {
                                return (
                                    <Fragment key={idx}>
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
                                                    readOnly
                                                />
                                                <span key={item.label}>
                                                    {capitalizeFirstLetter(item.key).replace(/_/g, " ")}
                                                </span>
                                            </li>
                                        </> : <li>
                                            <input
                                                type="text"
                                                className='medical-exam-input-fields remark-input'
                                                placeholder="Remark"
                                                value={item.value}
                                                onChange={(e) => handkeMedicalExam2Remark(e.target.value)}
                                            />
                                        </li>}
                                    </Fragment>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </>
        );
    };

    const handleSection3Input = (obj, value) => {
        const newData = bodyOrgansAndTests.map(item => {
            if(obj && item.key === obj.key) {
                item.value = value;
            }
            return item;
        });
        setBodyOrgansAndTests([...newData]);
    };

    const renderSection3 = () => {
        return (
            <div className="item">
                <p>Details</p>
                <div className="name-item">
                    {
                        bodyOrgansAndTests && bodyOrgansAndTests.map((item, idx) => {
                            return (
                                <input
                                    key={idx}
                                    type="text"
                                    name={item.key}
                                    className='medical-exam-input-fields'
                                    placeholder={item.label}
                                    value={item.value}
                                    onChange={(e) => handleSection3Input(item, e.target.value)}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    };

    const handleSection4Remark = (value) => {
        const newData = contagiuosSkinDiseases.map(i => {
            i.remarks_4 = value;
            return i;
        });
        setContagiuosSkinDiseases([...newData]);
    };

    const renderSection4 = () => {
        return (
            <>
                <div className='questions-wrapper'>
                    <span className='question'>
                        Contagious skin disease?
                    </span>
                    <div className='options'>
                        {contagiuosSkinDiseases && contagiuosSkinDiseases.map((item, idx) => {
                            return (
                                <ul key={idx}>
                                    {item.options.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                {renderSection4Options(item)}
                                            </li>
                                        )})
                                    }
                                    {
                                        item.remarks_4 ? (
                                            <input
                                                type="text"
                                                className="medical-exam-input-fields remark-input"
                                                placeholder="Remark"
                                                value={item.remarks_4}
                                                onChange={(e) => handleSection4Remark(e.target.value)}
                                            />
                                        ) : null
                                    }
                                </ul>
                            )
                        })}
                    </div>
                </div>
            </>
        );
    };

    const handleSection4Change = (obj, key, value) => {
        const newOptionsData = contagiuosSkinDiseases.map(i => {
            i.options.find(i => {
                if(i[key] === obj[key]) {
                    i[key] = value;
                }
                return i;
            })
            return i;
        });
        setContagiuosSkinDiseases([...newOptionsData]);
    };

    const renderSection4Options = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        return (
            <Fragment key={key}>
                <input
                    id={option.toString()}
                    type="checkbox"
                    name={key}
                    checked={option}
                    onChange={(e) => handleSection4Change(listOfObj, key, e.target.checked)}
                    readOnly
                />
                <span key={option.toString()}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</span>
            </Fragment>
        )
    });

    const handleSection5Input = (key, value) => {
        const section5Data = majorDisability;
        section5Data[key] = value;
        setMajorDisability({...section5Data});
    };

    const renderSection5Questions = () => {
        return (
            <>
                <div className='questions-wrapper'>
                    <span className='question'>
                        {majorDisability.q}
                    </span>
                    <div className='options'>
                        <ul>
                            <li>Have Details?
                                <input
                                    type="checkbox"
                                    name="yes"
                                    id="yes"
                                    checked={majorDisability.yes}
                                    onChange={(e) => setMajorDisability({...majorDisability, yes: e.target.checked})}
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
                                    value={majorDisability.details}
                                />
                            </li>
                            <li>
                                <input
                                    id="remark"
                                    type="text"
                                    className='medical-exam-input-fields'
                                    placeholder='Remark'
                                    onChange={(e) => handleSection5Input('remark', e.target.value)}
                                    value={majorDisability.remark}
                                />
                            </li>
                        </ul>
                    </div>
                    <div className='questions-wrapper'>
                        <div className='options'>
                            <ul>
                                <li>
                                    <span className='question'>
                                        {majorDisability.eye_test_done_q}
                                    </span>
                                    <input
                                        type="checkbox"
                                        name="eye_test_done"
                                        id="eye_test_done"
                                        onChange={(e) => handleSection5Input('eye_test_done', e.target.checked)}
                                        checked={majorDisability.eye_test_done}
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
        const newData = visualTestDetails.map((item) => {
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
        setVisualTestDetails([...newData]);
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
                                    onChange={(e) => handleTITableData('no_display',"color_vision", false, e.target.value)}
                                    value={visualTestDetails[0].options[0].value}
                                />
                            </td>
                            <td>Right Eye</td>
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('vision_with_glasses',"right_eye", true, e.target.value)}
                                    value={visualTestDetails[1].options[0].value}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('vision_without_glasses',"right_eye", true, e.target.value)}
                                    value={visualTestDetails[1].options[1].value}
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
                                    value={visualTestDetails[2].options[0].value}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className='findings-table-input'
                                    onChange={(e) => handleTITableData('vision_without_glasses',"left_eye", true, e.target.value)}
                                    value={visualTestDetails[2].options[1].value}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    };

    const handleTableChange = (eye_type, key, value) => {
        const newData = eyeSightDetails.filter(i => {
            if(i.eye.toLowerCase() == eye_type) {
                i.eye_power.map(i => {
                    i.options[key] = value;
                    return i;
                });
            }
            return i;
        });
        setEyeSightDetails([...newData]);
    };

    const renderTable = () => {
        return (
            <>
                {
                    eyeSightDetails && eyeSightDetails.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td key={item.eye}>{item.eye}</td>
                                {item.eye_power.map((i, index) => {
                                    const cell = i.options;
                                    return (
                                        <Fragment key={index}>
                                            <td>
                                                <input type="text"  className='findings-table-input' value={cell.r_sph} onChange={(e) => handleTableChange(i.power_type, "r_sph", e.target.value)} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.r_cyl}  onChange={(e) => handleTableChange(i.power_type, "r_cyl", e.target.value)} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.r_axis} onChange={(e) => handleTableChange(i.power_type, "r_axis", e.target.value)} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.r_vn} onChange={(e) => handleTableChange(i.power_type, "r_vn", e.target.value)} />
                                            </td>
                                            <td>
                                                <input type="text"  className='findings-table-input' value={cell.l_sph} onChange={(e) => handleTableChange(i.power_type, "l_sph", e.target.value)} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.l_cyl}  onChange={(e) => handleTableChange(i.power_type, "l_cyl", e.target.value)} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.l_axis} onChange={(e) => handleTableChange(i.power_type, "l_axis", e.target.value)} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.l_vn} onChange={(e) => handleTableChange(i.power_type, "l_vn", e.target.value)} />
                                            </td>
                                        </Fragment>
                                    )
                                })}
                            </tr>
                        )
                    })
                }
            </>
        )
    };

    const renderTestInvestigationVisualQuestions2 = () => {
        return (
            <>
                <table className='findings-visual-details-table'>
                    <thead>
                        <tr key={1234}>
                            <th key={1} colSpan={1}></th>
                            <th key={2} colSpan={4}>Right Eye</th>
                            <th key={3} colSpan={4}>Left Eye</th>
                        </tr>
                        <tr key={12345}>
                            <th key={4}></th>
                            <th key={5}>SPH</th>
                            <th key={6}>CYL</th>
                            <th key={7}>AXIS</th>
                            <th key={8}>VN</th>
                            <th key={9}>SPH</th>
                            <th key={10}>CYL</th>
                            <th key={11}>AXIS</th>
                            <th key={12}>VN</th>
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
        const newData = testEvaluationsAndFindings;
        newData[key] = value;
        setTestEvaluationsAndFindings({...newData});
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
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    checked={testEvaluationsAndFindings.ecg_done}
                                    onChange={(e) => handleTiCheckboxQuestion("ecg_done", e.target.checked)}
                                />
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.ecg_done_remark}
                                    onChange={(e) => handleTiCheckboxQuestion("ecg_done_remark", e.target.value)}
                                    disabled={!testEvaluationsAndFindings.ecg_done}
                                />
                            </li>
                            <li>
                                <label>Lab Test Report No.</label>
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    checked={testEvaluationsAndFindings.lab_sample_taken}
                                    onChange={(e) => handleTiCheckboxQuestion("lab_sample_taken", e.target.checked)}
                                />
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.lab_sample_taken_value}
                                    onChange={(e) => handleTiCheckboxQuestion("lab_sample_taken_value", e.target.value)}
                                    disabled={!testEvaluationsAndFindings.lab_sample_taken}
                                />
                            </li>
                            <li>
                                <label>Audiometry</label>
                                <input
                                    type="checkbox"
                                    name='ecg_findings'
                                    checked={testEvaluationsAndFindings.audiometry_done_checked}
                                    onChange={(e) => handleTiCheckboxQuestion("audiometry_done_checked", e.target.checked)}
                                />
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.audiometry_done_value}
                                    onChange={(e) => handleTiCheckboxQuestion("audiometry_done_value", e.target.value)}
                                    disabled={!testEvaluationsAndFindings.audiometry_done_checked}
                                    placeholder='Remark'
                                />
                            </li>
                            <li>
                                <label>Abnormal Reports if any</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.abnormal_reports_value}
                                    onChange={(e) => handleTiCheckboxQuestion("abnormal_reports_value", e.target.value)}
                                    placeholder='Remark'
                                />
                            </li>
                            <li>
                                <label>Deworming (with Albendazole 400mg):</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.deworming_value}
                                    onChange={(e) => handleTiCheckboxQuestion("deworming_value", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.deworming_remark}
                                    onChange={(e) => handleTiCheckboxQuestion("deworming_remark", e.target.value)}
                                    placeholder='Remark'
                                />
                            </li>
                            <li>
                                <label>Covid Vaccination</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.covid_value}
                                    onChange={(e) => handleTiCheckboxQuestion("covid_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Further Evaluation (if any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.evaluation_value}
                                    onChange={(e) => handleTiCheckboxQuestion("evaluation_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Treatment advised (if any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.treatment_value}
                                    onChange={(e) => handleTiCheckboxQuestion("treatment_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Restriction Advised (if any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.restriction_value}
                                    onChange={(e) => handleTiCheckboxQuestion("restriction_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Follow-up advised (If any)</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.follow_up_value}
                                    onChange={(e) => handleTiCheckboxQuestion("follow_up_value", e.target.value)}
                                />
                            </li>
                            <li>
                                <label>Remark</label>
                                <input
                                    type="text"
                                    className="ti3-input-fields"
                                    value={testEvaluationsAndFindings.remark_value}
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
                                        checked={testEvaluationsAndFindings.fit}
                                        onChange={(e) => handleTiCheckboxQuestion("fit", e.target.checked)}
                                    />
                                </li>
                                <li>Fit With Restrictions
                                    <input
                                        type="checkbox"
                                        name='ecg_findings'
                                        checked={testEvaluationsAndFindings.fit_with_restrictions}
                                        onChange={(e) => handleTiCheckboxQuestion("fit_with_restrictions", e.target.checked)}
                                    />
                                </li>
                                <li>Temporary Unfit
                                    <input
                                        type="checkbox"
                                        name='ecg_findings'
                                        checked={testEvaluationsAndFindings.temporary_unfit}
                                        onChange={(e) => handleTiCheckboxQuestion("temporary_unfit", e.target.checked)}
                                    />
                                </li>
                                <li>Unfit
                                    <input
                                        type="checkbox"
                                        name='ecg_findings'
                                        checked={testEvaluationsAndFindings.unfit}
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postDataObject = {
            pid: patientPersonalDetails?.pid || pid,
            ailmentsHistoryDetails,
            bodyExaminationMetrics,
            bodyExaminationAilments,
            bodyOrgansAndTests,
            contagiuosSkinDiseases,
            majorDisability,
            visualTestDetails,
            eyeSightDetails,
            testEvaluationsAndFindings,
        };
        if(patientPersonalDetails && !patientPersonalDetails.medical_details_added) {
            delete patientPersonalDetails.medical_details_added;
            Promise.all([
                updatePatientPersonalDetails(patientPersonalDetails, patientPersonalDetails.id),
                addPatientMedicalDetails(postDataObject, patientPersonalDetails.id)
            ]).then(res => {
                setModalData({
                    open: true,
                    title: '',
                    msg: 'Updated!',
                });
            }).catch(err => {
                alert(err);
            });
        } else {
            updatePatientDetails(medicalDetailId, postDataObject).then(res => {
                setModalData({
                    open: true,
                    title: '',
                    msg: 'Updated!',
                });
                navigate("/app/list-patient");
            });
        }
    };

    return (
        <>
            <div className="declaration-consent-container border">
                <div className="form-description">
                    <h2>Medical declaration consent</h2>
                </div>
                    {ailmentsHistoryDetails && renderConsentQuestions()}
                    {bodyExaminationMetrics && renderSection1()}
                    {renderSection2()}
                    {renderSection3()}
                    {renderSection4()}
                    {majorDisability && renderSection5Questions()}
                    {visualTestDetails && renderTestInvestigationVisualQuestions1()}
                    {renderTestInvestigationVisualQuestions2()}
                    {testEvaluationsAndFindings && renderTestInvestigationQuestions3()}
            </div>
            {
                <button onClick={handleSubmit} className="submit-btn position-prescription-btn" >
                    {!pid ? "Submit" : "Update"}
                </button>
            }
        </>
    )
}

export default MedicalFindings;
