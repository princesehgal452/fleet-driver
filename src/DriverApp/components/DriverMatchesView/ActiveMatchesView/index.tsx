import React from 'react';
import { observer } from 'mobx-react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import LoadCard from '../../LoadCard';
import FOInfiniteLoader from '../../../../components/FOInfiniteLoader';
import CollectionsStore from '../../../store/CollectionsStore';
import { UserStore } from '../../../store/UserStore';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import Match from '../../../../models/dataStructures/Match';
import Load from '../../../../models/dataStructures/Load';
import NoLoads from '../../../../components/FONoResults/NoLoads';
import LoadSkeleton from '../../LoadSkeleton';


const useStyles = makeStyles((theme: Theme) => ({
  resultsContainer: {
    padding: theme.spacing(0.5, 0.5, 2.5, 0.5),
  },
}));

interface IActiveMatchesView {
  activeLoads: CollectionsStore;
  userStore: UserStore;
  currentCoordinates: ICoordinate;
  onItemClick: (load: Load) => void;
  routeToRALPage: () => void;
}

const ActiveMatchesView = observer(({
  activeLoads: { downloadResults, loading, error, results, downloadNextResults, pagination },
  userStore: { dispatcher }, currentCoordinates, onItemClick, routeToRALPage,
}: IActiveMatchesView) => {
  const classes = useStyles();

  return (
    <FOInfiniteLoader
      downloadResults={downloadResults}
      loading={loading}
      error={error}
      resultsCount={results.length}
      getMoreResults={downloadNextResults}
      ErrorComponent={<div />}
      LoadingMockComponent={<div>
        <LoadSkeleton />
      </div>}
      NoResultsComponent={(
        <NoLoads
          message={(
            <Typography variant='subtitle1' align='center'>
              Your Active Tab is currently empty.
              <br />
              It's time to start searching for high-quality freight.
              <br />
              You can also post your capacity through 'Request a Load' and be automatically matched with freight.
            </Typography>
)}
          routeToRAL={routeToRALPage}
        />
)}
      ResultsComponent={(
        <div className={classes.resultsContainer}>
          <Grid container spacing={1}>
            {results.map((result: Match) => (
              <Grid item xs={12}>
                <LoadCard
                  dispatcher={dispatcher}
                  key={result.matchId}
                  collectionItem={result.parentLoad}
                  currentCoordinates={currentCoordinates}
                  onItemClick={onItemClick}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
      pagination={pagination}
    />
  );
});

export default ActiveMatchesView;
