import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FOSVG from '../../../../components/FOSVG';
import NotificationsErrorSVG from '../../../../assets/images/svg/NotificationsErrorSVG.svg';


interface INotificationsListErrorProps {
  refreshNotifications: () => void;
}

const NotificationsListError = memo(({ refreshNotifications }: INotificationsListErrorProps) => (
  <Grid container justify='center' spacing={2}>
    <Grid item>
      <FOSVG>
        <NotificationsErrorSVG />
      </FOSVG>
    </Grid>
    <Grid item xs={12}>
      <Typography variant='subtitle1' align='center'>
        Sorry, we weren't able to fetch your notifications. Let's try again.
      </Typography>
    </Grid>
    <Grid item>
      <Button variant='outlined' fullWidth onClick={refreshNotifications}>
        Retry
      </Button>
    </Grid>
  </Grid>
));

export default NotificationsListError;
