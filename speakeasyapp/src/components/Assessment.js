import React, { useState } from 'react';
import './styles/Assessment.css'; // Import CSS file for styling

const Assessment = ({ questions, onAnswerClick }) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (questionIndex, option) => {
    setSelectedOptions({ ...selectedOptions, [questionIndex]: option });
  };

  const handleFinishAssessment = () => {
    // Call the onAnswerClick callback with the selected options
    onAnswerClick(selectedOptions);
  };

  return (
    <div className="assessment-container">
      <div className="assessment-questions">
        {questions.map((question, index) => (
          <div key={index} className="assessment-question">
            <h2>{question.question}</h2>
            <form>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="assessment-option">
                  <input
                    type="radio"
                    id={`option-${index}-${optionIndex}`}
                    name={`option-${index}`}
                    value={option}
                    checked={selectedOptions[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                  />
                  <label htmlFor={`option-${index}-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </form>
          </div>
        ))}
      </div>
      <div className="assessment-controls">
        <button onClick={handleFinishAssessment} className="assessment-submit">Submit</button>
      </div>
    </div>
  );
};

export default Assessment;