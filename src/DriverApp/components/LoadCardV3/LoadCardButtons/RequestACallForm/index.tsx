import React, { Dispatch } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { change, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { WithStyles, Grid, Box, Typography, Button } from '@material-ui/core';
import { Theme, withStyles } from '@material-ui/core/styles';
import { DriverAppStore } from '../../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import moment from 'moment';
import ReduxDateSelector from '../../../ReduxSets/ReduxDateSelector';
import ReduxTimeSelector from '../../../ReduxSets/ReduxTimeSelector';
import Load from '../../../../../models/dataStructures/Load';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

const selectedDateFormat = "YYYY MMM, D";

const styles = (theme: Theme) => ({
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 0,
  },
  calendarIcon: {
    position: 'relative',
    top: '2px',
    fontSize: theme.typography.pxToRem(16)
  }
});

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
  requestedDate: any;
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

  submitHandler = async({ date, time }) => {
    const { driverAppStore, load, cancelRequestCall } = this.props;
    const { searchStore: { setSelectedLoad } } = driverAppStore as DriverAppStore;
    const valuesParsed = this.parseSubmitValuesForApi({ date, time });
    setSelectedLoad(load);
    await load?.initiateRequestCallback(valuesParsed.unix());
    setSelectedLoad(null);
    cancelRequestCall(false)()
  };

  parseSubmitValuesForApi = (submitValues) => {
    let date = submitValues.date;
    if(submitValues.time) {
      date = submitValues.date.set({
        hour: submitValues.time.hour(),
        minute: submitValues.time.minute(),
      })
    }
    return date;
  };

  setRequestedDate = (date) => {
    this.setState({ currentStep: SearchSteps.time });
  }

  render() {
    const { currentStep } = this.state;
    const { handleSubmit, classes, cancelRequestCall, date, time } = this.props;
    return (
      <Box>
        <Box p={2}>
          <Grid container direction="row" justify="space-between" alignItems="center">
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
                staticPicker={true}
                label=''
                dateField={formFields.date}
                hideSkipButton={true}
                onClose={this.setRequestedDate}
              />
          )}
          {currentStep === SearchSteps.time && (
            <>
              <Box px={2} mb={1} fontSize={17} fontWeight={500}>
              {moment(date).format(selectedDateFormat)} <EventAvailableIcon className={classes.calendarIcon} onClick={this.resetSteps}/>
              </Box>
              <ReduxTimeSelector
                staticPicker={true}
                label=''
                timeField={formFields.time}
                hideSkipButton={true}
                onClose={null}
              />
              <Button type='submit' fullWidth
                className={classes.actionButtons}
                color='primary' variant='contained' disabled={!time}>
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
    [formFields.time.name]: selector(state, formFields.time.name)
  }),
  (dispatch) => bindActionCreators({ change }, dispatch),
  null,
  { forwardRef: true },
)(RequestACallForm);

export default withRouter(withStyles(styles)(RequestACallFormConnect));
