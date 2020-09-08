import React from 'react';
import PropTypes from 'prop-types';

import FOButtonDefault from '../../../../../components/Buttons/FOButtonDefault';

import './DriverMorePopover.scss';

class DriverMorePopover extends React.PureComponent {
  static propTypes = {
    onSettingsButtonClick: PropTypes.func.isRequired,
    onLogOutButtonClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const { onSettingsButtonClick, onLogOutButtonClick, onClose } = this.props;
    return (
      <div className='driver-more-popover'>
        <FOButtonDefault
          className='btn-popover btn-popover--first'
          onClick={onSettingsButtonClick}
        >
          Settings
        </FOButtonDefault>
        <FOButtonDefault
          className='btn-popover btn-popover--last'
          onClick={onLogOutButtonClick}
        >
          Log Out
        </FOButtonDefault>
        <FOButtonDefault
          className='btn-popover btn-popover--cancel'
          onClick={onClose}
        >
          Cancel
        </FOButtonDefault>
      </div>
    );
  }
}

export default DriverMorePopover;
