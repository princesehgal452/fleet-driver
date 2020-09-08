import React, { memo } from 'react';
import 'firebase/auth';
import { Grid, Hidden } from '@material-ui/core';
import PickupDropOffLocation from '../LocationPanel/PickupDropOffLocation';
import FOGrid from '../../../components/FOGrid';
import PostTruckPanelAdditional from './PostTruckPanelAdditional';

import './PostTruckPanel.scss';


interface IPostTruckPanelProps {
  onExpanded: () => void;
  validateDates: (event, newValue) => void;
  clearValues: () => void;
  setNearbyLocationRAL: () => void;
  pristine: boolean;
  submitting?: boolean;
  collapsedSearchForm: boolean;
  loading: boolean;
  minDate?: Date;
  dispatcher?: boolean;
}

const PostTruckPanel = memo(({
  pristine, submitting, collapsedSearchForm, loading, dispatcher,
  minDate, validateDates, clearValues, onExpanded, setNearbyLocationRAL,
}: IPostTruckPanelProps) => (
  <Grid container className='post-truck-section'>
    <Grid item xs={12}>
      <FOGrid vSpacing={0.5}>
        <Grid item xs={12}>
          <PickupDropOffLocation filled onNearbyLoadsClick={setNearbyLocationRAL} />
        </Grid>
      </FOGrid>
    </Grid>
    {dispatcher ? (
      <Hidden mdUp implementation='css'>
        <PostTruckPanelAdditional
          onExpanded={onExpanded}
          loading={loading}
          clearValues={clearValues}
          pristine={pristine}
          submitting={submitting}
          validateDates={validateDates}
          minDate={minDate}
          collapsedSearchForm={collapsedSearchForm}
        />
      </Hidden>
    ) : (
      <PostTruckPanelAdditional
        onExpanded={onExpanded}
        loading={loading}
        clearValues={clearValues}
        pristine={pristine}
        submitting={submitting}
        validateDates={validateDates}
        minDate={minDate}
        collapsedSearchForm={collapsedSearchForm}
      />
    )}
  </Grid>
));

export default PostTruckPanel;
