import React from 'react';
import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';
import {
  CheckCircleOutline,
  LocalShippingOutlined,
  MoreOutlined,
  NotificationsOutlined,
  PersonPinCircleOutlined,
  SearchOutlined,
  SupervisorAccount,
  SystemUpdateAlt,
} from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import { Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 64,
    position: 'fixed' as 'fixed',
    bottom: 0,
    width: '100%',
  },
  rootV3: {
    height: 64,
    position: 'fixed' as 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    zIndex: 120, // Added to be above FOSwipeableBottomDrawer component
  },
  actionButtonRoot: {
    color: '#565656',
  },
  actionButtonLabel: {
    fontSize: `${theme.typography.pxToRem(10)} !important`,
  },
  actionButtonSelected: {
    color: '#fff !important',
    fontSize: `${theme.typography.pxToRem(11)} !important`,
  },
}));

const onChangeHandler = (onChange: (selected: string) => void) => (event, selected: string) => (onChange(selected));

interface IDriverBottomBar {
  selected: string;
  onChange: (selected: string) => void;
}

type IProps = IDriverBottomBar & IDriverAppStore;

const notificationHighlightText = 'Notifications let you know about important activities such as matches from load requests.'
  + 'We’ve also moved Settings to the top right corner for easier access.';

const DriverBottomBar = inject('driverAppStore')(observer(({ selected, onChange, driverAppStore }: IProps) => {
  const classes = useStyles();
  const {
    userStore: { defaultDriver, dispatcher, dispatchableDriver, FOUser: { permissions }, defaultDriverCompletedOnboarding, dispatcherCompletedOnboarding },
    configStore: { isV3 },
  } = driverAppStore as DriverAppStore;

  if (isV3) {
    return (
      <BottomNavigation
        value={selected}
        showLabels
        onChange={onChangeHandler(onChange)}
        className={classes.rootV3}
      >
        {(defaultDriver || dispatcher || (dispatchableDriver && permissions?.allowSearch)) && (
          <BottomNavigationAction
            label='Search Loads'
            value='search'
            icon={<SearchOutlined />}
            classes={{
              root: classes.actionButtonRoot,
              label: classes.actionButtonLabel,
              selected: classes.actionButtonSelected,
            }}
          />
        )}
        {(defaultDriver || dispatcher || (dispatchableDriver && permissions?.allowSearch)) && (
          <BottomNavigationAction
            label='My Loads'
            value='view'
            icon={<LocalShippingOutlined />}
            classes={{
              root: classes.actionButtonRoot,
              label: classes.actionButtonLabel,
              selected: classes.actionButtonSelected,
            }}
          />
        )}
        {dispatcher && (
          <BottomNavigationAction
            label='Drivers'
            value='drivers'
            icon={<SupervisorAccount />}
            classes={{
              root: classes.actionButtonRoot,
              label: classes.actionButtonLabel,
              selected: classes.actionButtonSelected,
            }}
          />
        )}
        {defaultDriver && (
          <BottomNavigationAction
            label='Request A Load'
            value='requestLoad'
            icon={<SystemUpdateAlt />}
            classes={{
              root: classes.actionButtonRoot,
              label: classes.actionButtonLabel,
              selected: classes.actionButtonSelected,
            }}
          />
        )}
        {(defaultDriver || dispatcher) && (
          <BottomNavigationAction
            label='More'
            value='more'
            icon={(
              <MoreOutlined />
            )}
            classes={{
              root: classes.actionButtonRoot,
              label: classes.actionButtonLabel,
              selected: classes.actionButtonSelected,
            }}
          />
        )}
        {/* <BottomNavigationAction */}
        {/*  label='BRF (Bot)' */}
        {/*  value='chatbot' */}
        {/*  icon={<AssistantOutlined />} */}
        {/* /> */}
      </BottomNavigation>
    );
  } else {
    return (
      <BottomNavigation value={selected} showLabels onChange={onChangeHandler(onChange)} className={classes.root}>
      {(defaultDriver || dispatcher || (dispatchableDriver && permissions?.allowSearch)) && (
        <BottomNavigationAction
          label='My Loads'
          value='view'
          icon={<LocalShippingOutlined />}
        />
      )}
      {(defaultDriver || dispatcher || (dispatchableDriver && permissions?.allowSearch)) && (
        <BottomNavigationAction
          label='Search Loads'
          value='search'
          icon={<SearchOutlined />}
        />
      )}
      {dispatcher && (
        <BottomNavigationAction
          label='Drivers'
          value='drivers'
          icon={<SupervisorAccount />}
        />
      )}
      {defaultDriver && (
        <BottomNavigationAction
          label='Request A Load'
          value='requestLoad'
          icon={<CheckCircleOutline />}
        />
      )}
      {(defaultDriver) && (
        <BottomNavigationAction
          label='Tracking'
          value='trackingSessions'
          icon={(
            <PersonPinCircleOutlined />
          )}
        />
      )}
      {/* <BottomNavigationAction */}
      {/*  label='BRF (Bot)' */}
      {/*  value='chatbot' */}
      {/*  icon={<AssistantOutlined />} */}
      {/* /> */}
    </BottomNavigation>
    );
  }
}));

export default DriverBottomBar;
