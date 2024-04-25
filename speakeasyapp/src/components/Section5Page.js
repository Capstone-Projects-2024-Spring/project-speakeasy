import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Section1Page.css';
import Assessment from './Assessment.js';

import Logo from './assets/Logo.png';
import Help from './assets/Help.png';
import Book from './assets/Book.png';
import User from './assets/User.png';
import Settings from './assets/Settings.png';

const sendMessageToBot = async (message) => {
  // Prepend the instruction to the message for the AI model
  const modifiedMessage = `
    The Spanish test should have 5 question multiple choice assessments that asks for translations with 3 options.
    Each questions should start and end with "**". 
    Here's an example: "Translate this sentence into Spanish: I am studying Spanish". 
    Have each option start with a letter like this "A."
    Provide the answer to each question at the end capitalized.
  ${message}`;

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the modified message to the server
      body: JSON.stringify({ modelType: "text_only", prompt: modifiedMessage }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error('Error sending message to bot:', error);
    return [
      { text: "Sorry, I'm having trouble understanding you right now.", sender: "bot" }
    ];
  }
};

const Section5Page = () => {
  const [messages, setMessages] = useState([{ text: "Welcome to Assessments", sender: "bot" }]);
  const [input, setInput] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // When the component mounts, start the assessment by sending a message to the bot
    sendMessageToBot("Start the assessment");
  }, []);

const handleSendMessage = async (e) => {
  e.preventDefault();
  if (input.trim()) {
    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Send the user's response to the bot
    const response = await sendMessageToBot(input);

    // Process the bot's response
    if (response && response.length > 0) {
      const botMessage = response.find((m) => m.sender === "bot");
      if (botMessage) {
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        // Extract questions and options from the bot's response
        const newQuestions = response
          .filter((m) => m.sender === "bot")
          .map((m) => {
            const matches = m.text.match(/\*\*(.*?)\*\*([^*]+)/g);
            if (matches) {
              const questions = matches.map((match) => {
                const questionMatch = match.match(/\*\*(.*?)\*\*/);
                const optionsMatch = match.match(/[A-Z]\..*?(\.|$)/g);
                if (questionMatch && optionsMatch) {
                  const question = questionMatch[1];
                  const options = optionsMatch.map((option) => option.trim());
                  console.log("question", question, "options", options)
                  return { question, options };
                }
                return null;
              }).filter(Boolean);
              return questions;
            }
            return [];
          })
          .flat(); // Flatten the array of arrays into a single array
        // Update the questions state with the new questions
        setQuestions(newQuestions);
      }
    }

    // Clear the input field
    setInput("");
  }
};
     
  const handleLogout = () => {
    localStorage.removeItem('userID');
    // Redirect to the login route
    window.location.href = '/';
  };

  const handleAnswerClick = (option) => {
    // Handle the user's answer selection
    // Needs to check correct answer against selected option
    console.log("Selected option:", option);
  };

  const handleNextQuestion = () => {
    // Handle moving to the next question
    console.log("Moving to the next question");
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleFinishAssessment = () => {
    // Handle finishing the assessment
    // You can update state or perform any necessary action here
    console.log("Assessment finished");
    setShowScore(true);
  };

  return (
    <div className='mainpage-container'>
      <div className='white-rectangle-container'>
        <img src={Logo} alt="SpeakEasy" />
        <h1>Assessment</h1>
      </div>
      <div className='light-orange-rectangle' />
      <div className='bottom-container'>
        <div className='navbar-container bottom-section'>
          <ul>
            <li><img src={Book} alt="Learn" /><Link to="/mainpage">Learn</Link></li>
            <li><img src={User} alt="Profile" /><Link to="/profile">Profile</Link></li>
            <li><img src={Settings} alt="Settings" /><Link to="/settings">Settings</Link></li>
            <li><img src={Help} alt="Help" /><Link to="/help">Help</Link></li>
            <li><button onClick={handleLogout}>Log Out</button></li>
          </ul>
        </div>
        <div className='section1page-container'>
          <div className='chat-area'>
            <div className='messages-display'>
              {messages.map((message, index) => (
                <div key={index} className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'received-message'}`}>
                  {message.text}
                </div>
              ))}
            {questions.length > 0 && currentQuestionIndex < questions.length ? (
              <Assessment
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                onAnswerClick={handleAnswerClick}
                onNextQuestion={handleNextQuestion}
                onFinishAssessment={handleFinishAssessment}
              />
            ) : null}
            </div>
            <form onSubmit={handleSendMessage} className='message-input-form'>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your answer here..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5Page;