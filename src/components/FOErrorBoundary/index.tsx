import React from 'react';
import PropTypes from 'prop-types';
import { ErrorException } from '../../utils/ErrorService';
import FOErrorImage from '../FOErrorImage';
import GeneralErrorSVG from '../../assets/images/svg/generalError.svg';


import './FOErrorBoundary.scss';

export default class FOErrorBoundary extends React.PureComponent {
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
    const { children } = this.props;
    if (errorInfo || customError) {
      return (
        <div className='FOErrorBoundary'>
          <FOErrorImage
            image={<GeneralErrorSVG />}
            title='Something Wrong'
            caption={`Sorry, something is wrong and we're working on fixing this.
            Please try again in a few minutes.`}
          />
        </div>
      );
    }
    return children;
  }
}
