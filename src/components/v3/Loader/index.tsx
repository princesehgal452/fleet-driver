import React from 'react';
import { Backdrop, CircularProgress, withStyles, WithStyles } from '@material-ui/core';
import styles from './styles';

interface ILoaderOwnProps {
  loading: boolean;
}

type ILoaderProps = ILoaderOwnProps & WithStyles<typeof styles>;

const Loader = ({ loading, classes }: ILoaderProps) => (
  <Backdrop className={classes.root} open={loading}>
    <CircularProgress color='inherit' />
  </Backdrop>
);

export default withStyles(styles)(Loader);
