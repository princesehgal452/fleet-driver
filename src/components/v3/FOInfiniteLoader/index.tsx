import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import Observer from '@researchgate/react-intersection-observer';
import Grid from '@material-ui/core/Grid';
import { Grow, GridList } from '@material-ui/core';
import { GrowProps } from '@material-ui/core/Grow';
import { TransitionChildren } from 'react-transition-group/Transition';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { observer } from 'mobx-react';

import { Pagination } from 'models/interfaces/shared/IPagination';

import useStyles from './styles';

const growFromTopStyle: CSSProperties = {
  transformOrigin: 'top',
};

interface IGrowFromTop extends GrowProps {
  children: TransitionChildren;
}

const GrowFromTop = ({ children, ...other }: IGrowFromTop) => (
  <Grow mountOnEnter unmountOnExit style={growFromTopStyle} {...other}>{children}</Grow>);

const initiateDownloadResults = (downloadResults: (page, args) => Promise<void>, resultsCount: number, args) => () => {
  if (!resultsCount) {
    downloadResults(1, args);
  }
};

const getMoreResultsHandler = (getMoreResults: () => void) => (entry: IntersectionObserverEntry, unobserve: () => void) => {
  if (entry.isIntersecting) {
    console.log('get more results');
    getMoreResults();
  }
};

interface IFOInfiniteLoaderOwnProps {
  downloadResults: (...params) => Promise<void>;
  getMoreResults: () => void;
  resultsCount: number;
  loading: boolean;
  pagination: Pagination;
  error: boolean | string | null;
  ErrorComponent: ReactNode;
  NoResultsComponent: ReactNode;
  ResultsComponent: ReactNode;
  LoadingMockComponent: ReactNode;
  maxResults?: number;
  downloadResultArgs?;
  isHorizontalScroll?: boolean;
}

const FOInfiniteLoader = observer(({
  downloadResults,
  getMoreResults,
  resultsCount,
  loading,
  pagination,
  downloadResultArgs,
  error,
  ErrorComponent,
  NoResultsComponent,
  maxResults,
  ResultsComponent,
  LoadingMockComponent,
  isHorizontalScroll,
}: IFOInfiniteLoaderOwnProps) => {
  const classes = useStyles();
  const showLoadingMockComponent = maxResults ? resultsCount > 0 && resultsCount <= maxResults : pagination.page < pagination.totalPages;
  useEffect(initiateDownloadResults(downloadResults, resultsCount, downloadResultArgs), []);

  const MockLoadingItem = () => (
    <Grid item>
      {LoadingMockComponent}
    </Grid>
  );

  const MockLoadingObserver = () => (
    <Observer onChange={getMoreResultsHandler(getMoreResults)}>
      {MockLoadingItem()}
    </Observer>
  );

  return (
    <Grid
      container
      direction={isHorizontalScroll ? 'row' : 'column'}
      className={classes.fullHeight}
    >
      {error
        ? (
          <Grid item className={classes.flexStretch}>
            <div className={clsx(classes.noResultsOrError, classes.fullHeight, classes.displayFlex)}>
              {ErrorComponent}
            </div>
          </Grid>
        ) : (
          <>
            {!loading && (resultsCount === 0) && (
              <Grid item className={classes.flexStretch}>
                <div className={clsx(classes.noResultsOrError, classes.fullHeight, classes.displayFlex)}>
                  {NoResultsComponent}
                </div>
              </Grid>
            )}
            <GrowFromTop in={Boolean(resultsCount)}>
              <Grid item className={clsx({ [classes.fullWidth]: isHorizontalScroll })}>
                {
                  isHorizontalScroll ? (
                    <GridList className={classes.gridList} cellHeight='auto'>
                      {ResultsComponent}
                      {loading && (
                        <MockLoadingItem />
                      )}
                      {!loading && showLoadingMockComponent && (
                        <MockLoadingObserver />
                      )}
                    </GridList>
                  ) : ResultsComponent
                }
              </Grid>
            </GrowFromTop>
            {loading && !isHorizontalScroll && (
              <MockLoadingItem />
            )}
            {!loading && !isHorizontalScroll && showLoadingMockComponent && (
              <MockLoadingObserver />
            )}
          </>
        )}
    </Grid>
  );
});

export default FOInfiniteLoader;
