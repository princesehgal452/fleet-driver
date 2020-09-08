import React, { useCallback } from 'react';
import clsx from 'classnames';
import { Grid, Typography, FormControl, FormLabel } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Slider, { SliderProps } from '@material-ui/core/Slider';

import { observer } from 'mobx-react';
import useStyles from './styles';

interface ISliderFieldOwnProps {
  field: any;
  onChange?: (any) => void;
  phoneNumber?: boolean;
  bottomLabels?: string[];
}

export type ISliderFieldProps = ISliderFieldOwnProps & SliderProps;

const SliderField = observer(({ field, bottomLabels = [], phoneNumber, disabled, track, onChange, ...custom }: ISliderFieldProps) => {
  const { error: errorField, helperText } = field;
  const errorValue = errorField;
  const classes = useStyles();
  const handleChange = useCallback((e, value) => {
    field.onChange(value);
    if (onChange) {
      onChange(field);
    }
  }, []);

  const inverted = track === 'inverted';

  const helperTextValue = errorValue ? (errorValue || ' ') : (helperText || ' ');
  return (
    <FormControl
      component='fieldset'
      fullWidth
      error={Boolean(field.error)}
      required={Boolean(field.rules && field.rules.includes('required'))}
      {...field.bind({ type: 'number' })}
    >
      <FormLabel className={classes.formLabel}>
        {field.label}
      </FormLabel>
      <Slider
        name={field.name}
        value={field.value}
        disabled={disabled}
        onChange={(e, value) => field.onChange(value)}
        onChangeCommitted={handleChange}
        classes={{
          root: classes.root,
          valueLabel: clsx(classes.valueLabel, { [classes.valueLabelDisabled]: disabled }),
          thumb: classes.thumb,
          track: clsx(classes.track, { [classes.trackInverted]: inverted }),
          rail: clsx(classes.rail, { [classes.railInverted]: inverted }),
        }}
        {...custom}
      />
      {bottomLabels.length > 0 && (
        <Grid item container justify='space-between' className={classes.bottomLabelGridContainer}>
          {bottomLabels.map((label) => (
            <Grid item>
              <Typography variant='caption' className={classes.bottomLabelTypography}>{label}</Typography>
            </Grid>
          ))}
        </Grid>
      )}
      <FormHelperText>
        {helperTextValue}
      </FormHelperText>
    </FormControl>
  );
});


export default SliderField;
