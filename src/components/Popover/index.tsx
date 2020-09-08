import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import Portal from '@material-ui/core/Portal';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import './Popover.scss';


class FOPopover extends React.PureComponent {
  static propTypes = {
    open: PropTypes.bool,
    fade: PropTypes.any,
    autoHideDuration: PropTypes.number,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
    customClassName: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    content: PropTypes.object,
    onClose: PropTypes.func,
    onMessageClick: PropTypes.func,
  };

  render() {
    const {
      open, fade, autoHideDuration, vertical, horizontal,
      customClassName, title, message, content, onClose, onMessageClick,
    } = this.props;
    const popoverClasses = classNames('popover-content', customClassName);
    return (
      <div>
        {open && (
          <Portal>
            <div className='fleetops-popover'>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                className={popoverClasses}
                open={open}
                autoHideDuration={autoHideDuration}
                TransitionComponent={fade}
                onClose={onClose}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={(
                  <div id='message-id' className='popover-content__container'>
                    <div className='header-section'>
                      <div>
                        {title && (
                          <Typography variant='h6' className='popover-title'>
                            {title}
                          </Typography>
                        )}
                      </div>
                      <div onClick={onMessageClick} onKeyPress={onMessageClick} role='button' tabIndex={0}>
                        {message && (
                          <Typography variant='body1' className='popover-message'>
                            {message}
                          </Typography>
                        )}
                      </div>
                    </div>
                    {content && (
                      <div className='content-section'>
                        {content}
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </Portal>
        )}
      </div>
    );
  }
}

export default FOPopover;
