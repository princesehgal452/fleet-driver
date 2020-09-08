import React from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    ...theme.root,
    color: '#fff',
  },
});

const FOButtonTransparent = (props) => (
  <Button classes={props.classes} {...props}>{props.children}</Button>
);

export default withStyles(styles)(FOButtonTransparent);
