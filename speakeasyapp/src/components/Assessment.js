import React, { useState } from 'react';
import './styles/Assessment.css'; // Import CSS file for styling

const Assessment = ({ questions, currentQuestionIndex, onAnswerClick, onNextQuestion }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    // Call the onAnswerClick callback with the selected option
    onAnswerClick(selectedOption);
    // Clear the selected option state
    setSelectedOption('');
    // Move to the next question
    onNextQuestion();
  };

  return (
    <div className="assessment-container">
      <div className="assessment-question">
        <h2>{questions[currentQuestionIndex].question}</h2>
        <form>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className="assessment-option">
              <input
                type="radio"
                id={`option${index}`}
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionChange(option)}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </form>
        <button onClick={handleNextClick} className="assessment-submit">Next Question</button>
      </div>
    </div>
  );
};

export default Assessment;