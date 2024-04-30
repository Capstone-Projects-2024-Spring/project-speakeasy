import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { HelpOutlineIcon } from './HelpOutlineIcon.js';
import { NightowlBadge } from './NightowlBadge/NightowlBadge.js';
import { ProfileCard } from './ProfileCard/ProfileCard.js';
import classes from './ProfilePage.module.css';
import { StreakBadge } from './StreakBadge/StreakBadge.js';

interface Props {
  className?: string;
}
/* @figmaId 59:2 */
export const ProfilePage: FC<Props> = memo(function ProfilePage(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle8}></div>
      <div className={classes.screenshot202421At1143}></div>
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
      <div className={classes.rectangle14}></div>
      <div className={classes.dictionaryBadge}>
        <div className={classes.rectangle17}></div>
        <div className={classes.johnHasSearchedOver500Words}>John has searched over 500 words!</div>
        <div className={classes.search}></div>
      </div>
      <div className={classes.badges}>Badges</div>
      <StreakBadge />
      <NightowlBadge />
      <ProfileCard />
    </div>
  );
});
