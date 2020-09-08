import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
  root: {
    color: theme.palette.tertiary.contrastText,
    backgroundColor: theme.palette.tertiary.main,
    '&:hover': {
      backgroundColor: theme.palette.tertiary.dark,
    },
  },
});

const FOButtonBlue = ({ classes, children, ...other }: ButtonProps) => (
  <Button classes={classes} variant='contained' {...other} >
    {children}
  </Button>
);

export default withStyles(styles)(FOButtonBlue);
