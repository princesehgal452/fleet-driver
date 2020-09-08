import React, { ReactNode } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(18),
  },
}));

interface IFOSectionTitle {
  children: ReactNode;
}

const FOSectionTitle = ({ children }: IFOSectionTitle) => {
  const classes = useStyles();
  return (
    <Typography variant='subtitle1' color='inherit' className={classes.title}>
      {children}
    </Typography>
  );
};

export default FOSectionTitle;
