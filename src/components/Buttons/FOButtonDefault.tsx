import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    color: '#F6851F',
  },
});

const FOButtonDefault = props => (
  <Button classes={props.classes} variant='contained' {...props}>
    {props.children}
  </Button>
);


export default withStyles(styles)(FOButtonDefault);
