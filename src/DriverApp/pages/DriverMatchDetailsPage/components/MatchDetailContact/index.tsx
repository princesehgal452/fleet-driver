import React, { Dispatch, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { darken, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Grid, Hidden, Snackbar, Typography } from '@material-ui/core';
import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import MatchDetailContactDesktop from './MatchDetailContactDesktop';
import MatchDetailContactMobile from './MatchDetailContactMobile';
import MatchDetailContactEmailDialog from './MatchDetailContactEmailDialog';
import Load from '../../../../../models/dataStructures/Load';
import { UserStore } from '../../../../store/UserStore';


const styles = (theme: Theme) => ({
  disablePadding: {
    padding: 0,
  },
  snackbarRoot: {
    zIndex: theme.zIndex.modal,
  },
  snackbarContentRoot: {
    backgroundColor: theme.palette.secondary.dark,
  },
  snackbarContentMessage: {
    width: '100%',
  },
  contactText: {
    color: darken(theme.palette.common.white, 0.2),
    [theme.breakpoints.down('sm')]: {
      lineHeight: 'normal',
    },
  },
  contentPadding: {
    padding: theme.spacing(1),
  },
});

const handleEvent = (submitEvent, eventType) => () => {
  submitEvent(eventType);
};

const toggleShowEmailDialog = (setShowEmailDialog: Dispatch<boolean>, state: boolean, emailClickTrack?: () => void) => () => {
  setShowEmailDialog(state);
  if (emailClickTrack) {
    emailClickTrack();
  }
};

const anchorOrigin: SnackbarOrigin = {
  vertical: 'bottom',
  horizontal: 'right',
};

interface IMatchDetailContactOwnProps {
  load: Load;
  userStore: UserStore;
}

type IMatchDetailContactProps = IMatchDetailContactOwnProps & WithStyles<typeof styles>;

const MatchDetailContact = observer((
  { load, userStore, classes }: IMatchDetailContactProps) => {
  const { contact: { displayName, companyName, email, phone }, trackContactButtonEvent } = load;

  const [showEmailDialog, setShowEmailDialog] = useState(false);

  const phoneClickTrack = handleEvent(trackContactButtonEvent, 'phoneClick');
  const emailClickTrack = handleEvent(trackContactButtonEvent, 'emailClick');

  return (
    (email || phone) ? (
        <>
          <Snackbar
            anchorOrigin={anchorOrigin}
            open
            classes={{ root: classes.snackbarRoot }}
            ContentProps={{
              'aria-describedby': 'message-id', classes: {
                root: classNames(classes.snackbarContentRoot, classes.disablePadding),
                message: classNames(classes.snackbarContentMessage, classes.disablePadding),
              },
            }}
            message={<Grid container alignItems='center'>
              <Grid item xs={6} sm={9} className={classNames(classes.contentPadding)}>
                <Typography variant='subtitle2' color='inherit'>
                  Shipment Contact
                </Typography>
                <Typography variant='subtitle1' color='inherit' className={classes.contactText}>
                  {displayName}
                </Typography>
                <Typography variant='subtitle1' color='inherit' className={classes.contactText}>
                  {companyName}
                </Typography>
                <Hidden xsDown>
                  <MatchDetailContactDesktop
                    phone={phone}
                    email={email}
                    onPhoneClick={phoneClickTrack}
                    onEmailClick={emailClickTrack}
                  />
                </Hidden>
              </Grid>
              <Hidden smUp>
                <MatchDetailContactMobile
                  phone={phone}
                  email={email}
                  onPhoneClick={handleEvent(trackContactButtonEvent, 'phoneClick')}
                  onEmailClick={toggleShowEmailDialog(setShowEmailDialog, true, emailClickTrack)}
                />
              </Hidden>
            </Grid>}
          />
          <MatchDetailContactEmailDialog
            open={showEmailDialog}
            load={load}
            userStore={userStore}
            closeHandler={toggleShowEmailDialog(setShowEmailDialog, false)}
          />
        </>
      )
      : null
  );
});

export default withStyles(styles)(MatchDetailContact);
