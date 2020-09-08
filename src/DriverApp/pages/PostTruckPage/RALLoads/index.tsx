import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import CollectionsStore from '../../../store/CollectionsStore';
import { UserStore } from '../../../store/UserStore';
import { ICoordinate } from '../../../../models/interfaces/shared/ICoordinate';
import FOInfiniteLoader from '../../../../components/FOInfiniteLoader';
import LoadCard from '../../../components/LoadCard';
import Load from '../../../../models/dataStructures/Load';
import Match from '../../../../models/dataStructures/Match';
import LoadSkeleton from '../../../components/LoadSkeleton';


interface IRALLoads {
  RALLoadStore: CollectionsStore;
  userStore: UserStore;
  currentCoordinates: ICoordinate;
  onItemClick: (load: Load) => void;
}

const RALLoads = observer((
  {
    RALLoadStore: { results, pagination, loading, error, downloadResults, downloadNextResults },
    userStore: { dispatchableDriver }, currentCoordinates, onItemClick,
  }: IRALLoads) => {
  return (
    <FOInfiniteLoader
      ResultsComponent={results.map((result: Match) => (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <LoadCard
              key={result.matchId}
              dispatchableDriver={dispatchableDriver}
              collectionItem={result.parentLoad}
              currentCoordinates={currentCoordinates}
              onItemClick={onItemClick}
            />
          </Grid>
        </Grid>
      ))}
      LoadingMockComponent={<div>
        <LoadSkeleton />
      </div>}
      downloadResults={downloadResults}
      loading={loading}
      ErrorComponent={<div />}
      NoResultsComponent={<div />}
      resultsCount={results.length}
      pagination={pagination}
      getMoreResults={downloadNextResults}
      error={error}
    />
  );
});

export default RALLoads;
