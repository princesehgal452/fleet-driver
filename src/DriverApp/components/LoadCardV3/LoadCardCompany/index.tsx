import React from 'react';
import { observer } from 'mobx-react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import BrfCertifiedSquare from '../../../../assets/images/png/BrfCertifiedSquare.png';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 100,
    backgroundColor: '#FF8500',
    height: 35,
    width: 35,
  },
  image: {
    width: 25,
  },
}));

interface ILoadCardDatesProps {
  companyLogo?: string;
  loading?: boolean;
}

const LoadCardCompany = observer(({ companyLogo, loading }: ILoadCardDatesProps) => {
  const classes = useStyles();
  if (loading) {
    return null;
  }
  return (
    <Grid container justify='center' alignItems='center' className={classes.root}>
      <img src={BrfCertifiedSquare} className={classes.image} />
    </Grid>
  );
});

export default LoadCardCompany;
