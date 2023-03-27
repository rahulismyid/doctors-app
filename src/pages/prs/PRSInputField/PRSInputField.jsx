import React from 'react'
import "./input-field.style.css";

const PRSInputField = (props) => {
    const {id, type = "text", errorFlag = false, errorMsg, value, className, onChange, labelName} = props;
    return (
        <div className="input-wrapper">
            <label className='input-label' htmlFor={labelName}>{labelName}</label>
            <input className='patient-input-field' id={id} name={labelName} type={type} value={value} onChange={onChange} />
        </div>
    )
}

export default PRSInputField;
