import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import firebase, { firestore } from 'firebase/app';
import 'firebase/auth';
import Typography from '@material-ui/core/Typography';

import { requiredArray } from '../../../services/Validations';
import { TRUCKS_EQUIPMENT_TYPES } from '../../../services/constants';
import FOMultiSelect from '../../../components/FOMultiSelect';

import Truck1 from '../../../assets/images/png/register-page/truck1.png';
import Truck2 from '../../../assets/images/png/register-page/truck2.png';

import './style.scss';
import TruckEquipmentSelect from './TruckEquipmentSelect';
import { DriverTruck } from '../../../models/dataStructures/DriverTruck';
import { FOUser } from '../../../models/dataStructures/FOUser';

const formName = 'truckEquipmentForm';

class TruckEquipmentPage extends React.Component {
  static propTypes = {
    user: PropTypes.instanceOf(FOUser),
    handleSubmit: PropTypes.func.isRequired,
    formRef: PropTypes.instanceOf(Element),
  };

  state = {
    equipmentTypeList: [],
  };

  handlerDriverSelect = (driverTruck, newEquipmentTypeList: string[] = []) => {
    this.setState({
      equipmentTypeList: newEquipmentTypeList,
    });
  }

  handleOnClose = () => {
    const { onSubmit } = this.props;
    const { equipmentTypeList } = this.state;
    onSubmit({
      equipmentTypeList,
    });
  }

  render() {
    const { user, formRef } = this.props;
    return (
      <form className='form-container' ref={formRef}>
        <TruckEquipmentSelect
          driver={user}
          handleDriverSelect={this.handlerDriverSelect}
          onClose={this.handleOnClose}
          showClear={false}
          title={`Hi ${user?.displayName},`}
          subTitle={`Let's start by selecting your truck.`}
        />
      </form>
    );
  }
}

const getInitialValues = () => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    return {
      equipmentTypeList: currentUser['foUser'].equipmentTypeList,
    };
  }
};

const TruckEquipmentForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(TruckEquipmentPage);

const TruckEquipmentFormConnect = connect(
  () => ({
    initialValues: getInitialValues(),
  }),
  null,
  null,
  { forwardRef: true },
)(TruckEquipmentForm);

export default TruckEquipmentFormConnect;
