import { memo, useState } from 'react';

import resets from '../_resets.module.css';
import classes from './LogIn.module.css';

const LogIn = memo(function LogIn(props = {}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.logIn}>Log In</div>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        className={classes.username}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className={classes.password}
        placeholder="Password"
      />
      <div className={classes.line1}></div>
      <div className={classes.line2}></div>
      <div className={classes.rectangle3}></div>
      <button type="submit" className={classes.submit}>Submit</button>
      <div className={classes.user}></div>
      <div className={classes.lock}></div>
      <div className={classes.needAnAccountSignUp}>
        <p className={classes.labelWrapper}>
          <span className={classes.label}>Need an account? </span>
          <button type="submit" className={classes.label2}>
            <span>Sign Up</span>
          </button>       
        </p>
      </div>
      <div className={classes.frame1}>
        <div className={classes.learnAnyLanguageEasilyChatNatu}>
          <div className={classes.textBlock}>Learn any language easily.</div>
          <div className={classes.textBlock2}>
            <p></p>
          </div>
          <div className={classes.textBlock3}>Chat naturally.</div>
          <div className={classes.textBlock4}>
            <p></p>
          </div>
          <div className={classes.textBlock5}>Anywhere really.</div>
        </div>
        <div className={classes.screenshot202421At1142}></div>
      </div>
      <div className={classes.rectangle5}></div>
    </div>
  );
});

export default LogIn;
