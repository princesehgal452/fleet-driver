import React, { memo } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Email, Phone } from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) => ({
  contentPadding: {
    padding: theme.spacing(1),
  },
  contactButton: {
    backgroundColor: theme.palette.common.white,
  },
}));

interface IMatchDetailContactMobileProps {
  phone: string;
  email: string;
  onEmailClick: () => void;
  onPhoneClick: () => void;
}

const MatchDetailContactMobile = memo(({ phone, email, onEmailClick, onPhoneClick }: IMatchDetailContactMobileProps) => {
  const classes = useStyles();
  return (
    <Grid item xs className={classes.contentPadding}>
      <Grid container justify='flex-end' spacing={1}>
        {email && (
          <Grid item>
            <Button
              variant='contained'
              classes={{ contained: classes.contactButton }}
              onClick={onEmailClick}
            >
              <Email />
            </Button>
          </Grid>
        )}
        {phone && (
          <Grid item>
            <Button
              variant='contained'
              classes={{ contained: classes.contactButton }}
              href={`tel:${phone}`}
              onClick={onPhoneClick}
            >
              <Phone />
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
});

export default MatchDetailContactMobile;
