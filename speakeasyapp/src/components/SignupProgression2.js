import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css';  

import Globe from './assets/Globe.png';

// SignupProgression2 component
const SignupProgression2 = () => {
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate('/signupProgression3');
    };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    return (
        <div className="i-want-to-learn-container"> {/* Container for I Want to Learn form */}
            <h2>I want to learn...</h2> {/* I Want to Learn heading */}
            <form onSubmit={handleSubmit} className="i-want-to-learn-form"> {/* I Want to Learn form */}
                <div className='select-container'> 
                    <img src={Globe} alt="Language" /> {/* Language icon */}
                    <select> {/* Language dropdown */}
                        <option value="Spanish">Spanish</option> 
                        <option value="French">French</option>
                        <option value="Chinese">Chinese</option> 
                    </select>
                </div>
                <button type="submit">Submit</button> {/* Submit button */}
            </form>
        </div>
    );
}

export default SignupProgression2;
