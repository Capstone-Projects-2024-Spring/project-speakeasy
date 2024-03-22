import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import './styles/Style.css'; // Import CSS styles

const Login = () => { // Define Login functional component
  // Define state variables and their setter functions using useState hook
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Event handler functions to update state based on input changes
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Event handler function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Log username and password to the console
    console.log('Username:', username);
    console.log('Password:', password);
  };

  // JSX markup for the Login component
  return (
    <div className="login-container"> {/* Container for Login form */}
      <h2>Login</h2> {/* Login heading */}
      <form onSubmit={handleSubmit} className="login-form"> {/* Login form */}
        <div> {/* Form field for username */}
          <label>Username:</label> {/* Label for username input */}
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          /> {/* Input field for username */}
        </div>
        <div> {/* Form field for password */}
          <label>Password:</label> {/* Label for password input */}
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          /> {/* Input field for password */}
        </div>
        <button type="submit">Login</button> {/* Submit button */}
      </form>
      <div> {/* Additional text for navigating to signup page */}
        <p>Need an account? <Link to="/signup">Sign Up</Link></p> {/* Link to signup page */}
      </div>
    </div>
  );
};

export default Login; // Export Login component