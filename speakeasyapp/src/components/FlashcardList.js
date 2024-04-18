import React from 'react'
import Flashcard from './Flashcard.js';
import './styles/Flashcard.css';


export default function FlashcardList({ flashcards }) {
    return (
        <div className="card-grid">
            {flashcards.map(flashcard => {
                return <Flashcard flashcard={flashcard} key={flashcard.id} /> // Render a Flashcard component for each flashcard object
            })}
        </div>
    )
}