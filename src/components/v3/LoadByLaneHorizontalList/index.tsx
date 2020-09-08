import React, { ReactNode } from 'react';
import 'firebase/auth';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOGridHorizontalScroll from 'components/v3/FOGridHorizontalScroll';
import { IRecommendedLane } from 'models/interfaces/shared/IRecommendedLane';
import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';

import LoadLaneCard from '../LoadLaneCard';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 500,
    marginBottom: theme.spacing(1)
  }
}));

interface ILoadByLaneHorizontalListOwnProps {
  title: string | ReactNode;
  listItems;
  handleLaneSelect?: (laneItem: IRecommendedLane | IOperatingLane) => void;
}

type ILoadByLaneHorizontalListProps = ILoadByLaneHorizontalListOwnProps;

const LoadByLaneHorizontalList = ({ title, listItems, handleLaneSelect }: ILoadByLaneHorizontalListProps) => {
  const classes = useStyles();

  const renderLaneCardContent = (laneItem: IRecommendedLane | IOperatingLane, index) => {
    return (
      <LoadLaneCard lane={laneItem} key={index} index={index} handleLaneSelect={handleLaneSelect}/>
    );
  };

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
