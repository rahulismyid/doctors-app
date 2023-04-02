import { createContext, useState } from "react";

export const GlobalContext = createContext();

export default function GlobalContextProvider({ children }) {
	const [isFirstStepComplete, setIsFirstStepComplete] = useState(false);
	const [firstStepData, setFirstStepData] = useState({});
	const [modalData, setModalData] = useState({
		open: false, title: '', msg: '', callback: null
	});

	const values = {
		firstStepData,
		setFirstStepData,
		isFirstStepComplete,
		setIsFirstStepComplete,
		setModalData,
		modalData,
	}

	return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
