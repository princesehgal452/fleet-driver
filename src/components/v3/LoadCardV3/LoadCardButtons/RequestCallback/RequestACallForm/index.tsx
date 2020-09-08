import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { change, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { WithStyles, Grid, Box, Typography, Button } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import moment from 'moment';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import Load from 'models/dataStructures/Load';

import ReduxDateSelector from 'components/v3/ReduxSets/ReduxDateSelector';
import ReduxTimeSelector from 'components/v3/ReduxSets/ReduxTimeSelector';
import styles from './styles';

const selectedDateFormat = 'YYYY MMM, D';

const formFields = {
  date: {
    name: 'date',
  },
  time: {
    name: 'time',
  },
};

export enum SearchSteps {
  date,
  time,
}

const formName = 'requestACallForm';

interface IRequestACallFormState {
  currentStep: SearchSteps;
}

interface IRequestACallFormOwnProps {
  load?: Load;
  drawerClosed: boolean;
  cancelRequestCall: (flag: boolean) => () => void;
}

type IRequestACallFormProps =
  IRequestACallFormOwnProps
  & IDriverAppStore
  & InjectedFormProps
  & RouteComponentProps
  & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class RequestACallFormContainer extends React.Component<IRequestACallFormProps, IRequestACallFormState> {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: SearchSteps.date,
    };
  }

  resetSteps = () => {
    this.setState({ currentStep: SearchSteps.date });
  };

  submitHandler = async ({ date, time }) => {
    const { driverAppStore, load, cancelRequestCall } = this.props;
    const { searchStoreV3: { setSelectedLoad } } = driverAppStore as DriverAppStore;
    const valuesParsed = this.parseSubmitValuesForApi({ date, time });
    setSelectedLoad(load);
    await load?.initiateRequestCallback(valuesParsed.unix());
    setSelectedLoad(null);
    cancelRequestCall(false)();
  };

  parseSubmitValuesForApi = (submitValues) => {
    let { date } = submitValues;
    if (submitValues.time) {
      date = submitValues.date.set({
        hour: submitValues.time.hour(),
        minute: submitValues.time.minute(),
      });
    }
    return date;
  };

  setRequestedDate = () => {
    this.setState({ currentStep: SearchSteps.time });
  };

  render() {
    const { currentStep } = this.state;
    const { handleSubmit, classes, cancelRequestCall, date, time } = this.props;
    return (
      <Box>
        <Box p={2}>
          <Grid container direction='row' justify='space-between' alignItems='center'>
            <Grid item>
              <Typography variant='h6'>Select Date & Time</Typography>
            </Grid>
            <Grid item>
              <CloseOutlinedIcon onClick={cancelRequestCall(false)} />
            </Grid>
          </Grid>
        </Box>
        <form onSubmit={handleSubmit(this.submitHandler)}>
          {currentStep === SearchSteps.date && (
            <ReduxDateSelector
              staticPicker
              label=''
              dateField={formFields.date}
              hideSkipButton
              onClose={this.setRequestedDate}
            />
          )}
          {currentStep === SearchSteps.time && (
            <>
              <Box px={2} mb={1} fontSize={17} fontWeight={500}>
                {moment(date).format(selectedDateFormat)}
                <EventAvailableIcon className={classes.calendarIcon} onClick={this.resetSteps} />
              </Box>
              <ReduxTimeSelector
                staticPicker
                label=''
                timeField={formFields.time}
                hideSkipButton
                onClose={undefined}
              />
              <Button
                type='submit'
                fullWidth
                className={classes.actionButtons}
                color='primary'
                variant='contained'
                disabled={!time}
              >
                CONFIRM
              </Button>
            </>
          )}
        </form>
      </Box>
    );
  }
}

const RequestACallForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: true,
  enableReinitialize: true,
})(RequestACallFormContainer);

const selector = formValueSelector(formName);

const RequestACallFormConnect = connect(
  (state, ownProps) => ({
    [formFields.date.name]: selector(state, formFields.date.name),
    [formFields.time.name]: selector(state, formFields.time.name),
  }),
  (dispatch) => bindActionCreators({ change }, dispatch),
  null,
  { forwardRef: true },
)(RequestACallForm);

export default withRouter(withStyles(styles)(RequestACallFormConnect));
