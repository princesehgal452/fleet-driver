import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FOLoadingSpinner from './FOLoadingSpinner';

const FOLoadingAndNoData = (props) => {
  const {
    isLoading, noData, NoDataComponent, children,
  } = props;
  if (!isLoading) {
    if (noData) {
      if (NoDataComponent) {
        return <NoDataComponent />;
      }
      return <Typography variant='h6'>No Data to display</Typography>;
    }
    return (children);
  }
  return (<FOLoadingSpinner />);
};

FOLoadingAndNoData.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  noData: PropTypes.bool,
  NoDataComponent: PropTypes.func,
  children: PropTypes.node,
};

FOLoadingAndNoData.defaultProps = {
  noData: false,
  NoDataComponent: null,
  children: null,
};

export default FOLoadingAndNoData;
