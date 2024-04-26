import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Section1Page.css';
import Logo from './assets/Logo.png';
import Help from './assets/Help.png';
import Book from './assets/Book.png';
import User from './assets/User.png';
import Settings from './assets/Settings.png';

const sendMessageToBot = async (message, userID) => {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelType: "text_only", prompt: message }),
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

const Section1Page = () => {
  const [messages, setMessages] = useState([{ text: "Hello! what would you like to know?", sender: "bot" }]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const processorRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioInputRef = useRef(null);



  useEffect(() => {
    const loadWorkletModule = async () => {
      try {
        await audioContextRef.current.audioWorklet.addModule('./worklets/recorderWorkletProcessor.js');
      } catch (error) {
        console.error('Error loading worklet module:', error);
      }
    };

    if (audioContextRef.current) {
      loadWorkletModule();
    }
  }, []);

  useEffect(() => {
    return () => {
      if (isRecording) {
        console.log("Component unmounting, stopping recording...");
        stopRecording();
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    console.log("Starting recording...");
    try {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
            audioContextRef.current = new window.AudioContext();
        }

        // Ensuring the worklet module is loaded
        await audioContextRef.current.audioWorklet.addModule('/recorderWorkletProcessor.js')
            .catch(e => {
                console.error('Failed to load audio worklet module:', e);
                throw new Error('Failed to load audio worklet module');
            });

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("Stream captured", stream);
        audioInputRef.current = audioContextRef.current.createMediaStreamSource(stream);
        processorRef.current = new AudioWorkletNode(audioContextRef.current, 'recorder.worklet');
        processorRef.current.connect(audioContextRef.current.destination);
        audioInputRef.current.connect(processorRef.current);

        processorRef.current.port.onmessage = (event) => {
          if (event.data.audioBlob) {
              console.log("Received audio Blob from worklet:", event.data.audioBlob.size);
              sendAudioToServer(event.data.audioBlob);
          } else {
              console.log("Received message from worklet, but no audio Blob found:", event.data);
          }
      };
      
      
      

        setIsRecording(true);
    } catch (error) {
        console.error('Error accessing media devices or loading worklet module:', error);
        handleError(error);
    }
};


  const handleError = (error) => {
    console.log('Error Name:', error.name);
    alert(`Error encountered: ${error.message}`);
    switch (error.name) {
      case 'NotAllowedError':
        alert('Microphone access was denied. Please allow access and try again.');
        break;
      case 'NotFoundError':
        alert('No microphone devices found. Please connect a microphone and try again.');
        break;
      case 'AbortError':
        alert('Microphone access was aborted by the system. Please check your microphone settings and permissions.');
        break;
      default:
        alert('Failed to access microphone. Please refresh the page or try a different browser. Error Name: ' + error.name);
        break;
    }
  };
  

  const stopRecording = () => {
    console.log("Stopping recording...");
    if (processorRef.current) {
      processorRef.current.disconnect();
    }
    if (audioInputRef.current) {
      audioInputRef.current.disconnect();
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    setIsRecording(false);
  };


  
  const sendAudioToServer = async (audioBlob) => {
    if (!audioBlob.size) {
        console.error("Received empty audio Blob.");
        return;
    }
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
        const response = await fetch('http://localhost:3000/api/speech-to-text', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (data.transcript) {
            console.log("Transcription received:", data.transcript);
            const userID = localStorage.getItem('userID');
            const newMessages = await sendMessageToBot(data.transcript, userID);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }
    } catch (error) {
        console.error('Error sending audio to server:', error);
    }
};


  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem('userID');
    if (input.trim()) {
      const newMessages = await sendMessageToBot(input, userID);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      setInput('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userID');
    // Redirect to login route
    window.location.href = '/';
  };

  return (
    <div className='mainpage-container'>
      <div className='white-rectangle-container'>
        <img src={Logo} alt="SpeakEasy" />
        <h1>Chat Room</h1>
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
            </div>
            <form onSubmit={handleSendMessage} className='message-input-form'>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message here..." />
              <button type="submit">Send</button>
              <button type="button" onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1Page;