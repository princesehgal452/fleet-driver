import React, { memo } from 'react';
import { Typography } from '@material-ui/core';
import FONoResults from '../../../../components/FONoResults';
import NoNotificationsSVG from '../../../../assets/images/svg/NoNotificationsSVG.svg';


interface INoNotificationsProps {
  routeToRAL: () => void;
}

const NoNotifications = memo(({ routeToRAL }: INoNotificationsProps) => {

  return (
    <>
      <FONoResults
        buttonText='Request a load'
        buttonOnClick={routeToRAL}
        image={<NoNotificationsSVG />}
        message={
          <Typography variant='subtitle1' align='center'>
            You don't have any notifications yet.<br />
            Try requesting a load and you'll be notified when we find you a match.
          </Typography>
        }
      />
    </>
  );
});

export default NoNotifications;
