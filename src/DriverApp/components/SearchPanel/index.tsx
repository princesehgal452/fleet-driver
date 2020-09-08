import React from 'react';
import PropTypes from 'prop-types';
import * as momentPropTypes from 'react-moment-proptypes';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';
import firebase from 'firebase/app';
import 'firebase/auth';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import { AppBar, Divider, Grid, Paper } from '@material-ui/core';
import { change, formValueSelector, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import PickupDropOffLocation from '../LocationPanel/PickupDropOffLocation';
import FOGrid from '../../../components/FOGrid';
import { refactorLocation, refactorMileRate, refactorRadius, refactorWeightValue, buildURLBasedFilters } from '../../../utils/utility';
import ResultsFilter from '../ResultsFilter';
import DistanceFiltersField from './FormFields/DistanceFiltersField';
import { mixpanelSetSearchRALCitiesStates } from '../../../services/FOMixpanel';
import moment from 'moment';
import { DriverAppStore } from '../../store/DriverAppStore';


const formName = 'searchLoadsForm';

@inject('driverAppStore')
@observer
class SearchPanel extends React.Component {
  static propTypes = {
    driverAppStore: PropTypes.object,
    handleSubmit: PropTypes.func,
    onSearch: PropTypes.func,
    reset: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    loading: PropTypes.bool,
    collapsedSearchForm: PropTypes.bool,
    onExpanded: PropTypes.func,
    change: PropTypes.func,
    pickupDate: PropTypes.oneOfType([
      PropTypes.string,
      momentPropTypes.momentObj,
    ]),
    dropoffDate: PropTypes.oneOfType([
      PropTypes.string,
      momentPropTypes.momentObj,
    ]),
    pickupLocation: PropTypes.object,
    dropoffLocation: PropTypes.object,
    perMileRate: PropTypes.object,
    radius: PropTypes.object,
    weight: PropTypes.object,
    equipmentTypeList: PropTypes.arrayOf(PropTypes.string),
    onHistorySearchClick: PropTypes.func,
    type: PropTypes.string,
    onNearbyLoadsClick: PropTypes.func,
    recentSearches: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      minDate: null,
      CSQPickupLocation: null,
      CSQDropoffLocation: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    const {
      change: changeProp, pickupLocation, dropoffLocation, currentSearchQuery,
      perMileRate, radius, weight, pickupDate, dropoffDate, equipmentTypeList,
    } = nextProps;

    let CSQPickupLocation = null;
    let CSQDropoffLocation = null;
    if (pickupLocation && pickupLocation.address) {
      changeProp('pickupLocation', {
        ...pickupLocation,
        description: pickupLocation.address,
      });
    }

    if (!prevState.CSQPickupLocation && currentSearchQuery.pickupLocation && currentSearchQuery.pickupLocation.address) {
      changeProp('pickupLocation', {
        ...currentSearchQuery.pickupLocation,
        description: currentSearchQuery.pickupLocation.address,
      });
      CSQPickupLocation = currentSearchQuery.pickupLocation.address;
    }

    if (dropoffLocation && dropoffLocation.address) {
      changeProp('dropoffLocation', {
        ...dropoffLocation,
        description: dropoffLocation.address,
      });
    }

    if (!prevState.CSQDropoffLocation && currentSearchQuery && currentSearchQuery.dropoffLocation && currentSearchQuery.dropoffLocation.address) {
      changeProp('dropoffLocation', {
        ...currentSearchQuery.dropoffLocation,
        description: currentSearchQuery.dropoffLocation.address,
      });
      CSQDropoffLocation = currentSearchQuery.pickupLocation.address;
    }
    if (perMileRate) {
      if (perMileRate.price) {
        changeProp('perMileRate', perMileRate.price);
      } else {
        changeProp('perMileRate', perMileRate);
      }
    }
    if (radius) {
      if (radius.amount) {
        changeProp('radius', radius.amount);
      } else {
        changeProp('radius', radius);
      }
    }
    if (weight && (weight.low || weight.high)) {
      changeProp('weight', `${weight.low || 0},${weight.high || 0}`);
    }
    if (pickupDate) {
      changeProp('pickupDate', pickupDate);
    }
    if (dropoffDate) {
      changeProp('dropoffDate', dropoffDate);
    }
    if (Array.isArray(equipmentTypeList) && equipmentTypeList.length > 0) {
      changeProp('equipmentTypeList', equipmentTypeList.join());
    }
    return { CSQPickupLocation, CSQDropoffLocation };
  }

  submitHandler = (values) => {
    let submitValues = { ...values };
    const URLSearchParams = {};
    const { onSearch, history } = this.props;
    if (submitValues.pickupLocation && submitValues.pickupLocation.coordinates) {
      mixpanelSetSearchRALCitiesStates(submitValues.pickupLocation);
      submitValues.pickupLocation = refactorLocation(submitValues.pickupLocation);
      const { pickupLocation: { address, city, country, state, coordinates: { lat, lng } } } = submitValues;
      URLSearchParams['pickupAddress'] = address;
      URLSearchParams['pickupCity'] = city;
      URLSearchParams['pickupCountry'] = country;
      URLSearchParams['pickupState'] = state;
      URLSearchParams['pickupLat'] = lat;
      URLSearchParams['pickupLng'] = lng;
    } else {
      submitValues = omit(submitValues, 'pickupLocation');
    }
    if (submitValues.dropoffLocation && submitValues.dropoffLocation.coordinates) {
      mixpanelSetSearchRALCitiesStates(submitValues.dropoffLocation);
      submitValues.dropoffLocation = refactorLocation(submitValues.dropoffLocation);
      const { dropoffLocation: { address, city, country, state, coordinates: { lat, lng } } } = submitValues;
      URLSearchParams['dropoffAddress'] = address;
      URLSearchParams['dropoffCity'] = city;
      URLSearchParams['dropoffCountry'] = country;
      URLSearchParams['dropoffState'] = state;
      URLSearchParams['dropoffLat'] = lat;
      URLSearchParams['dropoffLng'] = lng;
    } else {
      submitValues = omit(submitValues, 'dropoffLocation');
    }
    if (submitValues.equipmentTypeList) {
      submitValues.equipmentTypeList = (typeof submitValues.equipmentTypeList === 'string')
        ? submitValues.equipmentTypeList.split(',') : submitValues.equipmentTypeList;
      URLSearchParams['equipmentTypeList'] = submitValues.equipmentTypeList;
    } else {
      submitValues = omit(submitValues, 'equipmentTypeList');
    }
    if (submitValues.perMileRate) {
      submitValues.perMileRate = refactorMileRate(submitValues.perMileRate);
      const { perMileRate: { price, currency } } = submitValues;
      URLSearchParams['perMileRatePrice'] = price;
      URLSearchParams['perMileRateCurrency'] = currency;

    } else {
      submitValues = omit(submitValues, 'perMileRate');
    }
    if (submitValues.radius) {
      if (submitValues.radius.amount) {
        submitValues.radius = refactorRadius(submitValues.radius.amount);
      } else {
        submitValues.radius = refactorRadius(values.radius);
      }
    } else {
      submitValues.radius = refactorRadius('50');
    }
    const { radius: { amount, unit } } = submitValues;
    URLSearchParams['radiusAmount'] = amount;
    URLSearchParams['radiusUnit'] = unit;

    if (submitValues.weight && submitValues.weight !== 'any') {
      submitValues.weight = refactorWeightValue(submitValues.weight);
      const { weight: { low, high } } = submitValues;
      if (low) {
        URLSearchParams['weightLow'] = low;
      }
      URLSearchParams['weightHigh'] = high;
    } else {
      submitValues = omit(submitValues, 'weight');
    }
    if (!submitValues.pickupDate) {
      submitValues = omit(submitValues, 'pickupDate');
    } else {
      URLSearchParams['pickupDate'] = submitValues.pickupDate.unix();
    }
    if (!submitValues.dropoffDate) {
      submitValues = omit(submitValues, 'dropoffDate');
    }

    if (!submitValues.laneSize) {
      submitValues = omit(submitValues, 'laneSize');
    } else {
      URLSearchParams['laneSize'] = submitValues.laneSize;
    }

    const searchString = qs.stringify(URLSearchParams);
    history.push({
      search: searchString,
    });
    onSearch(submitValues);
  };

  componentDidUpdate(prevProps) {
    const { submit, handleSubmit } = this.props;
    if ((
      (this.props.pickupLocation && this.props.pickupLocation.coordinates) !== (prevProps.pickupLocation && prevProps.pickupLocation.coordinates)) ||
      ((this.props.dropoffLocation && this.props.dropoffLocation.coordinates) !== (prevProps.dropoffLocation && prevProps.dropoffLocation.coordinates)) ||
      (this.props.equipmentTypeList !== prevProps.equipmentTypeList) ||
      (this.props.perMileRate !== prevProps.perMileRate) ||
      (this.props.radius !== prevProps.radius && prevProps.radius) ||
      (this.props.weight !== prevProps.weight) ||
      (this.props.pickupDate !== prevProps.pickupDate) ||
      (this.props.laneSize !== prevProps.laneSize)
    ) {
      if (this.props.pickupLocation && this.props.pickupLocation.coordinates) {
        this.programmaticFormSubmit();
      }
    }
  }

  programmaticFormSubmit = async () => {
    if (this.props.pickupLocation && this.props.pickupLocation.coordinates) {
      const submitter = await this.props.handleSubmit(this.submitHandler);
      submitter(); // submits
    }
  };

  render() {
    const { pagination, onHistorySearchClick, dropoffLocation, type, onNearbyLoadsClick, recentSearches, driverAppStore } = this.props;
    const { configStore: { isGeotab} } = driverAppStore as DriverAppStore;

    return (
      <form>
        <AppBar elevation={0} position='static' color={isGeotab ? 'secondary' : 'primary'}>
          <FOGrid vSpacing={0.5}>
            <Grid item xs={12}>
              <PickupDropOffLocation
                filled
                dropoffOptional
                noClick
                onHistorySearchClick={onHistorySearchClick}
                dropoffLocationSelected={Boolean(dropoffLocation)}
                onNearbyLoadsClick={onNearbyLoadsClick}
                recentSearches={recentSearches}
              />
            </Grid>
            <Grid item xs={12}>
              <DistanceFiltersField />
            </Grid>
          </FOGrid>
        </AppBar>
        <Divider />
        <Paper square elevation={0}>
          <ResultsFilter resultType='Local' dialogTitle='Back' pagination={pagination} type={type} />
        </Paper>
      </form>
    );
  }
}

const SearchPanelForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
})(SearchPanel);

