import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import { Ellipse1Icon } from './Ellipse1Icon.js';
import classes from './ProfileCard.module.css';

interface Props {
  className?: string;
}
/* @figmaId 60:41 */
export const ProfileCard: FC<Props> = memo(function ProfileCard(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle15}></div>
      <div className={classes.ellipse1}>
        <Ellipse1Icon className={classes.icon} />
      </div>
      <div className={classes.maleUser}></div>
      <div className={classes.johnDoe}>John Doe</div>
      <div className={classes.johndoeGmailCom}>johndoe@gmail.com</div>
      <div className={classes.c}>Currently Studying: </div>
      <div className={classes.spainFlag}></div>
    </div>
  );
});
