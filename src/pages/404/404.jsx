import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                Page Not found!
            </div>

            <button 
                onClick={() => navigate(-1)}
            >
                Go Back
            </button>
        </>
    )
}

export default NotFound;
