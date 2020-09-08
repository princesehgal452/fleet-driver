import React, { memo } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { CardActionArea, Divider, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import FOGrid from '../../../../../../components/FOGrid';
import LoadRouteDialogHeader from '../../LoadRouteDialogHeader';
import LoadRouteItem from '../../../LoadRouteItem';
import RouteMapDesktop from '../RouteMap/RouteMapDesktop';
import RouteGuidanceDesktop from '../RouteGuidance/RouteGuidanceDesktop';
import AisinRouteData from '../../../../../../models/dataStructures/Aisin/AisinRouteData';


const useStylesRouteDataListItem = makeStyles((theme: Theme) => ({
  root: {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shortest,
    }),
  },
  selected: {
    border: `1px solid ${theme.palette.primary.main}`,
    transform: 'scale(1.04)',
  },
}));

interface IRouteDataListItem {
  routeDataFromList: AisinRouteData;
  routeDataSelected: AisinRouteData;
  routeSelectSwitchHandler: (selectedRoute: (AisinRouteData | null)) => () => void;
}

const RouteDataListItem = ({ routeDataFromList, routeDataSelected, routeSelectSwitchHandler }: IRouteDataListItem) => {
  const classes = useStylesRouteDataListItem();

  return (
    <Grid item xs>
      <Paper className={classNames(classes.root, { [classes.selected]: routeDataSelected === routeDataFromList })}>
        <CardActionArea onClick={routeSelectSwitchHandler(routeDataFromList)}>
          <FOGrid>
            <LoadRouteItem routeData={routeDataFromList} />
          </FOGrid>
        </CardActionArea>
      </Paper>
    </Grid>
  );
};

const useStylesLoadRouteFullMapDialogContentDesktop = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  flexStretch: {
    flex: 1,
  },
  selected: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

interface ILoadRouteFullMapDialogContentDesktop {
  routeDataList: AisinRouteData[];
  routeData: AisinRouteData;
  closeHandler: () => void;
  routeSelectSwitchHandler: (selectedRoute: (AisinRouteData | null)) => () => void;
  dialogEntered: boolean;
}

const LoadRouteFullMapDialogContentDesktop = observer((
  { routeDataList, routeData, routeSelectSwitchHandler, closeHandler, dialogEntered }: ILoadRouteFullMapDialogContentDesktop,
) => {
  const classes = useStylesLoadRouteFullMapDialogContentDesktop();

  return (
    <Grid container className={classes.root} direction='column' wrap='nowrap'>
      <div>
        <Grid container justify='center'>
          <Grid item xs={12}>
            <LoadRouteDialogHeader closeHandler={closeHandler} />
          </Grid>
          <Grid item xs={12}>
            <FOGrid>
              <Grid item xs={12}>
                <Grid container wrap='nowrap' spacing={2} alignItems='center'>
                  {routeDataList.map((routeDataFromList) => (
                    <RouteDataListItem
                      key={routeDataFromList.routeSearchType}
                      routeSelectSwitchHandler={routeSelectSwitchHandler}
                      routeDataFromList={routeDataFromList}
                      routeDataSelected={routeData}
                    />
                  ))}
                </Grid>
              </Grid>
            </FOGrid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </div>
      <Grid item xs={12} className={classes.flexStretch}>
        <Grid container className={classes.root}>
          <Grid item xs={8} className={classes.flexStretch}>
            <RouteMapDesktop dialogEntered={dialogEntered} routeData={routeData} />
          </Grid>
          <Grid item xs={4}>
            <RouteGuidanceDesktop dialogEntered={dialogEntered} routeData={routeData} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default LoadRouteFullMapDialogContentDesktop;
