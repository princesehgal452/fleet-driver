import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';

import Load from 'models/dataStructures/Load';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';

import LoadCard from 'components/v3/LoadCardV3';
import LoadCompanyLogo from 'components/v3/LoadCardV3/LoadCompanyLogo';
import { mapHeight, styles } from './styles';
import MatchDetailMap from '../MatchDetailMap';

interface IMatchDetailContentOwnProps {
  load?: Load;
}

type IMatchDetailContentProps = IMatchDetailContentOwnProps & RouteComponentProps & IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class MatchDetailContent extends React.Component<IMatchDetailContentProps> {

  render() {
    const { driverAppStore, classes, load } = this.props;
    const { configStore: { isAisin } } = driverAppStore as DriverAppStore;
    return (
      <Box height='100%' position='relative'>
        <LoadCompanyLogo load={load} className={classes.certifiedLogo} />
        <Box className={classes.map}>
          {((!load) || (load.aisin.loading))
            ? (
              <div className={classes.mapLoading}><CircularProgress /></div>
            ) : (
              <MatchDetailMap load={load} mapHeight={mapHeight} isAisin={isAisin} />
            )}
        </Box>
        <LoadCard
          load={load}
          isDetailsView
        />
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(MatchDetailContent));
