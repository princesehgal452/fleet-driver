import React, { memo } from 'react';
import { Field } from 'redux-form';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { IOption } from 'SearchLoadsContent/SearchLoadsContentForm';
import FOReduxSlider from 'components/v3/FOReduxFields/FOReduxSlider';


const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: theme.typography.pxToRem(14),
    paddingBottom: 8,
  },
}));

interface ILoadFilterAdvancedRadiusProps {
  pickupRadiusField;
  dropoffDateField;
  dropoffLocationFieldValue;
}

const LoadFilterAdvancedRadius = memo(({ pickupRadiusField, dropoffDateField, dropoffLocationFieldValue }: ILoadFilterAdvancedRadiusProps) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={6}>
        <Typography variant='h6' className={classes.label}>PICKUP RADIUS</Typography>
        <Field
          name={pickupRadiusField.name}
          component={FOReduxSlider}
          max={200}
          valueLabelDisplay='on'
          bottomLabels={['', 'Miles']}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h6' className={classes.label}>DROP-OFF RADIUS</Typography>
        <Field
          name={dropoffDateField.name}
          component={FOReduxSlider}
          disabled={!dropoffLocationFieldValue}
          max={200}
          valueLabelDisplay='on'
          bottomLabels={['', 'Miles']}
        />
      </Grid>
    </>
  );
});

export default LoadFilterAdvancedRadius;
