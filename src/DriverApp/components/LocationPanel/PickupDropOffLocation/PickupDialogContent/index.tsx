import React from 'react';
import { Field } from 'redux-form';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Card, CardContent, Grid, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../../store/DriverAppStore';
import HistoricalSearches from '../../../HistoricalSearches';
import { locationRequired } from '../../../../../services/Validations';
import FOLocationField from '../../../../../components/FOLocationField';


const useLabelStyles = makeStyles((theme: Theme) => ({
  root: (props) => ({
    transform: 'translate(61px, 10px) scale(0.75) !important',
  }),
  focused: (props) => ({
    color: props.filled ? theme.palette.common.white : undefined,
  }),
}));

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    backgroundColor: '#fafafa',
  },
  nearbyShipmentBtn: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#e0e0e0 !important',
    },
  },
}));

interface IProps {
  disabled?: boolean;
  filled?: boolean;
  driverAppStore: IDriverAppStore;
  onHistorySearchClick?: () => void;
  closeHandler: () => void;
  onNearbyLoadsClick?: () => void;
}

const handleHistorySearch = (onHistorySearchClick, closeHandler) => (search) => {
  if (onHistorySearchClick) {
    onHistorySearchClick(search);
  }
  closeHandler();
};

const nearbyLoadshandler = (onNearbyLoadsClick, closeHandler) => () => {
  if (onNearbyLoadsClick) {
    onNearbyLoadsClick();
  }
  closeHandler();
};

const handleOnKeyDown = (closeHandler) => () => {
  closeHandler();
};

const PickupDialogContent = inject('driverAppStore')(observer(({ disabled, filled, driverAppStore, onHistorySearchClick, closeHandler, onNearbyLoadsClick }: IProps) => {
  const labelClasses = useLabelStyles({ filled });
  const classes = useStyles();
  const { searchStore } = driverAppStore as DriverAppStore;

  return (
    <div className={classes.root}>
      <Field
        component={FOLocationField}
        name='pickupLocation'
        labelClasses={labelClasses}
        placeholder='Enter pickup city or state'
        label='Pickup Location'
        fullWidth
        onEnterPress={handleOnKeyDown(closeHandler)}
        validate={[locationRequired]}
        variant={filled ? 'filled' : undefined}
        endAdornment={(
          <InputAdornment position='end'>
            <IconButton onClick={closeHandler}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )}
        startAdornment={(
          <IconButton position='start' onClick={closeHandler}>
            <ArrowBackIcon />
          </IconButton>
        )}
      />
      <Card className={classes.nearbyShipmentBtn} onClick={nearbyLoadshandler(onNearbyLoadsClick, closeHandler)}>
        <CardContent>
          <Grid container alignItems='center' spacing={1}>
            <RoomOutlinedIcon color='primary' />
            <Grid item>
              <Typography variant='subtitle2'>Shipments Nearby</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <br />
      <HistoricalSearches
        searchStore={searchStore}
        onHistorySearchClick={handleHistorySearch(onHistorySearchClick, closeHandler)}
      />
    </div>
  );
}));

export default PickupDialogContent;
