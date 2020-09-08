import React from 'react';
import { inject, observer } from 'mobx-react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {
  CheckCircleOutline,
  LocalShippingOutlined,
  NotificationsOutlined, PersonPinCircleOutlined,
  SearchOutlined,
  SupervisorAccount,
} from '@material-ui/icons';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';


export const sidebarWidth = 200;

const styles = (theme: Theme) => ({
  root: {
    flexDirection: 'column' as 'column',
    position: 'fixed' as 'fixed',
    justifyContent: 'flex-start',
    height: '100%',
    paddingTop: 48,
    zIndex: 1,
    width: sidebarWidth,
    boxShadow: 'inset -5px 0px 10px -10px rgba(0,0,0,0.75)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
  },
  navigationWrapper: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'flex-start',
    paddingLeft: 25,
    height: 65,
  },
  navigationRoot: {
    color: theme.palette.common.white,
  },
  navigationLabel: {
    marginLeft: theme.spacing(1),
  },
  navigationSelected: {
    paddingTop: '0 !important',
    backgroundColor: theme.palette.common.white,
    color: `${theme.palette.common.black} !important`,
  },
});

interface IDriverSideMenuOwnProps {
  selected: string;
  onChange: (selected: string) => void;
}

type IDriverSideMenuProps = IDriverAppStore & IDriverSideMenuOwnProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class DriverSideMenu extends React.Component<IDriverSideMenuProps> {

  handleChange = (value: string) => () => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { selected, classes, driverAppStore } = this.props;
    const { userStore: { dispatcher, defaultDriver, dispatchableDriver, FOUser } } = driverAppStore as DriverAppStore;
    return (
      <BottomNavigation value={selected} className={classes.root}>
        <div className={classes.container}>
          {(defaultDriver || dispatcher || (dispatchableDriver && FOUser?.permissions?.allowSearch)) && (
            <>
              <BottomNavigationAction
                classes={{
                  label: classes.navigationLabel,
                  wrapper: classes.navigationWrapper,
                }}
                label='My Loads'
                showLabel
                selected={selected === 'view'}
                onClick={this.handleChange('view/loads')}
                icon={<LocalShippingOutlined />}
              />
              <BottomNavigationAction
                classes={{
                  label: classes.navigationLabel,
                  wrapper: classes.navigationWrapper,
                }}
                label='Search Loads'
                showLabel
                selected={selected === 'search'}
                onClick={this.handleChange('search/results')}
                icon={<SearchOutlined />}
              />
            </>
          )}
          {dispatcher && (
            <BottomNavigationAction
              classes={{
                label: classes.navigationLabel,
                wrapper: classes.navigationWrapper,
              }}
              label='Drivers'
              showLabel
              selected={selected === 'drivers'}
              onClick={this.handleChange('drivers')}
              icon={<SupervisorAccount />}
            />
          )}
          {defaultDriver && (
            <BottomNavigationAction
              classes={{
                label: classes.navigationLabel,
                wrapper: classes.navigationWrapper,
              }}
              label='Request A Load'
              showLabel
              selected={selected === 'requestLoad'}
              onClick={this.handleChange('requestLoad')}
              icon={<CheckCircleOutline />}
            />
          )}
          {(defaultDriver) && (
            <BottomNavigationAction
              classes={{
                label: classes.navigationLabel,
                wrapper: classes.navigationWrapper,
              }}
              label='Tracking'
              showLabel
              selected={selected === 'trackingSessions'}
              onClick={this.handleChange('trackingSessions')}
              icon={(<PersonPinCircleOutlined />)}
            />
          )}
        </div>
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(DriverSideMenu);
