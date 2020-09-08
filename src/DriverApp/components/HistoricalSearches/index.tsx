import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardList from '../CardList';
import HistoricalSearchesCard from './Card';

import './HistoricalSearches.scss';
import FODateField from '../../../components/FODateField';
import { Field } from 'redux-form';


const todayDate = new Date();


@observer
class HistoricalSearches extends React.Component {
  static propTypes = {
    searchStore: PropTypes.object,
    onHistorySearchClick: PropTypes.func,
  };

  historySearchClickHandler = (savedSearch) => {
    const { onHistorySearchClick } = this.props;
    onHistorySearchClick(savedSearch);
  };

  render() {
    const { searchStore: { recentSearches } } = this.props;
    return (
      <Grid container>
        <Field
          component={FODateField}
          name='pickupDate'
          label='Pickup Date'
          minDate={todayDate}
          // onChange={this.validateDates}
          invalidLabel=''
          inputVariant="outlined"
          fullWidth
          disableOpenOnEnter
          animateYearScrolling={false}
        />
        <Grid item xs={12}>
          <Typography variant='subtitle2' className='historical-searches__container'>
            RECENT SEARCHES
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CardList
            cardListId='Recent Searches'
            collectionStore={recentSearches}
            onItemClick={this.historySearchClickHandler}
            CardItemComponent={HistoricalSearchesCard}
          />
        </Grid>
      </Grid>
    );
  }
}

export default HistoricalSearches;
