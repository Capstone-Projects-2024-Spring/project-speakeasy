import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './StreakBadge.module.css';

interface Props {
  className?: string;
}
/* @figmaId 60:55 */
export const StreakBadge: FC<Props> = memo(function StreakBadge(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle17}></div>
      <div className={classes.johnIsCurrentlyOnA100DayStreak}>John is currently on a 100 day streak!</div>
      <div className={classes.fire}></div>
    </div>
  );
});
