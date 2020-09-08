import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    width: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  icon: {
    fontSize: theme.spacing(6),
    color: theme.palette.grey.A100,
    transition: theme.transitions.create('color', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter,
    }),
  },
  selected: {
    color: theme.palette.primary.main,
  },
}));

interface FOSelectionListItemOwnProps {
  selected?: boolean;
  onClick?: Function;
  isAddNew?: boolean;
  children: ReactNode;
}

const onClickHandler = onClickFunction => () => onClickFunction();

const FOSelectListItem = React.memo((
  { selected, onClick, children, isAddNew = false }: FOSelectionListItemOwnProps) => {

  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onClickHandler(onClick)}>
      <Grid container alignItems='center' spacing={1}>
        <Grid item>
          {isAddNew ?
            <AddCircleIcon
              className={classNames(classes.icon, {
                [classes.selected]: Boolean(selected),
              })}
            /> :
            <CheckCircle
              className={classNames(classes.icon, {
                [classes.selected]: Boolean(selected),
              })}
            />}
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Card>
  );
});

export default FOSelectListItem;
