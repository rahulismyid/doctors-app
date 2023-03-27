import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import { useAuth } from "../../../contexts/AuthContext";
import { useDB } from "../../../contexts/DbContext";
import { ADD_NEW_PATIENT_ROUTE } from "../../../routes/constants";
import { COLUMNS_HEADER_TITLE, COLUMNS_KEYS } from "./constants";
import "./patient-list.styles.css"

const DynamicTable = (props) => {
	const { tableData } = props;

	const thData =() => {
		return COLUMNS_HEADER_TITLE.map((data)=>{
			return <th key={data}>{data}</th>
		})
	}

	const tdData =() => {
		return tableData.map((data) => {
			return(<tr>
				{COLUMNS_KEYS.map((v) => {
					return <td data-label={data[v]}>{data[v]}</td>
				})}
			</tr>)
		})
   	}

	return (
		<table className="patient-list-table">
			<thead>
				<tr>
					{thData()}
				</tr>
			</thead>
			<tbody>
				{tdData()}
			</tbody>
		</table>
	)
};

const PatientList = () => {
	const { currentUser } = useAuth();
	const { allPatients } = useDB();
	const [rows, setRows] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if(allPatients && allPatients.length) {
			setRows(allPatients);
		}
	}, [allPatients]);

    const handleOnClick = () => {
        navigate('/app/add-patient', {replace: true});
    };

	return (
		<>
		<div className="patient-list-table-container">
			<Button callbackFn={handleOnClick} classNames={'homescreen-btn'} btnText={'Add New Patient'} />
			<DynamicTable tableData={rows}/>
		</div>
		</>
	);
};

export default PatientList;

export { DynamicTable};
