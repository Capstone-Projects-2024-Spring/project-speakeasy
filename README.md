<div align="center">

# SpeakEasy: AI-Powered Language Learning Chatbot

[![Report Issue on Jira](https://img.shields.io/badge/Report%20Issues-Jira-0052CC?style=flat&logo=jira-software)](https://temple-cis-projects-in-cs.atlassian.net/jira/software/c/projects/DT/issues)
[![Deploy Docs](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml/badge.svg)](https://github.com/ApplebaumIan/tu-cis-4398-docs-template/actions/workflows/deploy.yml)
[![Documentation Website Link](https://img.shields.io/badge/-Documentation%20Website-brightgreen)](https://applebaumian.github.io/tu-cis-4398-docs-template/)


</div>


## Keywords

Section 5, Language Learning, Chatbot, AI, Natural Language Processing, MERN Stack, MongoDB, Express.js, React.js, Node.js, JavaScript, Gemini Pro, Google Cloud, Speech-to-Text, Interactive Learning, Conversational Practice, Web Application, Real-time Communication, Responsive UI, RESTful APIs.

## Project Abstract

This document proposes a novel application of a text message (SMS or Email) read-out and hands-free call interacted between an Android Smartphone and an infotainment platform (headunit) in a car environment. When a phone receives an SMS or Email, the text message is transferred from the phone to the headunit through a Bluetooth connection. On the headunit, user can control which and when the received SMS or E-mail to be read out through the in-vehicle audio system. The user may press one button on the headunit to activate the hands-free feature to call back the SMS sender.

## High Level Requirement

SpeakEasy is designed to offer an interactive and personalized language learning experience. Users can choose between simply translating their input or testing their pronunciation or spelling. Users can engage in simulated conversations to practice their language skills, with the chatbot adapting to their individual learning pace and style. It includes comprehensive language modules covering grammar, vocabulary, and pronunciation. The interface is user-friendly, making it accessible for learners of all levels. Progress is tracked, and feedback is provided to guide improvement. Additionally, the system integrates with external educational resources, enriching the learning material and providing varied contexts for language practice. 

## Conceptual Design

SpeakEasy is designed as a web-based application, accessible through modern web browsers on various devices, including desktops, laptops, tablets, and smartphones. The application follows a client-server architecture, with the front-end user interface communicating with the back-end server via RESTful APIs.

## Background

SpeakEasy aims to distinguish itself from current language learning apps by offering a more interactive, conversation-focused experience. While many existing apps focus on vocabulary and grammar exercises, our project emphasizes real-time conversational practice, using advanced AI to simulate natural dialogues. This approach aims to bridge the gap between theoretical learning and practical language use, providing a more immersive and engaging experience. By leveraging the latest in AI technology, the Language Tutor Chatbot offers a unique and innovative solution in the landscape of digital language learning tools.  

## Required Resources

SpeakEasy requires a skilled development team proficient in JavaScript, AI, and web development to implement the MERN stack (MongoDB, Express.js, React.js, Node.js) architecture. Access to Google’s Gemini Pro API is crucial for enabling advanced natural language processing capabilities. Additionally, the project requires cloud hosting services for the database and the application, ensuring reliable and scalable performance. These resources are critical for building a responsive, intelligent, and user-friendly language learning chatbot. 

 
## How to Run SpeakEasy

1. Fork your own copy of our GitHub Repositiory
2. In VS Code select 'Clone Git Repository' and then select your forked copy of `project-speakeasy`
3. Open the Terminal and navigate to the `backend` directory:
   ```
   cd backend
   ```
   Then, install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the `backend` directory containing the following variables:
   ```
   ATLAS_URI=<your-mongodb-atlas-uri>
   JWT_SECRET=<your-jwt-secret>
   GEMINI_API_KEY=<your-gemini-api-key>
   GEMINI_API_URL=<gemini-api-url>
   TTS_API_KEY=<your-text-to-speech-api-key>
   GOOGLE_APPLICATION_CREDENTIALS=<path-to-your-google-credentials-file>
   ```
5. While still in the `backend` directory, start the server:
   ```
   node server
   ```
   You should now be connected to MongoDB.
6. Create another Terminal and navigate to the `speakeasyapp` directory:
   ```
   cd speakeasyapp
   ```
   Then, install the dependencies:
   ```
   npm install
   ```
7. Start the development server:
   ```
   npm start
   ```
   When prompted to launch on a different port, type 'Y' and hit enter.

## Coverage Report Generation

1. `cd` into `speakeasyapp/src/components`
   ```
   cd speakeasyapp/src/components
   ```
2. Run coverage test
   ```
   npm test -- --coverage
   ```
3. Generated reports can be found in `speakeasyapp/coverage`

## Features
1) Login/Signup Pages 
2) Basic Translator 
3) Roleplay scenarios 
4) Cultural insights
5) Vocab practice with Flashcards
6) Progress Tracking
7) Text to Speech
8) Interactive Assessments (WIP)


## Known Bugs
- Assessments sometimes will only generate 1 or 3 questions instead of the intended 5
- Assessments sometimes wont generate any content at all
- Hitting the Text-to-Speech 'Play' Button multiple times will cause the voice to play over itself
- Roleplay will sometimes display the inline translation twice
- Gemini will sometimes just repeat the question you asked it
- Changing your language will cause all playable saved history to be spoken in the new language instead of the original

## Collaborators

[//]: # ( readme: collaborators -start )
<table>
<tr>
    <td align="center">
        <a href="https://github.com/chris-douglas13">
            <img src="https://avatars.githubusercontent.com/u/111987005?v=4" width="100;" alt="chris-douglas13"/>
            <br />
            <sub><b>Christopher Douglas</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/briangunsel">
            <img src="https://avatars.githubusercontent.com/u/13840712?v=4" width="100;" alt="briangunsel"/>
            <br />
            <sub><b>Brian Gunsel</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Jjkrules">
            <img src="https://avatars.githubusercontent.com/u/112143815?v=4" width="100;" alt="Jjkrules"/>
            <br />
            <sub><b>Jeswin James</b></sub>
        </a>
    </td>
     <td align="center">
        <a href="https://github.com/alim509">
            <img src="https://avatars.githubusercontent.com/u/42529850?v=4" width="100;" alt="alim509"/>
            <br />
            <sub><b>Angelo Lim</b></sub>
        </a>
    </td>
     <td align="center">
        <a href="https://github.com/sabioe">
            <img src="https://avatars.githubusercontent.com/u/112010085?v=4" width="100;" alt="sabioe"/>
            <br />
            <sub><b>Joshua Sabio</b></sub>
        </a>
    </td>
     <td align="center">
        <a href="https://github.com/erinsantosaa">
            <img src="https://avatars.githubusercontent.com/u/111716499?v=4" width="100;" alt="erinsantosaa"/>
            <br />
            <sub><b>Erin Santososa</b></sub>
        </a>
    </td>
   </tr>
</table>

[//]: # ( readme: collaborators -end )
