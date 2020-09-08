import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Field } from 'redux-form';
import clsx from 'clsx';
import { Button, Grid, IconButton, InputAdornment, Paper } from '@material-ui/core';
import { LocalShipping, LocationOnOutlined, SearchOutlined } from '@material-ui/icons';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOLocationField from 'components/FOLocationField';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    height: 22,
    width: 0,
    marginLeft: 8,
    marginRight: 8,
    borderRight: 0,
  },
  paperNoRightMargin: {
    marginRight: 0,
  },
  startAdornment: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  endAdornment: {
    width: 150,
  },
  helperText: {
    padding: '0 15px',
  },
  locationIcon: {
    marginRight: 8,
  },
}));

interface IFOReduxLocationFieldProps {
  locationField;
  nearbyButtonClickHandler: (location) => void;
  programmaticFormSubmit: () => void;
  showNearby?: boolean;
  showSkip?: boolean;
  placeholder: string;
  startAdornmentIcon?: ReactNode;
}

const FOReduxLocationField = observer(({
  nearbyButtonClickHandler, placeholder, locationField, showNearby, showSkip, programmaticFormSubmit, startAdornmentIcon,
}: IFOReduxLocationFieldProps) => {
  const classes = useStyles();

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
          {showNearby && (
            <>
              <Grid item>
                <Paper variant='outlined' className={classes.paper} />
              </Grid>
              <IconButton size='small' className={classes.locationIcon}>
                <LocationOnOutlined color='secondary' onClick={nearbyButtonClickHandler} />
              </IconButton>
            </>
          )}
          {showSkip && (
            <>
              <Grid item>
                <Paper variant='outlined' className={clsx(classes.paper, classes.paperNoRightMargin)} />
              </Grid>
              <Button size='small' color='primary' onClick={programmaticFormSubmit}>Skip</Button>
            </>
          )}
        </Grid>
      )}
    />
  );
});

export default FOReduxLocationField;
