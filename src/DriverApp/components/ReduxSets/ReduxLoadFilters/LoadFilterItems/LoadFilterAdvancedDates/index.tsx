import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ReduxDateSelector from '../../../ReduxDateSelector';
import LoadFilterDate from '../LoadFilterDate';


const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: theme.typography.pxToRem(14),
    paddingBottom: 8,
  },
}));

interface ILoadFilterAdvancedProps {
  pickupDateField;
  dropoffDateField;
}

const LoadFilterAdvancedDates = memo(({ pickupDateField, dropoffDateField }: ILoadFilterAdvancedProps) => {
  const classes = useStyles();
  return (
    <>
      {/*LoadFilterDate*/}
      <Grid item xs={6}>
        <ReduxDateSelector
          dateField={pickupDateField}
          detailed
          clearable
          label='Pickup Date'
        />
      </Grid>
      <Grid item xs={6}>
        <ReduxDateSelector
          dateField={dropoffDateField}
          detailed
          clearable
          label='Drop-Off Date'
        />
      </Grid>
    </>
  );
});

export default LoadFilterAdvancedDates;
