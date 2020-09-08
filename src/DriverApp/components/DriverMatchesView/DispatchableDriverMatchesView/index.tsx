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

interface IDispatchableDriverMatchesView {
  activeLoads: CollectionsStore;
  userStore: UserStore;
  currentCoordinates: ICoordinate;
  onItemClick: (load: Load) => void;
}

const DispatchableDriverMatchesView = observer(({
  activeLoads: { downloadResults, loading, error, results, downloadNextResults, pagination },
  userStore: { dispatchableDriver },
  currentCoordinates,
  onItemClick,
}: IDispatchableDriverMatchesView) => {
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
              When your dispatcher sends you loads you’ll see it here.
            </Typography>
)}
        />
)}
      ResultsComponent={(
        <div className={classes.resultsContainer}>
          <Grid container spacing={1}>
            {results.map((result: Match) => (
              <Grid item xs={12}>
                <LoadCard
                  key={result.matchId}
                  dispatchableDriver={dispatchableDriver}
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

export default DispatchableDriverMatchesView;
