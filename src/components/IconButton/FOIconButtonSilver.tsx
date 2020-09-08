import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    color: '#fff',
    backgroundColor: '#21211F',
  },
});

const FOIconButtonSilver = props => (
  <IconButton classes={props.classes} {...props}>{props.children}</IconButton>
);

FOIconButtonSilver.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
};

export default withStyles(styles)(FOIconButtonSilver);
