import { memo } from 'react';
import type { FC } from 'react';

import resets from '../../_resets.module.css';
import classes from './NightowlBadge.module.css';

interface Props {
  className?: string;
}
/* @figmaId 60:62 */
export const NightowlBadge: FC<Props> = memo(function NightowlBadge(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle18}></div>
      <div className={classes.johnFrequentlyLearnsPast7PM}>John frequently learns past 7PM!</div>
      <div className={classes.sleep}></div>
    </div>
  );
});
