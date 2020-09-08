import React, { Dispatch, useCallback } from 'react';
import { observer } from 'mobx-react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TrendingFlat } from '@material-ui/icons';
import FOGrid from 'components/FOGrid';
import PickupSelected from 'assets/images/png/PickupSelected.png';
import DropoffSelected from 'assets/images/png/DropoffSelected.png';
import PickupActive from 'assets/images/png/PickupActive.png';
import PickupDeselected from 'assets/images/png/PickupDeselected.png';
import DropoffDeselected from 'assets/images/png/DropoffDeselected.png';

import LocationStep from './LocationStep';
import { SearchSteps } from '../../SearchLoadsContent/SearchLoadsContentForm';

interface IStepText {
  step: number;
  stepText?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  stepText: {
    fontSize: theme.typography.pxToRem(14),
  },
  imgSpacing: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: 20,
  },

}));

const StepText = (step: number, stepText?: string) => {
  if (stepText) {
    return stepText;
  }
  if (step === 0) {
    return 'Picking up from?';
  }
  if (step === 1) {
    return 'Dropping off at?';
  }
  return null;
};

interface ILocationStepper extends IStepText {
  programmaticFormSubmit: (stepNumber?: SearchSteps) => () => void;
  pickupLocationFieldValue;
  dropoffLocationFieldValue;
  disabled?: boolean;
  displayFullAddress?: boolean;
  reflectDrawerState: Dispatch<boolean>;
}

// step 0 is pickup
// step 1 is dropoff
const LocationStepper = observer(({ stepText, step, reflectDrawerState, programmaticFormSubmit, pickupLocationFieldValue, dropoffLocationFieldValue, disabled, displayFullAddress }: ILocationStepper) => {
  const classes = useStyles();

  const handleDrawerOpen = useCallback(() => {
    if (disabled) {
      reflectDrawerState(true);
    }
  }, [disabled]);

  return (
    <Grid container justify='center' onClick={handleDrawerOpen}>
      <Grid item>
        <Typography variant='caption' className={classes.stepText}>
          {StepText(step, stepText)}
        </Typography>
      </Grid>
      <FOGrid vSpacing={1} />
      <Grid item xs={12}>
        <Grid container justify='space-evenly' alignItems='center'>
          <Grid item xs>
            <LocationStep
              onClick={programmaticFormSubmit(SearchSteps.pickupLocation)}
              text='Pickup Location'
              active={step === SearchSteps.pickupLocation}
              fieldValue={pickupLocationFieldValue}
              activeIcon={<img src={PickupSelected} height={35} />}
              inActiveIcon={<img src={step === 0 ? PickupActive : PickupDeselected} className={classes.imgSpacing} />}
              disabled={disabled}
              displayFullAddress={displayFullAddress}
            />
          </Grid>
          <TrendingFlat color='disabled' fontSize='small' />
          <Grid item xs>
            <LocationStep
              onClick={programmaticFormSubmit(SearchSteps.dropoffLocation)}
              text='Drop-off Location'
              active={step === SearchSteps.dropoffLocation}
              fieldValue={dropoffLocationFieldValue}
              activeIcon={<img src={DropoffSelected} height={35} />}
              inActiveIcon={<img src={DropoffDeselected} className={classes.imgSpacing} />}
              disabled={disabled}
              displayFullAddress={displayFullAddress}
            />
          </Grid>
        </Grid>
      </Grid>
      <FOGrid />
    </Grid>
  );
});

export default LocationStepper;
