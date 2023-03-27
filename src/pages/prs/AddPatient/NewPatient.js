import React from 'react'
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
  return (
    <div className="testbox">
        <form action="/">
            <h1>New Patient Details</h1>
            <div className="item">
                <p>Complainant's Name</p>
                <div className="name-item">
                    <input className='new-patient-input-fields' type="text" name="name" placeholder="Name" />
                    <input className='new-patient-input-fields' type="text" name="name" placeholder="Last" />
                    <input className='new-patient-input-fields' type="text" name="name" placeholder="Last" />
                </div>
            </div>
            <div className="item">
                <p>Address</p>
                <input className='new-patient-input-fields' type="text" name="name" placeholder="Street address"/>
                <input className='new-patient-input-fields' type="text" name="name" placeholder="Street address line 2"/>
                <div className="city-item">
                    <input className='new-patient-input-fields' type="text" name="name" placeholder="City" />
                    <input className='new-patient-input-fields' type="text" name="name" placeholder="Region" />
                    <input className='new-patient-input-fields' type="text" name="name" placeholder="Postal / Zip code" />
                    <select>
                        <option value="">Country</option>
                        <option value="1">Russia</option>
                        <option value="2">Germany</option>
                        <option value="3">France</option>
                        <option value="4">Armenia</option>
                        <option value="5">USA</option>
                    </select>
                </div>
            </div>
            <div className="item">
                <p>Email</p>
                <input className='new-patient-input-fields' type="text" name="name"/>
            </div>
            <div className="item">
                <p>Telephone number where you can be reached</p>
                <input className='new-patient-input-fields' type="text" name="name"/>
            </div>
            <div className="item">
                <p>Incident Date</p>
                <input className='new-patient-input-fields' type="date" name="name" required/>
                <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="item">
                <p>Incident Time</p>
                <input className='new-patient-input-fields' type="time" name="name" required/>
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
                <input className='new-patient-input-fields' type="text" name="name"/>
            </div>
            <div className="item">
                <p>Pharmacy Involved</p>
                <input className='new-patient-input-fields' type="text" name="name"/>
            </div>
            <div className="item">
                <p>Complaint filed on behalf of</p>
                <input className='new-patient-input-fields' type="text" name="name"/>
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
}

export default NewPatient
