import React, { useEffect } from 'react';
import { MEDICAL_EXAMINATION_1, MEDICAL_EXAMINATION_2 } from './constants';
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
                            return (
                                <input className='medical-exam-input-fields' type="text" name={item.key} placeholder={item.label} />
                            )
                        })
                    }
                </div>
            </div>
        );
    };

    const renderInputFieldForRemark = (option) => {
        const REMARK = "remark";
        const key = Object.keys(option).find(i => i.includes(REMARK));
        if(option[key]) {
            return (
                // <input className='remark-input' placeholder="Remark" type="text" value={option[key] ? option[key] === true ? "" : option[key] : ""}/>
                <input className='remark-input' placeholder="Remark" type="text" disabled={!isFirstStepComplete}/>
            )
        }
        return null;
    };

    const renderSections2 = () => {
        return (
            <div className="item">
                {/* <p>Details</p> */}
                    {
                        MEDICAL_EXAMINATION_2.map(item => {
                            return (
                                <>
                                    <div className='section-2'>
                                        <input type="checkbox" name={item.key} placeholder={item.label} />
                                        <div>{item.label}</div>
                                        {JSON.stringify(item)}
                                    </div>
                                </>
                            )
                        })
                    }
            </div>
        );
    };

    return (
        <div className="testbox">
            <form action="/">
                <h1>Medical Examination</h1>
                <div className="item">
                    {/* <p>Complainant's Name</p> */}
                    {renderSections1()}
                </div>
                <div className="item">
                    <p>Address</p>
                    <input className='medical-exam-input-fields' type="text" name="name" placeholder="Street address"/>
                    <input className='medical-exam-input-fields' type="text" name="name" placeholder="Street address line 2"/>
                        {renderSections2()}
                    {/* <div className="city-item"> */}
                        {/* <input className='medical-exam-input-fields' type="text" name="name" placeholder="City" />
                        <input className='medical-exam-input-fields' type="text" name="name" placeholder="Region" />
                        <input className='medical-exam-input-fields' type="text" name="name" placeholder="Postal / Zip code" />
                        <select>
                            <option value="">Country</option>
                            <option value="1">Russia</option>
                            <option value="2">Germany</option>
                            <option value="3">France</option>
                            <option value="4">Armenia</option>
                            <option value="5">USA</option>
                        </select> */}
                    {/* </div> */}
                </div>
                <div className="item">
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
                </div>
            </form>
        </div>
    )
};

export default MedicalExamination;
