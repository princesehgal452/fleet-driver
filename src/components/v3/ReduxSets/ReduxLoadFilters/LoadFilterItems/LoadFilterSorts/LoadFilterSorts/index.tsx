import React, { memo } from 'react';
import { Field } from 'redux-form';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FORadioGroup from 'components/v3/FORadioGroup';
import FOSwitch from 'components/v3/FOSwitch';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '15px 10px',
    borderRadius: 14,
    borderColor: theme.palette.grey['200'],
  },
}));

interface ILoadFilterSorts {
  fieldName: string;
  loadSortsFieldValue;
  options;
}

const LoadFilterSorts = memo(({ fieldName, loadSortsFieldValue, options }: ILoadFilterSorts) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} variant='outlined'>
      <Grid container spacing={3}>
        {options.map((option) => {
          const currentValue = loadSortsFieldValue ? loadSortsFieldValue[option.fieldName] : false;
          return (
            <Grid item xs={6}>
              <Field
                component={FORadioGroup}
                columns={2}
                spacing={3}
                name={`${fieldName}.${option.fieldName}`}
                options={[option]}
                noGutter
                typeSwitch
                control={<FOSwitch checked={currentValue} />}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
});

export default LoadFilterSorts;
