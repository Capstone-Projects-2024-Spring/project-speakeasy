import React, { memo } from 'react';
import LogIn from './components/LogIn/LogIn';
import classes from './App.module.css';
import resets from './components/_resets.module.css';

const App = memo(function App(props) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <LogIn />
    </div>
  );
});

export default App;