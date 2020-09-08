import React from 'react';
import { inject, observer } from 'mobx-react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ROUTES, Tutorial } from '../../../services/constants';
import { DriverAppStore } from '../../store/DriverAppStore';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import SettingsForm from './components/SettingsForm';
import FOAppBarPage from '../../../components/FOAppBar/FOAppBarPage';
import DocumentSendButton from '../../components/DocumentSendButton';
import DocumentsCarousel from '../../components/DocumentsCarousel';
import TermsAndConditionsButton from '../../../Auth/AdditionalInfoPage/TermsAndConditionsButton';
import SettingsDivider from './components/SettingsDivider';
import CommunicationsPreferences from './components/CommunicationsPreferences';
import SettingsTitle from './components/SettingsTitle';
import EditIconButton from './components/EditIconButton';
import SettingsHeader from './components/SettingsHeader';
import Tutorials from '../../components/Tutorials';
import OperatingLanes from './components/OperatingLanes';
import SettingsContent from './components/SettingsContent';
import ShortCode from './components/ShortCode';

import './DriverSettingsPage.scss';


const styles = (theme: Theme) => ({
  carouselContainer: {
    display: 'inline-grid',
  },
});

type IDriverSettingsPageProps = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class DriverSettingsPage extends React.Component<IDriverSettingsPageProps> {
  state = {
    carouselClicked: false,
  };

  logoutHandler = async () => {
    const { driverAppStore } = this.props;
    const { userStore: { setLogin } } = driverAppStore as DriverAppStore;
    await firebase.auth().signOut();
    setLogin(false);
    window.location.replace('/');
  };

  toggleDocumentsEdit = () => {
    const { history, match, driverAppStore } = this.props;
    const { userStore: { isWebview, queryEmail, queryAuthToken } } = driverAppStore as DriverAppStore;
    if (isWebview) {
      window.open(`${match.url}/${ROUTES.DOCUMENTS_SHOW}?email=${queryEmail}&authToken=${queryAuthToken}`);
    } else {
      history.push(`${match.url}/${ROUTES.DOCUMENTS_SHOW}`);
    }
  };

  handleCarouselItemClick = () => {
    this.setState({ carouselClicked: true });
  };

  render() {
    const { driverAppStore, classes } = this.props;
    const { userStore, configStore: { isGeotab } } = driverAppStore as DriverAppStore;
    const { carouselClicked } = this.state;

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <FOAppBarPage pageTitle='Settings' showBackButton hideSettingsButton />
            <div className='driver-page-content'>
              <Paper>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Grid container direction='column'>
                      <SettingsForm />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <SettingsDivider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction='column'>
                      <SettingsHeader>
                        <Grid item>
                          <SettingsTitle>
                            Documents
                          </SettingsTitle>
                        </Grid>
                        <Grid item>
                          <EditIconButton onClick={this.toggleDocumentsEdit} />
                        </Grid>
                      </SettingsHeader>
                      <Grid container className={classes.carouselContainer}>
                        <DocumentsCarousel
                          userStore={userStore}
                          handleCarouselItemClick={this.handleCarouselItemClick}
                        />
                      </Grid>
                      <SettingsContent>
                        <Grid container>
                          <Grid item xs={12} md={4}>
                            <DocumentSendButton
                              userStore={userStore}
                              showSend={carouselClicked}
                              sendText='Send documents'
                            />
                          </Grid>
                        </Grid>
                      </SettingsContent>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <SettingsDivider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction='column'>
                      <OperatingLanes />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <SettingsDivider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction='column'>
                      <CommunicationsPreferences />
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction='column'>
                      <SettingsHeader>
                        <Grid item>
                          <SettingsTitle>
                            Send Tracking Link
                          </SettingsTitle>
                        </Grid>
                      </SettingsHeader>
                      <SettingsContent>
                        <ShortCode showTooltip={true} />
                      </SettingsContent>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <SettingsDivider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction='column'>
                      <SettingsHeader>
                        <SettingsTitle>
                          General
                        </SettingsTitle>
                      </SettingsHeader>
                      <Grid container direction='column'>
                        <ListItem button divider>
                          <TermsAndConditionsButton />
                        </ListItem>
                        <a href='mailto:freight@bigroad.com?subject=Feedback Or Help Needed'>
                          <ListItem button divider>
                            <Typography>Send Feedback</Typography>
                          </ListItem>
                        </a>
                        {
                          !isGeotab && (
                          <ListItem button divider className='logOut' onClick={this.logoutHandler}>
                            <Typography>Log Out</Typography>
                          </ListItem>
                          )
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          </Grid>
        </Grid>
        <Tutorials tutorialKey={Tutorial.SETTINGS_PAGE} />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(DriverSettingsPage));
