import React, { useState } from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import { Grid, InputAdornment, makeStyles, Theme } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import FOLocationField from '../../../../components/FOLocationField';
import { locationRequired } from '../../../../services/Validations';
import './PickupDropOffLocation.scss';
import FOFullPageDialog from '../../../../components/FOFullPageDialog';
import PickupDialogContent from './PickupDialogContent';
import { CollectionsStore } from '../../../store/CollectionsStore';
import { inject, observer } from 'mobx-react';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../store/DriverAppStore';


const useInputStyles = makeStyles((theme: Theme) => ({
  root: (props) => ({
    backgroundColor: props.filled ? (props.isGeotab ? theme.palette.secondary.light : lighten(theme.palette.primary.light, 0.1)) : undefined,
    color: props.filled ? theme.palette.common.white : undefined,
  }),
}));

const useLabelStyles = makeStyles((theme: Theme) => ({
  root: (props) => ({
    color: props.filled ? theme.palette.common.white : undefined,
    '&$focused': {
      color: props.filled ? theme.palette.common.white : undefined,
    },
  }),
  focused: (props) => ({
    color: props.filled ? theme.palette.common.white : undefined,
  }),
}));

const useStyles = makeStyles((theme: Theme) => ({
  pickupContainer: { cursor: 'pointer' },
  pickupNoClickWrapper: { pointerEvents: 'none' },
}));

interface IPickupDropOffLocationOwnProps {
  disabled?: boolean;
  filled?: boolean;
  noClick?: boolean;
  onHistorySearchClick?: () => void;
  onNearbyLoadsClick?: () => void;
  recentSearches?: CollectionsStore;
}

type IPickupDropOffLocationProps = IPickupDropOffLocationOwnProps & IDriverAppStore;

const togglePickupDialogVisible = (setPickupDialogVisible, visible, recentSearches) => () => {
  if (visible && recentSearches) {
    recentSearches.downloadResults();
  }
  setPickupDialogVisible(visible);
};

const PickupDropOffLocation = inject('driverAppStore')(observer(({
  disabled, filled, onHistorySearchClick, noClick,
  onNearbyLoadsClick, recentSearches, driverAppStore
}: IPickupDropOffLocationProps) => {
  const [pickupDialogVisible, setPickupDialogVisible] = useState(false);
  const { configStore: {isGeotab} } = driverAppStore as DriverAppStore;
  const classes = useStyles();
  const inputClasses = useInputStyles({ filled, isGeotab });
  const labelClasses = useLabelStyles({ filled });
  
  return (
    <Grid container>
      <Grid item xs={12}>
        <div
          onClick={togglePickupDialogVisible(setPickupDialogVisible, true, recentSearches)}
          className={classes.pickupContainer}
        >
          <div className={classNames({ [classes.pickupNoClickWrapper]: noClick })}>
            <Field
              component={FOLocationField}
              name='pickupLocation'
              inputClasses={inputClasses}
              labelClasses={labelClasses}
              placeholder='Enter pickup city or state'
              label='Pickup Location'
              fullWidth
              validate={[locationRequired]}
              hideAdornment={disabled}
              variant={filled ? 'filled' : undefined}
              endAdornment={(
                <InputAdornment position='end'>
                  <SearchIcon />
                </InputAdornment>
              )}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Field
          component={FOLocationField}
          inputClasses={inputClasses}
          labelClasses={labelClasses}
          name='dropoffLocation'
          placeholder='Enter dropoff city or state'
          label='Dropoff Location'
          fullWidth
          hideAdornment={disabled}
          variant={filled ? 'filled' : undefined}
          endAdornment={(
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          )}
        />
      </Grid>
      <FOFullPageDialog
        open={pickupDialogVisible}
        dialogTitle=''
        appbarDisabled
        closeHandler={togglePickupDialogVisible(setPickupDialogVisible, false, recentSearches)}
      >
        <PickupDialogContent
          filled={filled}
          disabled={disabled}
          closeHandler={togglePickupDialogVisible(setPickupDialogVisible, false, recentSearches)}
          onHistorySearchClick={onHistorySearchClick}
          onNearbyLoadsClick={onNearbyLoadsClick}
        />
      </FOFullPageDialog>
    </Grid>
  );
}));

export default PickupDropOffLocation;
