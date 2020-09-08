import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { withStyles, Theme } from '@material-ui/core';


const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.error.main,
  },
  contained: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
});

const FOButtonError = ({ classes, children, ...other }: ButtonProps) => (
  <Button classes={classes} {...other}>{children}</Button>
);

export default withStyles(styles)(FOButtonError);
