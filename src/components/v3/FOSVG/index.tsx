import React, { memo, ReactNode } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .primaryLight': {
      fill: theme.palette.primary.light,
    },
    '& .primaryMain': {
      fill: theme.palette.primary.main,
    },
    '& .secondaryLight': {
      fill: theme.palette.secondary.light,
    },
    '& .secondaryMain': {
      fill: theme.palette.secondary.main,
    },
  },
}));

interface IFOSVGOwnProps {
  classes?: Record<'root', string>;
  children: ReactNode;
}

type IFOSVGProps = IFOSVGOwnProps;

const FOSVG = memo(({ classes: classesProp, children }: IFOSVGProps) => {
  const classes = classesProp || useStyles();
  return (
    <div className={classes.root}>
      {children}
    </div>
  );
});

export default FOSVG;
