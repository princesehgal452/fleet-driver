import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import Grid, { GridProps } from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SpacingArgument } from '@material-ui/core/styles/createSpacing';


const useStyles = makeStyles((theme: Theme) => ({
  root: (props: IStylesProps) => ({
    padding: theme.spacing(props.vSpacing, props.hSpacing),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(parseFloat(props.vSpacing.toString()) / 2, parseFloat(props.hSpacing.toString()) / 2),
    },
  }),
}));

interface IStylesProps {
  vSpacing: SpacingArgument;
  hSpacing: SpacingArgument;
}

interface IFOGridOwnProps {
  vSpacing?: SpacingArgument;
  hSpacing?: SpacingArgument;
}

interface IFOGridOwnProps {
  // classes: Record<'root', string>;
}

type IFOGridProps = IFOGridOwnProps & GridProps;

const FOGrid = observer(({ vSpacing = 2, hSpacing = 4, children, ...other }: IFOGridProps) => {
  const classesStyles = useStyles({ vSpacing, hSpacing });

  return (
    <Grid container alignItems='center' className={classNames(classesStyles.root)} {...other}>
      {children}
    </Grid>
  );
});

export default FOGrid;
