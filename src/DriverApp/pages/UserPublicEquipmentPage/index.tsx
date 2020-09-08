import qs from 'query-string';
import React from 'react';
import { observer, inject } from 'mobx-react';
import { withStyles, Theme, WithStyles, Dialog, Grid } from '@material-ui/core';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';

import { DriverAppStore } from '../../store/DriverAppStore';
import FOTransitionUp from '../../../components/FOTransitionUp';
import TruckSelectContent from '../../../components/TruckSelectContent';


const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  grid: {
    padding: theme.spacing(2),
  },
  truckButton: {
    height: theme.spacing(16),
    margin: '0 auto',
  },
  divider: {
    marginTop: '25px',
  },
  TruckEquipmentSelected: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    transition: theme.transitions.create(['color', 'backgroundColor'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

type paramType = string | string[] | undefined;

interface ITruckEquipmentSelectState {
  email: paramType;
  requestid: paramType;
  selectValue: string;
}

type IUserPublicEquipmentPageProps = RouteComponentProps & IDriverAppStore;

@inject('driverAppStore')
@observer
class UserPublicEquipmentPage extends React.Component<IUserPublicEquipmentPageProps & WithStyles<typeof styles>, ITruckEquipmentSelectState> {
  state = {
    email: '',
    requestid: '',
    selectValue: '',
  };

  componentDidMount() {
    const { location: { search } } = this.props;
    const { email, requestid, selected_equipment: selectedEquipmentType } = qs.parse(search);

    if (email && requestid) {
      this.setState({ email, requestid, selectValue: selectedEquipmentType as string });
    }
  }

  handleTruckButtonClick = (value) => () => {
    this.setState({ selectValue: value });
  };

  handleSelectChange = (event) => {
    this.handleTruckButtonClick(event.target.value)();
  };

  handleSave = () => {
    const { email, requestid, selectValue } = this.state;
    const { driverAppStore } = this.props;
    const { publicStore: { updateEquipmentType } } = driverAppStore as DriverAppStore;
    updateEquipmentType(email, requestid, selectValue);
  };

  resetState = () => {
    this.setState({ selectValue: '' });
  };

  render() {
    const { selectValue } = this.state;
    const { driverAppStore } = this.props;
    const { publicStore: { loading } } = driverAppStore as DriverAppStore;
    return (
      <Grid container direction='column' alignItems='center'>
        <Grid item container xs={11} sm={9} lg={5}>
          <TruckSelectContent
            title='Equipment Update'
            showClear={false}
            selectValue={selectValue}
            selectHandler={this.handleSelectChange}
            truckButtonClickHandler={this.handleTruckButtonClick}
            onClose={this.handleSave}
            loading={loading}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(withRouter(UserPublicEquipmentPage));
