import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import { ROOT_ROUTE, APP_ROUTE, LOGIN_ROUTE } from "../routes/constants";
import { useAuth } from "../contexts/AuthContext";

export default function AuthLayout({children}) {
	const location = useLocation()
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if(!currentUser && (location.pathname === {APP_ROUTE} || location.pathname === {ROOT_ROUTE})) {
			navigate(APP_ROUTE);
		}
	}, [currentUser]);

	// The set state ensures that when loged in it redirects to the profiles page rather than the homepage  
	if(!currentUser) {
		return  <Navigate to={LOGIN_ROUTE} state={{path: location.pathname}}/>
	}
 	return <>
		<Navbar />
		<Modal />
		{children}
	</>
}
