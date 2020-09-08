import React, { memo, useCallback } from 'react';
import clsx from 'clsx';
import { Field, WrappedFieldProps } from 'redux-form';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOFiltersAccordion from 'components/v3/FOFiltersAccordion';


const useStyles = makeStyles((theme: Theme) => ({
  knob: {
    zIndex: 1,
    height: 20,
    width: 20,
    borderRadius: 80,
    backgroundColor: '#E6E6E6',
  },
  knobActive: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0 -2px 4px 0 rgba(127,127,127,0.33), 0 2px 4px 0 rgba(126,126,126,0.3)',
  },
  line: {
    height: 8,
    width: 52,
    backgroundColor: '#E6E6E6',
    transform: 'scaleX(1.05)',
  },
  labelContainer: {
    width: 170,
  },
  label: {
    fontSize: 14,
  },
}));

const LoadSizeField = memo(({ loadSizeFieldValue, input }: WrappedFieldProps) => {
  const classes = useStyles();

  const onClickHandler = useCallback((value) => () => input.onChange(value), []);

  return (
    <Grid container item justify='center' alignItems='center'>
      <div className={clsx(classes.knob, { [classes.knobActive]: loadSizeFieldValue === 'LTL' })}
           onClick={onClickHandler('LTL')} />
      <div className={classes.line} />
      <div className={clsx(classes.knob, { [classes.knobActive]: !loadSizeFieldValue || loadSizeFieldValue === 'ALL' })}
           onClick={onClickHandler('ALL')} />
      <div className={classes.line} />
      <div className={clsx(classes.knob, { [classes.knobActive]: loadSizeFieldValue === 'FTL' })}
           onClick={onClickHandler('FTL')} />
    </Grid>
  );
});

interface ILoadFilterLoadSizeProps {
  fieldName: string;
  loadSizeFieldValue;
}

const LoadFilterLoadSize = memo(({ fieldName, loadSizeFieldValue }: ILoadFilterLoadSizeProps) => {
  const classes = useStyles();

  return (
    <FOFiltersAccordion title='FTL/LTL'>
      <Grid container direction='column' alignItems='center'>
        <Field
          component={LoadSizeField}
          name={fieldName}
          loadSizeFieldValue={loadSizeFieldValue}
        />
        <Grid container item className={classes.labelContainer} justify='space-between'>
          <Typography variant='h6' className={classes.label}>LTL</Typography>
          <Typography variant='h6' className={classes.label}>ALL</Typography>
          <Typography variant='h6' className={classes.label}>FTL</Typography>
        </Grid>
      </Grid>
    </FOFiltersAccordion>
  );
});

export default LoadFilterLoadSize;
