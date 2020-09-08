import React from 'react';
import PropTypes from 'prop-types';
import { ErrorException } from 'utils/ErrorService';
import { withStyles } from '@material-ui/core/styles';
import GeneralErrorSVG from 'assets/images/svg/generalError.svg';
import { ERROR_BOUNDRY_PAGE_TEXT } from 'constants/Messages';
import ErrorImage from '../ErrorImage';
import styles from './styles';

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    errKey: PropTypes.number,
    children: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromProps(props) {
    return {
      customError: props.customError,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errKey !== this.props.errKey) {
      this.setState({ error: null, errorInfo: null });
    }
  }

  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    this.setState({
      error,
      errorInfo,
    });
    ErrorException(error, errorInfo);
  }

  render() {
    const { errorInfo, customError } = this.state;
    const { children, classes } = this.props;
    if (errorInfo || customError) {
      return (
        <div className={classes.errorBoundry}>
          <ErrorImage
            image={<GeneralErrorSVG />}
            title='Something Wrong'
            caption={ERROR_BOUNDRY_PAGE_TEXT}
          />
        </div>
      );
    }
    return children;
  }
}
export default withStyles(styles)(ErrorBoundary);
