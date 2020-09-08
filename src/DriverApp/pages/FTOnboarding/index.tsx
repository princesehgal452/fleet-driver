import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import { Box } from '@material-ui/core';
import CompanyDetails from './CompanyDetails';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import DriverDetails from './DriverDetails';

const styles = (theme: Theme) => ({});

type IFTOnboardingProps = IDriverAppStore &
  RouteComponentProps &
  WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class FTOnboarding extends React.Component<IFTOnboardingProps> {

  handleSubmit = async (values) => {
    const { driverAppStore, match } = this.props;
    const { userStore: { patchUser, FOUser } } = driverAppStore as DriverAppStore;
    if (FOUser.firstLogin) {
      patchUser({ firstLogin: false });
    }
    try {
      await patchUser(values);
      if(match.params.step === 'companyInfo') {
        this.props.history.push('/ftOnboarding/driverSelect');
      } else {
        this.props.history.push('/driver/view/loads/');
      }
    } catch (error) {
      // this.setError(error.message);
    }
  };

  render() {
    const { driverAppStore, match } = this.props;

    const { userStore, configStore } = driverAppStore as DriverAppStore;

    return (
      <Box>
        {match.params.step === 'companyInfo' && (
          <CompanyDetails onSubmit={this.handleSubmit} />
        )}
        {match.params.step === 'driverSelect' && (
          <DriverDetails userStore={userStore} configStore={configStore} handleSubmit={this.handleSubmit}/>
        )}
      </Box>
    );
  }
}

export default withRouter(withStyles(styles)(FTOnboarding));
