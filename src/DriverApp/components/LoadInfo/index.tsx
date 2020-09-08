import React from 'react';
import { inject, observer } from 'mobx-react';
import { isObservableArray } from 'mobx';
import { Skeleton } from '@material-ui/lab';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { DriverAppStore } from '../../store/DriverAppStore';

import './LoadInfo.scss';


@inject('driverAppStore')
@observer
export class LoadInfo extends React.Component {
  static propTypes = {
    radius: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    distance: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    equipmentTypeList: PropTypes.any,
    driverAppStore: PropTypes.instanceOf(DriverAppStore),
    distanceLoading: PropTypes.bool,
  };

  parseEquipmentTypeList = (equipmentTypeList) => {
    if (!equipmentTypeList || equipmentTypeList?.length === 0) {
      return '-';
    }
    if (Array.isArray(equipmentTypeList) || isObservableArray(equipmentTypeList)) {
      return equipmentTypeList.join(', ');
    }
    return equipmentTypeList;
  };

  parseRadius = (radius) => {
    if (radius?.amount) {
      return `${radius.amount} ${radius.unit}`;
    }
    if (radius === '-') {
      return '';
    }
    if (radius) {
      return `${radius}`;
    }
    return '';
  };

  render() {
    const { radius, distance, equipmentTypeList, distanceLoading, driverAppStore } = this.props;
    const { userStore: { dispatcher } } = driverAppStore as DriverAppStore;
    const equipmentsParsed = this.parseEquipmentTypeList(equipmentTypeList);
    const deadheadParsed = this.parseRadius(radius);
    const distanceParsed = this.parseRadius(distance);
    return (
      <Grid container spacing={1} justify='space-between'>
        <Grid item>
          <Typography variant='caption'>{equipmentsParsed}</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant='caption'
          >
            {distanceLoading ? (
              <Skeleton width={70} />
            ) : (
              <>
                {distanceParsed ? distanceParsed : ''}{(!dispatcher && distanceParsed && deadheadParsed ? ' • ' : '')}{!dispatcher && (deadheadParsed ? (`${deadheadParsed}`) : '')}
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default LoadInfo;
