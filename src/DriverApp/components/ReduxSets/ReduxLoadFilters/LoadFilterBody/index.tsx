import React, { ReactNode, useMemo } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  slideClass: {
    overflowX: 'hidden !important',
    width: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent',
    },
  },
}));

const swipeableViewsStylesFunction = (height) => ({
  slideContainer: {
    paddingTop: 10,
    height,
    WebkitOverflowScrolling: 'touch' as 'touch', // iOS momentum scrolling
  },
});

interface ILoadFilterBody {
  height: number;
  index: number;
  bodyContent: ReactNode;
}

const LoadFilterBody = ({ index, height, bodyContent = [] }: ILoadFilterBody) => {
  const classes = useStyles();

  const swipeableViewsStyles = useMemo(() => swipeableViewsStylesFunction(height), [height]);

  return (
    <SwipeableViews
      index={index}
      containerStyle={swipeableViewsStyles.slideContainer}
      slideClassName={classes.slideClass}
      disabled
    >
      {bodyContent}
    </SwipeableViews>
  );
};

export default LoadFilterBody;
