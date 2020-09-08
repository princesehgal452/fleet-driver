import React, { ReactNode, useCallback, useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { Field } from 'redux-form';
import { observer } from 'mobx-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Clear, EventAvailableOutlined } from '@material-ui/icons';
import { Button, Grid, IconButton, Typography } from '@material-ui/core';

import FODateField from 'components/v3/FODateField';
import FOTransitionUp from 'components/v3/FOTransitionUp';
import FOStaticDateField from 'components/v3/FOStaticDateField';

import LoadFilterDate from '../ReduxLoadFilters/LoadFilterItems/LoadFilterDate';


const ToolbarComponent = (setDialogClose) => (({ clearable }) => {
  return (
    <Grid container justify='space-between'>
      <Grid item>
        <Typography variant='h6' style={{ padding: 16, fontWeight: 'bold' }}>Select Date & Time</Typography>
      </Grid>
      {clearable && (
        <IconButton onClick={setDialogClose}>
          <Clear />
        </IconButton>
      )}
    </Grid>
  );
});

const ButtonDiv = ({ children, ...other }) => {
  const classes = useStyles();

  return <div {...other} className={classes.buttonDiv}>{children}</div>;
};

const CancelLabel = ({ setDialogClose }) => {
  return (
    <ButtonDiv onClick={setDialogClose}>
      SKIP
    </ButtonDiv>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  // dateFieldStyles: {
  // '& .MuiPickersDatePickerRoot-penIcon': {
  //   display: 'none',
  // },
  // '& .MuiPickersToolbar-toolbar': {
  //   color: theme.palette.common.white,
  // },
  // },
  dateFieldStyles: {
    '& .MuiPickersBasePicker-pickerView': {
      transform: 'scale(1.25)',
      marginTop: 30,
      '@media (max-width:320px)': {
        marginTop: 10,
        transform: 'scale(1.05)',
      },
    },
    '& .MuiPickersCalendarHeader-monthTitleContainer': {
      '& :nth-child(2)': {
        display: 'none',
      },
    },
    '& .MuiPickersCalendarHeader-switchHeader': {
      // backgroundColor: theme.palette.common.white,
    },
    '& .MuiPickersCalendarHeader-monthText': {
      fontWeight: 500,
    },
    '& .MuiPickersDay-day': {
      fontWeight: 600,
    },
  },
  selectedDate: {
    textTransform: 'unset',
  },
  dialogStyles: {
    '& .MuiPickersModal-dialogRoot': {
      position: 'absolute !important',
      bottom: '0px !important',
      margin: '0 !important',
      width: '100% !important',
      borderRadius: '19px 19px 0 0',
    },
    '& .MuiPickersBasePicker-container': {
      overflow: 'hidden',
    },
    '& .MuiDialogActions-spacing': {
      padding: 0,
      '& .MuiButtonBase-root': {
        width: '100%',
        margin: 0,
      },
    },
    '& .MuiDialogActions-root': {
      boxShadow: '1px 3px 7px 0px rgba(0,0,0,0.75)',
      '& button': {
        borderRadius: 0,
        fontWeight: 300,
      },
      '& button:first-child': {
        color: theme.palette.common.black,
      },
      '& button:last-child': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      },
    },
  },
  buttonDiv: {
    width: '100%',
    margin: '6px, 8px',
  },
}));

interface IReduxDateSelectorProps {
  dateField;
  change;
  label: string;
  onClose?: () => void;
  staticPicker?: boolean;
  hideSkipButton?: boolean;
  renderInput?: ReactNode;
  detailed?: boolean;
  clearable?: boolean;
  disableReselect?: boolean;
}

const ReduxDateSelector = observer(({ dateField, label, onClose, staticPicker, detailed, hideSkipButton, clearable = false, disableReselect }: IReduxDateSelectorProps) => {
  const [isOpen, setOpen] = useState(false);

  const setDialogOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const setDialogClose = useCallback(() => {
    setOpen(false);
  }, []);

  const classes = useStyles();

  const onCloseHandler = () => {
    if (onClose) {
      setTimeout(onClose, 500);
    }
  };

  const disabledSelectTextColor = !disableReselect ? 'primary' : 'inherit';
  const triggerDialogClick = !disableReselect ? setDialogOpen : null;

  return (
    <Grid container justify='center'>
      {staticPicker && !hideSkipButton && (
        <Grid item>
          <Button color='primary' onClick={onCloseHandler}>SKIP</Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <Field
          component={staticPicker ? FOStaticDateField : FODateField}
          name={dateField.name}
          label={label}
          // disableOpenPicker
          open={isOpen}
          disablePast
          views={['date']}
          ToolbarComponent={staticPicker ? undefined : ToolbarComponent(setDialogClose)}
          clearable={clearable}
          clearLabel={<ButtonDiv>CLEAR</ButtonDiv>}
          onAccept={onCloseHandler}
          autoOk={!!staticPicker}
          setDialogClose={setDialogClose}
          showDaysOutsideCurrentMonth
          cancelLabel={clearable ? null : <CancelLabel setDialogClose={setDialogClose} />}
          okLabel={<ButtonDiv>APPLY</ButtonDiv>}
          renderInput={((props) => {
            if (detailed) {
              return (
                <div {...props} onClick={setDialogOpen}>
                  <LoadFilterDate laneSizeFieldValue={props.value} label={label} />
                </div>
              );
            }
            if (props.value) {
              return (
                <Button
                  {...props}
                  color={disabledSelectTextColor}
                  className={classes.selectedDate}
                  onClick={triggerDialogClick}
                >
                  {`On ${moment(props.value).format('MMM D, Y')}`}
                  &nbsp;&nbsp;
                  <EventAvailableOutlined />
                </Button>
              );
            }
            return (
              <IconButton
                {...props}
                color={disabledSelectTextColor}
                onClick={triggerDialogClick}
              >
                <EventAvailableOutlined />
              </IconButton>
            );
          })}
          className={clsx(classes.dateFieldStyles, {
            // [classes.staticFieldStyles]: staticPicker,
            // [classes.dateFieldStyles]: !staticPicker,
          })}
          DialogProps={{ className: classes.dialogStyles, TransitionComponent: FOTransitionUp }}
          validate={dateField.validator ? dateField.validator : undefined}
        />
      </Grid>
    </Grid>
  );
});

export default ReduxDateSelector;
