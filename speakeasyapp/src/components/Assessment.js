import React, { useState } from 'react';
import './styles/Assessment.css'; // Import CSS file for styling

const Assessment = ({ questions, currentQuestionIndex, onAnswerClick, onNextQuestion, onFinishAssessment }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // State to control displaying correct answer
  const [assessmentFinished, setAssessmentFinished] = useState(false); // State to control showing assessment finished

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    // Call the onAnswerClick callback with the selected option
    onAnswerClick(selectedOption);
    // Clear the selected option state
    setSelectedOption('');
    // Move to the next question
    setShowCorrectAnswer(false); // Reset state for next question
    onNextQuestion();
    // Check if this is the last question
    if (currentQuestionIndex === questions.length - 1) {
      // Show the correct answer after the user submits the last question
      setShowCorrectAnswer(true);
      // Call the onFinishAssessment callback
      onFinishAssessment();
      // Set assessment finished to true
      setAssessmentFinished(true);
    }
  };

  // Check if questions and currentQuestionIndex are valid
  if (!questions || questions.length === 0 || currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) {
    return <div>No questions available.</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.options.find((opt) => opt.isCorrect);

  return (
    <div className="assessment-container">
      <div className="assessment-question">
        {assessmentFinished ? (
          <h2>Assessment Finished</h2>
        ) : (
          <>
            <h2>{currentQuestion.question}</h2>
            <form>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="assessment-option">
                  <input
                    type="radio"
                    id={`option${index}`}
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => handleOptionChange(option)}
                    disabled={showCorrectAnswer} // Disable options after submission
                  />
                  <label htmlFor={`option${index}`}>{option}</label>
                </div>
              ))}
            </form>
            {!showCorrectAnswer && (
              <button onClick={handleNextClick} className="assessment-submit">Submit</button>
            )}
            {showCorrectAnswer && (
              <div className="correct-answer">
                Correct Answer: {correctAnswer}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Assessment;