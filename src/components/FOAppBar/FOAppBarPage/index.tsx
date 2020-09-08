import React, { Dispatch, ReactNode, RefObject, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppBar, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { ArrowBack, Notifications, Settings } from '@material-ui/icons';
import FOAppbar from '..';
import { ROUTES } from '../../../services/constants';
import FOScrollHide from '../../FOScrollHide';
import FOPageControls from '../../FOPageControls';
import TrackingBar from '../../../DriverApp/components/TrackingBar';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../DriverApp/store/DriverAppStore';

const iconWidth = 48;

const useStyles = makeStyles((theme: Theme) => ({
  root: (props) => ({
    height: props.mainControlHeight,
  }),
  secondaryControl: (props) => ({
    height: props.secondaryControlHeight,
  }),
  content: {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: `translateX(-${iconWidth}px)`,
  },
  contentShift: {
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    transform: `translateX(${0}px)`,
  },
}));

const backButtonHandler = (history: History) => () => {
  if (history.length <= 2) {
    history.push(`/${ROUTES.DRIVER_VIEW}`);
  } else {
    history.back();
  }
};

const routeToSettings = (history: History) => () => {
  history.push(`/${ROUTES.DRIVER_SETTINGS}`);
};
const routeToNotifications = (history: History) => () => {
  history.push(`/driver/notifications`);
};

const mainControlRefHandler = React.createRef<HTMLDivElement>();
const secondaryControlRefHandler = React.createRef<HTMLDivElement>();

const setRefHandler = (setHeight: Dispatch<number>, containerRefHandler: RefObject<HTMLDivElement>) => () => {
  setHeight(containerRefHandler?.current?.firstChild?.offsetHeight);
};

interface IFOAppBarPageOwnProps {
  pageTitle: string;
  actionButtons?: ReactNode;
  backButtonIcon?: ReactNode;
  showBackButton?: boolean;
  backButtonAction?: () => void;
  hideSettingsButton?: boolean;
  threshold?: number;
  secondaryControls?: ReactNode;
  renderTracking?: boolean;
}

type IFOAppBarPageProps = IFOAppBarPageOwnProps & IDriverAppStore & RouteComponentProps;

const FOAppBarPage = inject('driverAppStore')(observer(({
                                                          driverAppStore,
                                                          pageTitle, showBackButton, backButtonIcon, actionButtons, threshold = 600,
                                                          hideSettingsButton, backButtonAction, history, secondaryControls,
                                                          renderTracking,
                                                        }: IFOAppBarPageProps) => {
  const { configStore: { isGeotab } } = driverAppStore as DriverAppStore;
  const [mainControlHeight, setMainControlHeight] = useState(0);
  const [secondaryControlHeight, setSecondaryControlHeight] = useState(0);
  useEffect(setRefHandler(setMainControlHeight, mainControlRefHandler), [renderTracking]);
  useEffect(setRefHandler(setSecondaryControlHeight, secondaryControlRefHandler), [renderTracking]);
  const classes = useStyles({ mainControlHeight, secondaryControlHeight });

  return (
    <>
      {secondaryControls && (
        <div ref={secondaryControlRefHandler}>
          <FOPageControls mainControlHeight={mainControlHeight} isGeotab={isGeotab}>
              <AppBar position='static' color={isGeotab ? 'secondary' : 'primary'}>
                {secondaryControls}
              </AppBar>
          </FOPageControls>
        </div>
      )}
      <div ref={mainControlRefHandler}>
        <FOScrollHide useTrigger threshold={threshold}>
          <FOAppbar position={isGeotab ? 'absolute' : undefined} color={isGeotab ? 'secondary' : 'primary'} elevation={0}>
            <Grid container direction='column'>
              {renderTracking && (
                <Grid item>
                  <TrackingBar />
                </Grid>
              )}
              <Grid item xs={12}>
                <Grid container alignItems='center' justify='space-between' wrap='nowrap'>
                  <Grid item>
                    <Grid
                      container
                      alignItems='center'
                      className={classNames(classes.content, {
                        [classes.contentShift]: showBackButton,
                      })}
                    >
                      <Grid item>
                        <IconButton
                          color='inherit'
                          onClick={backButtonAction || backButtonHandler(history)}
                        >
                          {backButtonIcon || <ArrowBack />}
                        </IconButton>
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <Typography variant='h5' color='inherit' noWrap>
                          {pageTitle}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container alignItems='center' justify='flex-end' wrap='nowrap'>
                      {actionButtons && actionButtons}
                      {!hideSettingsButton && (
                        <>
                          <Grid item>
                            <IconButton color='inherit' onClick={routeToSettings(history)}>
                              <Settings />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <IconButton color='inherit' onClick={routeToNotifications(history)}>
                              <Notifications />
                            </IconButton>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FOAppbar>
        </FOScrollHide>
      </div>
      <div className={classes.root} />
      {secondaryControls && <div className={classes.secondaryControl} />}
    </>
  );
}));

export default withRouter(FOAppBarPage);
