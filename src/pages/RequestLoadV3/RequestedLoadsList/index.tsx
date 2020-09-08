import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import FOInfiniteLoader from 'components/v3/FOInfiniteLoader';
import LoadCard from 'components/v3/LoadsHorizontalListV3/LoadCard';
import PageSubtitle from 'components/v3/PageSubtitle';

interface IRequestedLoadsListOwnProps {
  title: string;
  ralId?: string;
  handleLoadSelect: (requestId: string) => () => void;
}

type IRequestedLoadsListProps = IRequestedLoadsListOwnProps & IDriverAppStore;

const RequestedLoadsList = inject('driverAppStore')(observer(({ title, ralId, handleLoadSelect, driverAppStore }: IRequestedLoadsListProps) => {
  const { truckStore: { postedTrucks: {
    downloadResults,
    downloadNextResults,
    pagination,
    loading,
    results,
  } } } = driverAppStore as DriverAppStore;

  const LoadingMockComponent = () => (
    <Grid container justify='center'>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );

  const NoResultsComponent = () => (
    <Typography variant='body2'>There are currently no requests</Typography>
  );

  const ResultsComponent = () => {
    let displayResults = results;
    if (ralId) {
      displayResults = results.filter((obj) => (obj.id !== ralId));
    }
    return (
      displayResults.map((load) => (
        <LoadCard
          pickup={load.pickup}
          dropoff={load.dropoff}
          handleLoadSelect={handleLoadSelect}
          id={load?.id}
        />
      ))
    );
  };

  return (
    <Grid container>
      <PageSubtitle title={title} mb={1.5} />
      <FOInfiniteLoader
        downloadResults={downloadResults}
        getMoreResults={downloadNextResults}
        pagination={pagination}
        error={null}
        ErrorComponent={null}
        loading={loading}
        LoadingMockComponent={<LoadingMockComponent />}
        NoResultsComponent={<NoResultsComponent />}
        ResultsComponent={<ResultsComponent />}
        resultsCount={results.length}
        isHorizontalScroll
      />
    </Grid>
  );
}));

export default RequestedLoadsList;
