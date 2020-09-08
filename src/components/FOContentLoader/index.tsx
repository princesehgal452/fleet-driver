import React from 'react';
import PropTypes from 'prop-types';
import ContentLoader from 'react-content-loader';

export const FOContentLoader = (props) => {
  const { height, width } = props;
  const placeHolder = () => (
    <>
      <rect x='7' y='16' rx='4' ry='4' width='117' height='6.4' />
      <rect x='195' y='37' rx='4' ry='4' width='117' height='6.4' />
      <rect x='7' y='38' rx='4' ry='4' width='85' height='6.4' />
      <rect x='195' y='16' rx='4' ry='4' width='85' height='6.4' />
      <rect x='9' y='80' rx='3' ry='3' width='85' height='6.4' />
      <rect x='9' y='98' rx='3' ry='3' width='65' height='6.4' />
      <rect x='122' y='78' rx='3' ry='3' width='85' height='6.4' />
      <rect x='122' y='98' rx='3' ry='3' width='65' height='6.4' />
      <rect x='225' y='78' rx='3' ry='3' width='85' height='6.4' />
      <rect x='225' y='98' rx='3' ry='3' width='65' height='6.4' />
      <rect x='104.5' y='136.27' rx='0' ry='0' width='0' height='0' />
      <rect x='222.5' y='140.27' rx='0' ry='0' width='0' height='0' />
      <rect x='287.5' y='159.27' rx='0' ry='0' width='0' height='0' />
      <rect x='82.5' y='74.27' rx='0' ry='0' width='0' height='0' />
      <rect x='262.5' y='135.27' rx='0' ry='0' width='0' height='0' />
    </>
  );
  return (
    <>
      <ContentLoader
        height={height}
        width={width}
        speed={2}
        primaryColor='#f3f3f3 '
        secondaryColor='#b8b6b6'
        {...props}
      >
        {placeHolder()}
      </ContentLoader>
      <ContentLoader
        height={height}
        width={width}
        speed={2}
        primaryColor='#f3f3f3 '
        secondaryColor='#b8b6b6'
        {...props}
      >
        {placeHolder()}
      </ContentLoader>
    </>
  );
};

FOContentLoader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

FOContentLoader.defaultProps = {
  height: 160,
  width: 320,
};

export default FOContentLoader;