const selector = formValueSelector(formName);
const getInitialValues = (props) => {
  const { location: { search } } = props;
  const URLSearchParams = qs.parse(search);
  const searchParams = buildURLBasedFilters(URLSearchParams);
  const defaultValues = {
    radius: refactorRadius(50),
    weight: 'any',
    equipmentTypeList: '',
  };
  const { currentUser } = firebase.auth();
  if (currentUser && currentUser['foUser']?.equipmentTypeList?.length > 0) {
    defaultValues['equipmentTypeList'] = currentUser['foUser'].equipmentTypeList;
  }

  return { ...defaultValues, ...searchParams };
};

const SearchPanelConnect = connect(
  (state, ownProps) => ({
    initialValues: getInitialValues(ownProps),
    pickupLocation: selector(state, 'pickupLocation'),
    dropoffLocation: selector(state, 'dropoffLocation'),
    equipmentTypeList: selector(state, 'equipmentTypeList'),
    perMileRate: selector(state, 'perMileRate'),
    radius: selector(state, 'radius'),
    weight: selector(state, 'weight'),
    dropoffDate: selector(state, 'dropoffDate'),
    pickupDate: selector(state, 'pickupDate'),
    laneSize: selector(state, 'laneSize'),
  }),
  dispatch => bindActionCreators({ change }, dispatch),
  null,
  { forwardRef: true },
)(SearchPanelForm);

export default withRouter(SearchPanelConnect);
