import React, { memo, useCallback, useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOFiltersAccordion from 'components/FOFiltersAccordion';
import FORadioGroup from 'components/FORadioGroup';
import FOSwitch from 'components/FOSwitch';


const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

interface ILoadFilterLaneSizeProps {
  fieldName: string;
  change: (fieldName: string, value) => void;
  options;
  laneSizeFieldValue;
}

const LoadFilterLaneSize = memo(({ fieldName, laneSizeFieldValue, options, change }: ILoadFilterLaneSizeProps) => {
  const [allSwitchState, setAllSwitchState] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    if (laneSizeFieldValue) {
      const allChosen = Object.keys(laneSizeFieldValue).every((key) => laneSizeFieldValue[key] === true);
      if (allChosen) {
        setAllSwitchState(true);
      } else {
        setAllSwitchState(false);
      }
    }
  }, [laneSizeFieldValue]);

  const allOptionOnChange = useCallback((event, value) => {
    if (value) {
      options.forEach((option) => {
        change(`${fieldName}.${option.fieldName}`, true);
      });
    } else {
      options.forEach((option) => {
        change(`${fieldName}.${option.fieldName}`, false);
      });
    }
  }, []);
  return (
    <FOFiltersAccordion title='LENGTH OF HAUL'>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Grid container alignItems='center'>
            <Grid item>
              <FOSwitch onChange={allOptionOnChange} value={allSwitchState} checked={allSwitchState} />
            </Grid>
            <Grid item>
              <Typography className={classes.label}>All</Typography>
            </Grid>
          </Grid>
        </Grid>
        {options.map((option) => {
          const currentValue = laneSizeFieldValue && laneSizeFieldValue[option.fieldName] !== undefined ? laneSizeFieldValue[option.fieldName] : option.value;
          return (
            <Grid item xs={6}>
              <Field
                component={FORadioGroup}
                columns={2}
                spacing={3}
                name={`${fieldName}.${option.fieldName}`}
                options={[{ ...option, value: currentValue }]}
                noGutter
                typeSwitch
                control={<FOSwitch checked={currentValue} />}
              />
            </Grid>
          );
        })}
      </Grid>
    </FOFiltersAccordion>
  );
});

export default LoadFilterLaneSize;
