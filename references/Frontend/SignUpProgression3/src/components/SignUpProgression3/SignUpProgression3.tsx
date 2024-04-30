import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import classes from './SignUpProgression3.module.css';
import { TriangleIcon } from './TriangleIcon.js';

interface Props {
  className?: string;
}
/* @figmaId 33:2 */
export const SignUpProgression3: FC<Props> = memo(function SignUpProgression3(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle1}></div>
      <div className={classes.howManyMinutesADay}>How many minutes a day?</div>
      <div className={classes.rectangle3}></div>
      <div className={classes.submit}>Submit</div>
      <div className={classes.time}>Time</div>
      <div className={classes.line1}></div>
      <div className={classes.triangle}>
        <TriangleIcon className={classes.icon} />
      </div>
      <div className={classes.alarmClock}></div>
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
