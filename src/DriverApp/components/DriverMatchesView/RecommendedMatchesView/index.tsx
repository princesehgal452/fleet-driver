import React from 'react';
import { observer } from 'mobx-react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import LoadCard from '../../LoadCard';
import Match from '../../../../models/dataStructures/Match';
import CollectionsStore from '../../../store/CollectionsStore';
import { UserStore } from '../../../store/UserStore';
import Load from '../../../../models/dataStructures/Load';
import FOInfiniteLoader from '../../../../components/FOInfiniteLoader';
import NoLoads from '../../../../components/FONoResults/NoLoads';
import LaneCard from '../../LaneCard';
import { IRecommendedLane } from '../../../../models/interfaces/shared/IRecommendedLane';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import LoadSkeleton from '../../LoadSkeleton';


const useStyles = makeStyles((theme: Theme) => ({
  laneContainer: {
    padding: theme.spacing(1),
  },
  resultsContainer: {
    padding: theme.spacing(0.5, 0.5, 2.5, 0.5),
  },
}));

const laneSelectHandler = (index: number, onLaneSelect: (index: number) => void) => () => onLaneSelect(index);

interface IRecommendedMatchesView {
  recommendedMatches: CollectionsStore;
  userStore: UserStore;
  currentCoordinates: ICoordinate;
  onItemClick: (load: Load) => void;
  onLaneSelect: (index: number) => void;
  routeToRALPage: () => void;
}

const RecommendedMatchesView = observer(({
  recommendedMatches: { downloadResults, loading, error, results, lanes, downloadNextResults, pagination },
  userStore: { dispatchableDriver },
  currentCoordinates,
  onItemClick,
  onLaneSelect,
  routeToRALPage,
}: IRecommendedMatchesView) => {
  const classes = useStyles();

  return (
    <FOInfiniteLoader
      downloadResults={downloadResults}
      loading={loading}
      error={error}
      resultsCount={results.length + lanes.length}
      getMoreResults={downloadNextResults}
      ErrorComponent={<div />}
      LoadingMockComponent={(
        <div>
          <LoadSkeleton />
        </div>
)}
      NoResultsComponent={(
        <NoLoads
          message={(
            <Typography variant='subtitle1' align='center'>
              We are generating recommendations for you, stay tuned for high-quality freight matches.
              <br />
              Try requesting a load and you'll be notified when we find you a match.
            </Typography>
          )}
          routeToRAL={routeToRALPage}
        />
      )}
      ResultsComponent={(
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.laneContainer}>
              <Grid container spacing={1}>
                {lanes.map((lane: IRecommendedLane, index) => (
                  <Grid item xs={12} lg={results.length > 0} key={lane.lane_score}>
                    <LaneCard
                      otherLoads={results.length > 0}
                      index={index}
                      startLane={lane.start_lane}
                      endLane={lane.end_lane}
                      loadsCount={lane.lane_count}
                      onLaneClick={laneSelectHandler(index, onLaneSelect)}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.resultsContainer}>
              <Grid container spacing={1}>
                {results.map((result: Match) => (
                  <LoadCard
                    key={result.matchId}
                    dispatchableDriver={dispatchableDriver}
                    collectionItem={result.parentLoad}
                    currentCoordinates={currentCoordinates}
                    onItemClick={onItemClick}
                  />
                ))}
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}
      pagination={pagination}
    />
  );
});

export default RecommendedMatchesView;
