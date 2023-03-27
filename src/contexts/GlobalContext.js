import React, { useState } from "react";
import { useAuth } from "./AuthContext";

export const GlobalContext = React.createContext();

export default function GlobalContextProvider({ children }) {
	const [isFirstStepComplete, setIsFirstStepComplete] = useState(false);
	const [firstStepData, setFirstStepData] = useState({});
	const values = {
		firstStepData,
		setFirstStepData,
		isFirstStepComplete,
		setIsFirstStepComplete,
	}

	return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
