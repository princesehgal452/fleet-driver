import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = () => ({
  selectMenu: {
    whiteSpace: 'inherit',
  },
});

class FOSelect extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string,
    fieldName: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    meta: PropTypes.object.isRequired,
    options: PropTypes.array,
    itemText: PropTypes.string,
    itemValue: PropTypes.string,
    multiple: PropTypes.any,
    classes: PropTypes.any,
  };

  // deleteType = value => (event) => {
  //   const { input } = this.props;
  //   const newValue = _.pull(input.value, value);
  //   input.onChange(newValue);
  //   input.onBlur(newValue);
  // };

  render() {
    const {
      input,
      fieldName,
      className,
      label,
      placeholder,
      meta: { touched, error },
      options,
      itemText,
      itemValue,
      multiple,
      classes,
      ...custom
    } = this.props;
    return (
      <FormControl className={className}>
        {label && (
        <InputLabel htmlFor={fieldName}>
          {label}
        </InputLabel>
        )}
        {multiple
          ? (
            <Select
              value={input.value || (multiple ? [] : '')}
              input={<Input id={fieldName} name={fieldName} />}
              onChange={e => input.onChange(e.target.value)}
              onBlur={e => input.onBlur(e.target.value)}
              multiple
              classes={classes}
              {...custom}
              renderValue={selected => selected.map(value => (
                <Chip
                  key={value}
                  label={value}
                />
              ))}
            >
              {options && options.map((value) => {
                if (itemText && itemValue) {
                  return (
                    <MenuItem
                      key={value[itemValue]}
                      value={value[itemValue]}
                    >
                      {value[itemText].toUpperCase()}
                    </MenuItem>);
                }
                return (
                  <MenuItem
                    key={value.value}
                    value={value.value}
                  >
                    { value.label ? value.label.toUpperCase() : value.value.toUpperCase() }
                  </MenuItem>);
              })}
            </Select>
          )
          : (
            <Select
              value={input.value || (multiple ? [] : '')}
              input={<Input id={fieldName} name={fieldName} />}
              onChange={e => input.onChange(e.target.value)}
              onBlur={e => input.onBlur(e.target.value)}
              classes={classes}
              {...custom}
            >
              {placeholder
              && (
              <MenuItem value='' disabled>
                {placeholder}
              </MenuItem>
              )
            }
              {options && options.map((value) => {
                if (itemText && itemValue) {
                  return (
                    <MenuItem
                      key={value[itemValue]}
                      value={value[itemValue]}
                    >
                      {value[itemText].toUpperCase()}
                    </MenuItem>);
                }
                return (
                  <MenuItem
                    key={value.label}
                    value={value.label}
                  >
                    {value.label.toUpperCase()}
                  </MenuItem>);
              })}
            </Select>
          )
        }
        <FormHelperText error={touched && !!error}>
          {touched && error ? error : ''}
        </FormHelperText>
      </FormControl>
    );
  }
}

export default withStyles(styles)(FOSelect);
