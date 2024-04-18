import React, { useState, useEffect, useRef } from 'react';
import './styles/Flashcard.css';

export default function Flashcard({ flashcard }) {
    const { spanish, english } = flashcard; // Destructure flashcard prop to access spanish and english properties
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');

    const frontEl = useRef();
    const backEl = useRef();

    function setMaxHeight() {
        const frontHeight = frontEl.current.getBoundingClientRect().height; // Get the height of the front element
        const backHeight = backEl.current.getBoundingClientRect().height; // Get the height of the back element
        setHeight(Math.max(frontHeight, backHeight, 100)); // Set the height of the flashcard to the maximum of the front height, back height, or a minimum height of 100px
    }

    useEffect(setMaxHeight, [spanish, english]); // Update effect dependencies to use spanish and english
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight);
    }, [spanish, english]); // Update effect dependencies to use spanish and english

    return (
        <div className={`card ${flip ? 'flip' : ''}`} style={{ height: height }} onClick={() => setFlip(!flip)}>
        <div className="front" ref={frontEl}>
            {spanish} {/* Spanish word on the front */}
        </div>
        <div className="back" ref={backEl}>
            {english} {/* English word on the back */}
        </div>
        </div>
    );
}