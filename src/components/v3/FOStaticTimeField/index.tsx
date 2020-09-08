import React from "react";
import PropTypes from "prop-types";
import { StaticTimePicker } from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import { WithStyles, withStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  timeFieldStyles: {
    '& .MuiPickersToolbar-toolbar': {
      paddingTop: 0,
      paddingBottom: 0,
      '& .MuiPickersToolbar-dateTitleContainer': {
        justifyContent: 'center',
        alignItems: 'center',
        '& h3.MuiPickersToolbarText-toolbarTxt': {
          fontSize: theme.typography.pxToRem(40)
        },
        '& .MuiPickersTimePickerToolbar-ampmSelection': {
          marginRight: 0,
          '& .MuiPickersTimePickerToolbar-ampmLabel': {
            fontSize: theme.typography.pxToRem(14),
            lineHeight: theme.typography.pxToRem(14)
          },
        },
        '& > button': {
          display: 'none'
        }
      }
    },
    '& .MuiPickersClock-container': {
      minHeight: 280
    }
  }
});

class FOStaticTimeField extends React.PureComponent {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    meta: PropTypes.object,
  };

  handleTimeChange = (time) => {
    const { input } = this.props;
    input.onChange(time);
  };

  render() {
    const {
      input,
      label,
      meta: { touched, error },
      renderInput,
      classes,
    } = this.props;
    return (
      <StaticTimePicker
        className={classes.timeFieldStyles}
        openTo="hours"
        renderInput={(props) => <TextField {...props} />}
        value={input?.value || new Date()}
        onChange={this.handleTimeChange}
        toolbarTitle=""
        allowKeyboardControl={false}
        error={touched && !!error}
        helperText={(touched && error) || " "}
        autoOk={true}
      />
    );
  }
}

export default withStyles(styles)(FOStaticTimeField);
