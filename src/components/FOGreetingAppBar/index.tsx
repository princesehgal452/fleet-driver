import React, { ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {  makeStyles, Theme, Typography } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { ROUTES } from '../../services/constants';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(7)
  },
  toolbarRoot: {
    alignItems: 'flex-start'
  },
  title: {
    flexGrow: 1,
    color: '#fff'
  },
  notificationContainer: {
    position: 'relative'
  },
  notificationIcon: {
    marginTop: theme.spacing(0.5),
    color: '#fff',
    fontSize: 26
  },
  notificationDot: {
    position: 'absolute',
    right: 2,
    top: 7,
    height: 11,
    width: 11,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    border: '2px solid #000'
  },
  divider: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

const routeToSettings = (history: History) => () => {
  history.push(`/${ROUTES.DRIVER_SETTINGS}`);
};


interface IFOGreetingAppBarOwnProps {
  pageTitle: string | ReactNode;
}

type IFOGreetingAppBarProps = IFOGreetingAppBarOwnProps & RouteComponentProps;

const FOGreetingAppBar = inject('driverAppStore')(observer(({ pageTitle, history }: IFOGreetingAppBarProps) => {
  const classes = useStyles();

  return (
    <div >
      <AppBar position='static' color='transparent' elevation={0} className={classes.root}>
        <Toolbar className={classes.toolbarRoot}>
          <Typography variant='h5' color='inherit' className={classes.title}>
            {pageTitle}
          </Typography>
          <div className={classes.notificationContainer}>
            <NotificationsNoneIcon className={classes.notificationIcon} />
            <div className={classes.notificationDot} />
          </div>
        </Toolbar>
        <Box component='div' display='inline' width={34} border={1} borderColor='success.main' className={classes.divider}/>
      </AppBar>
    </div>
  );
}));

export default withRouter(FOGreetingAppBar);
