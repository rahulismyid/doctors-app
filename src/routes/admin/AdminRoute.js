import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AdminRoute = ({children}) => {
    const location = useLocation();
    const { currentUser } = useAuth();
	const navigate = useNavigate();
	console.log('currentUser', currentUser);

	useEffect(() => {
		if(!currentUser && (location.pathname === "/app" || location.pathname === "/")) {
			navigate('/app/home');
		}
	}, [currentUser]);

    // The set state ensures that when loged in it redirects to the profiles page rather than the homepage  
    if(!currentUser ) {
      return  <Navigate to='/login' state={{path: location.pathname}}/>
    }
  return children
}

export default AdminRoute;
