import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/userAuth/Login/Login";
import { useAuth } from "../../contexts/AuthContext";
import { HOME_ROUTE, LOGIN_ROUTE, PRS_ROOT_ROUTE } from "../../routes/constants";

const Home = () => {
	const { currentUser } = useAuth()
	const navigate = useNavigate();

    useEffect(() => {
		if(currentUser!== null) {
			navigate(PRS_ROOT_ROUTE, {replace: true});
		} else {
			navigate(LOGIN_ROUTE, {replace: true})

		}
    }, []);

	return (
		<>
			<Login />
		</>
	);
};

export default Home;
