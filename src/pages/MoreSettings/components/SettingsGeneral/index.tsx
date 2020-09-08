import React from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import CardTitle from 'components/v3/CardTitle';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import styles from './styles';

type ISettingsGeneralProps = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SettingsGeneral extends React.Component<ISettingsGeneralProps> {
  goToTermsOfService = () => {
    const { history } = this.props;
    history.push('/terms-of-service');
  };

  logoutHandler = async () => {
    const { driverAppStore } = this.props;
    const { userStore: { setLogin } } = driverAppStore as DriverAppStore;
    await firebase.auth().signOut();
    setLogin(false);
    window.location.replace('/');
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <List noPadding>
          <ListItem
            divider
            className={classes.listItem}
          >
            <CardTitle>
              GENERAL
            </CardTitle>
          </ListItem>
          <ListItem
            className={classes.listItem}
            button
            divider
            onClick={this.goToTermsOfService}
          >
            <ListItemText
              classes={{
                primary: classes.listItemText,
              }}
              primary='Terms of Service'
            />
            <ListItemIcon className={classes.iconContainer}>
              <ChevronRightIcon />
            </ListItemIcon>
          </ListItem>
          <ListItem
            className={classes.listItem}
            button
            onClick={this.logoutHandler}
          >
            <ListItemText
              classes={{
                primary: classes.logout,
              }}
              primary='LOGOUT'
            />
            <ListItemIcon className={classes.iconContainer}>
              <PowerSettingsNewIcon color='primary' />
            </ListItemIcon>
          </ListItem>
        </List>
      </Card>
    );
  }
}

export default withStyles(styles)(withRouter(SettingsGeneral));
