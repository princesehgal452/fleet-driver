import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';

import SelectWrapped from './components/SelectWrapped';

const ITEM_HEIGHT = 48;

const styles = theme => ({
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing(2),
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',

      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: 'calc(100%)',
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-clear-zone': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.Select-clear-zone > svg': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 18,
      width: 18,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
    '.Select': {
      padding: '0 0 2px',
    },
  },
});

class FOEquipmentTypeMultiSelect extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: props.input.value || [],
  //   };
  // }

  handleChange = (value) => {
    // this.setState({
    //   name: value,
    // });
    this.props.input.onChange(value);
  };

  render() {
    const {
      label,
      input,
      options,
      classes,
      meta : { touched, error },
      ...custom
    } = this.props;
    return (
      <TextField
        value={input.value}
        onChange={this.handleChange}
        label={label}
        error={touched && !!error}
        helperText={(touched && error) || ' '}
        {...custom}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          inputComponent: SelectWrapped,
          inputProps: {
            classes,
            multi: true,
            removeSelected: false,
            closeOnSelect: false,
            instanceId: 'react-select-chip-label',
            id: 'react-select-chip-label',
            simpleValue: true,
            options,
          },
        }}
      />
    );
  }
}

FOEquipmentTypeMultiSelect.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object.isRequired,
  options: PropTypes.array,
  custom: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FOEquipmentTypeMultiSelect);
