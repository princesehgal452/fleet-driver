import React from 'react';
import { observer } from 'mobx-react';
import { Grid, Box } from '@material-ui/core';
import RALPageTruck from 'assets/images/png/RALPageTruck.png';
import Match from 'models/dataStructures/Match';
import LoadSkeleton from 'components/v3/LoadSkeleton';
import LoadCard from 'components/v3/LoadCardV3';

interface IRALMatchesLoads {
  ralMatches: Match[];
  loading: boolean;
}

const RALMatchesLoads = observer(({ ralMatches, loading }: IRALMatchesLoads) => {
  const NoResultsComponent = () => (
    <Box p={2}>
      <img src={RALPageTruck} width={100} height={100} alt='RAL No matches' />
    </Box>
  );
  return (
    <Grid container spacing={1}>
      {
        loading ? (
          <LoadSkeleton />
        ) : (
          <Box>
            {
              ralMatches.length > 0 ? (
                ralMatches.map((result: Match) => (
                  result.parentLoad?.loadId ? (
                    <Grid item xs={12}>
                      <Box py={1}>
                        <LoadCard load={result.parentLoad} showMap />
                      </Box>
                    </Grid>
                  ) : <NoResultsComponent />
                ))
              ) : <NoResultsComponent />
            }
          </Box>
        )
      }
    </Grid>
  );
});

export default RALMatchesLoads;
