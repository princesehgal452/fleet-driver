import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { Badge, Grid, Paper } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import FilterHeaderChip from '../FilterHeaderChip';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: 2,
    borderRadius: 30,
    borderColor: theme.palette.grey['200'],
  },
  badge: {
    top: -13,
    right: 6,
    '& span': {
      border: '2px solid white',
      borderRadius: 16,
      height: 11,
      minWidth: 11,
      backgroundColor: '#FCE34D',
    },
  },
}));

interface IHeaderChipsProps {
  tabState: number;
  setTabState: Dispatch<SetStateAction<number>>;
  chipLabels: string[];
  showBadge: boolean[];
}

const HeaderChips = ({ tabState, setTabState, chipLabels, showBadge }: IHeaderChipsProps) => {
  const classes = useStyles();

  const onClickHandler = useCallback((newTabState) => () => {
    setTabState(newTabState);
  }, []);

  return (
    <Paper className={classes.root} variant='outlined'>
      <Grid container>
        {chipLabels.map((label, index) => (
          <Grid item xs>
            <FilterHeaderChip
              label={label}
              active={tabState === index}
              onClick={onClickHandler(index)}
              invertColors
            />
            <Badge
              key={label}
              variant='dot'
              invisible={!showBadge[index]}
              className={classes.badge}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default HeaderChips;
