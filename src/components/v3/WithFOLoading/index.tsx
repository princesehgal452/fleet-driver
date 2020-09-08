import React from 'react';
import PropTypes from 'prop-types';
import FOLoadingAndNoData from './FOLoadingAndNoData';

export const WithFOLoading = (Component) => {
  const WithLoading = (props) => {
    const {
      isLoading, noData, NoDataComponent, children,
    } = props;
    return (
      <FOLoadingAndNoData isLoading={isLoading} noData={noData} NoDataComponent={NoDataComponent}>
        <Component {...props}>{children}</Component>
      </FOLoadingAndNoData>
    );
  };
  WithLoading.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    noData: PropTypes.bool,
    NoDataComponent: PropTypes.func,
    children: PropTypes.node,
  };
  WithLoading.defaultProps = {
    noData: false,
    NoDataComponent: null,
    children: null,
  };
  return WithLoading;
};

WithFOLoading.propTypes = {
  Component: PropTypes.element.isRequired,
};

export default WithFOLoading;
