import React from 'react';
import PropTypes from 'prop-types';
import DotLoader from 'react-spinners/DotLoader';
import withTheme from '@material-ui/core/styles/withTheme';

import './FOLoadingSpinner.scss';

const FOLoadingSpinner = (props) => {
  const { loading, theme, children } = props;
  if (loading) {
    return (
      <div className='loading-spinner-container'>
        <DotLoader color={theme.palette.primary.main} loading={loading} />
      </div>
    );
  }
  return (children);
};

FOLoadingSpinner.propTypes = {
  loading: PropTypes.bool,

};

FOLoadingSpinner.defaultProps = {
  loading: true,
};

export default withTheme(FOLoadingSpinner);
