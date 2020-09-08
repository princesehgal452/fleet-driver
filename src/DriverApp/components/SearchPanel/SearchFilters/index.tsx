import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { Field } from 'redux-form';
import { Grid, Hidden, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FOMultiSelect from '../../../../components/FOMultiSelect';
import FODateField from '../../../../components/FODateField';
import FOTextField from '../../../../components/FOTextField';
import ReduxNumberFormatCurrency from '../../../../utils/ReduxNumberFormatCurrency';
import { DriverAppStore } from '../../../store/DriverAppStore';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import DistanceFiltersField from '../FormFields/DistanceFiltersField';
import SearchFilterCheckbox from './SearchFilterCheckbox';
import { MILES_TYPES, SortValues, TRUCKS_EQUIPMENT_TYPES, WEIGHT_TYPES } from '../../../../services/constants';


interface ISearchFilters {
  driverAppStore: IDriverAppStore;
  type: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  selectedSortType: {
    fontWeight: 'bold' as 'bold',
  },
  root: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  formField: {
    marginTop: theme.spacing(2),
  },
  distanceFilters: {
    marginTop: theme.spacing(3),
  },
  checkboxLable: {
    cursor: 'pointer',
  },
}));

const todayDate = new Date();

const filterText = (sortFilter: SortValues) => {
  switch (sortFilter) {
    case SortValues.RATE:
      return 'Highest Price';
    case SortValues.NEWEST:
      return 'Recent Posting';
    case SortValues.PICKUP_DATE:
      return 'Nearest Pickup';
  }
};

const handleSortChange = (setSelectedSortValue, setSortFilter) => (e) => {
  const { target: { value } } = e;
  setSelectedSortValue(value);
  setSortFilter(value);
};

const triggerSortChange = (value, setSelectedSortValue, setSortFilter) => () => {
  setSelectedSortValue(value);
  setSortFilter(value);
};

const SearchFilters = inject('driverAppStore')(({ driverAppStore, type }: ISearchFilters) => {
  const { searchStore: { setSortFilter } } = driverAppStore as DriverAppStore;
  const [selectedSortValue, setSelectedSortValue] = useState(SortValues.PICKUP_DATE);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Hidden smDown={true}>
        <Grid container spacing={6} justify='center'>
          <Grid item xs={12} sm={12} md={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Field
                  component={FOMultiSelect}
                  name='equipmentTypeList'
                  label='Equipment(s)'
                  fullWidth
                  multi
                  native='true'
                  options={TRUCKS_EQUIPMENT_TYPES}
                  hideClearIcon
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={FOMultiSelect}
                  name='radius'
                  label='Deadhead'
                  fullWidth
                  adornments={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        Miles
                      </InputAdornment>),
                  }}
                  options={MILES_TYPES}
                  hideClearIcon
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Field
                  component={FOTextField}
                  name='perMileRate'
                  label='Rate'
                  InputProps={{
                    inputComponent: ReduxNumberFormatCurrency,
                    endAdornment: (
                      <InputAdornment position='end'>
                        $/Mile
                      </InputAdornment>),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  component={FOMultiSelect}
                  name='weight'
                  label='Total Weight'
                  fullWidth
                  options={WEIGHT_TYPES}
                  hideClearIcon
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Typography variant='subtitle2'>SORT BY</Typography>
            <SearchFilterCheckbox
              selectedSortValue={selectedSortValue}
              setSelectedSortValue={setSelectedSortValue}
              setSortFilter={setSortFilter}
            />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp={true}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='subtitle2'>SORT BY</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SearchFilterCheckbox
                  selectedSortValue={selectedSortValue}
                  setSelectedSortValue={setSelectedSortValue}
                  setSortFilter={setSortFilter}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
        <br />
        <Paper className={classes.root}>
          <Typography variant='subtitle2'>FILTER</Typography>
          <Grid container>
            <Grid item xs={12} className={classes.formField}>
              <Field
                component={FOMultiSelect}
                name='equipmentTypeList'
                label='Equipment(s)'
                fullWidth
                multi
                native='true'
                options={TRUCKS_EQUIPMENT_TYPES}
                hideClearIcon
              />
            </Grid>
            <Grid item xs={12} className={classes.formField}>
              <Field
                component={FOMultiSelect}
                name='radius'
                label='Deadhead'
                fullWidth
                adornments={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      Miles
                    </InputAdornment>),
                }}
                options={MILES_TYPES}
                hideClearIcon
              />
            </Grid>
            <Grid container spacing={2} className={classes.formField}>
              <Grid item xs={6}>
                <Field
                  component={FOTextField}
                  name='perMileRate'
                  label='Rate'
                  InputProps={{
                    inputComponent: ReduxNumberFormatCurrency,
                    endAdornment: (
                      <InputAdornment position='end'>
                        $/Mile
                      </InputAdornment>),
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  component={FOMultiSelect}
                  name='weight'
                  label='Total Weight'
                  fullWidth
                  options={WEIGHT_TYPES}
                  hideClearIcon
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.distanceFilters}>
              <DistanceFiltersField invertColors />
            </Grid>
          </Grid>
        </Paper>
      </Hidden>
    </div>
  );
});

export default SearchFilters;
