import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { useDB } from "../../../contexts/DbContext";
import img1 from "./images/642cb406771ff642cb40677200001.png";
import img2 from "./images/642cb406771ff642cb40677200002.png";
import "./print-document.styles.css";


const PERSONAL = {
	"name": "Rahul Ajarekar",
	"mobile": "0987654321",
	"gender": "MALE",
	"age": "55",
	"uid": "kNC2FCX7pdfPznobces6zn2jTy22",
	"emergency_mobile": "1234567890",
	"department": "FINANCE",
	"present_address": "Chinchwad, Pune",
	"pid": "64988",
	"code": "1234",
	"emergency_contact_person": "0987654321",
	"son_of": "Dayanand Ajarekar",
	"medical_details_added": true,
	"doj": "2010-09-05"
};

const MEDICAL = {
	"uid": "kNC2FCX7pdfPznobces6zn2jTy22",
	"pid": "71450",
	"ailmentsHistoryDetails": [
	  {
		"q": "Do you suffer/have suffered from?",
		"options": [
		  {
			"epilepsy": true,
			"remark_key": "remark_q11",
			"giddiness": true,
			"running_ear": false,
			"vertigo": false,
			"remark_q11": "Consectetur adipisic"
		  },
		  {
			"tb": false,
			"hypertension": true,
			"remark_q12": "Dicta velit impedit",
			"heart_disease": true,
			"remark_key": "remark_q12",
			"paralysis": true,
			"diabetes": true,
			"other_major_illness": false
		  },
		  {
			"remark_key": "remark_q13",
			"allergy_to_any_medicine_or_object": true,
			"remark_q13": "Quo veniam mollitia",
			"asthama": false
		  }
		]
	  },
	  {
		"options": [
		  {
			"remark_q21": "Incididunt suscipit",
			"remark_key": "remark_q21"
		  }
		],
		"q": "Does your parent or brother/sister, have from any of above disease?"
	  },
	  {
		"options": [
		  {
			"alcohol": false,
			"smoking": false,
			"remark_q31": "Officia tenetur recu",
			"tobacco": true,
			"other_addiction": false,
			"remark_key": "remark_q31"
		  },
		  {
			"remark_key": "remark_q32",
			"height_phobia": false,
			"remark_q32": "Dolor consectetur r",
			"fear_of_confined_space": true
		  }
		],
		"q": "Do you have/had?"
	  },
	  {
		"q": "Have you undergone any surgery (other than family planning)?",
		"options": [
		  {
			"remark_q41": "Esse cumque consequ",
			"remark_key": "remark_q41"
		  }
		]
	  },
	  {
		"q": "Are you taking any medicine on regular basis?",
		"options": [
		  {
			"remark_key": "remark_q51",
			"remark_q51": "Et ex at quia placea"
		  }
		]
	  }
	],
	"majorDisability": {
	  "q": "Any major deformity/disability?",
	  "eye_test_done_q": "Visual Activity:",
	  "details": "Dolore neque minus d",
	  "remark": "Sunt aut autem vitae",
	  "yes": false,
	  "eye_test_done": false
	},
	"contagiuosSkinDiseases": [
	  {
		"q": "Contagious skin disease? such as",
		"remarks_4": "",
		"options": [
		  {
			"scabies": false,
			"cuts": false,
			"soars": false,
			"boils": false,
			"dermatitis": false
		  }
		]
	  }
	],
	"bodyExaminationMetrics": [
	  {
		"value": "Excepteur necessitat",
		"key": "height",
		"label": "Height (in cm)"
	  },
	  {
		"key": "weight",
		"value": "Possimus recusandae",
		"label": "Weight(in Kg)"
	  },
	  {
		"value": "Cupidatat eos sed e",
		"key": "bmi",
		"label": "BMI"
	  },
	  {
		"label": "Pulse Rate",
		"value": "Hic provident eiusm",
		"key": "pulse_rate"
	  },
	  {
		"label": "Max BP (mm of Hg)",
		"key": "bp_max",
		"max_bp": "Max BP",
		"value": "Assumenda culpa con"
	  },
	  {
		"key": "bp_min",
		"min_bp": "Min BP",
		"value": "Deserunt sed volupta",
		"label": "Min BP (mm of Hg)"
	  },
	  {
		"label": "Respiratory Rate",
		"value": "Facilis in id est fu",
		"key": "respiratory_rate"
	  }
	],
	"eyeSightDetails": [
	  {
		"eye_power": [
		  {
			"power_type": "dist",
			"options": {
			  "r_cyl": "Ipsam labore nisi eu",
			  "r_vn": "In rerum sequi quo s",
			  "l_cyl": "Delectus eum quae n",
			  "l_vn": "Tempore qui ipsum c",
			  "r_sph": "Illo laboriosam ut ",
			  "l_axis": "Labore veritatis ass",
			  "r_axis": "Qui nemo assumenda p",
			  "l_sph": "Nisi nesciunt non e"
			}
		  }
		],
		"eye": "Dist"
	  },
	  {
		"eye": "Near",
		"eye_power": [
		  {
			"options": {
			  "l_vn": "Officia nulla sed na",
			  "r_axis": "Quod velit quas tota",
			  "l_axis": "Qui perferendis qui ",
			  "l_cyl": "Excepturi cupiditate",
			  "r_vn": "Incidunt laboriosam",
			  "l_sph": "Inventore quisquam a",
			  "r_cyl": "Tempore ullam corru",
			  "r_sph": "Eligendi illum inci"
			},
			"power_type": "near"
		  }
		]
	  }
	],
	"testEvaluationsAndFindings": {
	  "temporary_unfit": false,
	  "audiometry_done_q": "Audiometry",
	  "treatment_q": "Treatment advised (if any)",
	  "restriction_value": "Reiciendis ipsum ni",
	  "remark_q": "Remark",
	  "restriction_q": "Restriction Advised (ifany)",
	  "evaluation_q": "Further Evaluation (if any)",
	  "unfit": false,
	  "fit": false,
	  "evaluation_value": "Numquam voluptatem i",
	  "audiometry_done_value": "",
	  "lab_sample_taken_value": "",
	  "covid_q": "Covid Vaccination",
	  "ecg_done_remark": "",
	  "audiometry_done_checked": true,
	  "deworming_remark": "Enim nulla exercitat",
	  "treatment_value": "Assumenda cupiditate",
	  "abnormal_reports_value": "Ad ea dolor non sit ",
	  "follow_up_value": "Architecto fugiat ut",
	  "fit_with_restrictions": true,
	  "covid_value": "Sunt et adipisicing",
	  "deworming_q": "Deworming (with Albendazole 400mg):",
	  "ecg_done": false,
	  "deworming_value": "Cupidatat nostrum ev",
	  "abnormal_reports_q": "Abnormal Reports if any",
	  "lab_sample_taken": true,
	  "follow_up_q": "Follow-up advised (If any)",
	  "lab_sample_taken_q": "Lab Test Report No.",
	  "remark_value": "Inventore sunt magna",
	  "ecg_q": "Ecg Findings:"
	},
	"bodyOrgansAndTests": [
	  {
		"key": "cvs",
		"label": "CVS",
		"value": "Nobis qui irure quis"
	  },
	  {
		"label": "R.S.",
		"key": "rs",
		"value": "Ut sit do eiusmod au"
	  },
	  {
		"value": "Omnis non laborum L",
		"label": "P/A",
		"key": "pa"
	  },
	  {
		"label": "CNS",
		"key": "cns",
		"value": "Deleniti nostrud nos"
	  },
	  {
		"key": "ent",
		"label": "ENT",
		"value": "Sunt magni dolorem "
	  },
	  {
		"key": "musculoskeletal_system",
		"value": "Dolore sunt a tenetu",
		"label": "Musculoskeletal System"
	  },
	  {
		"key": "genitourinary_system",
		"value": "Deleniti perferendis",
		"label": "Genitourinary System"
	  }
	],
	"bodyExaminationAilments": [
	  {
		"key": "pallor",
		"value": false,
		"label": "Pallor"
	  },
	  {
		"key": "lnpathy",
		"label": "Lnpathy",
		"value": false
	  },
	  {
		"label": "Cynosis",
		"value": false,
		"key": "cynosis"
	  },
	  {
		"label": "Clubbing",
		"value": false,
		"key": "clubbing"
	  },
	  {
		"label": "Edema",
		"value": false,
		"key": "edema"
	  },
	  {
		"label": "Icterus",
		"value": false,
		"key": "icterus"
	  },
	  {
		"key": "other",
		"value": false,
		"label": "Other"
	  },
	  {
		"label": "Remarks",
		"value": "Quo consectetur vol",
		"key": "remarks_2"
	  }
	],
	"visualTestDetails": [
	  {
		"options": [
		  {
			"value": "Et et aut sint qui a",
			"key": "color_vision",
			"m_key": "no_display"
		  }
		]
	  },
	  {
		"options": [
		  {
			"m_key": "vision_with_glasses",
			"key": "right_eye",
			"value": "Consequatur modi el"
		  },
		  {
			"m_key": "vision_with_glasses",
			"value": "Blanditiis veritatis",
			"key": "left_eye"
		  }
		]
	  },
	  {
		"options": [
		  {
			"value": "Ipsa voluptate vero",
			"m_key": "vision_without_glasses",
			"key": "right_eye"
		  },
		  {
			"value": "Animi vel quis repu",
			"key": "left_eye",
			"m_key": "vision_without_glasses"
		  }
		]
	  }
	],
	"id": "lhD5UalqoRk9pdl5yToY"
};

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
    const [testEvaluationsAndFindings, setTestEvaluationsAndFindings] = useState();
	// Page 2
	const { id, pid } = useParams();
	const {
		fetchPatientPersonalDetails,
		fetchPatientMedicalDetails,
	} = useDB();

	useEffect(() => {
		// fetchPersonalDetails();
		fetchMedicalDetails();
		setPersonalDetails(PERSONAL);
		setMedicalDetails(MEDICAL);
	},[]);

	const fetchPersonalDetails = async () => {
		const personalData = await fetchPatientPersonalDetails(id);
		setPersonalDetails(personalData[0]);
		console.log('personalData ',personalData[0]);
	};

	const fetchMedicalDetails = async() => {
		// const medicalData = await fetchPatientMedicalDetails(pid);
		const newData = MEDICAL;
		// const newData = medicalData[0];
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
		// console.log('medicalData ',medicalData[0]);
		// document.getElementById("json").textContent = JSON.stringify(newData, undefined, 2);
		document.getElementById("json").textContent =
			JSON.stringify(newData.bodyExaminationMetrics.sort(), undefined, 2);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const renderPersonalDetails = () => {
		return (
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
		);
	};

	const renderAilmentHistoryCheckboxesQ11 = () => {
		return (
			<>
				<p style={{position:'absolute', top:'464px',left:'59px',whiteSpace:'nowrap'}} className="ft11">1</p>
				<p style={{position:'absolute', top:'464px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Do you suffer / have suffered from:</p>
				<p style={{position:'absolute', top:'493px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Vertigo</p>
				<p style={{position:'absolute', top:'492px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['vertigo']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'493px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Giddiness</p>
				<p style={{position:'absolute', top:'492px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['giddiness']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'493px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Running Ear</p>
				<p style={{position:'absolute', top:'492px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['running_ear']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'493px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Epilepsy</p>
				<p style={{position:'absolute', top:'492px',left:'739px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[0]['epilepsy']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'520px',left:'87px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'520px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[0].options[0]['remark_q11']}</b></p>
				)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ12 = () => {
		return (
			<>
				<p style={{position:'absolute', top:'554px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Heart Disease</p>
				<p style={{position:'absolute', top:'554px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['heart_disease']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'554px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Diabetes</p>
				<p style={{position:'absolute', top:'554px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['diabetes']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'554px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Hypertension</p>
				<p style={{position:'absolute', top:'554px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['hypertension']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'554px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Paralysis</p>
				<p style={{position:'absolute', top:'554px',left:'739px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['paralysis']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'586px',left:'114px',whiteSpace:'nowrap'}} className="ft11">TB</p>
				<p style={{position:'absolute', top:'586px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['tb']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'586px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Other Major Illness</p>
				<p style={{position:'absolute', top:'586px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[1]['other_major_illness']} readOnly />
					)}
				</p>
				other_major_illness
				<p style={{position:'absolute', top:'614px',left:'90px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'614px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[0].options[0]['remark_q12']}</b></p>
				)}

				<p style={{position:'absolute', top:'645px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Allergy to any medicine or object</p>
				<p style={{position:'absolute', top:'645px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[2]['allergy_to_any_medicine_or_object']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'645px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Asthma</p>
				<p style={{position:'absolute', top:'645px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[0].options[2]['asthama']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'673px',left:'90px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'673px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[0].options[0]['remark_q13']}</b></p>
				)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ21 = () => {
		return (
			<>
				<p style={{position:'absolute', top:'700px',left:'59px',whiteSpace:'nowrap'}} className="ft11">2</p>
				<p style={{position:'absolute', top:'700px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Does your parent or brother/sister, have from any of above disease&#160;</p>
				<p style={{position:'absolute', top:'702px',left:'887px',whiteSpace:'nowrap'}} className="ft12"><b>{!ailmentsHistoryDetails[1].options[0]['remark_q21'] ? "No" : "Yes"}</b></p>
				<p style={{position:'absolute', top:'700px',left:'857px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[1].options[0]['remark_q21']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'730px',left:'90px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'730px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[1].options[0]['remark_q21']}</b></p>
				)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ31 = () => {
		return (
			<>
				<p style={{position:'absolute', top:'760px',left:'59px',whiteSpace:'nowrap'}} className="ft11">3</p>
				<p style={{position:'absolute', top:'760px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Do you have/had:</p>
				<p style={{position:'absolute', top:'784px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Smoking</p>
				<p style={{position:'absolute', top:'784px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['smoking']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'784px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Tobacco</p>
				<p style={{position:'absolute', top:'784px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['tobacco']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'784px',left:'542px',whiteSpace:'nowrap'}} className="ft11">Alcohol</p>
				<p style={{position:'absolute', top:'784px',left:'513px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['alcohol']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'784px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Other Addiction</p>
				<p style={{position:'absolute', top:'784px',left:'739px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[0]['other_addiction']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'815px',left:'90px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'815px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[2].options[0]['remark_q31']}</b></p>
				)}
				<p style={{position:'absolute', top:'856px',left:'114px',whiteSpace:'nowrap'}} className="ft11">Height Phobia</p>
				<p style={{position:'absolute', top:'856px',left:'90px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[1]['height_phobia']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'856px',left:'334px',whiteSpace:'nowrap'}} className="ft11">Fear Of Confined Space</p>
				<p style={{position:'absolute', top:'856px',left:'305px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[2].options[1]['fear_of_confined_space']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'888px',left:'90px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'888px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[2].options[1]['remark_q32']}</b></p>
				)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ41 = () => {
		return (
			<>
				<p style={{position:'absolute', top:'925px',left:'59px',whiteSpace:'nowrap'}} className="ft11">4</p>
				<p style={{position:'absolute', top:'925px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Have you undergone any surgery (other than family planning)?</p>
				<p style={{position:'absolute', top:'925px',left:'887px',whiteSpace:'nowrap'}} className="ft12"><b>{!ailmentsHistoryDetails[3].options[0]['remark_q41'] ? "No" : "Yes"}</b></p>
				<p style={{position:'absolute', top:'925px',left:'857px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[3].options[0]['remark_q41']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'957px',left:'90px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'957px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[3].options[0]['remark_q41']}</b></p>
				)}
			</>
		);
	};

	const renderAilmentHistoryCheckboxesQ51 = () => {
		return (
			<>
				<p style={{position:'absolute', top:'991px',left:'55px',whiteSpace:'nowrap'}} className="ft11">5</p>
				<p style={{position:'absolute', top:'991px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Are you taking any medicine on regular basis?&#160;</p>
				<p style={{position:'absolute', top:'991px',left:'887px',whiteSpace:'nowrap'}} className="ft12"><b>{!ailmentsHistoryDetails[4].options[0]['remark_q51'] ? "No" : "Yes"}</b></p>
				<p style={{position:'absolute', top:'991px',left:'857px',whiteSpace:'nowrap'}} className="ft11">
					{ailmentsHistoryDetails && (
						<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={ailmentsHistoryDetails[4].options[0]['remark_q51']} readOnly />
					)}
				</p>
				<p style={{position:'absolute', top:'1024px',left:'90px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
				{/* <p style={{position:'absolute', top:'991px',left:'809px',whiteSpace:'nowrap'}} className="ft12"><b>No</b></p> */}

				{ailmentsHistoryDetails && (
					<p style={{position:'absolute', top:'1024px',left:'175px',whiteSpace:'nowrap'}} className="ft11"><b>{ailmentsHistoryDetails[4].options[0]['remark_q51']}</b></p>
				)}
			</>
		);
	};

	return (
		<div>
		{/* <button style={{marginTop: '10%'}} onClick={handlePrint} className="print__button">  Print </button>  */}
		<pre style={{height: '100vh', marginLeft: '5%', marginTop: '10%'}} id="json"></pre>
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
						<p style={{position:'absolute', top:'1262px', left:'155px', whiteSpace:'nowrap' }} className="ft22"><b>06-MAR-23</b></p>
						<p style={{position:'absolute', top:'1262px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Date :-</p>
						<p style={{position:'absolute', top:'40px', left:'448px', whiteSpace:'nowrap' }} className="ft22"><b>Medical examination</b></p>
						<p style={{position:'absolute', top:'412px', left:'451px', whiteSpace:'nowrap' }} className="ft22"><b>Test / investigations</b></p>
						<p style={{position:'absolute', top:'473px', left:'145px', whiteSpace:'nowrap' }} className="ft21">Color Vision</p>
						<p style={{position:'absolute', top:'473px', left:'396px', whiteSpace:'nowrap' }} className="ft21">Vision With Glasses</p>
						<p style={{position:'absolute', top:'527px', left:'327px', whiteSpace:'nowrap' }} className="ft21">Left Eye</p>
						<p style={{position:'absolute', top:'500px', left:'322px', whiteSpace:'nowrap' }} className="ft21">Right Eye</p>
						<p style={{position:'absolute', top:'499px', left:'497px', whiteSpace:'nowrap' }} className="ft210"><b>6/6 N6<br/>6/6 N6</b></p>
						<p style={{position:'absolute', top:'473px', left:'712px', whiteSpace:'nowrap' }} className="ft21">Vision Without Glasses</p>
						<p style={{position:'absolute', top:'527px', left:'651px', whiteSpace:'nowrap' }} className="ft21">Left Eye</p>
						<p style={{position:'absolute', top:'500px', left:'646px', whiteSpace:'nowrap' }} className="ft21">Right Eye</p>
						<p style={{position:'absolute', top:'499px', left:'841px', whiteSpace:'nowrap' }} className="ft210"><b>6/9<br/>6/9</b></p>
						<p style={{position:'absolute', top:'581px', left:'179px', whiteSpace:'nowrap' }} className="ft21">SPH</p>
						<p style={{position:'absolute', top:'581px', left:'282px', whiteSpace:'nowrap' }} className="ft21">CYL</p>
						<p style={{position:'absolute', top:'581px', left:'386px', whiteSpace:'nowrap' }} className="ft21">AXIS</p>
						<p style={{position:'absolute', top:'581px', left:'494px', whiteSpace:'nowrap' }} className="ft21">VN</p>
						<p style={{position:'absolute', top:'554px', left:'732px', whiteSpace:'nowrap' }} className="ft21">Left Eye</p>
						<p style={{position:'absolute', top:'581px', left:'591px', whiteSpace:'nowrap' }} className="ft21">SPH</p>
						<p style={{position:'absolute', top:'581px', left:'700px', whiteSpace:'nowrap' }} className="ft21">CYL</p>
						<p style={{position:'absolute', top:'581px', left:'801px', whiteSpace:'nowrap' }} className="ft21">AXIS</p>
						<p style={{position:'absolute', top:'581px', left:'912px', whiteSpace:'nowrap' }} className="ft21">VN</p>
						<p style={{position:'absolute', top:'607px', left:'81px', whiteSpace:'nowrap' }} className="ft22"><b>Dist.&gt;&gt;</b></p>
						<p style={{position:'absolute', top:'641px', left:'81px', whiteSpace:'nowrap' }} className="ft22"><b>Near.&gt;&gt;</b></p>
						<p style={{position:'absolute', top:'662px', left:'79px', whiteSpace:'nowrap' }} className="ft21">Remark</p>
						<p style={{position:'absolute', top:'1040px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Follow-up advised (If any)</p>
						<p style={{position:'absolute', top:'1080px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Remark</p>
						<p style={{position:'absolute', top:'1134px', left:'297px', whiteSpace:'nowrap' }} className="ft21">Fit</p>
						<p style={{position:'absolute', top:'1134px', left:'392px', whiteSpace:'nowrap' }} className="ft21">Fit With Restrictions</p>
						<p style={{position:'absolute', top:'1134px', left:'635px', whiteSpace:'nowrap' }} className="ft21">Temporary Unfit</p>
						<p style={{position:'absolute', top:'1134px', left:'871px', whiteSpace:'nowrap' }} className="ft21">Unfit</p>
						<p style={{position:'absolute', top:'1134px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Opinion (Checked):</p>
						<p style={{position:'absolute', top:'1013px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Restriction Advised (ifany)</p>
						<p style={{position:'absolute', top:'986px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Treatment advised (if any)</p>
						<p style={{position:'absolute', top:'959px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Further Evaluation (if any)&#160;</p>
						<p style={{position:'absolute', top:'439px', left:'88px', whiteSpace:'nowrap' }} className="ft22"><b>1. Visual Activity:</b></p>
						<p style={{position:'absolute', top:'439px', left:'365px', whiteSpace:'nowrap' }} className="ft21">Eye Test Done</p>
						<p style={{position:'absolute', top:'176px', left:'88px', whiteSpace:'nowrap' }} className="ft21">CVS:</p>
						<p style={{position:'absolute', top:'202px', left:'88px', whiteSpace:'nowrap' }} className="ft22"><b>S1S2+</b></p>
						<p style={{position:'absolute', top:'68px', left:'85px', whiteSpace:'nowrap' }} className="ft21">Height (in cm)</p>
						<p style={{position:'absolute', top:'94px', left:'131px', whiteSpace:'nowrap' }} className="ft22"><b>179</b></p>
						<p style={{position:'absolute', top:'68px', left:'236px', whiteSpace:'nowrap' }} className="ft21">Weight(in Kg)</p>
						<p style={{position:'absolute', top:'94px', left:'284px', whiteSpace:'nowrap' }} className="ft22"><b>93</b></p>
						<p style={{position:'absolute', top:'68px', left:'405px', whiteSpace:'nowrap' }} className="ft21">BMI</p>
						<p style={{position:'absolute', top:'94px', left:'401px', whiteSpace:'nowrap' }} className="ft22"><b>29.03</b></p>
						<p style={{position:'absolute', top:'68px', left:'485px', whiteSpace:'nowrap' }} className="ft21">Pulse Rate</p>
						<p style={{position:'absolute', top:'94px', left:'521px', whiteSpace:'nowrap' }} className="ft22"><b>78</b></p>
						<p style={{position:'absolute', top:'68px', left:'644px', whiteSpace:'nowrap' }} className="ft21">BP (mm of Hg)</p>
						<p style={{position:'absolute', top:'95px', left:'594px', whiteSpace:'nowrap' }} className="ft21">Max Bp:</p>
						<p style={{position:'absolute', top:'94px', left:'794px', whiteSpace:'nowrap' }} className="ft22"><b>90</b></p>
						<p style={{position:'absolute', top:'95px', left:'716px', whiteSpace:'nowrap' }} className="ft21">Min Bp:</p>
						<p style={{position:'absolute', top:'94px', left:'675px', whiteSpace:'nowrap' }} className="ft22"><b>130</b></p>
						<p style={{position:'absolute', top:'68px', left:'830px', whiteSpace:'nowrap' }} className="ft21">Respiratory Rate</p>
						<p style={{position:'absolute', top:'94px', left:'892px', whiteSpace:'nowrap' }} className="ft22"><b>20</b></p>
						<p style={{position:'absolute', top:'122px', left:'122px', whiteSpace:'nowrap' }} className="ft21">Pallor</p>
						<p style={{position:'absolute', top:'122px', left:'216px', whiteSpace:'nowrap' }} className="ft21">Lnpathy</p>
						<p style={{position:'absolute', top:'122px', left:'331px', whiteSpace:'nowrap' }} className="ft21">Cynosis</p>
						<p style={{position:'absolute', top:'122px', left:'459px', whiteSpace:'nowrap' }} className="ft21">Clubbing</p>
						<p style={{position:'absolute', top:'122px', left:'601px', whiteSpace:'nowrap' }} className="ft21">Edema</p>
						<p style={{position:'absolute', top:'189px', left:'122px', whiteSpace:'nowrap' }} className="ft27">Icterus</p>
						<p style={{position:'absolute', top:'122px', left:'736px', whiteSpace:'nowrap' }} className="ft21">Icterus</p>
						<p style={{position:'absolute', top:'122px', left:'857px', whiteSpace:'nowrap' }} className="ft21">Other</p>
						<p style={{position:'absolute', top:'149px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Remarks</p>
						<p style={{position:'absolute', top:'176px', left:'520px', whiteSpace:'nowrap' }} className="ft21">P/A:</p>
						<p style={{position:'absolute', top:'202px', left:'520px', whiteSpace:'nowrap' }} className="ft22"><b>SOFT</b></p>
						<p style={{position:'absolute', top:'176px', left:'601px', whiteSpace:'nowrap' }} className="ft21">CNS:</p>
						<p style={{position:'absolute', top:'202px', left:'601px', whiteSpace:'nowrap' }} className="ft28"><b>CONSCIOUS ORIENTED</b></p>
						<p style={{position:'absolute', top:'223px', left:'88px', whiteSpace:'nowrap' }} className="ft21">ENT:</p>
						<p style={{position:'absolute', top:'250px', left:'88px', whiteSpace:'nowrap' }} className="ft22"><b>NAD</b></p>
						<p style={{position:'absolute', top:'223px', left:'398px', whiteSpace:'nowrap' }} className="ft21">Musculoskeletal System:</p>
						<p style={{position:'absolute', top:'250px', left:'398px', whiteSpace:'nowrap' }} className="ft22"><b>NAD</b></p>
						<p style={{position:'absolute', top:'223px', left:'722px', whiteSpace:'nowrap' }} className="ft21">Genitourinary System:</p>
						<p style={{position:'absolute', top:'250px', left:'722px', whiteSpace:'nowrap' }} className="ft22"><b>NAD</b></p>
						<p style={{position:'absolute', top:'297px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Contagious skin disease ? such as</p>
						<p style={{position:'absolute', top:'297px', left:'439px', whiteSpace:'nowrap' }} className="ft21">Scabies</p>
						<p style={{position:'absolute', top:'297px', left:'547px', whiteSpace:'nowrap' }} className="ft21">Dermatitis</p>
						<p style={{position:'absolute', top:'297px', left:'695px', whiteSpace:'nowrap' }} className="ft21">Boils</p>
						<p style={{position:'absolute', top:'297px', left:'803px', whiteSpace:'nowrap' }} className="ft21">Cuts</p>
						<p style={{position:'absolute', top:'297px', left:'911px', whiteSpace:'nowrap' }} className="ft21">Soars</p>
						<p style={{position:'absolute', top:'351px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Any major deformity / disability ?&#160;</p>
						<p style={{position:'absolute', top:'351px', left:'378px', whiteSpace:'nowrap' }} className="ft22"><b>No</b></p>
						<p style={{position:'absolute', top:'351px', left:'479px', whiteSpace:'nowrap' }} className="ft21">Details:</p>
						<p style={{position:'absolute', top:'378px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Remarks</p>
						<p style={{position:'absolute', top:'695px', left:'88px', whiteSpace:'nowrap' }} className="ft29"><b>2. Ecg Findings:</b></p>
						<p style={{position:'absolute', top:'695px', left:'230px', whiteSpace:'nowrap' }} className="ft22"><b>SINUS RYTHEM NORMAL ECG</b></p>
						<p style={{position:'absolute', top:'695px', left:'857px', whiteSpace:'nowrap' }} className="ft21">Ecg Done</p>
						<p style={{position:'absolute', top:'776px', left:'88px', whiteSpace:'nowrap' }} className="ft29"><b>4. Audiometry</b></p>
						<p style={{position:'absolute', top:'776px', left:'223px', whiteSpace:'nowrap' }} className="ft22"><b>Done</b></p>
						<p style={{position:'absolute', top:'776px', left:'338px', whiteSpace:'nowrap' }} className="ft21">Remark:</p>
						<p style={{position:'absolute', top:'776px', left:'419px', whiteSpace:'nowrap' }} className="ft22"><b>Bilateral normal hearing</b></p>
						<p style={{position:'absolute', top:'776px', left:'783px', whiteSpace:'nowrap' }} className="ft21">Audiometry Done</p>
						<p style={{position:'absolute', top:'817px', left:'88px', whiteSpace:'nowrap' }} className="ft211"><b>Abnormal Reports if any<br/></b>Deworming (with Albendazole 400mg):</p>
						<p style={{position:'absolute', top:'850px', left:'553px', whiteSpace:'nowrap' }} className="ft22"><b>No</b></p>
						<p style={{position:'absolute', top:'884px', left:'88px', whiteSpace:'nowrap' }} className="ft212">Remark:<br/>Covid Vaccination</p>
						<p style={{position:'absolute', top:'918px', left:'284px', whiteSpace:'nowrap' }} className="ft22"><b>Booster Dose</b></p>
						<p style={{position:'absolute', top:'1181px', left:'571px', whiteSpace:'nowrap' }} className="ft21">Seal &amp; Signature of Examining Medical Officer</p>
						<p style={{position:'absolute', top:'1249px', left:'697px', whiteSpace:'nowrap' }} className="ft22"><b>Dr. Namrata Singh</b></p>
						<p style={{position:'absolute', top:'1271px', left:'744px', whiteSpace:'nowrap' }} className="ft22"><b>MBBS</b></p>
						<p style={{position:'absolute', top:'736px', left:'88px', whiteSpace:'nowrap' }} className="ft29"><b>3. Lab Test Report No.</b></p>
						<p style={{position:'absolute', top:'736px', left:'290px', whiteSpace:'nowrap' }} className="ft22"><b>002106523</b></p>
						<p style={{position:'absolute', top:'736px', left:'783px', whiteSpace:'nowrap' }} className="ft21">Lab Sample Taken</p>
						<p style={{position:'absolute', top:'176px', left:'223px', whiteSpace:'nowrap' }} className="ft21">R.S.:</p>
						<p style={{position:'absolute', top:'202px', left:'223px', whiteSpace:'nowrap' }} className="ft22"><b>Bilateral &#160;Lungs Clear</b></p>
						<p style={{position:'absolute', top:'554px', left:'311px', whiteSpace:'nowrap' }} className="ft21">Right Eye</p>
						<p style={{position:'absolute', top:'324px', left:'88px', whiteSpace:'nowrap' }} className="ft21">Remark</p>
						<p style={{position:'absolute', top:'513px', left:'171px', whiteSpace:'nowrap' }} className="ft22"><b>Normal</b></p>
					</div>
				</div>
			) : null
		}
		</div>
	)
}

export default PrintDocument;
