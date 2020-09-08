import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { Grid, Typography } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import InfoIcon from '@material-ui/icons/Info';
import { observer } from 'mobx-react';

import TooltipPopover from 'components/v3/TooltipPopover';
import useStyles from './styles';

interface ISwitchFieldOwnProps {
  field: any;
  onChange?: (any) => void;
  phoneNumber?: boolean;
}

export type ISwitchFieldProps = ISwitchFieldOwnProps & SwitchProps;


const SwitchField = observer(({ field, phoneNumber, onChange, ...custom }: ISwitchFieldProps) => {
  const { error: errorField, helperText } = field;
  const errorValue = errorField;
  const classes = useStyles();
  const handleChange = (e) => {
    field.onChange(e);
    if (onChange) {
      onChange(field);
    }
  };
  const helperTextValue = errorValue ? (errorValue || ' ') : (helperText || ' ');
  return (
    <FormControl
      component='fieldset'
      fullWidth
      error={Boolean(field.error)}
      required={Boolean(field.rules && field.rules.includes('required'))}
      {...field.bind({ type: 'checkbox', onChange: handleChange || field.onChange })}
    >
      <Grid container alignItems='center'>
        <Grid item xs>
          <Grid container>
            <Typography className={classes.formControlLabel}>
              {field.label}
              <TooltipPopover popupId='infoTooltip' variant='popover' tooltip={field.placeholder}>
                <InfoIcon fontSize='small' />
              </TooltipPopover>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2} container justify='flex-end'>
          <Switch
            classes={classes}
            name={field.name}
            checked={field.value}
            color='primary'
            inputProps={{ 'aria-label': 'primary checkbox' }}
            {...custom}
          />
        </Grid>
      </Grid>
      <FormHelperText>
        {helperTextValue}
      </FormHelperText>
    </FormControl>
  );
});


export default SwitchField;
