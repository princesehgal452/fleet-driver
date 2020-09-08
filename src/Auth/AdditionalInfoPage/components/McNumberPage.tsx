import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import Typography from '@material-ui/core/Typography';
import { required } from '../../../services/Validations';
import FOTextField from '../../../components/FOTextField';

import TruckSVG from '../../../assets/images/svg/driver/truck.svg';

import './style.scss';


const formName = 'mcNumberForm';

class McNumberPage extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
    formRef: PropTypes.instanceOf(Element),
  };

  render() {
    const { handleSubmit, formRef } = this.props;
    return (
      <form className='form-container' ref={formRef} onSubmit={handleSubmit}>
        <div className='additional-info-form'>
          <div className='additional-info-form__header'>
            <div className='image-section'>
              <TruckSVG />
            </div>
            <div className='title-section'>
              <Typography variant='h6' className='form-title'>
                We would like to know your
                <br />
                MC Number
              </Typography>
            </div>
          </div>
          <div className='additional-info-form__content'>
            <Grid container className='input-section' spacing={1}>
              <Grid item xs={12} sm={6} className='details-col'>
                <Typography className='input-title' variant='h6'>
                  MC number
                </Typography>
                <Field
                  component={FOTextField}
                  className='input-white'
                  name='mcNumber'
                  type='text'
                  fullWidth
                  validate={[required]}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </form>
    );
  }
}

const getInitialValues = () => {
  const { currentUser } = firebase.auth();
  return {
    mcNumber: currentUser ? currentUser['foUser'].mcNumber : '',
  };
};

const McNumberForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(McNumberPage);

const McNumberFormConnect = connect(
  () => ({
    initialValues: getInitialValues(),
  }),
  null,
  null,
  { forwardRef: true },
)(McNumberForm);

export default McNumberFormConnect;
