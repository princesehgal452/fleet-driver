import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { ILaneAddress } from 'models/interfaces/shared/IOperatingLanes';
import { getLocationText } from 'utils/utility';
import useStyles from './styles';

interface IOperatingLaneInfoProps {
  laneAddress: ILaneAddress;
}

const OperatingLaneInfo = memo(({ laneAddress: { city, state } }: IOperatingLaneInfoProps) => {
  const classes = useStyles();
  return (
    <Typography variant='body2' className={classes.info}>
      {getLocationText(city, state, null)}
    </Typography>
  );
});

export default OperatingLaneInfo;
