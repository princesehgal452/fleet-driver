import React, { memo } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { DateRange } from '@material-ui/icons';
import moment from 'moment';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: theme.typography.pxToRem(12),
  },
  day: {
    fontSize: theme.typography.pxToRem(17),
  },
  caption: {
    fontSize: theme.typography.pxToRem(12),
    color: '#B9BCB9',
  },
}));

interface ILoadFilterDateProps {
  label: string;
  laneSizeFieldValue;
}

const LoadFilterDate = memo(({ label, laneSizeFieldValue }: ILoadFilterDateProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container justify='space-between'>
            <Grid item>
              <Typography variant='subtitle1' className={classes.label}>
                {label}
              </Typography>
            </Grid>
            <DateRange color='disabled' />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' color='primary' className={classes.day}>
            {laneSizeFieldValue ? (
              moment(laneSizeFieldValue).format('D MMM')
            ) : null}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='caption'
            className={classes.caption}
          >
            {laneSizeFieldValue ? (
              moment(laneSizeFieldValue).format('dddd Y')
            ) : null}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
});

export default LoadFilterDate;
