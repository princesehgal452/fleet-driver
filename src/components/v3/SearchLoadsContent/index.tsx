import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';

import SearchLoadsContentForm from './SearchLoadsContentForm';

interface ISearchLoadsContentProps {
  selectedOperatingLane?: IOperatingLane;
  isDrawerOpen: boolean;
  prefillSearchQuery?;
  reflectDrawerState: (newState: boolean) => void;
}

const SearchLoadsContent = ({ selectedOperatingLane, isDrawerOpen, reflectDrawerState, prefillSearchQuery }: ISearchLoadsContentProps) => {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [operatingLane, setOperatingLane] = useState(selectedOperatingLane);

  const refactorLane = useCallback((currentLocation) => {
    return new Promise((resolve, reject) => {
      const address = `${currentLocation.city}, ${currentLocation.state}, ${currentLocation.country}`;
      const geocoder = new google.maps.Geocoder();

      geocoder.geocode({ 'address': address }, (geocodeResults, status) => {
        if (status === 'OK' && geocodeResults && geocodeResults.length > 0) {
          resolve({
            ...currentLocation,
            description: geocodeResults[0].formatted_address,
            coordinates: {
              lat: geocodeResults[0].geometry.location.lat(),
              lng: geocodeResults[0].geometry.location.lng(),
            },
          });
        } else {
          reject(status);
        }
      });
    });
  }, []);

  useEffect(() => {
    async function formatAddress() {
      if (selectedOperatingLane?.pickup && selectedOperatingLane?.dropoff) {
        let operatingLaneTmp = { ...selectedOperatingLane };
        operatingLaneTmp.pickup = await refactorLane(operatingLaneTmp.pickup);
        operatingLaneTmp.dropoff = await refactorLane(operatingLaneTmp.dropoff);
        setLoading(false);
        setOperatingLane(operatingLaneTmp);
      }
    }
    if (selectedOperatingLane) {
      setLoading(true);
      formatAddress();
    } else {
      setOperatingLane(selectedOperatingLane);
    }
  }, [selectedOperatingLane, setOperatingLane, setLoading]);

  return (
    <Box height={theme.custom.constants.fullHeight}>
      <SearchLoadsContentForm
        loadingSelectedLane={loading}
        selectedOperatingLane={operatingLane}
        drawerClosed={!isDrawerOpen}
        reflectDrawerState={reflectDrawerState}
        prefillSearchQuery={prefillSearchQuery}
      />
    </Box>
  );
};

export default SearchLoadsContent;
