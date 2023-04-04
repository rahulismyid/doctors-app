import React, { useContext, useState } from "react";
import { db } from "../config/firebase.js";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const DbContext = React.createContext();
export function useDB() {
	return useContext(DbContext);
}

export default function DbProvider({ children }) {
	const { currentUser } = useAuth();
	const [users, setUsers] = useState([]);
	const [medicalConsents, setMedicalConsents] = useState([]);
	const [allPatients, setAllPatients] = useState([]);
	const usersCollectionRef = collection(db, "users");
	const patientsPersonalDetailsCollectionRef = collection(db, "patients_personal_details");
	const consentCollectionRef = collection(db, "medical_consent_questions");
	const patientMedicalDetailsRef = collection(db, "patient_medical_details");

	// Fetching data from DB
	const fetchAllPatients = async () => {
		const data = await getDocs(patientsPersonalDetailsCollectionRef);
		setAllPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const fetchAllConsents = async () => {
		const data = await getDocs(consentCollectionRef);
		let o = [];
		const obj = data.docs.map((doc) => ({ ...doc.data() }))[0]
		obj && Object.entries(obj).map((i) => {
			o.push(i[1])
			return i;
		});
		setMedicalConsents(o);
	};

	const fetchUsers = async () => {
		const data = await getDocs(usersCollectionRef);
		setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	// create new user in the DB
	const createUser = async (fName, lName, mail, contact, userId) => {
		await addDoc(usersCollectionRef, {
			firstName: fName,
			lastName: lName,
			email: mail,
			phone: contact,
			uid: userId,
		});
	};

	/* Patient Personal details */
	const createPatientPersonalDetails = (data) => new Promise((resolve, reject) => {
		addDoc(patientsPersonalDetailsCollectionRef, {
			uid: currentUser.uid,
			medical_details_added: false,		// to check if the medical details has to be updated or inserted on next screen.
			...data
		}).then(res => {
			resolve(res.id);
		}).catch(err => reject(err));
	});

	const fetchPatientPersonalDetails = (id) => {
		return new Promise((resolve, reject) => {
			const docRef = doc(db, "patients_personal_details", id);
			getDoc(docRef).then(res => {
				if (res.exists()) {
					resolve([res.data()]);
				} else {
				  // doc.data() will be undefined in this case
				  reject([]);
				}
			}).catch(err => reject(err));
		});
    };

	const updatePatientPersonalDetails = (data, id) => {
		return new Promise((resolve, reject) => {
			updateDoc(doc(db, "patients_personal_details", id), {
				medical_details_added: true,		// to check if the medical details has to be updated or inserted on next screen.
				...data
			}).then(res => {
				resolve(res);
			}).catch(err => {
				alert(err)
				reject(err);
			});
		})
	};

	const deletePatientPersonalDetails = async(id) => {
        return await deleteDoc(doc(db, "patients_personal_details", id));
    };
	/* Patient Personal details */

	/* Patient Medical details */
	const createPatientMedicalDetails = (data, pid) => {
		return new Promise((resolve, reject) => {
			addDoc(patientMedicalDetailsRef, {
				uid: currentUser.uid,
				pid,
				...data
			}).then(res => {
				resolve(res);
			}).catch(err => reject(err));
		});
	};

	const fetchPatientMedicalDetails = (pid) => {
		return new Promise((resolve, reject) => {
			getDocs(query(patientMedicalDetailsRef, where("pid", "==", `${pid}`)))
			.then(res => {
				resolve(res.docs.map((doc) => ({...doc.data(), id: doc.id })));
			}).catch(err => reject(err));
		});
    };

	const updatePatientDetails = (id, data) => {
		return new Promise((resolve, reject) => {
			updateDoc(doc(db, "patient_medical_details", id), {
				...data
			}).then(res => {
				resolve(res);
			}).catch(err => reject(err));
		});
    };

	const deletePatientMedicalDetails = async(id) => {
        return await deleteDoc(doc(db, "patient_medical_details", id));
    };
	/* Patient Medical details */

	// value to return forn useDB();
	const value = {
		users,
		allPatients,
		medicalConsents,
		createUser,
		createPatientPersonalDetails,
		fetchPatientPersonalDetails,
		updatePatientPersonalDetails,
		deletePatientPersonalDetails,
		createPatientMedicalDetails,
		fetchAllPatients,
		fetchPatientMedicalDetails,
		updatePatientDetails,
		deletePatientMedicalDetails,
	};

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
