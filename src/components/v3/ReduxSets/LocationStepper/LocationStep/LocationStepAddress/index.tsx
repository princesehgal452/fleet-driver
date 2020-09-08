import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { LocalShipping } from '@material-ui/icons';

import FOAddress from 'components/v3/FOAddress';


interface ILocationStepAddressDefaultReturnValue {
  inActiveIcon?: ReactNode;
}

const LocationStepAddressDefaultReturnValue = ({ inActiveIcon }: ILocationStepAddressDefaultReturnValue) => {
  if (inActiveIcon) {
    return (<>{inActiveIcon}</>);
  }
  return (
    <LocalShipping />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  address: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    paddingTop: 10,
  },
}));

interface ILocationStepAddress {
  active: boolean;
  fieldValue?;
  activeIcon?: ReactNode;
  inActiveIcon?: ReactNode;
  disabled?: boolean;
  displayFullAddress?: boolean;
}

const LocationStepAddress = observer(({ active, fieldValue, activeIcon, inActiveIcon, disabled, displayFullAddress }: ILocationStepAddress) => {
  const classes = useStyles();

  if (disabled) {
    return (
      <LocationStepAddressDefaultReturnValue inActiveIcon={inActiveIcon} />
    );
  }
  if (active) {
    if (activeIcon) {
      return (<>{activeIcon}</>);
    }
    return (
      <LocalShipping color='primary' />
    );
  }
  if (!active && fieldValue?.description && fieldValue?.coordinates) {
    return (
      <Grid item xs={12}>
        <Typography variant='subtitle1' align='center' className={classes.address}>
          {
            displayFullAddress ? fieldValue.description : <FOAddress address={fieldValue.description} displayFullAddress={displayFullAddress} />
          }
        </Typography>
      </Grid>
    );
  }
  return (
    <LocationStepAddressDefaultReturnValue inActiveIcon={inActiveIcon} />
  );
});

export default LocationStepAddress;
