import React, { memo } from 'react';
import classNames from 'classnames';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Card, Grid, Typography, capitalize } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  truckEquipmentSelected: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    transition: theme.transitions.create(['color', 'backgroundColor'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  truckButton: {
    height: theme.spacing(16),
    margin: '0 auto',
  },
  image: {
    width: '100%',
  },
}));

interface ITruckSelectCardProps {
  selectValue: string;
  truckButtonClickHandler: (value) => () => void;
  truckType: string;
  truckImage: string;
}

const TruckSelectCard = memo(({ selectValue, truckButtonClickHandler, truckImage, truckType }: ITruckSelectCardProps) => {
  const classes = useStyles();

  return (
    <Card
      className={classNames({
        [classes.truckEquipmentSelected]: selectValue === truckType,
      })}
    >
      <CardActionArea className={classes.truckButton} onClick={truckButtonClickHandler(truckType)}>
        <Grid container direction='column' spacing={1} alignItems='center'>
          <Grid item xs={12}>
            <img src={truckImage} alt={truckType} className={classes.image} />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant='h6'
              className={classNames({
                [classes.truckEquipmentSelected]: selectValue === truckType,
              })}
            >
              {capitalize(truckType)}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
});

export default TruckSelectCard;
