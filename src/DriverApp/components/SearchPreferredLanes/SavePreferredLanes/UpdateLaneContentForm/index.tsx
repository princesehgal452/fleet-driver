import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change, formValueSelector, reduxForm, Field } from 'redux-form';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Box, ButtonGroup, Button } from '@material-ui/core';
import classNames from 'classnames';

import { refactorLocation } from 'utils/utility';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { locationRequired, uniqueLaneName } from 'services/Validations';
import { IOperatingLane, ILaneAddress } from 'models/interfaces/shared/IOperatingLanes';

import FOTextField from 'components/FOTextField';
import FOLocationField from 'components/FOLocationField';

import UpdateLaneStepper from './UpdateLaneStepper';

const styles = (theme: Theme) => ({
  formContainer: {
    position: 'relative',
    height: '100%'
  },
  formBodyContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  formItem: {
    marginBottom: theme.spacing(2.5)
  },
  actionBtnGroup: {
    position: 'absolute',
    bottom: 0
  },
  actionButtons: {
    borderRadius: 0,
  },
  closeAction: {
    background: 'transparent'
  }
});

const formFields = {
  pickupLane: {
    name: 'pickupLane',
    validator: [locationRequired],
  },
  dropoffLane: {
    name: 'dropoffLane',
  },
  name: 'name',
};

const formName = 'updateLanesV3Form';
interface IUpdateLaneContentFormOwnProps {
  operatingLanes: IOperatingLane[];
  selectedOperatingLane: IOperatingLane;
  editLaneSaveHandler: (receivingDataPickup: ILaneAddress, receivingDataDropoff: ILaneAddress, name: string) => void;
  cancelEditLane: () => void;
  triggerDelete: (showPrompt: boolean) => void;
}

type IUpdateLaneContentFormProps = IUpdateLaneContentFormOwnProps & WithStyles<typeof styles>;;

@inject('driverAppStore')
@observer
class UpdateLaneContentFormContainer extends React.Component<IUpdateLaneContentFormProps> {

  submitHandler = () => (values) => {
    const { driverAppStore } = this.props;
    const { searchStoreV3: { searchResults: { setPreviousQuery } } } = driverAppStore as DriverAppStore;
    let submitValues = { ...values };
    this.parseSubmitValuesForApi(submitValues)
  };

  parseSubmitValuesForApi = (submitValues) => {
    const { pickupLane, dropoffLane, name } = submitValues;
    const pickupRefactored = refactorLocation(pickupLane, true);
    const dropoffRefactored = refactorLocation(dropoffLane, true);
    this.props.editLaneSaveHandler(
      {
        city: pickupRefactored.city,
        state: pickupRefactored.state,
        country: pickupRefactored.country,
      }, {
        city: dropoffRefactored.city,
        state: dropoffRefactored.state,
        country: dropoffRefactored.country,
      },
      name
    );
  };

  programmaticFormSubmit = () => {
    const { handleSubmit } = this.props;
    const submitter = handleSubmit(this.submitHandler());
    submitter();
  };

  render() {
    const { selectedOperatingLane, cancelEditLane, classes, operatingLanes, triggerDelete } = this.props;

    return (
      <div className={classes.formContainer}>

      <form>
        <UpdateLaneStepper
          selectedOperatingLane={selectedOperatingLane}
          triggerDelete={triggerDelete}
        />
        <Box className={classes.formBodyContent}>
          <Field
            className={classes.formItem}
            component={FOTextField}
            name='name'
            label='Lane Name'
            placeholder='Lane Name'
            fullWidth
            validate={[uniqueLaneName]}
          />
          <Field
            component={FOLocationField}
            name='pickupLane'
            placeholder='Enter pickup city or state'
            label='Pickup Location'
            fullWidth
            validate={[locationRequired]}
            citiesOnly
          />
          <Field
            component={FOLocationField}
            name='dropoffLane'
            placeholder='Enter pickup city or state'
            label='Dropoff Location'
            fullWidth
            validate={[locationRequired]}
            citiesOnly
          />
        </Box>
        <ButtonGroup variant="contained" className={classes.actionBtnGroup} fullWidth size='large'>
          <Button className={classNames(classes.actionButtons, classes.closeAction)} color='inherit' onClick={cancelEditLane}>CLOSE</Button>
          <Button className={classes.actionButtons} color='primary' onClick={this.programmaticFormSubmit}>APPLY</Button>
        </ButtonGroup>
      </form>
      </div>
    );
  }
}

const UpdateLaneContentForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
  enableReinitialize : true,
})(UpdateLaneContentFormContainer);

const selector = formValueSelector(formName);

const getInitialValues = ({ selectedOperatingLane }: IUpdateLaneContentFormOwnProps) => {
  if (selectedOperatingLane) {
    return ({
      pickupLane: {
        description: `${selectedOperatingLane.pickup.city}, ${selectedOperatingLane.pickup.state}, ${selectedOperatingLane.pickup.country}`,
        city: selectedOperatingLane.pickup.city,
        state: selectedOperatingLane.pickup.state,
        country: selectedOperatingLane.pickup.country,
        coordinates: {},
      },
      dropoffLane: {
        description: `${selectedOperatingLane.dropoff.city}, ${selectedOperatingLane.dropoff.state}, ${selectedOperatingLane.dropoff.country}`,
        city: selectedOperatingLane.dropoff.city,
        state: selectedOperatingLane.dropoff.state,
        country: selectedOperatingLane.dropoff.country,
        coordinates: {},
      },
      name: selectedOperatingLane.name
    });
  }
  return null;
};


const UpdateLaneContentFormConnect =
  connect(
  (state, ownProps) => ({
    initialValues: getInitialValues(ownProps),
    [formFields.pickupLane.name]: selector(state, formFields?.pickupLane?.name),
    [formFields.dropoffLane.name]: selector(state, formFields?.dropoffLane?.name),
    [formFields.name]: selector(state, formFields?.name),
  }),
  (dispatch) => bindActionCreators({ change }, dispatch),
  null,
  { forwardRef: true },
)(UpdateLaneContentForm);

export default withStyles(styles)(UpdateLaneContentFormConnect);
