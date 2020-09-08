import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import SwipeableViews from 'react-swipeable-views';
import { Pagination } from 'models/interfaces/shared/IPagination';
import { SearchSteps } from '../../SearchLoadsContent/SearchLoadsContentForm';
import LocationSet from '../LocationSet';

const fullHeight = {
  height: '100%',
};
interface IReduxPickupDropoffLocationSetProps {
  step: number;
  pickupLocationField;
  dropoffLocationField;
  programmaticFormSubmit: (stepNumber?: SearchSteps) => () => void;
  change: (fieldName: string, value) => void;
  downloadPastLocations: (pageNumber: number, args?) => Promise<void>;
  downloadNextResults: () => void;
  pagination: Pagination;
  pastLocationLoading: boolean;
  extraSteps?: ReactNode;
  recentPickupLocations;
  recentDropoffLocations;
  pickupLocationFieldValue;
  dropoffLocationFieldValue;
  showNearBy?: boolean;
  showSkip?: boolean;
  pickupLocationAddonStart?: ReactNode;
  dropoffLocationAddonStart?: ReactNode;
}

const ReduxPickupDropoffLocationSet = observer(({
  change,
  pickupLocationField,
  downloadPastLocations,
  step,
  extraSteps = [],
  pickupLocationFieldValue,
  dropoffLocationFieldValue,
  dropoffLocationField,
  recentDropoffLocations,
  programmaticFormSubmit,
  pagination,
  downloadNextResults,
  recentPickupLocations,
  pastLocationLoading,
  showNearBy,
  showSkip,
  pickupLocationAddonStart,
  dropoffLocationAddonStart,
}: IReduxPickupDropoffLocationSetProps) => (
  <SwipeableViews
    index={step}
    disabled
    containerStyle={fullHeight}
    style={fullHeight}
  >
    <LocationSet
      locationFieldValue={pickupLocationFieldValue}
      programmaticFormSubmit={programmaticFormSubmit}
      change={change}
      recentLocations={recentPickupLocations}
      downloadNextResults={downloadNextResults}
      showNearby={showNearBy}
      pagination={pagination}
      pastLocationLoading={pastLocationLoading}
      locationField={pickupLocationField}
      downloadPastLocations={downloadPastLocations}
      startAdornmentIcon={pickupLocationAddonStart}
    />
    <LocationSet
      locationFieldValue={dropoffLocationFieldValue}
      programmaticFormSubmit={programmaticFormSubmit}
      change={change}
      recentLocations={recentDropoffLocations}
      downloadNextResults={downloadNextResults}
      showSkip={showSkip}
      pagination={pagination}
      pastLocationLoading={pastLocationLoading}
      locationField={dropoffLocationField}
      downloadPastLocations={downloadPastLocations}
      startAdornmentIcon={dropoffLocationAddonStart}
    />
    {extraSteps}
  </SwipeableViews>
));

export default ReduxPickupDropoffLocationSet;
