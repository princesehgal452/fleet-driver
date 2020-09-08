import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import LoadCard from '../../LoadCard';
import Match from '../../../../models/dataStructures/Match';
import CollectionsStore from '../../../store/CollectionsStore';
import { UserStore } from '../../../store/UserStore';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import Load from '../../../../models/dataStructures/Load';
import FOInfiniteLoader from '../../../../components/FOInfiniteLoader';
import LoadSkeleton from '../../LoadSkeleton';


interface ILaneLoads {
  laneMatches: CollectionsStore;
  userStore: UserStore;
  currentCoordinates: ICoordinate;
  onItemClick: (load: Load) => void;
  lane: string;
}

const LaneLoads = observer(({
                              laneMatches: { downloadResults, loading, error, results, lanes, downloadNextResults, pagination },
                              userStore: { dispatchableDriver },
                              lane,
                              currentCoordinates,
                              onItemClick,
                            }: ILaneLoads) => {

  return (
    <FOInfiniteLoader
      downloadResults={downloadResults}
      downloadResultArgs={{ lane }}
      loading={loading}
      error={error}
      resultsCount={results.length}
      getMoreResults={downloadNextResults}
      ErrorComponent={<div />}
      LoadingMockComponent={<div className="driver-page-content">
        <LoadSkeleton />
      </div>}
      NoResultsComponent={<div />}
      ResultsComponent={
        <Grid container>
          <Grid item xs={12}>
            <div className='driver-page-content'>
              {results.map((result: Match) => (
                <LoadCard
                  key={result.matchId}
                  dispatchableDriver={dispatchableDriver}
                  collectionItem={result.parentLoad}
                  currentCoordinates={currentCoordinates}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      }
      pagination={pagination}
    />
  );
});

export default LaneLoads;
