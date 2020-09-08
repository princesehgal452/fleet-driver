import React, { ReactNode } from 'react';
import { Grid, Box } from '@material-ui/core';
import FOGridHorizontalScroll from 'components/FOGridHorizontalScroll';
import { ITruckData } from 'models/interfaces/shared/ITruckData';
import TrackingSession from 'models/dataStructures/TrackingSession';
import LoadCard from './LoadCard';
import PageSubtitle from '../PageSubtitle';

interface ILoadsHorizontalListV3OwnProps {
  title?: string | ReactNode;
  listItems: Array<ITruckData | TrackingSession>;
  handleLoadSelect?: (id: string) => () => void;
}

type ILoadsHorizontalListV3Props = ILoadsHorizontalListV3OwnProps;

const LoadsHorizontalListV3 = ({ title, listItems, handleLoadSelect }: ILoadsHorizontalListV3Props) => {
  const renderLaneCardContent = (load: ITruckData & TrackingSession, index) => (
    <LoadCard pickup={load.pickup} dropoff={load.dropoff} key={index} handleLoadSelect={handleLoadSelect} id={load?.id} />
  );

  return (
    <Box>
      {
        title && (
          <PageSubtitle title={title} mb={1} />
        )
      }
      <Grid container>
        <FOGridHorizontalScroll
          listItems={listItems}
          renderItem={renderLaneCardContent}
          listEdgeBorderRadius={4}
        />
      </Grid>
    </Box>
  );
};

export default LoadsHorizontalListV3;
