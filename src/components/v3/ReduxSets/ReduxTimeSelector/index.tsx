import React, { ReactNode } from 'react';
import { Field } from 'redux-form';
import { observer } from 'mobx-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FOStaticTimeField from 'components/v3/FOStaticTimeField';
import FOTimeField from 'components/v3/FOTimeField';

const useStyles = makeStyles((theme: Theme) => ({
  
}));

interface IReduxTimeSelectorProps {
  timeField;
  change;
  label: string;
  onClose?: () => void;
  staticPicker?: boolean;
  renderInput?: ReactNode;
}

const ReduxTimeSelector = observer(({ timeField, label, onClose, staticPicker, }: IReduxTimeSelectorProps) => {
 
  const classes = useStyles();

  const onCloseHandler = () => {
    if (onClose) {
      setTimeout(onClose, 500);
    }
  };
  
  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
        <Field
          component={staticPicker ? FOStaticTimeField : FOTimeField}
          name={timeField.name}
          onAccept={onCloseHandler}
          autoOk={!!staticPicker}
          validate={timeField.validator ? timeField.validator : undefined}
        />
      </Grid>
    </Grid>
  );
});

export default ReduxTimeSelector;
