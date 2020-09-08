import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { required } from '../../services/Validations';
import FOTextField from '../../components/FOTextField';
import FOSnackbar from '../../components/Notifications/FOSnackbar';
import FOLoadingSpinner from '../../components/WithFOLoading/FOLoadingSpinner';
import ApiLayer from '../../services/APIServices/ApiLayer';
import { FO_USER_TYPES } from '../../services/constants';

import BigRoadFreight from '../../assets/images/svg/login-page/big_road_freight.svg';
import Password from '../../assets/images/svg/register-page/password.svg';
import { ROUTES } from '../../services/constants';

import './Register.scss';


const formName = 'registerForm';

class SignupPage extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      agreedTerms: false,
      errorMessage: '',
      submitting: false,
    };
  }

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.history.push('/register/driver/additional');
      })
      .catch((error) => {
        console.log(`Register: Error Logging In: ${error}`, error);
        this.setState({
          submitting: false,
          errorMessage: 'Sorry, there was an error logging in.',
        });
      });
  };

  submitHandler = (values) => {
    const { agreedTerms } = this.state;
    if (!agreedTerms) {
      this.setState({
        errorMessage: 'You need to agree to the terms & conditions.',
      });
      return;
    }
    this.setState({
      submitting: true,
      errorMessage: '',
    });
    ApiLayer.createNewUser(values.email, values.password, FO_USER_TYPES.driver, agreedTerms).then((response) => {
      if (response?.user) {
        this.login(values.email, values.password);
      } else {
        this.setState({
          submitting: false,
          errorMessage: 'Sorry, there was an error.',
        });
      }
    }).catch((error) => {
      console.log(`Register: Error Registering: ${error}`, error);
      this.setState({
        submitting: false,
        errorMessage: 'Sorry, there was an error.',
      });
    });
  };

  handleChange = (event) => {
    this.setState({
      agreedTerms: event.target.checked,
      errorMessage: '',
    });
  };

  render() {
    const { agreedTerms, errorMessage, submitting } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className='driver-register-page'>
        {!!errorMessage && <FOSnackbar message={errorMessage} />}
        <form className='form-container' onSubmit={handleSubmit(this.submitHandler)}>
          <div className='register-form'>
            <div className='register-form__header'>
              <BigRoadFreight className='logo-image' />
              <div className='avatar-section'>
                <Password />
              </div>
              <div className='title-section'>
                <Typography variant='h6' className='form-title'>
                  Create Account
                </Typography>
                {/* <Typography variant='h6' className='form-description'> */}
                {/* Enter your details below and let the journey begin */}
                {/* </Typography> */}
              </div>
            </div>
            <div className='register-form__content'>
              <Grid container className='input-section' spacing={1}>
                <Grid item xs={12} className='details-col'>
                  <Typography className='input-title' variant='h6'>
                    Email
                  </Typography>
                  <Field
                    component={FOTextField}
                    className='input-white'
                    name='email'
                    type='email'
                    fullWidth
                    validate={[required]}
                  />
                </Grid>
                <Grid item xs={12} className='details-col'>
                  <Typography className='input-title' variant='h6'>
                    Password
                  </Typography>
                  <Field
                    component={FOTextField}
                    name='password'
                    type='password'
                    className='input-white'
                    fullWidth
                    validate={[required]}
                  />
                </Grid>
                <Grid item xs={12} className='details-col'>
                  <FormControlLabel
                    className='col-checkbox'
                    control={(
                      <Checkbox
                        checked={agreedTerms}
                        onChange={this.handleChange}
                        value='checkedAll'
                      />
                    )}
                    label='I agree to the&nbsp;&nbsp;'
                  />
                  <Link to='/terms' className='btn-link'>
                    Terms & Conditions
                  </Link>
                </Grid>
              </Grid>
              <Grid container className='input-section' spacing={1} justify='center'>
                <FOLoadingSpinner loading={submitting}>
                  <Button type='submit' className='btn-register'>
                    Register
                  </Button>
                </FOLoadingSpinner>
              </Grid>
              <Grid container className='input-section' spacing={1} justify='center'>
                <Typography variant='h6' className='login-text'>
                  Already have an account?&nbsp;&nbsp;
                  <Link to={`/${ROUTES.LOGIN}`} className='btn-link btn-link--login'>
                    Log in
                  </Link>
                </Typography>
              </Grid>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const SignupForm = reduxForm({
  form: formName,
  touchOnChange: true,
})(SignupPage);

export default withRouter(SignupForm);
