import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../contexts/AuthContext";

const AdminRoute = ({children}) => {
    const location = useLocation()
    const { currentUser } = useAuth();
    // The set state ensures that when loged in it redirects to the profiles page rather than the homepage  
    if(!currentUser ){
      return  <Navigate to='/login' state={{path: location.pathname}}/>
    }
  return children
}

const AdminRoute1 = ({ redirectPath = '/login', children }) => {
	debugger
	const { currentUser } = useAuth();
	return currentUser ? <Outlet /> : <Navigate to="/login" />;
	// if (!currentUser) {
	// 	return <Navigate to={redirectPath} replace />;
	// }
	// return (
	// 	<>
	// 		<Navbar/>
	// 		<Outlet />
	// 	</>
	// );
};

export default AdminRoute;
