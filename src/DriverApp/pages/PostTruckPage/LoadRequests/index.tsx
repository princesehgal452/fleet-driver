import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { PostMyTruckCard } from '../../../components/PostMyTruckCard';
import TruckStore from '../../../store/TruckStore';
import CardList from '../../../components/CardList';


interface ILoadRequests {
  truckStore: TruckStore;
}

const LoadRequests = ({ truckStore: { postedTrucks, deletePostedTruck } }: ILoadRequests) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='subtitle2' className='historical-searches__container'>
          Recent Load Requests
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CardList
          cardListId='Request a Load'
          collectionStore={postedTrucks}
          CardItemComponent={PostMyTruckCard}
          pagination={postedTrucks.pagination}
          deleteItem={deletePostedTruck}
        />
      </Grid>
    </Grid>
  );
};

export default LoadRequests;
