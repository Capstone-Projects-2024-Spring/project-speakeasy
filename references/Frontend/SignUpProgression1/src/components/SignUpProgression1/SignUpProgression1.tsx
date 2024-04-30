import React, { memo, useState, ChangeEvent } from 'react';

import resets from '../_resets.module.css';
import classes from './SignUpProgression1.module.css';

interface SignUpProps {
  className?: string;
}

const SignUpProgression1: React.FC<SignUpProps> = memo(function SignUpProgression1(props: SignUpProps) {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFullNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.signUp}>Sign Up</div>
      <div className={classes.rectangle3}></div>
      <div className={classes.submit}>Submit</div>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        className={classes.username}
        placeholder="Username"
      />
      <div className={classes.line1}></div>
      <div className={classes.user}></div>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        className={classes.email}
        placeholder="Email"
      />
      <div className={classes.line12}></div>
      <div className={classes.email2}></div>
      <input
        type="text"
        value={fullName}
        onChange={handleFullNameChange}
        className={classes.fullName}
        placeholder="Full name"
      />
      <div className={classes.line13}></div>
      <div className={classes.pencil}></div>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        className={classes.password}
        placeholder="Password"
      />
      <div className={classes.line2}></div>
      <div className={classes.lock}></div>
      <div className={classes.haveAnAccountLogIn}>
        <p className={classes.labelWrapper}>
          <span className={classes.label}>Have an account? </span>
          <span className={classes.label2}>Log In</span>
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
      <div className={classes.rectangle4}></div>
    </div>
  );
});

export default SignUpProgression1;