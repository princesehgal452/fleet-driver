import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';
import { Block, Done } from '@material-ui/icons';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import { IPartnerOnboarding } from '../../../../models/interfaces/shared/ITrackingSesssionOnboarding';
import TrackingSessionsStore from '../../../store/TrackingSessionsStore';


interface ISessionRequestItem {
  session: IPartnerOnboarding;
  trackingSession: TrackingSessionsStore;
  closeHandler: () => void;
}

const PartnerOnboardingRequestItem = observer(({ session, trackingSession: { updatePartnerOnboarding }, closeHandler }: ISessionRequestItem) => {
  const [loading, setLoading] = useState(false);

  const buttonHandler = useCallback((action: 'accept' | 'reject') => async () => {
    setLoading(true);
    await updatePartnerOnboarding(session.onboardingId, action);
    setLoading(true);
    closeHandler();
  }, []);

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid item xs>
        <Typography variant='subtitle1'>
          {session.integration.partnerName}
        </Typography>
      </Grid>
      {session.status === 'PENDING' && (
        <Grid item>
          <Grid container spacing={1}>
            <Hidden smDown>
              <Grid item>
                <Button disabled={loading} color='secondary' variant='outlined' onClick={buttonHandler('reject')}>
                  Reject
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={loading} color='primary' variant='outlined' onClick={buttonHandler('accept')}>
                  Accept
                </Button>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Grid item>
                <Button disabled={loading} color='secondary' variant='outlined' onClick={buttonHandler('reject')}>
                  <Block />
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={loading} color='primary' variant='outlined' onClick={buttonHandler('accept')}>
                  <Done />
                </Button>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      )}
      {session.status === 'ACCEPTED' && (
        <Grid item>
          <Typography color='primary'>
            Accepted
          </Typography>
        </Grid>
      )}
      {session.status === 'REJECTED' && (
        <Grid item>
          <Typography color='secondary'>
            Rejected
          </Typography>
        </Grid>
      )}
    </Grid>
  );
});

interface ITrackinSessionOnboardingContentProps {
  truck?: DriverTruck;
  drivers?: DriverTruck[];
  dialogCloseHandler: () => void;
}

const TrackinSessionOnboardingContent = observer(({ truck, drivers, dialogCloseHandler }: ITrackinSessionOnboardingContentProps) => {

  return (
    <>
      <DialogTitle>
        Tracking Requests Requires Action
      </DialogTitle>
      <DialogContent>
        <>
          <DialogContentText>
            These partners want to track your deliveries
          </DialogContentText>
          {truck?.trackingSessionsStore.partnerOnboarding.map((session) => (
            <div key={session.onboardingId}>
              <PartnerOnboardingRequestItem session={session} trackingSession={truck.trackingSessionsStore} closeHandler={dialogCloseHandler} />
              <Divider />
            </div>
          ))}
          {drivers?.flatMap((driver) => (driver.trackingSessionsStore.partnerOnboarding.map((session) => (
            <div key={session.onboardingId}>
              <PartnerOnboardingRequestItem session={session} trackingSession={driver.trackingSessionsStore} closeHandler={dialogCloseHandler} />
              <Divider />
            </div>
          ))))}
        </>
      </DialogContent>
    </>
  );
});

export default TrackinSessionOnboardingContent;
