import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './ChatPageV3.module.css';
import { HelpOutlineIcon } from './HelpOutlineIcon.js';

interface Props {
  className?: string;
}
/* @figmaId 44:109 */
export const ChatPageV3: FC<Props> = memo(function ChatPageV3(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle8}></div>
      <div className={classes.learn}>Learn</div>
      <div className={classes.profile}>Profile</div>
      <div className={classes.settings}>Settings</div>
      <div className={classes.help}>Help</div>
      <div className={classes.helpOutline}>
        <HelpOutlineIcon className={classes.icon} />
      </div>
      <div className={classes.user}></div>
      <div className={classes.read}></div>
      <div className={classes.settings2}></div>
      <div className={classes.welcomeJohn}>Welcome, John!</div>
      <div className={classes.logo}></div>
      <div className={classes.rectangle6}></div>
      <div className={classes.whatCanIHelpYouWith}>What can I help you with?</div>
      <div className={classes.bot}></div>
      <div className={classes.progress}>Progress</div>
      <div className={classes.rectangle9}></div>
      <div className={classes.rectangle10}></div>
      <div className={classes._110}>1/10</div>
      <div className={classes.trophy}></div>
      <div className={classes.progress2}>Progress</div>
      <div className={classes.rectangle92}></div>
      <div className={classes.rectangle102}></div>
      <div className={classes._1102}>1/10</div>
      <div className={classes.trophy2}></div>
      <div className={classes.rectangle11}></div>
      <div className={classes.section1}>Section 1</div>
      <div className={classes.progress3}>Progress</div>
      <div className={classes.rectangle93}></div>
      <div className={classes.rectangle103}></div>
      <div className={classes._1103}>1/10</div>
      <div className={classes.trophy3}></div>
      <div className={classes.rectangle13}></div>
      <div className={classes.section3}>Section 3</div>
      <div className={classes.progress4}>Progress</div>
      <div className={classes.rectangle94}></div>
      <div className={classes.rectangle104}></div>
      <div className={classes._1104}>1/10</div>
      <div className={classes.trophy4}></div>
      <div className={classes.rectangle12}></div>
      <div className={classes.section2}>Section 2</div>
      <div className={classes.progress5}>Progress</div>
      <div className={classes.rectangle95}></div>
      <div className={classes.rectangle105}></div>
      <div className={classes._1105}>1/10</div>
      <div className={classes.trophy5}></div>
    </div>
  );
});
