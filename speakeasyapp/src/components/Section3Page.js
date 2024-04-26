import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Section1Page.css';
import Axios from 'axios';
import Logo from './assets/Logo.png';
import Help from './assets/Help.png';
import Book from './assets/Book.png';
import User from './assets/User.png';
import Settings from './assets/Settings.png';

const sendMessageToBot = async (message, language) => {
  const modifiedMessage = `Respond to what I say in ${language} as if we are having a conversation ${message} in the end have the english translations in parentheses`;

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelType: "text_only", prompt: modifiedMessage }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.messages;
  } catch (error) {
    console.error('Error sending message to bot:', error);
    return [{ text: "Sorry, I'm having trouble understanding you right now.", sender: "bot" }];
  }
};

const synthesizeSpeech = async (text) => {
  try {
    const response = await fetch('http://localhost:3000/synthesize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      const { audioContent } = await response.json();
      const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], { type: 'audio/ogg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } else {
      console.error('Failed to synthesize speech');
      return null;
    }
  } catch (error) {
    console.error('Error requesting text-to-speech:', error);
    return null;
  }
};

const Section3Page = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    languages: [],
    dailyTarget: 0,
  });
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    Axios.get(`http://localhost:3000/user/${userID}`)
    .then(response => {
        setUser(response.data);
    })
    .catch(error => {
        console.error('Error fetching profile data:', error);
    });
  }, [userID]);

  const [messages, setMessages] = useState([{ text: "Welcome to roleplaying", sender: "bot", audioUrl: null }]);
  const [input, setInput] = useState('');
  const [audioPlayer, setAudioPlayer] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, sender: "user", audioUrl: null };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const response = await sendMessageToBot(input, user.languages[0]);
      const botMessage = response.find(m => m.sender === 'bot');
      if (botMessage) {
        const audioUrl = await synthesizeSpeech(botMessage.text);
        botMessage.audioUrl = audioUrl;  // Save the URL to state
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }

      setInput('');
    }
  };

  const playAudio = (audioUrl) => {
    if (audioPlayer) {
      audioPlayer.pause();  // Stop any currently playing audio
    }
    const newAudio = new Audio(audioUrl);
    setAudioPlayer(newAudio);
    newAudio.play();
  };

  const stopAudio = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setAudioPlayer(null);
    }
  };

  const restartAudio = () => {
    if (audioPlayer) {
      audioPlayer.currentTime = 0; // Reset the audio to the start
      audioPlayer.play();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userID');
    window.location.href = '/';
  };

  return (
    <div className='mainpage-container'>
      <div className='white-rectangle-container'>
        <img src={Logo} alt="SpeakEasy" />
        <h1>Role Playing</h1>
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
              {messages.map((message, index) => (
                <div key={index} className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'received-message'}`}>
                  {message.text}
                  {message.audioUrl && message.sender === 'bot' && (
                    <div>
                      <button onClick={() => playAudio(message.audioUrl)}>Play</button>
                      <button onClick={stopAudio}>Stop</button>
                      <button onClick={restartAudio}>Restart</button>
                    </div>
                  )}
                </div>
              ))}
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

export default Section3Page;
