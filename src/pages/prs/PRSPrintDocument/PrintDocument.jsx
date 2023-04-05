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
	"visualTestDetails": [
	  {
		"options": [
		  {
			"value": "Qui maiores tempore",
			"key": "color_vision",
			"m_key": "no_display"
		  }
		]
	  },
	  {
		"options": [
		  {
			"key": "right_eye",
			"value": "Dolor officia occaec",
			"m_key": "vision_with_glasses"
		  },
		  {
			"value": "Eiusmod fuga Aut cu",
			"key": "left_eye",
			"m_key": "vision_with_glasses"
		  }
		]
	  },
	  {
		"options": [
		  {
			"key": "right_eye",
			"m_key": "vision_without_glasses",
			"value": "Nemo placeat sed qu"
		  },
		  {
			"key": "left_eye",
			"m_key": "vision_without_glasses",
			"value": "Natus nulla magna di"
		  }
		]
	  }
	],
	"bodyExaminationMetrics": [
	  {
		"value": "Suscipit non quia la",
		"key": "height",
		"label": "Height (in cm)"
	  },
	  {
		"value": "Minus est fugit vol",
		"label": "Weight(in Kg)",
		"key": "weight"
	  },
	  {
		"value": "Velit id elit in qu",
		"label": "BMI",
		"key": "bmi"
	  },
	  {
		"key": "pulse_rate",
		"label": "Pulse Rate",
		"value": "Id nihil officia qui"
	  },
	  {
		"max_bp": "Max BP",
		"key": "bp_max",
		"label": "Max BP (mm of Hg)",
		"value": "Ab eum voluptate con"
	  },
	  {
		"key": "bp_min",
		"min_bp": "Min BP",
		"value": "Incididunt vel volup",
		"label": "Min BP (mm of Hg)"
	  },
	  {
		"label": "Respiratory Rate",
		"value": "Laudantium ut labor",
		"key": "respiratory_rate"
	  }
	],
	"contagiuosSkinDiseases": [
	  {
		"remarks_4": "",
		"options": [
		  {
			"dermatitis": false,
			"cuts": false,
			"scabies": true,
			"soars": true,
			"boils": false
		  }
		],
		"q": "Contagious skin disease? such as"
	  }
	],
	"eyeSightDetails": [
	  {
		"eye_power": [
		  {
			"options": {
			  "r_cyl": "Quibusdam culpa occ",
			  "r_sph": "Corporis voluptatibu",
			  "r_vn": "Incididunt qui est ",
			  "r_axis": "Ipsa do ut eum cupi",
			  "l_axis": "Omnis lorem obcaecat",
			  "l_vn": "Eius sunt et sapient",
			  "l_cyl": "Do ut suscipit hic v",
			  "l_sph": "Anim accusamus alias"
			},
			"power_type": "dist"
		  }
		],
		"eye": "Dist"
	  },
	  {
		"eye": "Near",
		"eye_power": [
		  {
			"options": {
			  "r_axis": "Vel nostrud amet as",
			  "l_cyl": "Maiores est aut ali",
			  "l_sph": "Est atque sit repel",
			  "l_vn": "Error inventore veli",
			  "l_axis": "Nisi quia eiusmod co",
			  "r_vn": "Omnis amet sunt ip",
			  "r_sph": "Maiores tempora inve",
			  "r_cyl": "Fugit necessitatibu"
			},
			"power_type": "near"
		  }
		]
	  }
	],
	"uid": "kNC2FCX7pdfPznobces6zn2jTy22",
	"ailmentsHistoryDetails": [
	  {
		"options": [
		  {
			"giddiness": false,
			"epilepsy": true,
			"vertigo": true,
			"running_ear": true,
			"remark_q11": ""
		  },
		  {
			"other_major_illness": false,
			"hypertension": false,
			"remark_q12": "",
			"paralysis": false,
			"tb": false,
			"heart_disease": false,
			"diabetes": false
		  },
		  {
			"allergy_to_any_medicine_or_object": false,
			"remark_q13": "",
			"asthama": false
		  }
		],
		"q": "Do you suffer/have suffered from?"
	  },
	  {
		"q": "Does your parent or brother/sister, have from any of above disease?",
		"options": [
		  {
			"yes_no_q21": false,
			"remark_q21": true
		  }
		]
	  },
	  {
		"options": [
		  {
			"smoking": false,
			"tobacco": true,
			"remark_q31": "",
			"other_addiction": false,
			"alcohol": false
		  },
		  {
			"remark_q32": "",
			"height_phobia": false,
			"fear_of_confined_space": false
		  }
		],
		"q": "Do you have/had?"
	  },
	  {
		"options": [
		  {
			"remark_q41": "",
			"yes_no_q41": true
		  }
		],
		"q": "Have you undergone any surgery (other than family planning)?"
	  },
	  {
		"options": [
		  {
			"yes_no_q51": true,
			"remark_q51": ""
		  }
		],
		"q": "Are you taking any medicine on regular basis?"
	  }
	],
	"majorDisability": {
	  "eye_test_done": true,
	  "yes": true,
	  "details": "Provident sequi adi",
	  "eye_test_done_q": "Visual Activity:",
	  "remark": "Id aute fugiat labo",
	  "q": "Any major deformity/disability?"
	},
	"testEvaluationsAndFindings": {
	  "audiometry_done_checked": true,
	  "abnormal_reports_q": "Abnormal Reports if any",
	  "lab_sample_taken": true,
	  "treatment_q": "Treatment advised (if any)",
	  "fit_with_restrictions": false,
	  "ecg_done": false,
	  "remark_value": "Deserunt illo nisi i",
	  "covid_value": "Facilis eum doloremq",
	  "evaluation_value": "Sed sunt quidem sus",
	  "fit": true,
	  "follow_up_value": "Incididunt pariatur",
	  "audiometry_done_value": "",
	  "deworming_q": "Deworming (with Albendazole 400mg):",
	  "ecg_done_remark": "",
	  "covid_q": "Covid Vaccination",
	  "unfit": true,
	  "abnormal_reports_value": "Aliquam voluptate ha",
	  "treatment_value": "Rerum soluta natus d",
	  "deworming_value": "Vel quod totam simil",
	  "temporary_unfit": true,
	  "ecg_q": "Ecg Findings:",
	  "audiometry_done_q": "Audiometry",
	  "lab_sample_taken_value": "",
	  "follow_up_q": "Follow-up advised (If any)",
	  "restriction_q": "Restriction Advised (ifany)",
	  "lab_sample_taken_q": "Lab Test Report No.",
	  "evaluation_q": "Further Evaluation (if any)",
	  "remark_q": "Remark",
	  "deworming_remark": "Temporibus rem vel a",
	  "restriction_value": "Ut incidunt laborum"
	},
	"bodyOrgansAndTests": [
	  {
		"key": "cvs",
		"value": "Molestiae eligendi u",
		"label": "CVS"
	  },
	  {
		"key": "rs",
		"value": "Veniam molestias qu",
		"label": "R.S."
	  },
	  {
		"value": "Vitae reprehenderit ",
		"label": "P/A",
		"key": "pa"
	  },
	  {
		"value": "Nulla voluptas id d",
		"label": "CNS",
		"key": "cns"
	  },
	  {
		"label": "ENT",
		"key": "ent",
		"value": "Dolore beatae atque "
	  },
	  {
		"value": "Pariatur Eveniet u",
		"label": "Musculoskeletal System",
		"key": "musculoskeletal_system"
	  },
	  {
		"label": "Genitourinary System",
		"key": "genitourinary_system",
		"value": "Repudiandae magnam u"
	  }
	],
	"bodyExaminationAilments": [
	  {
		"key": "pallor",
		"value": true,
		"label": "Pallor"
	  },
	  {
		"value": false,
		"label": "Lnpathy",
		"key": "lnpathy"
	  },
	  {
		"label": "Cynosis",
		"value": true,
		"key": "cynosis"
	  },
	  {
		"label": "Clubbing",
		"key": "clubbing",
		"value": false
	  },
	  {
		"key": "edema",
		"value": true,
		"label": "Edema"
	  },
	  {
		"label": "Icterus",
		"value": false,
		"key": "icterus"
	  },
	  {
		"key": "other",
		"label": "Other",
		"value": true
	  },
	  {
		"key": "remarks_2",
		"label": "Remarks",
		"value": "Minim qui et dolorib"
	  }
	],
	"pid": "64988",
	"id": "7nJ6zv9rkigO4D2FmKto"
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
		const medicalData = await fetchPatientMedicalDetails(pid);
		// const newData = MEDICAL;
		const newData = medicalData[0];
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
		// document.getElementById("json").textContent = JSON.stringify(newData.bodyExaminationMetrics, undefined, 2);
		document.getElementById("json").textContent =
			JSON.stringify(newData.ailmentsHistoryDetails.sort(), undefined, 2);
	};

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<div>
		{/* <button style={{marginTop: '10%'}} onClick={handlePrint} className="print__button">  Print </button>  */}
		<pre style={{marginTop: '10%'}} id="json"></pre>
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
						<p style={{position:'absolute', top:'408px',left:'387px',whiteSpace:'nowrap'}} className="ft12"><b>Medical declaration &amp; Consent</b></p>
						<p style={{position:'absolute', top:'435px',left:'150px',whiteSpace:'nowrap'}} className="ft11">Please &#34; &#34; mark the appropriate (Yes or No; If yes- please give details below)</p>
						<p style={{position:'absolute', top:'476px',left:'59px',whiteSpace:'nowrap'}} className="ft11">1</p>
						<p style={{position:'absolute', top:'462px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Do you suffer / have suffered from:</p>
						<p style={{position:'absolute', top:'496px',left:'142px',whiteSpace:'nowrap'}} className="ft11">Vertigo</p>
						<p style={{position:'absolute', top:'497px',left:'112px',whiteSpace:'nowrap'}} className="ft11">
							<input type="checkbox" name="" style={{transform: 'scale(1.5)'}} checked={true} />
						</p>
						<p style={{position:'absolute', top:'496px',left:'304px',whiteSpace:'nowrap'}} className="ft11">Giddiness</p>
						<p style={{position:'absolute', top:'496px',left:'432px',whiteSpace:'nowrap'}} className="ft11">Running Ear</p>
						<p style={{position:'absolute', top:'496px',left:'587px',whiteSpace:'nowrap'}} className="ft11">Epilepsy</p>
						<p style={{position:'absolute', top:'577px',left:'142px',whiteSpace:'nowrap'}} className="ft11">Heart Disease</p>
						<p style={{position:'absolute', top:'577px',left:'311px',whiteSpace:'nowrap'}} className="ft11">Diabetes</p>
						<p style={{position:'absolute', top:'577px',left:'425px',whiteSpace:'nowrap'}} className="ft11">Hypertension</p>
						<p style={{position:'absolute', top:'577px',left:'587px',whiteSpace:'nowrap'}} className="ft11">Paralysis</p>
						<p style={{position:'absolute', top:'577px',left:'702px',whiteSpace:'nowrap'}} className="ft11">TB</p>
						<p style={{position:'absolute', top:'577px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Other Major Illness</p>
						<p style={{position:'absolute', top:'638px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Allergy to any medicine or object</p>
						<p style={{position:'absolute', top:'638px',left:'770px',whiteSpace:'nowrap'}} className="ft11">Asthma</p>
						<p style={{position:'absolute', top:'700px',left:'59px',whiteSpace:'nowrap'}} className="ft11">2&#160;Does your parent or brother/sister, have from any of above disease&#160;</p>
						<p style={{position:'absolute', top:'700px',left:'807px',whiteSpace:'nowrap'}} className="ft12"><b>Yes</b></p>
						<p style={{position:'absolute', top:'761px',left:'59px',whiteSpace:'nowrap'}} className="ft11">3&#160;Do you have /had: &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;&#160;</p>
						<p style={{position:'absolute', top:'795px',left:'149px',whiteSpace:'nowrap'}} className="ft11">Smoking</p>
						<p style={{position:'absolute', top:'795px',left:'297px',whiteSpace:'nowrap'}} className="ft11">Tobacco</p>
						<p style={{position:'absolute', top:'795px',left:'439px',whiteSpace:'nowrap'}} className="ft11">Alcohol</p>
						<p style={{position:'absolute', top:'795px',left:'601px',whiteSpace:'nowrap'}} className="ft11">Other Addiction</p>
						<p style={{position:'absolute', top:'856px',left:'148px',whiteSpace:'nowrap'}} className="ft11">Height Phobia</p>
						<p style={{position:'absolute', top:'856px',left:'439px',whiteSpace:'nowrap'}} className="ft11">Fear Of Confined Space</p>
						<p style={{position:'absolute', top:'930px',left:'55px',whiteSpace:'nowrap'}} className="ft11">4&#160;Have you undergone any surgery (other than family planning) ?</p>
						<p style={{position:'absolute', top:'923px',left:'809px',whiteSpace:'nowrap'}} className="ft12"><b>No</b></p>
						<p style={{position:'absolute', top:'991px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Are you taking any medicine on regular basis?&#160;</p>
						<p style={{position:'absolute', top:'991px',left:'55px',whiteSpace:'nowrap'}} className="ft11">5</p>
						<p style={{position:'absolute', top:'991px',left:'809px',whiteSpace:'nowrap'}} className="ft12"><b>No</b></p>
						<p style={{position:'absolute', top:'734px',left:'196px',whiteSpace:'nowrap'}} className="ft12"><b>FATHER DM MOTHER ASTHMA</b></p>
						<p style={{position:'absolute', top:'883px',left:'203px',whiteSpace:'nowrap'}} className="ft12"><b>N</b></p>
						<p style={{position:'absolute', top:'604px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'530px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'665px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'734px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'822px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'883px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'1230px',left:'81px',whiteSpace:'nowrap'}} className="ft11">Date :-</p>
						<p style={{position:'absolute', top:'1232px',left:'150px',whiteSpace:'nowrap'}} className="ft12"><b>{new Date().toLocaleString('default', {day: "2-digit", month: "long", year: "numeric"})}</b></p>
						<p style={{position:'absolute', top:'253px',left:'830px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.gender}</b></p>
						<p style={{position:'absolute', top:'253px',left:'694px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.age}</b></p>
						<p style={{position:'absolute', top:'306px',left:'100px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.son_of}</b></p>
						<p style={{position:'absolute', top:'1230px',left:'487px',whiteSpace:'nowrap'}} className="ft11">Signature / Left Thumb Impression of Candidate</p>
						<p style={{position:'absolute', top:'280px',left:'705px',whiteSpace:'nowrap'}} className="ft12"><b>{personalDetails.department}</b></p>
						<div style={{position:'absolute', top:'1085px',left:'61px',whiteSpace:'nowrap'}} className="ft16">
							<p style={{width:'900px',overflow:'hidden', whiteSpace:'initial'}}>
								<b>I {personalDetails.name} ,the undersigned, declare that information given above is true as per best of my
								knowledge. I hereby give the consent to perform medical examination and necessary laboratory investigating
								advised by doctor.</b>
							</p>
						</div>
						<p style={{position:'absolute', top:'957px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'1024px',left:'115px',whiteSpace:'nowrap'}} className="ft11">Remark:</p>
						<p style={{position:'absolute', top:'304px',left:'88px',whiteSpace:'nowrap'}} className="ft11">:</p>
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
