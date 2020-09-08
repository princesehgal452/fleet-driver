import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ROUTES } from '../../../../services/constants';

import './MailNotFoundPopover.scss';

class MailNotFoundPopover extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func,
  };

  handleBack = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    return (
      <div className='mail-not-found-popover'>
        <Typography className='message' variant='body1'>
          Sorry, we couldn’t find an account with that email address.
          <br />
          Please try another email or&nbsp;
          <Link to='/register' className='popover-link-text'>
            Sign Up
          </Link>
        </Typography>
        <Button className='btn-back' onClick={this.handleBack}>
          Back to Reset Password
        </Button>
        <Link to={`${ROUTES.LOGIN}`} className='popover-link-text'>
          Back to Login
        </Link>
      </div>
    );
  }
}

export default MailNotFoundPopover;
