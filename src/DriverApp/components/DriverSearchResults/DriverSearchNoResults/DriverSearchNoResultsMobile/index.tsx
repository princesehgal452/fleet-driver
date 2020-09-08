import React, { Dispatch, memo, SetStateAction, useEffect, useState } from 'react';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Portal from '@material-ui/core/Portal';
import Place from '@material-ui/icons/Place';
import ArrowForward from '@material-ui/icons/ArrowForward';
import FOSuccessSnackbarContent from '../../../../../components/FOSuccessSnackbarContent';


const toggleShowPopoverTrue = (setHidePopover: Dispatch<SetStateAction<boolean>>, showPopover: boolean) => () => {
  setHidePopover(!showPopover);
};

const handleRequestClick = (onRequestLoad: () => void, togglePopover: () => void) => () => {
  onRequestLoad();
  togglePopover();
};

const styles = (theme: Theme) => ({
  paper: {
    backgroundColor: 'inherit' as 'inherit',
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.tooltip,
  },
});

interface IDriverSearchNoResultsMobileOwnProps {
  requestedLoad: boolean;
  onRequestLoad: () => void;
  loading: boolean;
  pickupAddress?: string;
  dropoffAddress?: string;
}

type IDriverSearchNoResultsMobileProps = IDriverSearchNoResultsMobileOwnProps & WithStyles<typeof styles>;

const DriverSearchNoResultsMobile = memo(({
                                            pickupAddress, dropoffAddress, loading,
                                            onRequestLoad, requestedLoad, classes,
                                          }: IDriverSearchNoResultsMobileProps) => {
  const [showPopover, setShowPopover] = useState(false);
  useEffect(toggleShowPopoverTrue(setShowPopover, showPopover), []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <br />
      </Grid>
      {requestedLoad && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='body2'>
              Your request has been submitted. We will notify you as soon as we find a load for you.
            </Typography>
          </Paper>
        </Grid>
      )}
      {showPopover && (<Portal><Backdrop open className={classes.backdrop} /></Portal>)}
      <FOSuccessSnackbarContent
        show={showPopover}
        onClose={toggleShowPopoverTrue(setShowPopover, showPopover)}
        content={(
          <>
            <Grid container direction='column' spacing={1} onClick={toggleShowPopoverTrue(setShowPopover, showPopover)}>
              <Grid item>
                <Typography variant='h6'>
                  Sorry we couldn't find any loads that match your search
                </Typography>
                <br/>
              </Grid>
              <Grid item>
                <Typography variant='body1'>
                  Try expanding your request
                </Typography>
                <Typography variant='body1'>
                  or
                </Typography>
                <Typography variant='body1'>
                  Click below to request a load
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems='center' justify='center'>
                  <Grid item>
                    <Place color='secondary' />
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2'>
                      {pickupAddress}
                    </Typography>
                  </Grid>
                  {dropoffAddress && (
                    <>
                      <Grid item>
                        <ArrowForward />
                      </Grid>
                      <Grid item>
                        <Typography variant='subtitle2'>
                          {dropoffAddress}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  disabled={loading || requestedLoad}
                  color='primary'
                  variant='outlined'
                  onClick={handleRequestClick(onRequestLoad, toggleShowPopoverTrue(setShowPopover, showPopover))}
                >
                  {loading ? <CircularProgress size={24} /> : requestedLoad ? 'Request Sent' : 'Send Request'}
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      />
    </Grid>
  );
});

export default withStyles(styles)(DriverSearchNoResultsMobile);
