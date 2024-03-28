import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import './styles/MainPage.css';  

import Clock from './assets/Clock.png';

// SignupProgression3 component
const SignupProgression3 = () => {
    const [selectedTime, setSelectedTime] = useState('10'); // State to store selected time

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log('Selected Time:', selectedTime); // Log selected time
        navigate('/mainpage'); // Navigate to the main page
    };

    const navigate = useNavigate(); // Assign the `useNavigate` hook to the variable `navigate`

    return (
        <div className="how-many-mins-container"> {/* Container for How Many Mins form */}
            <h2>How many minutes a day?</h2> {/* How Many Mins heading */}
            <form onSubmit={handleSubmit} className="how-many-mins-form"> {/* How Many Mins form */}
                <div className='select-container'> 
                    <img src={Clock} alt="Time" /> {/* Clock icon */}
                    <select
                    value={selectedTime}
                    onChange={(event) => setSelectedTime(event.target.value)}> {/* Time dropdown */}
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
