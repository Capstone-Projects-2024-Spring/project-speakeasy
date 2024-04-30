import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css';  
import Axios from 'axios';
import Clock from './assets/Clock.png';

// SignupProgression3 component
const SignupProgression3 = () => {
    const [selectedDailyTarget, setSelectedDailyTarget] = useState('10'); // State to store selected time
    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`
    console.log("Submitting with Daily Target:", selectedDailyTarget);
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const userID = localStorage.getItem('userID'); // Get the user ID from localStorage

        if (!userID) {
            setErrorMessage('User ID not found. Please sign in again.');
            navigate('/'); // Redirect to the home page or sign in page
            return;
        }

        // Perform the PUT request to update the user's selected language
        Axios.put(`http://localhost:3000/user/${userID}/update`, {
            dailyTarget: selectedDailyTarget
        })
        .then(res => {
            console.log('Daily target updated successfully:', res.data);
            navigate('/mainpage'); // Navigate to the next step
        })
        .catch(error => {
            console.error('Failed to update daily target:', error);
            setErrorMessage('Failed to update daily target. Please try again.');
        });
    };

    return (
        <div className="how-many-mins-container"> {/* Container for How Many Mins form */}
            <h2>How many minutes a day?</h2> {/* How Many Mins heading */}
            <form onSubmit={handleSubmit} className="how-many-mins-form"> {/* How Many Mins form */}
                <div className='select-container'> 
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <img src={Clock} alt="Time" /> {/* Clock icon */}
                    <select
                    value={selectedDailyTarget}
                    onChange={(event) => setSelectedDailyTarget(event.target.value)}> {/* Time dropdown */}
                        <option value="10">10</option> 
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
                <button type="submit">Submit</button> {/* Submit button */}
            </form>
        </div>
    );
};

export default SignupProgression3;
