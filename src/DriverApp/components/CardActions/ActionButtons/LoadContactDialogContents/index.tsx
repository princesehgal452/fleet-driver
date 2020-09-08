import React from 'react';
import { DialogContent, DialogTitle, Fab, Grid, Hidden, Typography } from '@material-ui/core';
import { Email, Phone } from '@material-ui/icons';
import Load from '../../../../../models/dataStructures/Load';


interface ILoadContactDialogContents {
  load: Load;
}

const LoadContactDialogContents = ({ load: { contact: { phone, email, displayName, companyName } } }: ILoadContactDialogContents) => (
  <div>
    <DialogTitle>
      Shipment Contact
    </DialogTitle>
    <DialogContent>
      <Grid container alignItems='center' spacing={1}>
        <Grid item xs={12} md={6}>
          {displayName && (
            <Typography variant='subtitle1'>
              {displayName}
            </Typography>
          )}
          {companyName && (
            <Typography variant='subtitle1'>
              {companyName}
            </Typography>
          )}
        </Grid>
        {(phone || email) && (
          <Grid container item xs={12} md={6}>
            {phone && (
              <>
                <Hidden xsDown>
                  <Grid item xs={12}>
                    <Typography color='primary'>
                      {phone}
                    </Typography>
                  </Grid>
                </Hidden>
                <Hidden smUp>
                  <Fab href={`tel:${phone}`} color='primary'>
                    <Phone />
                  </Fab>
                </Hidden>
              </>
            )}
            {phone && (
              <>
                <Hidden xsDown>
                  <Grid item xs={12}>
                    <Typography color='primary'>
                      {email}
                    </Typography>
                  </Grid>
                </Hidden>
                <Hidden smUp>
                  &nbsp;
                  <Fab href={`mailto:${email}`} color='secondary'>
                    <Email />
                  </Fab>
                </Hidden>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </DialogContent>
  </div>
);

export default LoadContactDialogContents;
