import React, { memo } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';
import { darken } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  contactText: {
    color: darken(theme.palette.common.white, 0.2),
    [theme.breakpoints.down('sm')]: {
      lineHeight: 'normal',
    },
  },
}));

interface IMatchDetailContactDesktopProps {
  phone: string;
  email: string;
  onEmailClick: () => void;
  onPhoneClick: () => void;
}

const MatchDetailContactDesktop = memo(({ phone, email, onEmailClick, onPhoneClick }: IMatchDetailContactDesktopProps) => {
  const classes = useStyles();
  return (
    <div>
      <a onClick={onPhoneClick}>
        <Typography variant='subtitle1' color='inherit' className={classes.contactText}>
          {phone}
        </Typography>
      </a>
      <a onClick={onEmailClick}>
        <Typography variant='subtitle1' color='inherit' className={classes.contactText}>
          {email}
        </Typography>
      </a>
    </div>
  );
});

export default MatchDetailContactDesktop;
