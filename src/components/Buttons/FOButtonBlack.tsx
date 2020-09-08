import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#21211F',
  },
});

const FOButtonBlack = props => (
  <Button classes={props.classes} variant='contained' fullWidth {...props}>
    {props.children}
  </Button>
);


export default withStyles(styles)(FOButtonBlack);
