import React from 'react';
import Typography from '@material-ui/core/Typography';

import MailNotification from '../../../../assets/images/svg/login-page/email_notification.svg';

import './MailSentPopover.scss';

class MailSentPopover extends React.PureComponent {
  render() {
    return (
      <div className='mail-sent-popover'>
        <Typography className='message' variant='body1'>
          An email has been sent to you with
          <br />
          {' '}
          further instructions
        </Typography>
        <MailNotification />
      </div>
    );
  }
}

export default MailSentPopover;
