import React, { useContext, useState, useEffect } from "react";
import { db } from "../config/firebase.js";
import {
	collection,
	getDocs,
	addDoc,
	// deleteDoc,
	// doc,
	// query,
	// where,
	// updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
// import { MEDICAL_DECLARATION_CONSENT_FIELDS } from "../pages/prs/Prescription/constants.js";

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

	// Fetching data from DB
	const fetchAllPatients = async () => {
		const data = await getDocs(patientsCollectionRef);
		setAllPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};
	
	const fetchAllConsents = async () => {
		const data = await getDocs(consentCollectionRef);
		let o = [];
		// console.log()
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

	// const addMedicalConsentQues = async () => {
	// 	await addDoc(consentCollectionRef, {...MEDICAL_DECLARATION_CONSENT_FIELDS}).then(res => {
	// 		console.log(res);
	// 	}).catch(err => {
	// 		console.log(err)
	// 	});
	// }

	// create new Patient in the DB
	const createPatient = async ({fName, ...data}) => {
		await addDoc(patientsCollectionRef, {
			name: fName,
			uid: currentUser.uid,
			...data
		});
	};

	// value to return forn useDB();
	const value = {
		users,
		allPatients,
		medicalConsents,
		createUser,
		createPatient,
		fetchAllPatients
	};

	useEffect(() => {
		fetchAllConsents()
		// addMedicalConsentQues();
		fetchUsers();
		fetchAllPatients();
	}, [currentUser]);

	useEffect(() => {
		// fetchAllPatients();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
}
