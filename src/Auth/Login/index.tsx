import React from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import FOTextField from '../../components/FOTextField';
import FOSnackbar from '../../components/Notifications/FOSnackbar';
import FOLoadingSpinner from '../../components/WithFOLoading/FOLoadingSpinner';
import { required } from '../../services/Validations';
import BigRoadFreight from '../../assets/images/svg/login-page/big_road_freight.svg';
import WelcomePerson from '../../assets/images/svg/login-page/welcome_person.svg';

import './Login.scss';

const formName = 'loginForm';

class Login extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      block: false,
      isStayLoggedIn: false,
      errorLogin: false,
    };
  }

  submitHandler = ({ email, password }) => {
    this.setState({
      block: true,
      errorLogin: false,
    });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          redirect: true,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          block: false,
          errorLogin: true,
        });
      });
  };

  handleChange = (event) => {
    this.setState({ isStayLoggedIn: event.target.checked });
  };

  render() {
    const {
      redirect, isStayLoggedIn, block, errorLogin,
    } = this.state;
    const { handleSubmit } = this.props;
    const redirectUrlQ = window.location.search.split('redirectUrl=')[1];
    if (redirect && redirectUrlQ) {
      this.props.history.go(redirectUrlQ);
    }
    return (
      <div className='login-page'>
        {errorLogin && <FOSnackbar message='Sorry, either email or password is incorrect' />}
        <div className='login-page__container'>
          <div className='login-page__container--left'>
            <BigRoadFreight className='logo-image' />
            <WelcomePerson className='welcome-image' />
            <Typography className='welcome-title'>
              Welcome Back!
            </Typography>
          </div>
          <div className='login-page__container--right'>
            <FOLoadingSpinner loading={block}>
              <form className='login-form__inner' onSubmit={handleSubmit(this.submitHandler)}>
                <Field
                  component={FOTextField}
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='Email'
                  fullWidth
                  validate={[required]}
                />
                <Field
                  component={FOTextField}
                  name='password'
                  type='password'
                  label='Password'
                  fullWidth
                  margin='normal'
                  validate={[required]}
                />
                <div className='actions-section'>
                  <FormControlLabel
                    className='chk-stay-logged-in'
                    control={(
                      <Checkbox
                        checked={isStayLoggedIn}
                        onChange={this.handleChange}
                        value='StayLoggedIn'
                      />
                    )}
                    label='Stay logged in'
                  />
                  <Button className='btn-login' variant='contained' type='submit'>
                    Log In
                  </Button>
                </div>
              </form>
            </FOLoadingSpinner>
            <div className='signup-section'>
              <Link to='/password/forgot' className='forgot-password'>
                Forgot Your Password?
              </Link>
              <Typography className='signup-text'>
                Don't have an account?&nbsp;
                <Link className='signup-link' to='/register/driver'>
                  Sign Up
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const LoginForm = reduxForm({
  form: formName,
  touchOnChange: true,
})(Login);

const selector = formValueSelector(formName);
const LoginConnect = connect(state => ({ email: selector(state, 'email') }))(LoginForm);

export default withRouter(LoginConnect);
