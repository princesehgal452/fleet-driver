import React, { Dispatch, memo, SetStateAction } from 'react';
import { Grid } from '@material-ui/core';
import { SortValues } from '../../../../../services/constants';
import SearchFilterCheckboxItem from './SearchFilterCheckboxItem';


const handleSortChange = (setSelectedSortValue, setSortFilter) => (e) => {
  const { target: { value } } = e;
  setSelectedSortValue(value);
  setSortFilter(value);
};

const triggerSortChange = (value, setSelectedSortValue, setSortFilter) => () => {
  setSelectedSortValue(value);
  setSortFilter(value);
};

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

interface ISearchFilterCheckbox {
  selectedSortValue: SortValues;
  setSelectedSortValue: Dispatch<SetStateAction<SortValues>>;
  setSortFilter: (filter: SortValues) => Promise<void>;
}

const SearchFilterCheckbox = memo(({ selectedSortValue, setSelectedSortValue, setSortFilter }: ISearchFilterCheckbox) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SearchFilterCheckboxItem
          value={SortValues.RATE}
          selectedValue={selectedSortValue}
          text={filterText(SortValues.RATE)}
          onClick={triggerSortChange(SortValues.RATE, setSelectedSortValue, setSortFilter)}
          onChange={handleSortChange(setSelectedSortValue, setSortFilter)}
        />
      </Grid>
      <Grid item xs={12}>
        <SearchFilterCheckboxItem
          value={SortValues.PICKUP_DATE}
          selectedValue={selectedSortValue}
          text={filterText(SortValues.PICKUP_DATE)}
          onClick={triggerSortChange(SortValues.PICKUP_DATE, setSelectedSortValue, setSortFilter)}
          onChange={handleSortChange(setSelectedSortValue, setSortFilter)}
        />
      </Grid>
      <Grid item xs={12}>
        <SearchFilterCheckboxItem
          value={SortValues.NEWEST}
          selectedValue={selectedSortValue}
          text={filterText(SortValues.NEWEST)}
          onClick={triggerSortChange(SortValues.NEWEST, setSelectedSortValue, setSortFilter)}
          onChange={handleSortChange(setSelectedSortValue, setSortFilter)}
        />
      </Grid>
    </Grid>
  );
});

export default SearchFilterCheckbox;
