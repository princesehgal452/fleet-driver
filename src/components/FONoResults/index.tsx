import React, { ReactNode } from 'react';
import { Button, Grid, makeStyles, Theme } from '@material-ui/core';
import FOSVG from '../FOSVG';
import { inject, observer } from 'mobx-react';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';


const spacing = 2;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(spacing),
  },
}));

interface IFONoResultsOwnProps {
  buttonOnClick?: () => void;
  buttonText?: ReactNode;
  message: ReactNode;
  image: ReactNode;
}

type IFONoResultsProps = IFONoResultsOwnProps & IDriverAppStore;

const FONoResults = inject('driverAppStore')(observer(({ buttonOnClick, buttonText, message, image, driverAppStore }: IFONoResultsProps) => {
  const classes = useStyles();
  const { configStore: { isGeotab }, } = driverAppStore as DriverAppStore;

  return (
    <div className={classes.root}>
      <Grid container justify='center' spacing={spacing}>
        <Grid item>
          <FOSVG>
            {image}
          </FOSVG>
        </Grid>
        <Grid item xs={12}>
          {message}
        </Grid>
        <Grid item>
          {buttonOnClick && (
            <Button color='secondary' variant='outlined' fullWidth onClick={buttonOnClick}>
              {buttonText}
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  );
}));

export default FONoResults;
