import React, { memo } from 'react';
import classNames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { SortValues } from '../../../../../../services/constants';


const useStyles = makeStyles((theme: Theme) => ({
  selectedSortType: {
    fontWeight: 'bold' as 'bold',
  },
  checkboxLabel: {
    cursor: 'pointer',
  },
}));

interface ISearchFilterCheckboxItem {
  text: string;
  value: SortValues;
  selectedValue: SortValues;
  onClick: () => void;
  onChange: (e) => void;
}

const SearchFilterCheckboxItem = memo(({ text, selectedValue, value, onClick, onChange }: ISearchFilterCheckboxItem) => {
  const classes = useStyles();
  const selected = selectedValue === value;
  return (
    <Grid container alignItems='center'>
      <Grid item xs={10} alignItems='center'>
        <div
          className={
            classNames(classes.checkboxLabel, {
              [classes.selectedSortType]: selected,
            })}
          onClick={onClick}
        >
          {text}
        </div>
      </Grid>
      <Grid item xs={2}>
        <Radio
          checked={selected}
          onChange={onChange}
          value={value}
          color='primary'
          inputProps={{ 'aria-label': text }}
        />
      </Grid>
    </Grid>
  );
});

export default SearchFilterCheckboxItem;
