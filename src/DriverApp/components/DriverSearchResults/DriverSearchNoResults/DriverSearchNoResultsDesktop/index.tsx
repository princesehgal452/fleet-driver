import React, { memo } from 'react';
import classNames from 'classnames';
import { lighten, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircle from '@material-ui/icons/CheckCircle';


const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    transition: theme.transitions.create('background-color', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
  noRequest: {
    backgroundColor: lighten(theme.palette.primary.light, 0.5),
  },
  requested: {
    backgroundColor: theme.palette.secondary.light,
  },
});

interface IDriverSearchNoResultsDesktopOwnProps {
  requestedLoad: boolean;
  onRequestLoad: () => void;
  loading: boolean;
  pickupAddress?: string;
  dropoffAddress?: string;
}

type IDriverSearchNoResultsDesktopProps = IDriverSearchNoResultsDesktopOwnProps & WithStyles<typeof styles>;

const DriverSearchNoResultsDesktop = memo(({
                                             requestedLoad, onRequestLoad, pickupAddress, dropoffAddress, loading,
                                             classes,
                                           }: IDriverSearchNoResultsDesktopProps) => {
  return (
    <Grid
      container
      className={classNames(classes.root, {
        [classes.noRequest]: !requestedLoad,
        [classes.requested]: requestedLoad,
      })}
      justify='space-between'
      alignItems='center'
    >
      <Grid item xs>
        <Typography variant='h6'>
          {requestedLoad
            ? 'Your Request has been submitted. We will notify you as soon as we find a good load for you.'
            : 'Sorry we couldn\'t find any loads that match your search'}
        </Typography>
        {!requestedLoad && (
          <Typography variant='subtitle1' color='initial'>
            Click 'Request A Load' {pickupAddress && <>from <b><Typography color='secondary' display='inline'>
            {pickupAddress}</Typography></b></>} {dropoffAddress && pickupAddress && <>to <b>
            <Typography color='secondary' display='inline'>{dropoffAddress}</Typography></b></>} or
            try expanding your
            radius.
          </Typography>
        )}
      </Grid>
      <Grid item xs='auto'>
        {requestedLoad ? (
          <CheckCircle fontSize='large' color='secondary' />
        ) : (
          <Button
            fullWidth
            disabled={loading}
            color='secondary'
            variant='contained'
            onClick={onRequestLoad}
          >
            {loading ? <CircularProgress size={24} /> : 'Request A Load'}
          </Button>
        )}
      </Grid>
    </Grid>
  );
});

export default withStyles(styles)(DriverSearchNoResultsDesktop);
