import React from 'react';
import PropTypes from 'prop-types';
import { TimePicker } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';


class FOTimeField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
  }; 

  handleTimeChange = (setDialogClose) => (time) => {
    const { input } = this.props;
    input.onChange(time);
    setDialogClose();
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      renderInput,
      setDialogClose,
      ...custom
    } = this.props;
    return (
      <TimePicker
        label={label}
        clearable
        renderInput={renderInput || ((props) => <TextField {...props} />)}
        value={input.value || null}
        onChange={this.handleTimeChange(setDialogClose)}
        error={touched && !!error}
        helperText={(touched && error) || ' '}
        {...custom}
      />
    );
  }
}

export default FOTimeField;
