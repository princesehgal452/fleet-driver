import React from 'react';
import { observer } from 'mobx-react';
import { Skeleton } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MatchDetailInfoCol from '../../../../../../../pages/DriverMatchDetailsPage/components/MatchDetailInfoCol';
import Load from '../../../../../../../../models/dataStructures/Load';
import { DriverTruck } from '../../../../../../../../models/dataStructures/DriverTruck';
import { UserStore } from '../../../../../../../store/UserStore';
import { FOUser } from '../../../../../../../../models/dataStructures/FOUser';


interface IDispatchableDriversListItemOwnProps {
  userStore: UserStore;
  driverTruck: DriverTruck;
  load: Load;
}

@observer
class DispatchableDriversListItem extends React.Component<IDispatchableDriversListItemOwnProps> {
  componentDidMount() {
    const { driverTruck: { calculateDriverDeadheadInMiles }, load } = this.props;
    calculateDriverDeadheadInMiles({ lat: load.pickups[0].lat, lng: load.pickups[0].lng });
  }

  getName = (driverTruck: DriverTruck, user: FOUser) => {
    if (user.truck && driverTruck.truckId === user.truck.truckId) {
      return 'Assign to me';
    }
    return `${driverTruck.firstName} ${driverTruck.lastName}`;
  };

  render() {
    const { userStore: { FOUser }, driverTruck } = this.props;
    const { equipmentTypeList, deadhead, loading } = driverTruck;
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h6'>
            {this.getName(driverTruck, FOUser)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <MatchDetailInfoCol
            title='Deadhead'
            value={loading ? <Skeleton /> : deadhead}
          />
        </Grid>
        <Grid item xs={6}>
          <MatchDetailInfoCol
            title='Equipment Type'
            value={equipmentTypeList[0]}
          />
        </Grid>
      </Grid>
    );
  }
}

export default DispatchableDriversListItem;
