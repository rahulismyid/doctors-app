import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useDB } from "../../../contexts/DbContext";
import img1 from "./images/642cb406771ff642cb40677200001.png";
import img2 from "./images/642cb406771ff642cb40677200002.png";
import "./print-document.styles.css";


const PrintDocument = () => {

	const componentRef = useRef();

	// Page 1
	const [personalDetails, setPersonalDetails] = useState();
	const [medicalDetails, setMedicalDetails] = useState();
	// Page 1

	// Page 2
    const [ailmentsHistoryDetails, setAilmentsHistoryDetails] = useState();
    const [bodyExaminationMetrics, setBodyExaminationMetrics] = useState();
    const [bodyExaminationAilments, setBodyExaminationAilments] = useState();
    const [bodyOrgansAndTests, setBodyOrgansAndTests] = useState();
    const [contagiuosSkinDiseases, setContagiuosSkinDiseases] = useState();
    const [majorDisability, setMajorDisability] = useState();
    const [visualTestDetails, setVisualTestDetails] = useState();
    const [eyeSightDetails, setEyeSightDetails] = useState();
    const [eyeSightRemark, setEyeSightRemark] = useState();
    const [testEvaluationsAndFindings, setTestEvaluationsAndFindings] = useState();
	// Page 2
	const { id, pid } = useParams();
	const {
		fetchPatientPersonalDetails,
		fetchPatientMedicalDetails,
	} = useDB();

	useEffect(() => {
		fetchPersonalDetails();
		fetchMedicalDetails();
	},[]);

	const fetchPersonalDetails = async () => {
		const personalData = await fetchPatientPersonalDetails(id);
		setPersonalDetails(personalData[0]);
		console.log('personalData ',personalData[0]);
	};

	const fetchMedicalDetails = async() => {
		const medicalData = await fetchPatientMedicalDetails(pid);
		const newData = medicalData[0];
		if(newData) {
			setMedicalDetails(newData);
			setAilmentsHistoryDetails(newData.ailmentsHistoryDetails.sort())
			setBodyExaminationMetrics(newData.bodyExaminationMetrics.sort())
			setBodyExaminationAilments(newData.bodyExaminationAilments.sort())
			setBodyOrgansAndTests(newData.bodyOrgansAndTests.sort())
			setContagiuosSkinDiseases(newData.contagiuosSkinDiseases.sort())
			setMajorDisability(newData.majorDisability)
			setVisualTestDetails(newData.visualTestDetails.sort())
			setEyeSightDetails(newData.eyeSightDetails.sort())
			setTestEvaluationsAndFindings(newData.testEvaluationsAndFindings)
			setEyeSightRemark(newData.eyeSightRemark.eye_remark)
		}
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const renderPersonalDetails = () => {
		return (
			<>
			{personalDetails && (
				<>
					<p style={{position:'absolute', top:'307px',left:'687px',whiteSpace:'nowrap'}} className="ft10"><b>{personalDetails.mobile}</b></p>
					<p style={{position:'absolute', top:'304px',left:'577px',whiteSpace:'nowrap'}} className="ft11">Mobile No.:</p>
					<p style={{position:'absolute', top:'252px',left:'188px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.name}/ {personalDetails.code}</b></p>
					<p style={{position:'absolute', top:'250px',left:'61px',whiteSpace:'nowrap'}} className="ft11">Name/Code:</p>
					<p style={{position:'absolute', top:'304px',left:'61px',whiteSpace:'nowrap'}} className="ft11">SO</p>
					<p style={{position:'absolute', top:'334px',left:'222px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.present_address}</b></p>
					<p style={{position:'absolute', top:'331px',left:'61px',whiteSpace:'nowrap'}} className="ft15">Present Address:<br/>Emergency Contact Person:</p>
					<p style={{position:'absolute', top:'361px',left:'797px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.emergency_mobile}</b></p>
					<p style={{position:'absolute', top:'359px',left:'577px',whiteSpace:'nowrap'}} className="ft11">Emergency Mobile No.:</p>
					<p style={{position:'absolute', top:'364px',left:'327px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.emergency_contact_person}</b></p>
					<p style={{position:'absolute', top:'280px',left:'209px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.doj}</b></p>
					<p style={{position:'absolute', top:'41px',left:'699px',whiteSpace:'nowrap'}} className="ft11">Reg. No. CL/8462/FEB-2019&#160;</p>
					<p style={{position:'absolute', top:'61px',left:'220px',whiteSpace:'nowrap'}} className="ft13"><b>Aaradhya Polyclinic and Diagnostic Center</b></p>
					<p style={{position:'absolute', top:'108px',left:'439px',whiteSpace:'nowrap'}} className="ft14"><b>&#160;ISO 9001 : 2015 Certified</b></p>
					<p style={{position:'absolute', top:'135px',left:'241px',whiteSpace:'nowrap'}} className="ft14"><b>177, Priyadarshini Colony, phase-2, Bagsevaniya, Bhopal (M.P.)</b></p>
					<p style={{position:'absolute', top:'162px',left:'263px',whiteSpace:'nowrap'}} className="ft14"><b>E-mail: sudheersharma108@gmail.com, Mob.:8770538618</b></p>
					<p style={{position:'absolute', top:'216px',left:'443px',whiteSpace:'nowrap'}} className="ft12"><b>Personal details</b></p>
					<p style={{position:'absolute', top:'250px',left:'577px',whiteSpace:'nowrap'}} className="ft11">Age (in yrs):</p>
					<p style={{position:'absolute', top:'250px',left:'746px',whiteSpace:'nowrap'}} className="ft11">Gender :</p>
					<p style={{position:'absolute', top:'277px',left:'61px',whiteSpace:'nowrap'}} className="ft11">Date of joining:</p>
					<p style={{position:'absolute', top:'277px',left:'577px',whiteSpace:'nowrap'}} className="ft11">Department:</p>
					<p style={{position:'absolute', top:'1230px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Date :-</p>
					<p style={{position:'absolute', top:'1232px',left:'150px',whiteSpace:'nowrap'}} className="ft12"><b>{new Date().toLocaleString('default', {day: "2-digit", month: "long", year: "numeric"})}</b></p>
					<p style={{position:'absolute', top:'253px',left:'830px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.gender}</b></p>
					<p style={{position:'absolute', top:'253px',left:'694px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.age}</b></p>
					<p style={{position:'absolute', top:'306px',left:'100px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.son_of}</b></p>
					<p style={{position:'absolute', top:'304px',left:'88px',whiteSpace:'nowrap'}} className="ft11">:</p>
					<p style={{position:'absolute', top:'280px',left:'705px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.department}</b></p>
				</>
			)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ11 = () => {
		return (
			<>
			{ailmentsHistoryDetails && (
				<>
					<p style={{position:'absolute', top:'464px',left:'59px',whiteSpace:'nowrap'}} className="ft11">1</p>
					<p style={{position:'absolute', top:'464px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Do you suffer / have suffered from:</p>
					<p style={{position:'absolute', top:'493px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Vertigo</p>
					<p style={{position:'absolute', top:'492px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['vertigo']} readOnly />
					</p>
					<p style={{position:'absolute', top:'493px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Giddiness</p>
					<p style={{position:'absolute', top:'492px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['giddiness']} readOnly />
					</p>
					<p style={{position:'absolute', top:'493px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Running Ear</p>
					<p style={{position:'absolute', top:'492px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['running_ear']} readOnly />
					</p>
					<p style={{position:'absolute', top:'493px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Epilepsy</p>
					<p style={{position:'absolute', top:'492px',left:'739px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['epilepsy']} readOnly />
					</p>
					<p style={{position:'absolute', top:'520px',left:'87px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'520px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[0].options[0]['remark_q11']}</b></p>
				</>
			)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ12 = () => {
		return (
			<>{ailmentsHistoryDetails && (
				<>
					<p style={{position:'absolute', top:'554px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Heart Disease</p>
					<p style={{position:'absolute', top:'554px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['heart_disease']} readOnly />
					</p>
					<p style={{position:'absolute', top:'554px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Diabetes</p>
					<p style={{position:'absolute', top:'554px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['diabetes']} readOnly />
					</p>
					<p style={{position:'absolute', top:'554px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Hypertension</p>
					<p style={{position:'absolute', top:'554px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['hypertension']} readOnly />
					</p>
					<p style={{position:'absolute', top:'554px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Paralysis</p>
					<p style={{position:'absolute', top:'554px',left:'739px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['paralysis']} readOnly />
					</p>
					<p style={{position:'absolute', top:'586px',left:'114px',whiteSpace:'nowrap'}} className="ft11">TB</p>
					<p style={{position:'absolute', top:'586px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['tb']} readOnly />
					</p>
					<p style={{position:'absolute', top:'586px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Other Major Illness</p>
					<p style={{position:'absolute', top:'586px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['other_major_illness']} readOnly />
					</p>
					<p style={{position:'absolute', top:'614px',left:'90px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'614px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[0].options[0]['remark_q12']}</b></p>
					<p style={{position:'absolute', top:'645px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Allergy to any medicine or object</p>
					<p style={{position:'absolute', top:'645px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[2]['allergy_to_any_medicine_or_object']} readOnly />
					</p>
					<p style={{position:'absolute', top:'645px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Asthma</p>
					<p style={{position:'absolute', top:'645px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[2]['asthama']} readOnly />
					</p>
					<p style={{position:'absolute', top:'673px',left:'90px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'673px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[0].options[0]['remark_q13']}</b></p>
				</>
			)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ21 = () => {
		return (
			<>{ailmentsHistoryDetails && (
				<>
					<p style={{position:'absolute', top:'700px',left:'59px',whiteSpace:'nowrap'}} className="ft11">2</p>
					<p style={{position:'absolute', top:'700px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Does your parent or brother/sister, have from any of above disease&#160;</p>
					<p style={{position:'absolute', top:'702px',left:'887px',whiteSpace:'nowrap'}} className="ft12"><b>{!ailmentsHistoryDetails[1].options[0]['remark_q21'] ? "No" : "Yes"}</b></p>
					<p style={{position:'absolute', top:'700px',left:'857px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[1].options[0]['remark_q21']} readOnly />
					</p>
					<p style={{position:'absolute', top:'730px',left:'90px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'730px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[1].options[0]['remark_q21']}</b></p>
				</>
			)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ31 = () => {
		return (
			<>
			{ailmentsHistoryDetails && (
				<>
					<p style={{position:'absolute', top:'760px',left:'59px',whiteSpace:'nowrap'}} className="ft11">3</p>
					<p style={{position:'absolute', top:'760px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Do you have/had:</p>
					<p style={{position:'absolute', top:'784px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Smoking</p>
					<p style={{position:'absolute', top:'784px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['smoking']} readOnly />
					</p>
					<p style={{position:'absolute', top:'784px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Tobacco</p>
					<p style={{position:'absolute', top:'784px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['tobacco']} readOnly />
					</p>
					<p style={{position:'absolute', top:'784px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Alcohol</p>
					<p style={{position:'absolute', top:'784px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['alcohol']} readOnly />
					</p>
					<p style={{position:'absolute', top:'784px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Other Addiction</p>
					<p style={{position:'absolute', top:'784px',left:'739px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['other_addiction']} readOnly />
					</p>
					<p style={{position:'absolute', top:'815px',left:'90px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'815px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[2].options[0]['remark_q31']}</b></p>
					<p style={{position:'absolute', top:'856px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Height Phobia</p>
					<p style={{position:'absolute', top:'856px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[1]['height_phobia']} readOnly />
					</p>
					<p style={{position:'absolute', top:'856px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Fear Of Confined Space</p>
					<p style={{position:'absolute', top:'856px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[1]['fear_of_confined_space']} readOnly />
					</p>
					<p style={{position:'absolute', top:'888px',left:'90px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'888px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[2].options[1]['remark_q32']}</b></p>
				</>
			)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ41 = () => {
		return (
			<>{ailmentsHistoryDetails && (
				<>
					<p style={{position:'absolute', top:'925px',left:'59px',whiteSpace:'nowrap'}} className="ft11">4</p>
					<p style={{position:'absolute', top:'925px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Have you undergone any surgery (other than family planning)?</p>
					<p style={{position:'absolute', top:'925px',left:'887px',whiteSpace:'nowrap'}} className="ft12"><b>{!ailmentsHistoryDetails[3].options[0]['remark_q41'] ? "No" : "Yes"}</b></p>
					<p style={{position:'absolute', top:'925px',left:'857px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[3].options[0]['remark_q41']} readOnly />
					</p>
					<p style={{position:'absolute', top:'957px',left:'90px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'957px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[3].options[0]['remark_q41']}</b></p>
				</>
			)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ51 = () => {
		return (
			<>
			{ailmentsHistoryDetails && (
				<>
					<p style={{position:'absolute', top:'991px',left:'55px',whiteSpace:'nowrap'}} className="ft11">5</p>
					<p style={{position:'absolute', top:'991px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Are you taking any medicine on regular basis?&#160;</p>
					<p style={{position:'absolute', top:'991px',left:'887px',whiteSpace:'nowrap'}} className="ft12"><b>{!ailmentsHistoryDetails[4].options[0]['remark_q51'] ? "No" : "Yes"}</b></p>
					<p style={{position:'absolute', top:'991px',left:'857px',whiteSpace:'nowrap'}} className="ft11">
					<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[4].options[0]['remark_q51']} readOnly />
					</p>
					<p style={{position:'absolute', top:'1024px',left:'90px',whiteSpace:'nowrap'}} className="ft11"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'1024px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[4].options[0]['remark_q51']}</b></p>
				</>
			)}
			</>
		);
	};


	const renderMedicalExaminationSection1 = () => {
		return (
			<>
			{bodyExaminationMetrics && (
				<>
					<p style={{position:'absolute', top:'72px', left:'85px', whiteSpace:'nowrap' }} className="ft16">Height (in cm)</p>
					<p style={{position:'absolute', top:'100px', left:'131px', whiteSpace:'nowrap' }} className="ft22"><b>{bodyExaminationMetrics[0].value}</b></p>
					<p style={{position:'absolute', top:'72px', left:'236px', whiteSpace:'nowrap' }} className="ft16">Weight(in Kg)</p>
					<p style={{position:'absolute', top:'100px', left:'284px', whiteSpace:'nowrap' }} className="ft22"><b>{bodyExaminationMetrics[1].value}</b></p>
					<p style={{position:'absolute', top:'72px', left:'405px', whiteSpace:'nowrap' }} className="ft16">BMI</p>
					<p style={{position:'absolute', top:'100px', left:'401px', whiteSpace:'nowrap' }} className="ft22"><b>{bodyExaminationMetrics[2].value}</b></p>
					<p style={{position:'absolute', top:'72px', left:'485px', whiteSpace:'nowrap' }} className="ft16">Pulse Rate</p>
					<p style={{position:'absolute', top:'100px', left:'521px', whiteSpace:'nowrap' }} className="ft22"><b>{bodyExaminationMetrics[3].value}</b></p>
					<p style={{position:'absolute', top:'72px', left:'644px', whiteSpace:'nowrap' }} className="ft16">BP (mm of Hg)</p>
					<p style={{position:'absolute', top:'97px', left:'594px', whiteSpace:'nowrap' }} className="ft16">Max Bp:</p>
					<p style={{position:'absolute', top:'100px', left:'794px', whiteSpace:'nowrap' }} className="ft22"><b>{bodyExaminationMetrics[4].value}</b></p>
					<p style={{position:'absolute', top:'97px', left:'716px', whiteSpace:'nowrap' }} className="ft16">Min Bp:</p>
					<p style={{position:'absolute', top:'100px', left:'675px', whiteSpace:'nowrap' }} className="ft22"><b>{bodyExaminationMetrics[5].value}</b></p>
					<p style={{position:'absolute', top:'72px', left:'830px', whiteSpace:'nowrap' }} className="ft16">Respiratory Rate</p>
					<p style={{position:'absolute', top:'100px', left:'892px', whiteSpace:'nowrap' }} className="ft22"><b>{bodyExaminationMetrics[6].value}</b></p>
				</>
			)}
			</>
		)
	};

	const renderMedicalExaminationSection2 = () => {
		return (
			<>
			{bodyExaminationAilments && (
				<>
					<p style={{position:'absolute', top:'122px', left:'113px', whiteSpace:'nowrap' }} className="ft16">Pallor</p>
					<p style={{position:'absolute', top:'119px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.2)'}} checked={bodyExaminationAilments[0].value} readOnly />
					</p>

					<p style={{position:'absolute', top:'122px', left:'213px', whiteSpace:'nowrap' }} className="ft16">Lnpathy</p>
					<p style={{position:'absolute', top:'119px',left:'190px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.2)'}} checked={bodyExaminationAilments[1].value} readOnly />
					</p>

					<p style={{position:'absolute', top:'122px', left:'331px', whiteSpace:'nowrap' }} className="ft16">Cynosis</p>
					<p style={{position:'absolute', top:'119px',left:'308px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.2)'}} checked={bodyExaminationAilments[2].value} readOnly />
					</p>

					<p style={{position:'absolute', top:'122px', left:'459px', whiteSpace:'nowrap' }} className="ft16">Clubbing</p>
					<p style={{position:'absolute', top:'119px',left:'438px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.2)'}} checked={bodyExaminationAilments[3].value} readOnly />
					</p>

					<p style={{position:'absolute', top:'122px', left:'604px', whiteSpace:'nowrap' }} className="ft16">Edema</p>
					<p style={{position:'absolute', top:'119px',left:'581px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.2)'}} checked={bodyExaminationAilments[4].value} readOnly />
					</p>

					<p style={{position:'absolute', top:'122px', left:'736px', whiteSpace:'nowrap' }} className="ft16">Icterus</p>
					<p style={{position:'absolute', top:'119px',left:'715px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.2)'}} checked={bodyExaminationAilments[5].value} readOnly />
					</p>

					<p style={{position:'absolute', top:'122px', left:'857px', whiteSpace:'nowrap' }} className="ft16">Other</p>
					<p style={{position:'absolute', top:'119px',left:'835px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.2)'}} checked={bodyExaminationAilments[6].value} readOnly />
					</p>

					<p style={{position:'absolute', top:'149px', left:'88px', whiteSpace:'nowrap' }} className="ft16"><u>Remarks:</u></p>
					<p style={{position:'absolute', top:'147px', left:'165px', whiteSpace:'nowrap' }} className="ft12"><b>{bodyExaminationAilments[7].value}</b></p>
				</>
			)}
			</>
		)
	};

	const renderMedicalExaminationSection3 = () => {
		return (
			<>{bodyOrgansAndTests && (
				<>
					<p style={{position:'absolute', top:'176px', left:'88px', whiteSpace:'nowrap' }} className="ft12">CVS:</p>
					<p style={{position:'absolute', top:'200px', left:'88px', whiteSpace:'nowrap' }} className="ft28"><b>{bodyOrgansAndTests[0].value}</b></p>
					<p style={{position:'absolute', top:'180px', left:'223px', whiteSpace:'nowrap' }} className="ft12">R.S.:</p>
					<p style={{position:'absolute', top:'200px', left:'223px', whiteSpace:'nowrap' }} className="ft28"><b>{bodyOrgansAndTests[1].value}</b></p>
					<p style={{position:'absolute', top:'176px', left:'520px', whiteSpace:'nowrap' }} className="ft12">P/A:</p>
					<p style={{position:'absolute', top:'200px', left:'520px', whiteSpace:'nowrap' }} className="ft28"><b>{bodyOrgansAndTests[2].value}</b></p>
					<p style={{position:'absolute', top:'176px', left:'601px', whiteSpace:'nowrap' }} className="ft12">CNS:</p>
					<p style={{position:'absolute', top:'200px', left:'601px', whiteSpace:'nowrap' }} className="ft28"><b>{bodyOrgansAndTests[3].value}</b></p>
					<p style={{position:'absolute', top:'225px', left:'88px', whiteSpace:'nowrap' }} className="ft12">ENT:</p>
					<div style={{maxHeight: '40px',overflow: 'hidden',position: 'absolute', top:'250px', left:'79px', whiteSpace:'nowrap', lineHeight: 1}} className="ft16">
						<p style={{width:'305px',overflow:'hidden', whiteSpace:'initial'}} className="ft28"><b>{bodyOrgansAndTests[4].value}</b></p>
					</div>
					<p style={{position:'absolute', top:'225px', left:'398px', whiteSpace:'nowrap' }} className="ft12">Musculoskeletal System:</p>
					<div style={{maxHeight: '40px',overflow: 'hidden',position: 'absolute', top:'251px', left:'396px', whiteSpace:'nowrap', lineHeight: 1}} className="ft16">
						<p style={{width:'305px',overflow:'hidden', whiteSpace:'initial'}} className="ft28"><b>{bodyOrgansAndTests[5].value}</b></p>
					</div>
					<p style={{position:'absolute', top:'225px', left:'722px', whiteSpace:'nowrap' }} className="ft12">Genitourinary System:</p>
					<div style={{maxHeight: '40px',overflow: 'hidden',position: 'absolute', top:'251px', left:'720px', whiteSpace:'nowrap', lineHeight: 1}} className="ft16">
						<p style={{width:'259px',overflow:'hidden', whiteSpace:'initial'}} className="ft28"><b>{bodyOrgansAndTests[6].value}</b></p>
					</div>
				</>
			)}
			</>
		)
	};

	const renderMedicalExaminationSection4 = () => {
		return (
			<>
			{contagiuosSkinDiseases && (
				<>
					<p style={{position:'absolute', top:'297px', left:'88px', whiteSpace:'nowrap' }} className="ft12">Contagious skin disease? such as</p>
					<p style={{position:'absolute', top:'297px', left:'439px', whiteSpace:'nowrap' }} className="ft12">Scabies</p>
					<p style={{position:'absolute', top:'297px',left:'419px',whiteSpace:'nowrap'}} className="ft12">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={contagiuosSkinDiseases[0].options[0]['scabies']} readOnly />
					</p>
					<p style={{position:'absolute', top:'297px', left:'547px', whiteSpace:'nowrap' }} className="ft12">Dermatitis</p>
					<p style={{position:'absolute', top:'297px',left:'526px',whiteSpace:'nowrap'}} className="ft12">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={contagiuosSkinDiseases[0].options[0]['dermatitis']} readOnly />
					</p>
					<p style={{position:'absolute', top:'297px', left:'695px', whiteSpace:'nowrap' }} className="ft12">Boils</p>
					<p style={{position:'absolute', top:'297px',left:'675px',whiteSpace:'nowrap'}} className="ft12">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={contagiuosSkinDiseases[0].options[0]['boils']} readOnly />
					</p>
					<p style={{position:'absolute', top:'297px', left:'803px', whiteSpace:'nowrap' }} className="ft12">Cuts</p>
					<p style={{position:'absolute', top:'297px',left:'783px',whiteSpace:'nowrap'}} className="ft12">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={contagiuosSkinDiseases[0].options[0]['cuts']} readOnly />
					</p>
					<p style={{position:'absolute', top:'297px', left:'911px', whiteSpace:'nowrap' }} className="ft12">Soars</p>
					<p style={{position:'absolute', top:'297px',left:'892px',whiteSpace:'nowrap'}} className="ft12">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={contagiuosSkinDiseases[0].options[0]['soars']} readOnly />
					</p>
					<p style={{position:'absolute', top:'324px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'324px',left:'160px',whiteSpace:'nowrap'}} className="ft12"><b>{contagiuosSkinDiseases[0].remarks_4}</b></p>
				</>
			)}
			{majorDisability && (
				<>
					<p style={{position:'absolute', top:'352px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><u>Any major deformity/disability?</u></p>
					<p style={{position:'absolute', top:'352px', left:'348px', whiteSpace:'nowrap' }} className="ft12"><b>{majorDisability.yes ? "Yes" : "No"}</b></p>
					<p style={{position:'absolute', top:'352px', left:'390px', whiteSpace:'nowrap' }} className="ft12"><u>Details:</u></p>
					<p style={{position:'absolute', top:'352px', left:'452px', whiteSpace:'nowrap' }} className="ft12"><b>{majorDisability.details}</b></p>
					<p style={{position:'absolute', top:'380px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><u>Remarks:</u></p>
					<p style={{position:'absolute', top:'380px', left:'168px', whiteSpace:'nowrap' }} className="ft12"><b>{majorDisability.remark}</b></p>
					<p style={{position:'absolute', top:'442px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>1. Visual Activity:</b></p>
					<p style={{position:'absolute', top:'440px',left:'341px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={majorDisability.eye_test_done} readOnly />
					</p>
					<p style={{position:'absolute', top:'442px', left:'365px', whiteSpace:'nowrap' }} className="ft12">Eye Test Done</p>
				</>
			)}
			</>
		)
	};

	const renderMedicalExaminationSection5 = () => {
		return (
			<>
			{visualTestDetails && (
				<>
					{/* Visual Activity */}
					<p style={{position:'absolute', top:'477px', left:'145px', whiteSpace:'nowrap' }} className="ft12">Color Vision</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'510px', left:'96px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{width:'236px', overflow:'hidden'}} className="ft22"><b>{visualTestDetails[0].value}</b></p>
					</div>
					<p style={{position:'absolute', top:'477px', left:'396px', whiteSpace:'nowrap' }} className="ft12">Vision With Glasses</p>
					<p style={{position:'absolute', top:'503px', left:'326px', whiteSpace:'nowrap' }} className="ft12">Right Eye</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'505px', left:'410px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{visualTestDetails[1].value}</b></p>
					</div>
					<p style={{position:'absolute', top:'531px', left:'327px', whiteSpace:'nowrap' }} className="ft12">Left Eye</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'533px', left:'410px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{visualTestDetails[2].value}</b></p>
					</div>

					<p style={{position:'absolute', top:'477px', left:'712px', whiteSpace:'nowrap' }} className="ft12">Vision Without Glasses</p>
					<p style={{position:'absolute', top:'504px', left:'646px', whiteSpace:'nowrap' }} className="ft12">Right Eye</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'505px', left:'735px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{visualTestDetails[3].value}</b></p>
					</div>
					<p style={{position:'absolute', top:'531px', left:'651px', whiteSpace:'nowrap' }} className="ft12">Left Eye</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'532px', left:'735px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{visualTestDetails[4].value}</b></p>
					</div>
					{/* Visual Activity */}

					{/* Dist */}
					<p style={{position:'absolute', top:'607px', left:'81px', whiteSpace:'nowrap' }} className="ft12"><b>Dist.&gt;&gt;</b></p>
					<p style={{position:'absolute', top:'554px', left:'311px', whiteSpace:'nowrap' }} className="ft12">Right Eye</p>
					<p style={{position:'absolute', top:'581px', left:'179px', whiteSpace:'nowrap' }} className="ft12">SPH</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'180px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.r_sph}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'282px', whiteSpace:'nowrap' }} className="ft12">CYL</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'280px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.r_cyl}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'386px', whiteSpace:'nowrap' }} className="ft12">AXIS</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'380px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.r_axis}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'494px', whiteSpace:'nowrap' }} className="ft12">VN</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'490px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.r_vn}</b></p>
					</div>

					<p style={{position:'absolute', top:'554px', left:'732px', whiteSpace:'nowrap' }} className="ft12">Left Eye</p>
					<p style={{position:'absolute', top:'581px', left:'591px', whiteSpace:'nowrap' }} className="ft12">SPH</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'590px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.l_sph}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'700px', whiteSpace:'nowrap' }} className="ft12">CYL</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'695px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.l_cyl}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'801px', whiteSpace:'nowrap' }} className="ft12">AXIS</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'790px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.l_axis}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'912px', whiteSpace:'nowrap' }} className="ft12">VN</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'612px', left:'900px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[0].eye_power[0].options.l_vn}</b></p>
					</div>
					{/* Dist */}

					{/* Near */}
					<p style={{position:'absolute', top:'636px', left:'81px', whiteSpace:'nowrap' }} className="ft12"><b>Near.&gt;&gt;</b></p>
					<p style={{position:'absolute', top:'554px', left:'311px', whiteSpace:'nowrap' }} className="ft12">Right Eye</p>
					<p style={{position:'absolute', top:'581px', left:'179px', whiteSpace:'nowrap' }} className="ft12">SPH</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'180px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.r_sph}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'282px', whiteSpace:'nowrap' }} className="ft12">CYL</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'280px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.r_cyl}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'386px', whiteSpace:'nowrap' }} className="ft12">AXIS</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'380px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.r_axis}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'494px', whiteSpace:'nowrap' }} className="ft12">VN</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'490px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.r_vn}</b></p>
					</div>

					<p style={{position:'absolute', top:'554px', left:'732px', whiteSpace:'nowrap' }} className="ft12">Left Eye</p>
					<p style={{position:'absolute', top:'581px', left:'591px', whiteSpace:'nowrap' }} className="ft12">SPH</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'590px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.l_sph}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'700px', whiteSpace:'nowrap' }} className="ft12">CYL</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'695px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.l_cyl}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'801px', whiteSpace:'nowrap' }} className="ft12">AXIS</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'790px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.l_axis}</b></p>
					</div>
					<p style={{position:'absolute', top:'581px', left:'912px', whiteSpace:'nowrap' }} className="ft12">VN</p>
					<div style={{maxHeight: '50px',overflow: 'hidden',position:'absolute', top:'641px', left:'900px', whiteSpace:'nowrap', lineHeight: 1}} className="ft12">
						<p style={{whiteSpace:'nowrap' }} className="ft12"><b>{eyeSightDetails[1].eye_power[0].options.l_vn}</b></p>
					</div>
					{/* Near */}
					<p style={{position:'absolute', top:'667px', left:'89px', whiteSpace:'nowrap' }} className="ft12"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'667px', left:'160px', whiteSpace:'nowrap' }} className="ft12">{eyeSightRemark}</p>
				</>
			)}
			</>
		);
	};

	const renderMedicalExaminationSection6 = () => {
		return (
			<>
			{testEvaluationsAndFindings && (
				<>
					<p style={{position:'absolute', top:'695px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>2. Ecg Findings:</b></p>
					<p style={{position:'absolute', top:'695px', left:'215px', whiteSpace:'nowrap' }} className="ft12"><b>{testEvaluationsAndFindings.ecg_done_remark}</b></p>
					<p style={{position:'absolute', top:'695px', left:'837px', whiteSpace:'nowrap' }} className="ft12">Ecg Done</p>
					<p style={{position:'absolute', top:'693px',left:'923px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={testEvaluationsAndFindings.ecg_done} readOnly />
					</p>
					<p style={{position:'absolute', top:'736px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>3. Lab Test Report No.:</b></p>
					<p style={{position:'absolute', top:'736px', left:'270px', whiteSpace:'nowrap' }} className="ft12"><b>{testEvaluationsAndFindings.lab_sample_taken_value}</b></p>

					<p style={{position:'absolute', top:'736px', left:'768px', whiteSpace:'nowrap' }} className="ft12">Lab Sample Taken</p>
					<p style={{position:'absolute', top:'734px',left:'923px',whiteSpace:'nowrap'}} className="ft11">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={testEvaluationsAndFindings.lab_sample_taken} readOnly />
					</p>
					{/* <p style={{position:'absolute', top:'736px', left:'270px', whiteSpace:'nowrap' }} className="ft12"><b>{testEvaluationsAndFindings.lab_sample_taken_value}</b></p> */}

					<p style={{position:'absolute', top:'776px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>4. Audiometry</b></p>
					<p style={{position:'absolute', top:'776px',left:'223px',whiteSpace:'nowrap'}} className="ft11">{testEvaluationsAndFindings.audiometry_done_checked ? "Done" : "Not Done"}</p>

					<p style={{position:'absolute', top:'776px', left:'338px', whiteSpace:'nowrap' }} className="ft12"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'776px', left:'419px', whiteSpace:'nowrap' }} className="ft12"><b>{testEvaluationsAndFindings.audiometry_done_value}</b></p>
					<p style={{position:'absolute', top:'776px', left:'773px', whiteSpace:'nowrap' }} className="ft12">Audiometry Done</p>
					<p style={{position:'absolute', top:'776px', left:'922px', whiteSpace:'nowrap' }} className="ft12">
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={testEvaluationsAndFindings.audiometry_done_checked} readOnly />
					</p>
					<p style={{position:'absolute', top:'817px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>Abnormal Reports if any</b>:</p>
					<p style={{position:'absolute', top:'817px', left:'298px', whiteSpace:'nowrap' }} className="ft12"><b>{testEvaluationsAndFindings.abnormal_reports_value}</b></p>
					<p style={{position:'absolute', top:'853px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>Deworming (with Albendazole 400mg):</b></p>
					<p style={{position:'absolute', top:'853px', left:'418px', whiteSpace:'nowrap' }} className="ft12"><b>{testEvaluationsAndFindings.deworming_value}</b></p>
					<p style={{position:'absolute', top:'884px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><u>Remark:</u></p>
					<p style={{position:'absolute', top:'884px', left:'163px', whiteSpace:'nowrap' }} className="ft12">{testEvaluationsAndFindings.deworming_remark}</p>
					<p style={{position:'absolute', top:'926px', left:'88px', whiteSpace:'nowrap' }} className="ft12">Covid Vaccination:</p>
					<p style={{position:'absolute', top:'926px', left:'244px', whiteSpace:'nowrap' }} className="ft12"><b>{testEvaluationsAndFindings.covid_value}</b></p>
				</>
			)}
			</>
		);
	};

	const renderMedicalExaminationSection7 = () => {
		return (
			<>{testEvaluationsAndFindings && (
				<>
					<p style={{position:'absolute', top:'959px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>Further Evaluation (if any):</b></p>
					<p style={{position:'absolute', top:'959px', left:'322px', whiteSpace:'nowrap' }} className="ft12">{testEvaluationsAndFindings.evaluation_value}</p>
					<p style={{position:'absolute', top:'986px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>Treatment advised (if any):</b></p>
					<p style={{position:'absolute', top:'986px', left:'322px', whiteSpace:'nowrap' }} className="ft12">{testEvaluationsAndFindings.treatment_value}</p>
					<p style={{position:'absolute', top:'1013px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>Restriction Advised (ifany):</b></p>
					<p style={{position:'absolute', top:'1013px', left:'322px', whiteSpace:'nowrap' }} className="ft12">{testEvaluationsAndFindings.restriction_value}</p>
					<p style={{position:'absolute', top:'1040px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><b>Follow-up advised (If any):</b></p>
						<p style={{position:'absolute', top:'1040px', left:'322px', whiteSpace:'nowrap' }} className="ft12">{testEvaluationsAndFindings.follow_up_value}</p>
					<p style={{position:'absolute', top:'1080px', left:'88px', whiteSpace:'nowrap' }} className="ft12"><u>Remark:</u></p>
					<div style={{maxHeight: '40px',overflow: 'hidden',position: 'absolute', top:'250px', left:'79px', whiteSpace:'nowrap', lineHeight: 1}} className="ft16">
						<p style={{width:'305px',overflow:'hidden', whiteSpace:'initial'}} className="ft28"><b>{bodyOrgansAndTests[4].value}</b></p>
					</div>
					<p style={{position:'absolute', top:'1080px', left:'158px', whiteSpace:'nowrap' }} className="ft12">{testEvaluationsAndFindings.remark_value}</p>
				</>
			)}</>
		);
	};

	const renderMedicalExaminationSection8 = () => {
		return (
			<>
				{testEvaluationsAndFindings && (
					<>
						<p style={{position:'absolute', top:'1135px', left:'88px', whiteSpace:'nowrap' }} className="ft12">Opinion (Checked):</p>
						<p style={{position:'absolute', top:'1135px', left:'275px', whiteSpace:'nowrap' }} className="ft12">Fit</p>
						<p style={{position:'absolute', top:'1135px',left:'275px',whiteSpace:'nowrap'}} className="ft12">
							<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={testEvaluationsAndFindings.fit} readOnly />
						</p>
						<p style={{position:'absolute', top:'1135px', left:'392px', whiteSpace:'nowrap' }} className="ft12">Fit With Restrictions</p>
						<p style={{position:'absolute', top:'1135px',left:'370px',whiteSpace:'nowrap'}} className="ft12">
							<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={testEvaluationsAndFindings.fit_with_restrictions} readOnly />
						</p>
						<p style={{position:'absolute', top:'1135px', left:'635px', whiteSpace:'nowrap' }} className="ft12">Temporary Unfit</p>
						<p style={{position:'absolute', top:'1135px',left:'613px',whiteSpace:'nowrap'}} className="ft12">
							<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={testEvaluationsAndFindings.fit_with_restrictions} readOnly />
						</p>
						<p style={{position:'absolute', top:'1135px', left:'871px', whiteSpace:'nowrap' }} className="ft12">Unfit</p>
						<p style={{position:'absolute', top:'1135px',left:'849px',whiteSpace:'nowrap'}} className="ft12">
							<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={testEvaluationsAndFindings.fit_with_restrictions} readOnly />
						</p>
						<p style={{position:'absolute', top:'1181px', left:'595px', whiteSpace:'nowrap' }} className="ft12">Seal &amp; Signature of Examining Medical Officer</p>
						<p style={{position:'absolute', top:'1249px', left:'697px', whiteSpace:'nowrap' }} className="ft12"><b><u>Dr. Namrata Singh</u></b></p>
						<p style={{position:'absolute', top:'1271px', left:'744px', whiteSpace:'nowrap' }} className="ft12"><b>MBBS</b></p>
						<p style={{position:'absolute', top:'1262px', left:'88px', whiteSpace:'nowrap' }} className="ft12">Date :-</p>
						<p style={{position:'absolute', top:'1262px', left:'155px', whiteSpace:'nowrap' }} className="ft12"><b>{new Date().toLocaleString('default', {day: "2-digit", month: "long", year: "numeric"})}</b></p>
					</>
				)}
			</>
		)
	};

	return (
		<div>
		{/* <button style={{marginTop: '10%'}} onClick={handlePrint} className="print__button">  Print </button>  */}
		<pre style={{height: '100vh', marginLeft: '5%', marginTop: '20%'}} id="json"></pre>
		{
			personalDetails && medicalDetails ? (
				<div bgcolor="#A0A0A0" vlink="blue" link="blue" ref={componentRef}
					style={{
						margin: '0 auto',
						marginTop: '5%',
						position: 'absolute',
						top: '0%',
						left: '50%',
						transform: 'translate(-50%, 0%)',
					}}
					>
					<a name="1"></a>
					<div id="page1-div" style={{position:'relative',width:'1026px',height:'1350px'}}>
						<img width="1026" height="1350" src={img1} alt="background image"/>
						{/* Personal Details */}
						{renderPersonalDetails()}
						{/* Personal Details */}

						{/* Medical Details */}
						<p style={{position:'absolute', top:'408px',left:'387px',whiteSpace:'nowrap'}} className="ft12"><b>Medical declaration &amp; Consent</b></p>
						<p style={{position:'absolute', top:'435px',left:'150px',whiteSpace:'nowrap'}} className="ft11">Please &#34; &#34; mark the appropriate (Yes or No; If yes- please give details below)</p>

						{/* Ailment Question 1 checkboxes */}
						{renderAilmentHistoryCheckboxesQ11()}
						{/* Ailment Question 1 checkboxes */}

						{/* Ailment Question 2 checkboxes */}
						{renderAilmentHistoryCheckboxesQ12()}
						{/* Ailment Question 2 checkboxes */}

						{/* Ailment Question 2 checkboxes */}
						{renderAilmentHistoryCheckboxesQ21()}
						{/* Ailment Question 2 checkboxes */}

						{/* Ailment Question 3 checkboxes */}
						{renderAilmentHistoryCheckboxesQ31()}
						{/* Ailment Question 3 checkboxes */}

						{/* Ailment Question 4 checkboxes */}
						{renderAilmentHistoryCheckboxesQ41()}
						{/* Ailment Question 4 checkboxes */}

						{/* Ailment Question 5 checkboxes */}
						{renderAilmentHistoryCheckboxesQ51()}
						{/* Ailment Question 5 checkboxes */}

						<p style={{position:'absolute', top:'1230px',left:'487px',whiteSpace:'nowrap'}} className="ft11">Signature / Left Thumb Impression of Candidate</p>
						<div style={{position:'absolute', top:'1085px',left:'61px',whiteSpace:'nowrap'}} className="ft16">
							<p style={{width:'900px',overflow:'hidden', whiteSpace:'initial'}}>
								<b>I {personalDetails.name} ,the undersigned, declare that information given above is true as per best of my
								knowledge. I hereby give the consent to perform medical examination and necessary laboratory investigating
								advised by doctor.</b>
							</p>
						</div>
					</div>
					<a name="2"></a>
					<div id="page2-div" style={{position:'relative',width:'1026px',height:'1350px'}}>
						<img width="1026" height="1350" src={img2} alt="background image"/>
						<p style={{position:'absolute', top:'40px', left:'448px', whiteSpace:'nowrap' }} className="ft12"><b>Medical examination</b></p>
						{/* Medical Examination S1 */}
						{renderMedicalExaminationSection1()}
						{/* Medical Examination S1 */}

						{/* Medical Examination S2 */}
						{renderMedicalExaminationSection2()}
						{/* Medical Examination S2 */}

						{/* Medical Examination S3 */}
						{renderMedicalExaminationSection3()}
						{/* Medical Examination S3 */}

						{/* Medical Examination S4 */}
						{renderMedicalExaminationSection4()}
						{/* Medical Examination S4 */}

						{/* Medical Examination S5 */}
						{renderMedicalExaminationSection5()}
						{/* Medical Examination S5 */}

						{/* Medical Examination S6 */}
						{renderMedicalExaminationSection6()}
						{/* Medical Examination S6 */}

						{/* Medical Examination S7 */}
						{renderMedicalExaminationSection7()}
						{/* Medical Examination S7 */}

						{/* Medical Examination S8 */}
						{renderMedicalExaminationSection8()}
						{/* Medical Examination S8 */}
					</div>
				</div>
			) : null
		}
		</div>
	)
}

export default PrintDocument;
