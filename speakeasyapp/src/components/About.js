import React from 'react'; 
import './styles/About.css'; 
import Logo from './assets/Logo.png';

// About component
const About = () => { 
    return( // JSX markup for About component
        <div className="about-container"> {/* Outer container for About section */}
            <div className="text-container"> {/* Container for text content */}
                <div className='logo'> {/* Container for logo image */}
                    <img src = {Logo} alt ="SpeakEasy"/> {/* Render logo image */}
                </div>
                <h3>Learn any language easily.</h3> {/* Header with text */}
                <h3>Chat naturally.</h3> {/* Header with text */}
                <h3>Anywhere really.</h3> {/* Header with text */}
            </div>
            <div className="orange-rectangle"/> {/* Render rectangle element */}
        </div>
    );
};

export default About;