import React, { ReactNode } from 'react';
import 'firebase/auth';
import { Grid, Typography } from '@material-ui/core';
import FOGridHorizontalScroll from 'components/FOGridHorizontalScroll';
import { IRecommendedLane } from 'models/interfaces/shared/IRecommendedLane';
import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';

import LoadLaneCard from '../LoadLaneCard';

import useStyles from './styles';

interface ILoadByLaneHorizontalListOwnProps {
  title: string | ReactNode;
  listItems;
  handleLaneSelect?: (laneItem: IRecommendedLane & IOperatingLane) => void;
}

type ILoadByLaneHorizontalListProps = ILoadByLaneHorizontalListOwnProps;

const LoadByLaneHorizontalList = ({ title, listItems, handleLaneSelect }: ILoadByLaneHorizontalListProps) => {
  const classes = useStyles();

  const renderLaneCardContent = (laneItem: IRecommendedLane & IOperatingLane, index) => (
    <LoadLaneCard
      lane={laneItem}
      key={index}
      index={index}
      handleLaneSelect={handleLaneSelect}
    />
  );

  return (
    <Grid container>
      <Typography variant='subtitle1' color='inherit' className={classes.title}>
        {title}
      </Typography>
      <Grid container>
        <FOGridHorizontalScroll
          listItems={listItems}
          renderItem={renderLaneCardContent}
          listEdgeBorderRadius={4}
        />
      </Grid>
    </Grid>
  );
};

export default LoadByLaneHorizontalList;
