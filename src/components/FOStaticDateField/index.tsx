import React from 'react';
import PropTypes from 'prop-types';
import { StaticDatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateIcon from '@material-ui/icons/DateRange';
import { TextField } from '@material-ui/core';


class FOStaticDateField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
  };

  handleDateChange = (date) => {
    const { input } = this.props;
    input.onChange(date);
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      renderInput,
      ...custom
    } = this.props;
    return (
      <StaticDatePicker
        label={label}
        displayStaticWrapperAs='desktop'
        // clearable
        renderInput={renderInput || ((props) => <TextField {...props} />)}
        // handle clearing outside => pass plain array if you are not controlling value outside
        value={input.value || null}
        onChange={this.handleDateChange}
        // error={touched && !!error}
        // helperText={(touched && error) || ' '}
        {...custom}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <DateIcon />
            </InputAdornment>
          ),
        }}
      />
    );
  }
}

export default FOStaticDateField;
