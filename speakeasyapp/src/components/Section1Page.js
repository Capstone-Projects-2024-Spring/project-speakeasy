import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Section1Page.css';
import Logo from './assets/Logo.png';
import Help from './assets/Help.png';
import Book from './assets/Book.png';
import User from './assets/User.png';
import Settings from './assets/Settings.png';

const Section1Page = () => {
  const [messages, setMessages] = useState([{ text: "Hello! what would you like to know?", sender: "bot" }]);
  const [input, setInput] = useState('');
  let lastDisplayedDate = null;

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (userID)
      fetchHistory(userID);
  }, []);

  const fetchHistory = async (userID) => {
    const feature = 'chatbot';
    try {
      const response = await fetch(`http://localhost:3000/history/retrieve/${userID}/${feature}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setMessages(data);
      } else {
        console.error('No chat history available:', data);
        setMessages([]); // This ensures the message "No chat history found" is shown
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setMessages([]); // Set to empty array on error to prevent .map() issues
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID');
    if (input.trim()) {
      await sendMessageToBot(input, userID);
      setInput('');  // Clear the input after sending
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userID');
    // Redirect to login route
    window.location.href = '/';
  };

  const sendMessageToBot = async (message, userID, history) => {
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ modelType: "text_only", prompt: message, history }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Data from server:', data);
  
      // Ensure data.messages is defined and correctly structured
      if (data.messages) {
        const historyResponse = await fetch(`http://localhost:3000/history/add/${userID}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatbot: data.messages.map(msg => ({ name: msg.sender === "user" ? "User" : "Chatbot", message: msg.text }))
          })
        });
  
        // Fetch history again to update the chat display
        await fetchHistory(userID);
  
        if (!historyResponse.ok)
          throw new Error('Failed to update history');
  
        const historyData = await historyResponse.json();
        console.log('History updated:', historyData);
      }
  
      return data.messages;
    } catch (error) {
      console.error('Error sending message to bot:', error);
      return [
        { text: "Sorry, I'm having trouble understanding you right now.", sender: "bot" },
        { text: message, sender: "user" }
      ];
    }
  };

  return (
    <div className='mainpage-container'>
      <div className='white-rectangle-container'>
        <img src={Logo} alt="SpeakEasy" />
        <h1>Chat Room</h1>
      </div>
      <div className='light-orange-rectangle'/>
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
              {messages.map((session, index) => {
                const currentDate = new Date(session.timestamp);
                const dateStr = currentDate.toDateString();
                const timeStr = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const displayTimestamp = lastDisplayedDate !== dateStr ? `${dateStr} ${timeStr}` : timeStr;
                lastDisplayedDate = dateStr;  // Update lastDisplayedDate locally without causing re-render

                return (
                  <div key={index}>
                    <h3 className="timestamp">{displayTimestamp}</h3> {/* Session timestamp above the chatbox */}
                    {Array.isArray(session.interactions) ? (
                      session.interactions.map((interaction, idx) => (
                        <div key={idx} className={`message-bubble ${idx % 2 === 0 ? 'user-message' : 'received-message'}`}>
                          {interaction.message}
                        </div>
                      ))
                    ) : (
                      <div>No interactions found in this session.</div>
                    )}
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSendMessage} className='message-input-form'>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message here..." />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Page;