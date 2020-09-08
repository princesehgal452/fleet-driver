import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import Observer from '@researchgate/react-intersection-observer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Grow, Box } from '@material-ui/core';
import { GrowProps } from '@material-ui/core/Grow';
import { TransitionChildren } from 'react-transition-group/Transition';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { observer } from 'mobx-react';

import { Pagination } from 'models/interfaces/shared/IPagination';


const useStyles = makeStyles((theme: Theme) => ({
  fullHeight: {
    height: '100%',
  },
  displayFlex: {
    display: 'flex',
  },
  flexStretch: {
    flex: 1,
  },
  noResultsOrError: {
    paddingTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(8),
    },
  },
  fullWidth: {
    width: '100%',
  },
}));

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

  useEffect(initiateDownloadResults(downloadResults, resultsCount, downloadResultArgs), []);

  return (
    <Grid container direction={isHorizontalScroll ? 'row' : 'column'} className={classes.fullHeight}>
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
                {ResultsComponent}
              </Grid>
            </GrowFromTop>
            {loading && (
              <Grid item>
                {LoadingMockComponent}
              </Grid>
            )}
            {!loading && (maxResults ? resultsCount <= maxResults : pagination.page < pagination.totalPages) && (
              <Observer onChange={getMoreResultsHandler(getMoreResults)}>
                <Grid item>
                  {LoadingMockComponent}
                </Grid>
              </Observer>
            )}
          </>
        )}
    </Grid>
  );
});

export default FOInfiniteLoader;
