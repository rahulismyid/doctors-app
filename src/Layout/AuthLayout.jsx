import { Navigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function AuthLayout() {
	const location = useLocation()
	const { currentUser } = useAuth();
	// The set state ensures that when loged in it redirects to the profiles page rather than the homepage  
	if(!currentUser) {
		return  <Navigate to='/login' state={{path: location.pathname}}/>
	}
 	return <>
		<Navbar />
		<Outlet />
	</>
}
