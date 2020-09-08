import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { mixpanelTrack } from '../../../../services/FOMixpanel';
import { MIXPANEL_EVENTS, MIXPANEL_KEYS } from '../../../../services/constants';
import DriverSearchNoResultsDesktop from './DriverSearchNoResultsDesktop';
import CollectionsStore from '../../../store/CollectionsStore';
import TruckStore from '../../../store/TruckStore';


const getAddressString = (location) => {
  if (location) {
    const { address, city, country, state } = location;
    if (city && state) {
      return `${city}, ${state}`;
    }
    if (city) {
      return city;
    }
    if (country) {
      return country;
    }
    return address;
  }
};

const sendLoadRequest = (setRequestedLoad: Dispatch<SetStateAction<boolean>>, previousQuery, postMyTruck: (...args) => Promise<void>, requestedLoad) => async () => {
  let normalizePostQuery = { ...previousQuery };
  if (normalizePostQuery.pickupLocation && normalizePostQuery.pickupLocation.address) {
    normalizePostQuery = {
      ...normalizePostQuery,
      pickup: {
        ...normalizePostQuery.pickupLocation,
        address: normalizePostQuery.pickupLocation && normalizePostQuery.pickupLocation.address,
      },
    };
  }
  if (normalizePostQuery.dropoffLocation && normalizePostQuery.dropoffLocation.address) {
    normalizePostQuery = {
      ...normalizePostQuery,
      dropoff: {
        ...normalizePostQuery.dropoffLocation,
        address: normalizePostQuery.dropoffLocation && normalizePostQuery.dropoffLocation.address,
      },
    };
  }
  // Add available date.
  normalizePostQuery = {
    ...normalizePostQuery,
    availableDate: normalizePostQuery.pickupDate ? normalizePostQuery.pickupDate : new Date().toISOString(),
  };
  try {
    await postMyTruck(normalizePostQuery);
    mixpanelTrack(MIXPANEL_EVENTS.RAL, {
      Location: 'Search Page No Result Click',
      [MIXPANEL_KEYS.PICKUP_LOCATION]: previousQuery.pickupLocation && previousQuery.pickupLocation.address,
      [MIXPANEL_KEYS.DROPOFF_LOCATION]: previousQuery.dropoffLocation && previousQuery.dropoffLocation.dropoffLocation,
      [MIXPANEL_KEYS.EQUIPMENT_LIST]: previousQuery.equipmentTypeList,
    });
    setRequestedLoad(true);
  } catch (error) {
  }
};

const trackNoResults = () => {
  console.log('no Results');
  mixpanelTrack(MIXPANEL_EVENTS.NO_RESULTS, {
    Location: 'Search Results',
  });
};

interface IDriverSearchNoResultsOwnProps {
  searchResultsStore: CollectionsStore;
  truckStore: TruckStore;
}

type IDriverSearchNoResultsProps = IDriverSearchNoResultsOwnProps;

const DriverSearchNoResults = observer(({ searchResultsStore: { previousQuery }, truckStore: { postMyTruck, loading } }: IDriverSearchNoResultsProps) => {
  const [requestedLoad, setRequestedLoad] = useState(false);

  const pickupAddress = getAddressString(previousQuery && previousQuery.pickupLocation);
  const dropoffAddress = getAddressString(previousQuery && previousQuery.dropoffLocation);

  useEffect(trackNoResults, []);

  return (
    <>
      {/*<Hidden smDown>*/}
      <DriverSearchNoResultsDesktop
        requestedLoad={requestedLoad}
        pickupAddress={pickupAddress}
        dropoffAddress={dropoffAddress}
        onRequestLoad={sendLoadRequest(setRequestedLoad, previousQuery, postMyTruck, requestedLoad)}
        loading={loading}
      />
      {/*</Hidden>*/}
      {/*<Hidden mdUp>*/}
      {/*<DriverSearchNoResultsMobile*/}
      {/*requestedLoad={requestedLoad}*/}
      {/*pickupAddress={pickupAddress}*/}
      {/*dropoffAddress={dropoffAddress}*/}
      {/*onRequestLoad={sendLoadRequest(setRequestedLoad, previousQuery, postMyTruck, requestedLoad)}*/}
      {/*loading={loading}*/}
      {/*/>*/}
      {/*</Hidden>*/}
    </>
  );
});

export default DriverSearchNoResults;
