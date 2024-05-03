import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Section1Page.css';
import Axios from 'axios';
import Logo from './assets/Logo.png';
import Help from './assets/Help.png';
import Book from './assets/Book.png';
import User from './assets/User.png';
import Settings from './assets/Settings.png';
  
const Section3Page = () => {
  const [messages, setMessages] = useState([{ text: "Welcome to roleplaying! Let me know what you want to roleplay to get started.", sender: "bot" }]);
  const [input, setInput] = useState('');
  const [currentlySpeaking, setCurrentlySpeaking] = useState(null);
  const [roleplayCharacter, setRoleplayCharacter] = useState(localStorage.getItem('roleplayCharacter') || '');
  const [roleChanged, setRoleChanged] = useState(false); // Flag to indicate role change
  let lastDisplayedDate = null;
  const userID = localStorage.getItem('userID');
  const handleSpeak = async (text) => {
    try {
      const response = await Axios.post('http://localhost:3000/synthesize', { 
        text: text,
        language: user.languages[0]
      });
      const audioContent = response.data.audioContent;
      const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
      setCurrentlySpeaking(audio);
      audio.play();
      audio.onended = () => setCurrentlySpeaking(null);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      } 
  };

  const handleUserSpeak = async (text) => {
    try {
      const response = await Axios.post('http://localhost:3000/synthesize', {
        text: text,
        language: user.languages[0], // Use the appropriate language code for the user's spoken language
      });
      const audioContent = response.data.audioContent;
      const audio = new Audio(`data:audio/wav;base64,${audioContent}`);
      audio.play();
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  useEffect(() => {
    if (userID)
      fetchHistory(userID);
    Axios.get(`http://localhost:3000/user/${userID}`)
    .then(response => {
        setUser(response.data); // Update the user state with the fetched data
    })
    .catch(error => {
        console.error('Error fetching profile data:', error);
    });
  }, []);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    languages: [''],
    dailyTarget: 0,
  });

  const fetchHistory = async (userID) => {
    const feature = 'roleplaying';
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
    if (input.trim()) {
      await sendMessageToBot(input, userID, roleChanged);
      setInput('');  // Clear the input after sending
    }
  };

  const handleRoleplayChange = (e) => {
    setRoleplayCharacter(e.target.value); // Assuming you have a state for this
  };

  const handleRoleplaySubmit = async (e) => {
    e.preventDefault();
    if (roleplayCharacter.trim()) {  // Ensure that the input is not empty or just spaces
      console.log("Roleplay character set to:", roleplayCharacter);
      localStorage.setItem('roleplayCharacter', roleplayCharacter); // Save to local storage
      setRoleChanged(true);  // Flag that the role has changed
    } else {
      alert("Please enter a valid character name.");  // Feedback for empty input
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('roleplayCharacter');
    // Redirect to login route
    window.location.href = '/';
  };
  
  const sendMessageToBot = async (message, userID, history) => {
    try {
      let prompt;
      if (roleChanged) {
        // Start new roleplay without previous context
        prompt = `Roleplay as ${roleplayCharacter} and be absolute that you are even if I say you are not.
          Respond in ${user.languages} to the last user message: "${message}".
          Also, do not show the roleplay character's name at the start.
          Add the English translation under every sentence in parentheses.
          Most, importantly, do not repeat back what I say.`;
        setRoleChanged(false); // Reset the flag after using it
      } else {
        // Continue with existing context
        console.log(roleplayCharacter)
        const history = messages.flatMap(session => session.interactions.map(interaction => 
          `${interaction.name === 'User' ? 'User' : roleplayCharacter} said: "${interaction.message}"\n`
        )).slice(-10).join('\n');  // Include a newline after each message for clarity
        prompt = `
          Recent conversation context:
          ${history}

          Instructions:
          Roleplay as ${roleplayCharacter} and be absolute that you are even if I say you are not.
          Respond in ${user.languages} to the last user message: "${message}".
          Also, do not show the roleplay character's name at the start.
          Add the English translation after every sentence in parentheses.
          Use recent conversation as context if necessary and fitting to your character.
          Most, importantly, do not repeat back what I say.`;
      }
      console.log(prompt);

      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the modified message to the server
        body: JSON.stringify({ modelType: "text_only", prompt: prompt }),
      });
  
      // Fetch history again to update the chat display
      await fetchHistory(userID);

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
            roleplaying: data.messages.map(msg => ({
              name: msg.sender === "user" ? "User" : "Chatbot",
              message: msg.sender === "user" ? message : msg.text }))
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
        { text: "Sorry, I'm having trouble understanding you right now.", sender: "bot" }
      ];
    }
  };

  return (
    <div className='mainpage-container'>
      <div className='white-rectangle-container'>
        <img src={Logo} alt="SpeakEasy" />
        <h1>Role Playing</h1>
      </div>
      <div className='light-orange-rectangle' />
      <div className='bottom-container'>
        <div className='navbar-container bottom-section'>
          <ul>
            <li>
              <img src={Book} alt="Learn" />
              <Link to="/mainpage">Learn</Link>
            </li>
            <li>
              <img src={User} alt="Profile" />
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <img src={Settings} alt="Settings" />
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <img src={Help} alt="Help" />
              <Link to="/help">Help</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </ul>
          <form onSubmit={handleRoleplaySubmit} className='roleplay-form'>
            <input
              type="text"
              value={roleplayCharacter}
              onChange={handleRoleplayChange}
              placeholder="Enter roleplay character..."
            />
            <button type="submit">Set Roleplay Character</button>
          </form>
        </div>
        <div className='section1page-container'>
          <div className='chat-area'>
            <div className="messages-display">
              {messages.map((session, index) => {
                const currentDate = new Date(session.timestamp);
                const dateStr = currentDate.toDateString();
                const timeStr = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const displayTimestamp = lastDisplayedDate !== dateStr ? `${dateStr} ${timeStr}` : timeStr;
                lastDisplayedDate = dateStr;
  
                return (
                  <div key={index}>
                    {Array.isArray(session.interactions) ? (
                      session.interactions.map((interaction, idx) => (
                        <div key={idx} className={`message-bubble ${interaction.name === 'User' ? 'user-message' : 'received-message'}`}>
                          {interaction.name === 'User' && (
                            <h3 className="timestamp">{displayTimestamp}</h3>
                          )}
                          <div className="message-content">
                            {interaction.message}
                          </div>
                          <div className="tts-controls">
                            {interaction.name === 'User' ? (
                              <button onClick={() => handleUserSpeak(interaction.message)}>Play</button>
                            ) : (
                              <>
                                {currentlySpeaking && currentlySpeaking.src === interaction.message ? (
                                  <button onClick={() => currentlySpeaking.pause()}>Stop</button>
                                ) : (
                                  <button onClick={() => handleSpeak(interaction.message)}>Play</button>
                                )}
                              </>
                            )}
                          </div>
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
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3Page;