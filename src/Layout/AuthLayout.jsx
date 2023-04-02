import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function AuthLayout({children}) {
	const location = useLocation()
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if(!currentUser && (location.pathname === "/app" || location.pathname === "/")) {
			navigate('/app/home');
		}
	}, [currentUser]);

	// The set state ensures that when loged in it redirects to the profiles page rather than the homepage  
	if(!currentUser) {
		return  <Navigate to='/login' state={{path: location.pathname}}/>
	}
 	return <>
		<Navbar />
		<Modal />
		{children}
	</>
}
