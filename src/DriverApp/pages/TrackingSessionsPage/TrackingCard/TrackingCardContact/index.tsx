import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Hidden, IconButton, Typography } from '@material-ui/core';
import { AccountCircle, Phone } from '@material-ui/icons';
import FOGrid from '../../../../../components/FOGrid';
import TrackingSession from '../../../../../models/dataStructures/TrackingSession';

interface ITrackingCardContact {
  trackingSession: TrackingSession;
}

const TrackingCardContact = observer(({ trackingSession: { load: { contact: { name, phone } } } }: ITrackingCardContact) => (
  <FOGrid justify='space-between' alignItems='center'>
    <Grid item>
      <Grid container spacing={1} alignItems='center'>
        <AccountCircle fontSize='large' color='disabled' />
        <Grid item>
          <Typography variant='caption'>
            Posted By
          </Typography>
          <Typography variant='subtitle2'>
            {name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <Grid item>
      <Grid container alignItems='center'>
        <Grid item>
          <IconButton color='primary' disabled={!phone}><Phone /></IconButton>
        </Grid>
        <Hidden smDown>
          <Grid item>
            <Typography variant='subtitle1'>
              {phone ? (
                <a href={`tel:${phone}`}>{phone}</a>
              ) : (
                'N/A'
              )}
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  </FOGrid>
));

export default TrackingCardContact;
