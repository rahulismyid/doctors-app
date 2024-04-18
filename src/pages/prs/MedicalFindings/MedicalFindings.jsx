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
    EYE_SIGHT_REMARK,
} from './constants';
import { LIST_PATIENT_ROUTE } from '../../../routes/constants';
import "./medical-findings.styles.css";

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
    const [eyeSightRemark, setEyeSightRemark] = useState();
    const [bodyExaminationAilmentsRemark, setBodyExaminationAilmentsRemark] = useState('');
    const [contagiuosSkinDiseaseRemark, setContagiuosSkinDiseaseRemark] = useState('');

    const { setModalData } = useContext(GlobalContext);
    const {
        createPatientMedicalDetails,
        fetchPatientMedicalDetails,
        updatePatientDetails,
        updatePatientPersonalDetails,
        fetchPatientPersonalDetails,
    } = useDB();
    const navigate = useNavigate();
    const { pid, id } = useParams();

    useEffect(() => {
        setAilmentsHistoryDetails(AILMENT_HISTORY_DETAILS.sort());
        setBodyExaminationMetrics(BODY_EXAMINATION_METRICS.sort());
        setBodyExaminationAilments(BODY_EXAMINATION_AILMENTS.sort());
        setBodyOrgansAndTests(BODY_ORGANS_AND_TESTS.sort());
        setContagiuosSkinDiseases(CONTAGIOUS_SKIN_DISEASES.sort());
        setMajorDisability(MAJOR_DISABILITY);
        setVisualTestDetails(VISION_TEST_DETAILS.sort());
        setEyeSightDetails(EYE_SIGHT_DETAILS.sort());
        setTestEvaluationsAndFindings(TEST_EVALUATIONS_AND_FINDINGS);
        setEyeSightRemark(EYE_SIGHT_REMARK)
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
            setAilmentsHistoryDetails(newData.ailmentsHistoryDetails.sort())
            setBodyExaminationMetrics(newData.bodyExaminationMetrics.sort())
            setBodyExaminationAilments(newData.bodyExaminationAilments.sort())
            setBodyOrgansAndTests(newData.bodyOrgansAndTests.sort())
            setContagiuosSkinDiseases(newData.contagiuosSkinDiseases.sort())
            setMajorDisability(newData.majorDisability)
            setVisualTestDetails(newData.visualTestDetails.sort())
            setEyeSightDetails(newData.eyeSightDetails.sort())
            setTestEvaluationsAndFindings(newData.testEvaluationsAndFindings)
            setEyeSightRemark({eye_remark: newData.eyeSightRemark.eye_remark})
            setBodyExaminationAilmentsRemark(newData.bodyExaminationAilments.sort().filter(i => i.key == "remarks_2")[0].value)
            newData.contagiuosSkinDiseases.forEach(i => {
                setContagiuosSkinDiseaseRemark(i.remarks_4);
                return i;
            });
        }
    };

    /* MEDICAL_CONSENT */

    const handleAilmentRemarkInput = (item, option, value) => {
        const newData = ailmentsHistoryDetails.map(i => {
            if(i.q == item.q) {
                i.options.map(o => {
                    if(o.remark_key == option.remark_key) {
                        o[option.remark_key] = value;
                    }
                    return o;
                })
            }
            return i;
        });
        setAilmentsHistoryDetails([...newData]);
    };

    const renderAilmentHistoryQuestions = () => {
        return (
            <>
                {ailmentsHistoryDetails && ailmentsHistoryDetails.map((item, idx) => {
                    return (
                        <div key={idx} className='aliment-history-question-container'>
                            <span className='question-label'>
                                {idx+1}. {item.q}
                            </span>
                            {item.options.map((option, index) => {
                                return (
                                    <div key={`${idx}${index}`} className='aliment-history-grid-list-container'>
                                        <ul className='aliment-history-grid-list-wrapper'>
                                            {renderMedicalConsentOptions(option)}
                                        </ul>
                                        <input
                                            type="text"
                                            className='remark'
                                            placeholder="Remark"
                                            value={option[option.remark_key]}
                                            onChange={(e) => handleAilmentRemarkInput(item, option, e.target.value)}
                                        />
                                    </div>
                                )})
                            }
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
                {!key.toString().includes("remark") ? (
                    <li>
                        <input
                            id={key}
                            type="checkbox"
                            name={key}
                            checked={option}
                            onChange={() => handleCheckbox(listOfObj, key)}
                        />
                        <label htmlFor={key} key={`${idx}${key}`}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</label> 
                    </li>
                ): null}
            </Fragment>
        )
    });

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

    const renderBodyExaminationMetrics = () => {
        return (
            <div className="body-examination-metrics-container">
                    {
                        bodyExaminationMetrics.map((item, idx) => {
                            return (
                                <div key={idx} className="body-examination-metrics-input-wrapper">
                                    <div className='body-examination-metrics-label-input-container'>
                                        <label htmlFor={item.key}>{item.key.toString().replace("_", " ")}</label>
                                        <input
                                            key={idx}
                                            className='medical-exam-input-fields'
                                            type="number"
                                            name={item.key}
                                            placeholder={item.label}
                                            value={item.value}
                                            onChange={(e) => handleMedicalExam1Change(item, e.target.value)}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
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

    const handleMedicalExam2Remark = (value) => {
        const newData = bodyExaminationAilments.map(i => {
            if(i.key == "remarks_2") {
                i.value = value;
                setBodyExaminationAilmentsRemark(value);
            };
            return i;
        })
        setBodyExaminationAilments([...newData]);
    };

    const renderBodyExaminationAilments = () => {
        return (
            <>
                <div className='body-examination-ailments-container'>
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
                                            <label htmlFor={item.key} key={item.label}>
                                                {capitalizeFirstLetter(item.key).replace(/_/g, " ")}
                                            </label>
                                        </li>
                                    </> : null}
                                </Fragment>
                            )
                        })}
                    </ul>
                    <div className='body-examination-ailments-remark'>
                        {/* <label htmlFor='bodyExaminationAilmentsRemark'>Remark</label> */}
                        <input
                            id='bodyExaminationAilmentsRemark'
                            type="text"
                            className='medical-exam-input-fields remark-input'
                            placeholder="Remark"
                            value={bodyExaminationAilmentsRemark}
                            onChange={(e) => handleMedicalExam2Remark(e.target.value)}
                        />
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

    const renderBodyOrgansAndTests = () => {
        return (
            <div className='body-organs-and-tests-container'>
                {
                    bodyOrgansAndTests && bodyOrgansAndTests.map((item, idx) => {
                        return (
                            <div className='body-organs-and-tests-input-wrapper' key={idx}>
                                <label htmlFor={item.key}>{item.label}</label>
                                <input
                                    id={item.key}
                                    type="text"
                                    name={item.key}
                                    placeholder={item.label}
                                    value={item.value}
                                    onChange={(e) => handleSection3Input(item, e.target.value)}
                                />
                            </div>
                        )
                    })
                }
            </div>
        );
    };

    const handleContagiousSkinDiseaseRemark = (value) => {
        const newData = contagiuosSkinDiseases.map(i => {
            i.remarks_4 = value;
            setContagiuosSkinDiseaseRemark(value);
            return i;
        });
        setContagiuosSkinDiseases([...newData]);
    };

    const renderContagiousSkinDisease = () => {
        return (
            <>
            {/* .body-examination-ailments-container { */}

                <div className='contagiuos-skin-disease-container'>
                    <span className='question'>
                        Contagious skin disease?
                    </span>
                    <div className='contagiuos-skin-disease-options-wrapper'>
                        {contagiuosSkinDiseases && contagiuosSkinDiseases.map((item, idx) => {
                            return (
                                <ul key={idx}>
                                    {item.options.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                {renderContagiousSkinDiseaseOptions(item)}
                                            </Fragment>
                                        )})
                                    }
                                </ul>
                            )
                        })}
                        <div className='contagiuos-skin-disease-remark'>
                            <input
                                type="text"
                                placeholder="Remark"
                                value={contagiuosSkinDiseaseRemark}
                                onChange={(e) => handleContagiousSkinDiseaseRemark(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const handleContagiousSkinDiseaseChange = (obj, key, value) => {
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

    const renderContagiousSkinDiseaseOptions = (listOfObj) => Object.entries(listOfObj).map(([key,value], idx) => {
        const option = listOfObj[key];
        return (
            <Fragment key={key}>
                <li>
                    <input
                        id={key}
                        type="checkbox"
                        name={key}
                        checked={option}
                        onChange={(e) => handleContagiousSkinDiseaseChange(listOfObj, key, e.target.checked)}
                        readOnly
                    />
                    <label key={option.toString()} htmlFor={key}>{capitalizeFirstLetter(key).replace(/_/g, " ")}</label>
                </li>
            </Fragment>
        )
    });

    const handleSection5Input = (key, value) => {
        const section5Data = majorDisability;
        section5Data[key] = value;
        setMajorDisability({...section5Data});
    };

    const renderMajorDisability = () => {
        return (
            <>
                <div className='major-disability-container'>
                    <span className='question'>
                        {majorDisability.q}
                    </span>
                    <div className='major-disability-checkbox-wrapper'>
                        <div className='major-disability-have-details-checkbox-wrapper'>
                            <label htmlFor="yes"><u>Have Details?</u></label>
                            <input
                                id="yes"
                                name="yes"
                                type="checkbox"
                                className='yes-checkbox'
                                checked={majorDisability.yes}
                                onChange={(e) => setMajorDisability({...majorDisability, yes: e.target.checked})}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='major-disability-details-wrapper'>
                        <label htmlFor="details">Details</label>
                        <input
                            id="details"
                            type="text"
                            className='major-disability-details-input'
                            placeholder='Details'
                            onChange={(e) => handleSection5Input('details', e.target.value)}
                            value={majorDisability.details}
                            disabled={!majorDisability.yes}
                        />
                    </div>
                    <div className='major-disability-input-wrapper'>
                        <label htmlFor="remark">Remark</label>
                        <input
                            id="remark"
                            type="text"
                            placeholder='Remark'
                            onChange={(e) => handleSection5Input('remark', e.target.value)}
                            value={majorDisability.remark}
                        />
                    </div>
                    <div className='visual-activity-checkbox-wrapper'>
                        <div className='major-disability-have-details-checkbox-wrapper'>
                            <label htmlFor="eye_test_done">{majorDisability.eye_test_done_q}</label>
                            <input
                                id="eye_test_done"
                                type="checkbox"
                                name="eye_test_done"
                                onChange={(e) => handleSection5Input('eye_test_done', e.target.checked)}
                                checked={majorDisability.eye_test_done}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    /* MEDICAL_EXAMINATION */

    /* TEST_INVESTIGATION */

    const handleTITableData = (key, eye, value) => {
        const newData = visualTestDetails.map((item) => {
            if(item['m_key'] == key && item['key'] == eye) {
                item.value = value;
            }
            return item;
        });
        setVisualTestDetails([...newData].sort());
    };

    const renderVisualTestDetails = () => {
        return (
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
                                onChange={(e) => handleTITableData('no_display',"color_vision", e.target.value)}
                                value={visualTestDetails[0].value}
                                disabled={!majorDisability.eye_test_done}
                            />
                        </td>
                        <td>Right Eye</td>
                        <td>
                            <input
                                type="text"
                                className='findings-table-input'
                                onChange={(e) => handleTITableData('vision_with_glasses',"right_eye", e.target.value)}
                                value={visualTestDetails[1].value}
                                disabled={!majorDisability.eye_test_done}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className='findings-table-input'
                                onChange={(e) => handleTITableData('vision_without_glasses',"right_eye", e.target.value)}
                                value={visualTestDetails[3].value}
                                disabled={!majorDisability.eye_test_done}
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
                                onChange={(e) => handleTITableData('vision_with_glasses',"left_eye", e.target.value)}
                                value={visualTestDetails[2].value}
                                disabled={!majorDisability.eye_test_done}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                className='findings-table-input'
                                onChange={(e) => handleTITableData('vision_without_glasses',"left_eye", e.target.value)}
                                value={visualTestDetails[4].value}
                                disabled={!majorDisability.eye_test_done}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
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
                                                <input type="text"  className='findings-table-input' value={cell.r_sph} onChange={(e) => handleTableChange(i.power_type, "r_sph", e.target.value)} disabled={!majorDisability.eye_test_done} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.r_cyl}  onChange={(e) => handleTableChange(i.power_type, "r_cyl", e.target.value)} disabled={!majorDisability.eye_test_done} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.r_axis} onChange={(e) => handleTableChange(i.power_type, "r_axis", e.target.value)} disabled={!majorDisability.eye_test_done} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.r_vn} onChange={(e) => handleTableChange(i.power_type, "r_vn", e.target.value)} disabled={!majorDisability.eye_test_done} />
                                            </td>
                                            <td>
                                                <input type="text"  className='findings-table-input' value={cell.l_sph} onChange={(e) => handleTableChange(i.power_type, "l_sph", e.target.value)} disabled={!majorDisability.eye_test_done} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.l_cyl}  onChange={(e) => handleTableChange(i.power_type, "l_cyl", e.target.value)} disabled={!majorDisability.eye_test_done} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.l_axis} onChange={(e) => handleTableChange(i.power_type, "l_axis", e.target.value)} disabled={!majorDisability.eye_test_done} />
                                            </td>
                                            <td>
                                                <input type="text" className='findings-table-input' value={cell.l_vn} onChange={(e) => handleTableChange(i.power_type, "l_vn", e.target.value)} disabled={!majorDisability.eye_test_done} />
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

    const handleEyeSightRemark = (value) => {
        setEyeSightRemark({eye_remark: value});
    };

    const renderEyeSightDetails = () => {
        return (
            <>
                <table className='findings-visual-details-table eye-sight-details-table'>
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
                {
                    eyeSightRemark && (
                        <div className='visual-test-details-input-wrapper'>
                            <label htmlFor="eyeRemark">Remark</label>
                            <input
                                id='eyeRemark'
                                type="text"
                                className='medical-exam-input-fields'
                                placeholder='Remark'
                                value={eyeSightRemark.eye_remark}
                                onChange={(e) => handleEyeSightRemark(e.target.value)}
                            />
                        </div>
                    )
                }
            </>
        );
    };

    const handleTestEvaluationsAndFindingsCheckboxQuestion = (key, value) => {
        const newData = testEvaluationsAndFindings;
        newData[key] = value;
        setTestEvaluationsAndFindings({...newData});
    };

    const handleTestEvaluationsAndFindingsRadioBtn = (radioKey, value) => {
        const newData = testEvaluationsAndFindings;
        const radioValues = {
            fit: false,
            fit_with_restrictions: false,
            temporary_unfit: false,
            unfit: false,
        };
        Object.entries(radioValues).map(([key], i) => {
            if(key == radioKey) {
                radioValues[radioKey] = value;
            } else {
                radioValues[key] = false;
            }
        });
        setTestEvaluationsAndFindings({...newData, ...radioValues});
    };

    const renderTestEvaluationsAndFindings = () => {
        return (
            <div className="test-evaluations-and-findings-container">
                <div className='test-evaluations-and-findings-input-checkbox-container'>
                    <div className='input-label-container'>
                        <label htmlFor='ecg_findings'>ECG Findings</label>
                        <input
                            id='ecg_findings'
                            type="checkbox"
                            name='ecg_findings'
                            checked={testEvaluationsAndFindings.ecg_done}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("ecg_done", e.target.checked)}
                        />
                    </div>
                    <input
                        type="text"
                        className='test-evaluations-and-findings-text-input'
                        value={testEvaluationsAndFindings.ecg_done_remark}
                        onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("ecg_done_remark", e.target.value)}
                        disabled={!testEvaluationsAndFindings.ecg_done}
                    />
                </div>
                <div className='test-evaluations-and-findings-input-checkbox-container'>
                    <div className='input-label-container'>
                        <label htmlFor='lab_sample_taken'>Lab Test Report No.</label>
                        <input
                            id='lab_sample_taken'
                            type="checkbox"
                            name='lab_sample_taken'
                            checked={testEvaluationsAndFindings.lab_sample_taken}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("lab_sample_taken", e.target.checked)}
                        />
                    </div>
                    <input
                        type="text"
                        className='test-evaluations-and-findings-text-input'
                        value={testEvaluationsAndFindings.lab_sample_taken_value}
                        onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("lab_sample_taken_value", e.target.value)}
                        disabled={!testEvaluationsAndFindings.lab_sample_taken}
                    />
                </div>
                <div className='test-evaluations-and-findings-input-checkbox-container'>
                    <div className='input-label-container'>
                        <label htmlFor='audiometry_done_checked'>Audiometry</label>
                        <input
                            id='audiometry_done_checked'
                            type="checkbox"
                            name='audiometry_done_checked'
                            checked={testEvaluationsAndFindings.audiometry_done_checked}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("audiometry_done_checked", e.target.checked)}
                        />
                    </div>
                    <input
                        type="text"
                        className='test-evaluations-and-findings-text-input'
                        placeholder='Remark'
                        value={testEvaluationsAndFindings.audiometry_done_value}
                        onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("audiometry_done_value", e.target.value)}
                        disabled={!testEvaluationsAndFindings.audiometry_done_checked}
                    />
                </div>
                <div className='test-evaluations-and-findings-input-checkbox-container'>
                    <div className='deworming-input-label-container'>
                        <label htmlFor='deworming_value'>Deworming (with Albendazole 400mg):</label>
                        <input
                            id='deworming_value'
                            type="text"
                            value={testEvaluationsAndFindings.deworming_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("deworming_value", e.target.value)}
                        />
                    </div>
                    <label htmlFor='deworming_remark'>Remark</label>
                    <input
                        id='deworming_remark'
                        type="text"
                        className='deworming-input-remark'
                        placeholder='Remark'
                        value={testEvaluationsAndFindings.deworming_remark}
                        onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("deworming_remark", e.target.value)}
                    />
                </div>

                <ul className='test-evaluations-and-findings-label-input-container'>
                    <li>
                        <label htmlFor='abnormal_reports_value'>Abnormal Reports if any</label>
                        <input
                            id='abnormal_reports_value'
                            type="text"
                            className="test-evaluations-and-findings-input"
                            value={testEvaluationsAndFindings.abnormal_reports_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("abnormal_reports_value", e.target.value)}
                            placeholder='Remark'
                        />
                    </li>
                    <li>
                        <label htmlFor='covid_value'>Covid Vaccination</label>
                        <input
                            id='covid_value'
                            type="text"
                            className="test-evaluations-and-findings-input"
                            value={testEvaluationsAndFindings.covid_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("covid_value", e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor='evaluation_value'>Further Evaluation (if any)</label>
                        <input
                            id='evaluation_value'
                            type="text"
                            className="test-evaluations-and-findings-input"
                            value={testEvaluationsAndFindings.evaluation_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("evaluation_value", e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor='treatment_value'>Treatment advised (if any)</label>
                        <input
                            id='treatment_value'
                            type="text"
                            className="test-evaluations-and-findings-input"
                            value={testEvaluationsAndFindings.treatment_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("treatment_value", e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor='restriction_value'>Restriction Advised (if any)</label>
                        <input
                            id='restriction_value'
                            type="text"
                            className="test-evaluations-and-findings-input"
                            value={testEvaluationsAndFindings.restriction_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("restriction_value", e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor='follow_up_value'>Follow-up advised (If any)</label>
                        <input
                            id='follow_up_value'
                            type="text"
                            className="test-evaluations-and-findings-input"
                            value={testEvaluationsAndFindings.follow_up_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("follow_up_value", e.target.value)}
                        />
                    </li>
                    <li>
                        <label htmlFor='remark_value'>Remark</label>
                        <input
                            id='remark_value'
                            type="text"
                            className="test-evaluations-and-findings-remark-input"
                            placeholder='Remark'
                            value={testEvaluationsAndFindings.remark_value}
                            onChange={(e) => handleTestEvaluationsAndFindingsCheckboxQuestion("remark_value", e.target.value)}
                        />
                    </li>
                </ul>
                <div className='test-evaluations-and-findings-opinion-checked-container'>
                    <label htmlFor="">Opinion Checked: </label>
                    <ul>
                        <li>
                            <input
                                id='temporary_unfit'
                                type="radio"
                                name='temporary_unfit'
                                checked={testEvaluationsAndFindings.temporary_unfit}
                                onChange={(e) => handleTestEvaluationsAndFindingsRadioBtn("temporary_unfit", e.target.checked)}
                            />
                            <label htmlFor="temporary_unfit">Temporary Unfit</label>
                        </li>
                        <li>
                            <input
                                id='fit_with_restrictions'
                                type="radio"
                                name='fit_with_restrictionsecg_findings'
                                checked={testEvaluationsAndFindings.fit_with_restrictions}
                                onChange={(e) => handleTestEvaluationsAndFindingsRadioBtn("fit_with_restrictions", e.target.checked)}
                            />
                            <label htmlFor="fit_with_restrictions">Fit With Restrictions</label>
                        </li>
                        <li>
                            <input
                                id='unfit'
                                type="radio"
                                name='unfit'
                                checked={testEvaluationsAndFindings.unfit}
                                onChange={(e) => handleTestEvaluationsAndFindingsRadioBtn("unfit", e.target.checked)}
                            />
                            <label htmlFor="unfit">Unfit</label>
                        </li>
                        <li>
                            <input
                                id='fit'
                                type="radio"
                                name='fit'
                                checked={testEvaluationsAndFindings.fit}
                                onChange={(e) => handleTestEvaluationsAndFindingsRadioBtn("fit", e.target.checked)}
                            />
                            <label htmlFor="fit">Fit</label>
                        </li>
                    </ul>
                </div>
            </div>
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
            eyeSightRemark,
        };
        if(patientPersonalDetails && !patientPersonalDetails.medical_details_added) {
            delete patientPersonalDetails.medical_details_added;
            Promise.all([
                updatePatientPersonalDetails(patientPersonalDetails, id),
                createPatientMedicalDetails(postDataObject, patientPersonalDetails.pid)
            ]).then(res => {
                setModalData({
                    open: true,
                    title: 'Success!',
                    msg: 'Updated medical details!',
                    okBtn: true,
                });
                navigate(LIST_PATIENT_ROUTE);
            }).catch(err => {
                alert(err);
            });
        } else {
            updatePatientDetails(medicalDetailId, postDataObject).then(res => {
                setModalData({
                    open: true,
                    title: 'Success!',
                    msg: 'Updated medical details!',
                    okBtn: true,
                });
                navigate(LIST_PATIENT_ROUTE);
            });
        }
    };

    return (
        <>
            <div className="medicial-findings-container">
                <h1><u>Medical Declaration & Consent</u></h1>
                {ailmentsHistoryDetails && renderAilmentHistoryQuestions()}
                <h1><u>Medical Examination</u></h1>
                {bodyExaminationMetrics && renderBodyExaminationMetrics()}
                {renderBodyExaminationAilments()}
                {renderBodyOrgansAndTests()}
                {renderContagiousSkinDisease()}
                {majorDisability && renderMajorDisability()}
                {visualTestDetails && renderVisualTestDetails()}
                {renderEyeSightDetails()}
                {testEvaluationsAndFindings && renderTestEvaluationsAndFindings()}

                <div className='medical-findings-submit-button-container'>
                    <button onClick={handleSubmit} className="submit-btn position-prescription-btn" >
                        {!pid ? "Submit" : "Update"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default MedicalFindings;
