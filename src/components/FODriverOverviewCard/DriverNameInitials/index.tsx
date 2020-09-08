import React, { memo } from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 30,
    width: 30,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.common.white,
    marginRight: theme.spacing(1.5),
  },
}));

interface IDriverNameInitialsProps {
  initials: string;
}

const DriverNameInitials = memo(({ initials }: IDriverNameInitialsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography color='inherit' variant='subtitle2'>
        {initials}
      </Typography>
    </div>
  );
});

export default DriverNameInitials;
