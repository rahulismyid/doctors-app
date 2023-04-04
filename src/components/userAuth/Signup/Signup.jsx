import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../contexts/AuthContext';
import { useDB } from '../../../contexts/DbContext';
import { LOGIN_ROUTE, ROOT_ROUTE } from '../../../routes/constants';
import './styles.css';

const Signup = () => {
    
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        showPassword: false,
    }

    const [values, setValues] = useState(initialValues);
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { createUser } = useDB();

    // database values
    const[ufirstName, setUFirstName]= useState('');
    const[ulastName, setULastName]= useState('');
    const[uEmail, setUEmail]= useState('');
    const[uPhone, setUPhone]= useState(0);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Please enter a valid email').required('Required'),
        phone: Yup.string().min(10, 'Please enter a valid phone number').required('Required'),
        password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Password does not match').required('Required')
    })

    const handleSubmit = async(values, props) => {
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)

        setUFirstName(values.firstName);
        setULastName(values.lastName);
        setUEmail(values.email);
        setUPhone(values.phone);

        if(values.password !== values.confirmPassword){
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            if(signup) {
                await signup(values.email, values.password, values.firstName, values.lastName, Number(values.phone))
            }
            navigate(ROOT_ROUTE, {replace: true});
        } catch (error) {
            setError('Failed to create an account')
        } 

        setLoading(false)
    }


    useEffect(() => {
        if (currentUser && currentUser!== null){
            // console.log({ name: ufirstName, last: ulastName, userEmail: uEmail, userPhone: Number(uPhone)});
            createUser(ufirstName, ulastName, uEmail, uPhone, String(currentUser.uid))
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]) 

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    
    return (
        <>
            <div>
                {error && <span>{error}</span>}
                <Formik 
                    initialValues={initialValues} 
                    onSubmit={handleSubmit} 
                    validationSchema={validationSchema} 
                    autoComplete="off"
                >
                    {(props) => (
                        <form className="signup" autoComplete="off">
                            <h1>Create account</h1>
                            <h2>Already have an account? <span><Link to={LOGIN_ROUTE}>Login</Link></span></h2>

                            <div className="signup__field">
                                <input className="signup__input" type="text" name="username" id="username" required />
                                <label className="signup__label" htmlFor="username">Username</label>
                            </div>

                            <div className="signup__field">
                                <input className="signup__input" type="text" name="email" id="email" required />
                                <label className="signup__label" htmlFor="email">Email</label>
                            </div>

                            <div className="signup__field">
                                <input className="signup__input" type="password" name="password" id="password" required />
                                <label className="signup__label" htmlFor="password">Password</label>
                            </div>

                            <button className='signup-btn' onClick={handleSubmit}>Sign up</button>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Signup
