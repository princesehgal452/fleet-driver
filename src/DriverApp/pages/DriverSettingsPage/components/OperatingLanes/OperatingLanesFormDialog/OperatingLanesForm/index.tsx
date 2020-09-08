import React from 'react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { locationRequired } from '../../../../../../../services/Validations';
import { IOperatingLane } from '../../../../../../../models/interfaces/shared/IOperatingLanes';
import FOLocationField from '../../../../../../../components/FOLocationField';
import FOButtonLoader from '../../../../../../../components/FOButtonLoader';


interface IOperatingLanesFormContainerOwnProps {
  operatingLane?: IOperatingLane;
  loading: boolean;
  closeHandler: () => void;
}

type IOperatingLanesFormContainerProps = IOperatingLanesFormContainerOwnProps & InjectedFormProps;

const OperatingLanesFormContainer = (({ pristine, handleSubmit, operatingLane, loading, closeHandler }: IOperatingLanesFormContainerProps) => (
  <form onSubmit={handleSubmit}>
    <DialogTitle>
      {operatingLane ? 'Edit Lane' : 'Add Lane'}
    </DialogTitle>
    <DialogContent>
      {!operatingLane && (
        <DialogContentText>
          Add a new lane that you prefer
        </DialogContentText>
      )}
      <Field
        component={FOLocationField}
        name='pickupLane'
        placeholder='Enter pickup city or state'
        label='Pickup Location'
        fullWidth
        validate={[locationRequired]}
        variant='filled'
        citiesOnly
      />
      <Field
        component={FOLocationField}
        name='dropoffLane'
        placeholder='Enter pickup city or state'
        label='Dropoff Location'
        fullWidth
        validate={[locationRequired]}
        variant='filled'
        citiesOnly
      />
      <br />
      <br />
      <br />
    </DialogContent>
    <DialogActions>
      <Button
        onClick={closeHandler}
        disabled={loading}
      >
        Cancel
      </Button>
      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={pristine || loading}
      >
        <FOButtonLoader loading={loading}>
          {operatingLane ? 'Submit' : 'Add'}
        </FOButtonLoader>
      </Button>
    </DialogActions>
  </form>
));

const getInitialValues = ({ operatingLane }: IOperatingLanesFormContainerOwnProps) => {
  if (operatingLane) {
    return ({
      pickupLane: {
        description: `${operatingLane.pickup.city}, ${operatingLane.pickup.state}, ${operatingLane.pickup.country}`,
        city: operatingLane.pickup.city,
        state: operatingLane.pickup.state,
        country: operatingLane.pickup.country,
        coordinates: {},
      },
      dropoffLane: {
        description: `${operatingLane.dropoff.city}, ${operatingLane.dropoff.state}, ${operatingLane.dropoff.country}`,
        city: operatingLane.dropoff.city,
        state: operatingLane.dropoff.state,
        country: operatingLane.dropoff.country,
        coordinates: {},
      },
    });
  }
  return null;
};

const OperatingLanesForm = reduxForm({
  form: 'OperatingLanesForm',
})(OperatingLanesFormContainer);

const OperatingLanesFormConnect = connect<{}, {}, IOperatingLanesFormContainerOwnProps>(
  (state, ownProp) => ({
    initialValues: getInitialValues(ownProp),
  }),
)(OperatingLanesForm);


export default OperatingLanesFormConnect;
