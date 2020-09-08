import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/auth';
import FOPopover from '../../components/Popover';
import MailSentPopover from './components/MailSentPopover';
import MailNotFoundPopover from './components/MailNotFoundPopover';
import FOTextField from '../../components/FOTextField';
import { required } from '../../services/Validations';
import BigRoadFreight from '../../assets/images/svg/login-page/big_road_freight.svg';
import WelcomePerson from '../../assets/images/svg/login-page/welcome_person.svg';

import './ForgotPassword.scss';

const formName = 'forgotForm';

class ForgotPassword extends React.Component {
  static propTypes = {
    // history: PropTypes.object,
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPopover: false,
      popoverContent: null,
    };
  }

  handleShow = () => {
    this.setState({
      showPopover: true,
    });
  };

  handleClose = () => {
    this.setState({
      showPopover: false,
    });
  };

  submitHandler = ({ email }) => {
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      this.setState({
        popoverContent: <MailSentPopover onClose={this.handleClose} />,
      });
      this.handleShow();
    }).catch(() => {
      this.setState({
        popoverContent: <MailNotFoundPopover onClose={this.handleClose} />,
      });
      this.handleShow();
    })
  };

  resendRequest = () => {
    console.log('send request again');
  };

  render() {
    const { showPopover, popoverContent } = this.state;
    const { handleSubmit } = this.props;
    return (
      <div className='forgot-page'>
        <FOPopover
          open={showPopover}
          vertical='bottom'
          horizontal='center'
          customClassName='popover-content--white'
          title='Email Sent'
          onClose={this.handleClose}
          content={popoverContent}
        />
        <div className='forgot-page__container'>
          <div className='forgot-page__container--left'>
            <BigRoadFreight className='logo-image' />
            <WelcomePerson className='welcome-image' />
            <Typography className='welcome-title'>
              Forgot Your Password!
            </Typography>
            <Typography className='welcome-text'>
              Enter your email and we will send you request
            </Typography>
          </div>
          <div className='forgot-page__container--right'>
            <div className='login-form'>
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
                <Button className='btn-login' variant='contained' type='submit'>
                  Send Reset
                </Button>
              </form>
            </div>
            <div className='signup-section'>
              <Typography className='signup-text'>
                Haven't received recovery mail?&nbsp;
                <Link className='signup-link' to='#' onClick={this.resendRequest}>
                  Resend
                </Link>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const ForgotPasswordForm = reduxForm({
  form: formName,
  touchOnChange: true,
})(ForgotPassword);

const selector = formValueSelector(formName);
const ForgotPasswordConnect = connect(state => ({ email: selector(state, 'email') }))(ForgotPasswordForm);

export default withRouter(ForgotPasswordConnect);
