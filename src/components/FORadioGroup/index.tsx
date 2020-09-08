import React, { memo, useMemo } from 'react';
import { WrappedFieldProps } from 'redux-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, GridSpacing } from '@material-ui/core';
import { ILabelAndValue } from 'models/interfaces/shared/ILabelAndValue';


const useStyles = makeStyles((theme: Theme) => ({
  noGutterLabel: {
    margin: 'inherit',
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
  },
}));

const defaultControl = <Radio color='primary' />;

interface IFORadioGroupProps extends WrappedFieldProps {
  label?: string;
  options: ILabelAndValue[];
  control?: JSX.Element;
  columns?: 1 | 2 | 3 | 4;
  spacing?: GridSpacing;
  required?: boolean;
  noGutter?: boolean;
  typeSwitch?: boolean;
}

const FORadioGroup = memo(({
  input, label, options, required, meta: { touched, error }, spacing = 0, columns = 1,
  typeSwitch, noGutter, control = defaultControl, ...rest
}: IFORadioGroupProps) => {
  const classes = useStyles();

  const computedItemWidth = useMemo(() => {
    switch (columns) {
      case 1:
        return 12;
      case 2:
        return 6;
      case 3:
        return 4;
      case 4:
        return 3;
      default:
        return 12;
    }
  }, [columns]);

  return (
    <FormControl component='div'>
      {label && (
        <FormLabel component='legend'>{label}</FormLabel>
      )}
      <RadioGroup
        {...input}
        onClick={input.onBlur}
        {...rest}
      >
        <Grid container spacing={spacing}>
          {options.map((option) => (
            <Grid item xs={computedItemWidth}>
              <FormControlLabel
                classes={{
                  root: noGutter ? classes.noGutterLabel : undefined,
                  label: classes.label,
                }}
                key={option.label}
                value={option.value}
                label={option.label}
                control={control}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
      {required && <FormHelperText error>{touched && error ? error : ' '}</FormHelperText>}
    </FormControl>
  );
});

export default FORadioGroup;
