import React, { ReactNode } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LocationStepAddress from './LocationStepAddress';


const useStyles = makeStyles((theme: Theme) => ({
  typeText: {
    fontWeight: 300,
    fontSize: theme.typography.pxToRem(12),
  },
}));

interface ILocationStep {
  onClick: () => void;
  text: string;
  active: boolean;
  fieldValue?;
  activeIcon?: ReactNode;
  inActiveIcon?: ReactNode;
  disabled?: boolean;
  displayFullAddress?: boolean;
}

// fontSize: theme.typography.pxToRem(16),
const LocationStep = observer(({ onClick, text, active, fieldValue, activeIcon, inActiveIcon, disabled, displayFullAddress }: ILocationStep) => {
  const classes = useStyles();

  // If not active:

  // Show location if not active and location info exists
  // Show text if active
  // Show text if not active and location info does not exist
  return (
    <Grid container justify='center' onClick={onClick}>
      <LocationStepAddress
        active={active}
        fieldValue={fieldValue}
        activeIcon={activeIcon}
        inActiveIcon={inActiveIcon}
        disabled={disabled}
        displayFullAddress={displayFullAddress}
      />
      <Grid item xs={12}>
        <Typography
          variant='subtitle2'
          color={active ? 'primary' : 'initial'}
          align='center'
          className={classes.typeText}
        >
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
});

export default LocationStep;
