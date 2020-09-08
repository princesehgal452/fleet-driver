import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box, Badge } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import FOAppBar from 'components/v3/FOAppBar';
import LoadsHorizontalListV3 from 'components/v3/LoadsHorizontalListV3';
import PageSubtitle from 'components/v3/PageSubtitle';
import { parseAddressAndRefactorLocation } from 'utils/utility';
import RALMatchesLoads from './RALMatchesLoads';
import styles from './styles';
import RequestedLoadsList from 'pages/RequestLoadV3/RequestedLoadsList';

type IRequestDetailsLoadV3Props = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

interface IRequestDetailsLoadV3State {
  pageTitle: string;
  ralId: string;
}

@inject('driverAppStore')
@observer
class RequestDetailsLoadV3 extends React.Component<IRequestDetailsLoadV3Props, IRequestDetailsLoadV3State> {
  constructor(props: IRequestDetailsLoadV3Props) {
    super(props);
    this.state = {
      pageTitle: '',
      ralId: '',
    };
  };

  componentDidMount() {
    const { match: { params: { ralId } } } = this.props;
    this.downloadAllDetails(ralId);
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { ralId } } } = this.props;
    if (prevProps.match.params.ralId !== ralId) {
      this.downloadAllDetails(ralId);
    }
  }

  downloadAllDetails = (ralId) => {
    this.setState({ ralId }, () => {
      this.downloadRALMatches();
      this.downloadRequests();
    });
  };

  downloadRequests = async () => {
    const { ralId } = this.state;
    const { driverAppStore } = this.props;
    const { truckStore: { postedTrucks: { downloadResults, results } } } = driverAppStore as DriverAppStore;
    if (results.length === 0) {
      await downloadResults();
    }
    const selectedRequest = results.filter((obj) => (obj.id === ralId))[0];
    if (selectedRequest) {
      this.getFormattedTitle(selectedRequest);
    }
  };

  downloadRALMatches = () => {
    const { ralId } = this.state;
    const { driverAppStore } = this.props;
    const { matchStore: { downloadRALMatches } } = driverAppStore as DriverAppStore;
    downloadRALMatches(ralId);
  };

  getFormattedTitle = async (selectedRequest) => {
    const pickupParsed = await parseAddressAndRefactorLocation(selectedRequest.pickup, true);
    const dropoffParsed = await parseAddressAndRefactorLocation(selectedRequest.dropoff, true);
    let pageTitle = pickupParsed.city;
    if (Boolean(dropoffParsed.city)) {
      pageTitle = pageTitle.concat(` to ${dropoffParsed.city}`);
    } else {
      pageTitle = pageTitle.concat(' to Anywhere');
    }
    this.setState({ pageTitle });
  };

  redirectToRALDetails = (ralId: string) => () => {
    const { history } = this.props;
    history.replace(`/driver/requestLoadDetailsV3/${ralId}`);
  };

  renderTitleNode = (count) => {
    const { pageTitle } = this.state;
    const { classes } = this.props;
    if (!Boolean(pageTitle)) {
      this.downloadRequests();
    }
    return (
      <>
        {pageTitle}
        <Badge badgeContent={count} classes={{ badge: classes.countBadge }} />
      </>
    );
  };

  render() {
    const { ralId } = this.state;
    const { driverAppStore, classes } = this.props;
    const { matchStore: { RALMatches, loading } } = driverAppStore as DriverAppStore;
    return (
      <Box className={classes.root}>
        <FOAppBar
          position='static'
          pageTitle='Loads you Requested'
          showBackButton
        />
        <PageSubtitle py={1} px={2} title={this.renderTitleNode(RALMatches.length)} />
        <Box p={2}>
          <RALMatchesLoads loading={loading} ralMatches={RALMatches} />
        </Box>
        <Box className={classes.horizontalListContainer}>
          <RequestedLoadsList
            title='Other Requests'
            handleLoadSelect={this.redirectToRALDetails}
            ralId={ralId}
          />
        </Box>
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(RequestDetailsLoadV3));
