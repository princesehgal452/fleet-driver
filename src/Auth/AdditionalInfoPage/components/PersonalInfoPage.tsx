import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import Typography from '@material-ui/core/Typography';
import { required } from '../../../services/Validations';
import FOSelect from '../../../components/FOSelect';
import { COMPANY_TYPES } from '../../../services/constants';

import Driver from '../../../assets/images/png/register-page/driver.png';

import './style.scss';

const formName = 'personalInfoForm';

class PersonalInfoPage extends React.Component {
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
              <img src={Driver} alt='driver' />
            </div>
            <div className='title-section'>
              <Typography variant='h6' className='form-title'>
                Can you tell us more about
                <br />
                your company?
              </Typography>
            </div>
          </div>
          <div className='additional-info-form__content'>
            <Grid container className='input-section' spacing={1}>
              {/* <Grid item xs={12} sm={6} className='details-col'>
                  <Typography className='input-title' variant='h6'>
                    Name
                  </Typography>
                  <Field
                    component={FOTextField}
                    className='input-white'
                    name='displayName'
                    fullWidth
                    validate={[required]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='details-col'>
                  <Typography className='input-title' variant='h6'>
                    Mobile Phone
                  </Typography>
                  <Field
                    component={FOTextField}
                    className='input-white'
                    name='phone'
                    InputProps={{
                      inputComponent: NumberFormatPhone,
                    }}
                    fullWidth
                    validate={[required, phoneExactLength10]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='details-col'>
                  <Typography className='input-title' variant='h6'>
                    Office Phone&nbsp;
                    <Typography className='input-title input-title--optional'>
                      (Optional)
                    </Typography>
                  </Typography>
                  <Field
                    component={FOTextField}
                    className='input-white'
                    name='officePhone'
                    InputProps={{
                      inputComponent: NumberFormatPhone,
                    }}
                    fullWidth
                    validate={[phoneExactLength10]}
                  />
                </Grid>
                <Grid item xs={12} sm={6} className='details-col'>
                  <Typography className='input-title' variant='h6'>
                    Company Name&nbsp;
                    <Typography className='input-title input-title--optional'>
                      (Optional)
                    </Typography>
                  </Typography>
                  <Field
                    component={FOTextField}
                    className='input-white'
                    name='companyName'
                    type='text'
                    fullWidth
                  />
                </Grid> */}
              <Grid item xs={12} sm={6} className='details-col'>
                <Typography className='input-title' variant='h6'>
                  Company Type
                </Typography>
                <Field
                  component={FOSelect}
                  className='input-white'
                  name='companyType'
                  fieldName='companyType'
                  options={COMPANY_TYPES}
                  fullWidth
                  validate={[required]}
                />
              </Grid>
              {/* <FormSection name='address' className='address-form-section'>
                  <Grid item xs={12} sm={6} className='details-col'>
                    <Typography className='input-title' variant='h6'>
                      Address Line 1
                    </Typography>
                    <Field
                      component={FOTextField}
                      className='input-white'
                      name='line1'
                      fullWidth
                      validate={[required]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className='details-col'>
                    <Typography className='input-title' variant='h6'>
                      Address Line 2&nbsp;
                      <Typography className='input-title input-title--optional'>
                        (optional)
                      </Typography>
                    </Typography>
                    <Field
                      component={FOTextField}
                      className='input-white'
                      name='line2'
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className='details-col'>
                    <Typography className='input-title' variant='h6'>
                      City
                    </Typography>
                    <Field
                      component={FOTextField}
                      className='input-white'
                      name='city'
                      fullWidth
                      validate={[required]}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className='details-col'>
                    <Typography className='input-title' variant='h6'>
                      State/Province
                    </Typography>
                    <Field
                      component={FOSelect}
                      className='input-white'
                      name='state'
                      fieldName='state'
                      fullWidth
                      validate={[required]}
                      options={STATES_PROVINCES}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} className='details-col'>
                    <Typography className='input-title' variant='h6'>
                      Zip/Postal Code
                    </Typography>
                    <Field
                      component={FOTextField}
                      className='input-white'
                      name='postalCode'
                      fullWidth
                      validate={[required, USCanadaZipCodeValidation]}
                    />
                  </Grid>
                </FormSection> */}
            </Grid>
          </div>
        </div>
      </form>
    );
  }
}

const getInitialValues = () => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    return {
      // displayName: currentUser.foUser.displayName,
      // phone: currentUser.foUser.phone,
      // officePhone: currentUser.foUser.officePhone,
      // companyName: currentUser.foUser.companyName,
      companyType: currentUser['foUser'].companyType,
      // address: {
      //   line1: currentUser.foUser.address?.line1,
      //   line2: currentUser.foUser.address?.line2,
      //   city: currentUser.foUser.address?.city,
      //   state: currentUser.foUser.address?.state,
      //   postalCode: currentUser.foUser.address?.postalCode,
      // },
    };
  }
};

const PersonalInfoForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(PersonalInfoPage);

const PersonalInfoFormConnect = connect(
  () => ({
    initialValues: getInitialValues(),
  }),
  null,
  null,
  { forwardRef: true },
)(PersonalInfoForm);

export default PersonalInfoFormConnect;
