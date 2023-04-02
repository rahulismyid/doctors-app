import React, { useContext, useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import {
	collection,
	getDocs,
	addDoc,
	where,
	query,
	// deleteDoc,
	// doc,
	// updateDoc,
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
	const patientsCollectionRef = collection(db, "patients");
	const consentCollectionRef = collection(db, "medical_consent_questions");
	const patientMedicalDetailsRef = collection(db, "patient_medical_details");

	// Fetching data from DB
	const fetchAllPatients = async () => {
		const data = await getDocs(patientsCollectionRef);
		setAllPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};
	
	const fetchAllConsents = async () => {
		const data = await getDocs(consentCollectionRef);
		let o = [];
		const obj = data.docs.map((doc) => ({ ...doc.data() }))[0]
		Object.entries(obj).map((i) => {
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

	// create new Patient in the DB
	const createPatient = (data) => new Promise((resolve, reject) => {
		addDoc(patientsCollectionRef, {
			uid: currentUser.uid,
			...data
		}).then(res => {
			resolve(res);
		}).catch(err => reject(err));
	});

	const patientMedicalDetails = (data, pid) => {
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

	const fetchPatientDetails = async(pid) => {
        const data = await getDocs(query(patientMedicalDetailsRef, where("pid", "==", `${pid}`)));
		return data.docs.map((doc) => ({...doc.data()}));
    };

	// value to return forn useDB();
	const value = {
		users,
		allPatients,
		medicalConsents,
		patientMedicalDetails,
		createUser,
		createPatient,
		fetchAllPatients,
		fetchPatientDetails,
	};

	useEffect(() => {
		fetchAllConsents()
		fetchUsers();
	}, [currentUser]);

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
