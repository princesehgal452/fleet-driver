import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Field } from 'redux-form';
import clsx from 'clsx';
import { Button, Grid, IconButton, InputAdornment, Paper } from '@material-ui/core';
import { LocalShipping, LocationOnOutlined, SearchOutlined } from '@material-ui/icons';
import FOLocationField from 'components/v3/FOLocationField';
import useStyles from './styles';

interface IFOReduxLocationFieldProps {
  locationField;
  nearbyButtonClickHandler: (location) => void;
  programmaticFormSubmit: () => void;
  clearClickHandler?: () => void;
  showNearby?: boolean;
  showSkip?: boolean;
  placeholder: string;
  startAdornmentIcon?: ReactNode;
  locationFieldValue?;
}

const FOReduxLocationField = observer(({
  nearbyButtonClickHandler,
  placeholder,
  locationField,
  showNearby,
  showSkip,
  programmaticFormSubmit,
  startAdornmentIcon,
  locationFieldValue,
  clearClickHandler,
}: IFOReduxLocationFieldProps) => {
  const classes = useStyles();
  const showClearButton = locationFieldValue?.description.length > 0;
  return (
    <Field
      component={FOLocationField}
      helperTextClasses={classes.helperText}
      name={locationField.name}
      placeholder={placeholder}
      fullWidth
      validate={locationField.validator ? locationField.validator : undefined}
      citiesOnly
      programmaticFormSubmit={programmaticFormSubmit}
      startAdornment={(
        <InputAdornment position='start' className={classes.startAdornment}>
          {startAdornmentIcon || <LocalShipping color='disabled' fontSize='small' />}
        </InputAdornment>
      )}
      endAdornment={(
        <Grid container className={classes.endAdornment} justify='flex-end' alignItems='center' wrap='nowrap'>
          <IconButton size='small' onClick={programmaticFormSubmit}>
            <SearchOutlined color='disabled' />
          </IconButton>
          {showNearby && !showClearButton && (
            <>
              <Grid item>
                <Paper variant='outlined' className={classes.paper} />
              </Grid>
              <IconButton size='small' className={classes.locationIcon}>
                <LocationOnOutlined color='secondary' onClick={nearbyButtonClickHandler} />
              </IconButton>
            </>
          )}
          {showSkip && !showClearButton && (
            <>
              <Grid item>
                <Paper variant='outlined' className={clsx(classes.paper, classes.paperNoRightMargin)} />
              </Grid>
              <Button size='small' color='primary' onClick={programmaticFormSubmit}>SKIP</Button>
            </>
          )}
          {showClearButton && (
            <>
              <Grid item>
                <Paper variant='outlined' className={clsx(classes.paper, classes.paperNoRightMargin)} />
              </Grid>
              <Button size='small' color='primary' onClick={clearClickHandler}>CLEAR</Button>
            </>
          )}
        </Grid>
      )}
    />
  );
});

export default FOReduxLocationField;
