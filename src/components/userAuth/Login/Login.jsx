import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import "./styles.css";
import { HOME_ROUTE, ROOT_ROUTE, SIGNUP_ROUTE } from '../../../routes/constants';

const initialValues = {
    email: '',
    password: '',
    showPassword: false
}

const Login = () => {
    const [values, setValues] = useState(initialValues);
    const {login, currentUser} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser !== null) {
            navigate(HOME_ROUTE,{ replace: true})
        } else {
            navigate(ROOT_ROUTE)
        }
    }, [currentUser]);

    const handleSubmit = async() => {
        try {
            await login(values.email, values.password)
            navigate(HOME_ROUTE, { replace: true, state:{ loggedIn: true} })
        } catch (error) {
            alert('Failed to Sign In' + error)
        }
    }

    return (
        <>
            <div className="signup" autoComplete="off">
                <h1>Login</h1>
                <div className="signup__field">
                    <input value={values.email} onChange={(e) => setValues({...values, email: e.target.value})} className="signup__input" type="text" name="email" id="email" required />
                    <label className="signup__label" htmlFor="email">Email</label>
                </div>

                <div className="signup__field">
                    <input value={values.password} onChange={(e) => setValues({...values, password: e.target.value})} className="signup__input" type="password" name="password" id="password" required />
                    <label className="signup__label" htmlFor="password">Password</label>
                </div>

                <button onClick={handleSubmit}>Login</button>
            </div>
        </>
    )
}

export default Login
