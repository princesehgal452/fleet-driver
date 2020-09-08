import React, { useCallback, ReactNode } from 'react';
import { observer } from 'mobx-react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { LocationOnOutlined } from '@material-ui/icons';

import { downloadCurrentLocation } from 'services/APIServices/GoogleLocationApi';
import { Pagination } from 'models/interfaces/shared/IPagination';

import FOInfiniteLoader from 'components/FOInfiniteLoader';
import FOReduxLocationField from 'components/FOReduxFields/FOReduxLocationField';

import { SearchSteps } from '../../SearchLoadsContent/SearchLoadsContentForm';
import LocationHistoryItem from '../ReduxPickupDropoffLocationSet/LocationHistoryItem';


interface ILocationSetProps {
  locationField;
  change: (fieldName: string, value) => void;
  downloadPastLocations: (pageNumber: number, args?) => Promise<void>;
  downloadNextResults: () => void;
  programmaticFormSubmit: (stepNumber?: SearchSteps) => () => void;
  pagination: Pagination;
  pastLocationLoading: boolean;
  showNearby?: boolean;
  showSkip?: boolean;
  recentLocations;
  locationFieldValue;
  startAdornmentIcon?: ReactNode;
}

const LocationSet = observer(({
  change, downloadPastLocations, pastLocationLoading, showNearby, showSkip, programmaticFormSubmit,
  locationFieldValue, pagination, downloadNextResults, recentLocations, locationField, startAdornmentIcon
}: ILocationSetProps) => {
  const locationClickHandler = useCallback((newPickupLocation) => {
    change(locationField.name, {
      ...locationFieldValue,
      description: newPickupLocation.address,
      coordinates: newPickupLocation.coordinates,
    });
    setTimeout(programmaticFormSubmit(), 200);
  }, []);

  const nearbyButtonClickHandler = useCallback(async () => {
    const nearbyLocation = await downloadCurrentLocation();
    locationClickHandler(nearbyLocation);
  }, []);

  return (
    <div>
      <FOReduxLocationField
        nearbyButtonClickHandler={nearbyButtonClickHandler}
        programmaticFormSubmit={programmaticFormSubmit()}
        locationField={locationField}
        placeholder='Enter City'
        showNearby={showNearby}
        showSkip={showSkip}
        startAdornmentIcon={startAdornmentIcon}
      />
      <List disablePadding>
        <FOInfiniteLoader
          maxResults={5}
          downloadResults={downloadPastLocations}
          loading={pastLocationLoading}
          error={null}
          resultsCount={recentLocations.length}
          getMoreResults={downloadNextResults}
          ErrorComponent={<div />}
          LoadingMockComponent={<div />}
          NoResultsComponent={<div />}
          ResultsComponent={(
            <div>
              {recentLocations.slice(0, 5).map((recentLocation) => (
                <LocationHistoryItem
                  onClick={locationClickHandler}
                  location={recentLocation}
                />
              ))}
            </div>
          )}
          pagination={pagination}
        />
        {showNearby && (
          <ListItem button onClick={nearbyButtonClickHandler}>
            <ListItemIcon>
              <LocationOnOutlined color='secondary' />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography color='secondary'>
                  Search Nearby Shipments
                </Typography>
              )}
              disableTypography
            />
          </ListItem>
        )}
      </List>
    </div>
  );
});

export default LocationSet;
