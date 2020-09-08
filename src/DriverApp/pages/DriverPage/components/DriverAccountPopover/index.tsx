import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import Typography from '@material-ui/core/Typography';

import FOButtonTransparent from '../../../../../components/Buttons/FOButtonTransparent';
import DriverLogo from '../../../../../assets/images/svg/driver-log.svg';
import './DriverAccountPopover.scss';
import { ROUTES } from '../../../../../services/constants';

class DriverAccountPopover extends React.PureComponent {
  static propTypes = {
    history: PropTypes.object,
    onSettingsButtonClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  getAltTextOfAvatar = (name) => {
    const nameArray = name.split(' ');
    let altText = '';
    for (let index in nameArray) {
      altText += nameArray[index][0];
    }
    return altText;
  };

  handleLogoutButtonClick = () => {
    const { history, onClose } = this.props;
    onClose();
    firebase.auth().signOut();
    history.push(`/${ROUTES.LOGIN}`);
  };

  render() {
    const { onSettingsButtonClick } = this.props;
    const { photoURL, email, displayName } = firebase.auth().currentUser;
    const altText = this.getAltTextOfAvatar(displayName);
    return (
      <div className='driver-account-popover'>
        <div className='profile-section'>
          <div className='user-photo' style={{ backgroundImage: `url(${photoURL})` }}>
            {!photoURL && <span className='alt-text'>{altText}</span>}
          </div>
          <Typography variant='body2' className='user-name'>{displayName}</Typography>
          <Typography variant='caption' className='user-email'>{email}</Typography>
        </div>
        <div className='menu-section'>
          <div className='actions-section'>
            <FOButtonTransparent
              className='btn-action'
              onClick={onSettingsButtonClick}
              fullWidth
            >
              Settings
            </FOButtonTransparent>
            <FOButtonTransparent
              className='btn-action'
              onClick={this.handleLogoutButtonClick}
              fullWidth
            >
              Log Out
            </FOButtonTransparent>
          </div>
          <div className='logo-section'>
            <DriverLogo className='driver-logo' />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DriverAccountPopover);
