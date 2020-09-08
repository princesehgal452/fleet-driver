import React from 'react';
import { Button, Divider, Grid, Paper } from '@material-ui/core';
import AdditionalOptionsLocation from '../../LocationPanel/AdditionalOptionsLocation';
import PostTruckPanelAdditionalOptions from '../PostTruckPanelAdditionalOptions';
import FOGrid from '../../../../components/FOGrid';


const expandSearchFormHandler = (onExpanded) => () => {
  onExpanded();
};

interface IPostTruckPanelAdditionalProps {
  onExpanded: () => void;
  validateDates: (event, newValue) => void;
  clearValues: () => void;
  pristine: boolean;
  submitting?: boolean;
  collapsedSearchForm: boolean;
  loading: boolean;
  minDate?: Date;
}

const PostTruckPanelAdditional = ({
  pristine, submitting, collapsedSearchForm, loading,
  minDate, validateDates, clearValues, onExpanded,
}: IPostTruckPanelAdditionalProps) => (
  <Grid container>
    <Grid item xs={12} container direction='column'>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <AdditionalOptionsLocation
          expandSearchForm={expandSearchFormHandler(onExpanded)}
          collapsedSearchForm={collapsedSearchForm}
        >
          <PostTruckPanelAdditionalOptions
            loading={loading}
            clearValues={clearValues}
            pristine={pristine}
            submitting={submitting}
            validateDates={validateDates}
            minDate={minDate}
          />
        </AdditionalOptionsLocation>
      </Grid>
    </Grid>
    {collapsedSearchForm && (
    <Grid item xs={12}>
      <Paper elevation={0} square>
        <Divider />
        <FOGrid>
          <Grid item xs={12}>
            <Button
              color='primary'
              variant='contained'
              fullWidth
              disabled={submitting || loading}
              type='submit'
            >
                Send Request
            </Button>
          </Grid>
        </FOGrid>
      </Paper>
    </Grid>
    )}
  </Grid>
);

export default PostTruckPanelAdditional;
