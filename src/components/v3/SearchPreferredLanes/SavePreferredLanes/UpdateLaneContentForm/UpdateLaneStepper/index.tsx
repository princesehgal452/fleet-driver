import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Grid, Typography, Box } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';

import FOLaneCardComponent from 'components/v3/FOLaneCardComponent';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  deleteOutlinedIcon: {
    color: theme.palette.grey[700],
  },
}));

interface IUpdateLaneStepper {
  selectedOperatingLane: IOperatingLane;
  triggerDelete: (showPrompt: boolean) => void;
}

const UpdateLaneStepper = observer(({ selectedOperatingLane, triggerDelete }: IUpdateLaneStepper) => {
const classes = useStyles();
const handleTriggerDelete = useCallback(() => {
  triggerDelete(true)
}, [triggerDelete])
  return  (
    <>
      <Box p={2}>
        <Typography align='center' variant='body2'>Edit Preferred Lane?</Typography>
      </Box>
      <Grid
        className={classes.root}
        container
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <FOLaneCardComponent operatingLane={selectedOperatingLane} renderInCard={false} />
        </Grid>
        <Grid item>
          <DeleteOutlinedIcon className={classes.deleteOutlinedIcon} onClick={handleTriggerDelete} />
        </Grid>
      </Grid>
    </>
  )
}
);

export default UpdateLaneStepper;
