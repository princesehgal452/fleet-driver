import React, { memo, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Grid, makeStyles, Slider, Theme, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 15,
    marginBottom: -15,
    '& .MuiSlider-mark': {
      display: 'none',
    },
    '& .MuiSlider-markLabel:last-child': {
      paddingRight: 40,
    },
  },
  valueLabel: {
    width: 33,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1) translateY(4px) !important',
    boxShadow: '0 -4px 8px 0 rgba(140,140,140,0.2), 0 4px 8px 0 rgba(140,140,140,0.3)',
    '& > span': {
      width: 20,
      height: 20,
      '& > span': {
        // transform: 'unset',
      },
    },
  },
  valueLabelDisabled: {
    backgroundColor: '#bdbdbd',
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 -2px 4px 0 rgba(140,140,140,0.2), 0 2px 4px 0 rgba(140,140,140,0.3)',
  },
  track: {
    height: 8,
    borderRadius: 100,
  },
  trackInverted: {
    color: '#E6E6E6',
  },
  rail: {
    height: 8,
    color: '#E6E6E6',
    opacity: 'unset',
    borderRadius: 100,
  },
  railInverted: {
    color: 'inherit',
  },
  bottomLabelGridContainer: {
    // transform: 'translateY(-12px)',
  },
  bottomLabelTypography: {
    fontSize: theme.typography.pxToRem(12),
    color: '#AAAAAA',
  },
}));

const FOReduxSlider = memo(({ input, bottomLabels = [], disabled, track, ...others }) => {
  const classes = useStyles();

  const inverted = useMemo(() => track === 'inverted', [track]);

  const onChangehandler = useCallback((e, val) => {
    input.onChange(val);
  }, []);

  const preventPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        onMouseMove={preventPropagation}
        onMouseUp={preventPropagation}
      >
        <Slider
          {...input}
          {...others}
          disabled={disabled}
          onChange={onChangehandler}
          classes={{
            root: classes.root,
            valueLabel: clsx(classes.valueLabel, { [classes.valueLabelDisabled]: disabled }),
            thumb: classes.thumb,
            track: clsx(classes.track, { [classes.trackInverted]: inverted }),
            rail: clsx(classes.rail, { [classes.railInverted]: inverted }),
          }}
        />
      </Grid>
      {bottomLabels.length > 0 && (
        <Grid item container justify='space-between' className={classes.bottomLabelGridContainer}>
          {bottomLabels.map((label) => (
            <Grid item>
              <Typography variant='caption' className={classes.bottomLabelTypography}>{label}</Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
});

export default FOReduxSlider;
