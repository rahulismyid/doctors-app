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
import { PATIENT_MEDICAL_DETAILS_COLLECTION, PATIENT_PERSONAL_DETAILS_COLLECTION, USERS_COLLECTION } from "./constants.js";

const DbContext = React.createContext();
export function useDB() {
	return useContext(DbContext);
}

export default function DbProvider({ children }) {
	const { currentUser } = useAuth();
	const [users, setUsers] = useState([]);
	const [allPatients, setAllPatients] = useState([]);
	const usersCollectionRef = collection(db, USERS_COLLECTION);
	const patientsPersonalDetailsCollectionRef = collection(db, PATIENT_PERSONAL_DETAILS_COLLECTION);
	const patientMedicalDetailsRef = collection(db, PATIENT_MEDICAL_DETAILS_COLLECTION);

	// Fetching data from DB
	const fetchAllPatients = async () => {
		const data = await getDocs(patientsPersonalDetailsCollectionRef);
		setAllPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
			const docRef = doc(db, PATIENT_PERSONAL_DETAILS_COLLECTION, id);
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
			updateDoc(doc(db, PATIENT_PERSONAL_DETAILS_COLLECTION, id), {
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
        return await deleteDoc(doc(db, PATIENT_PERSONAL_DETAILS_COLLECTION, id));
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
			updateDoc(doc(db, PATIENT_MEDICAL_DETAILS_COLLECTION, id), {
				...data
			}).then(res => {
				resolve(res);
			}).catch(err => reject(err));
		});
    };

	const deletePatientMedicalDetails = async(id) => {
        return await deleteDoc(doc(db, PATIENT_MEDICAL_DETAILS_COLLECTION, id));
    };
	/* Patient Medical details */

	// value to return forn useDB();
	const value = {
		users,
		allPatients,
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
