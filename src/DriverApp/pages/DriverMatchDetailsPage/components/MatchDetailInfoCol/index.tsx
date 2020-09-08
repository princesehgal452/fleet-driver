import React, { memo, ReactNode } from 'react';
import { Grid, Typography, makeStyles, Theme } from '@material-ui/core';
import { observer } from 'mobx-react';
import classNames from 'classnames';

const useStyles = makeStyles((theme: Theme) => ({
  caption: {
    fontSize: theme.typography.pxToRem(16)
  },
  subtitle2: {
    textTransform: 'capitalize'
  }
}));

interface IMatchDetailInfoColOwnProps {
  title: string;
  value: ReactNode;
  isGeotab?: boolean;
}

const MatchDetailInfoCol = observer(({ title, value, isGeotab }: IMatchDetailInfoColOwnProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant={isGeotab ? 'caption' : 'subtitle1'} color={isGeotab ? 'textSecondary' : 'inherit'}>
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={isGeotab ? 'body2' : 'subtitle2'} noWrap={false} className={classNames({ [classes.subtitle2]: isGeotab })}>
          {value}
        </Typography>
      </Grid>
    </Grid>
  )
});

export default MatchDetailInfoCol;
