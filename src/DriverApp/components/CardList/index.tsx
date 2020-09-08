import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Flipped, Flipper } from 'react-flip-toolkit';
import FOPagination from '../../../components/FOPagination/FOPagination';
import { FOContentLoader } from '../../../components/FOContentLoader';
import { mixpanelTrack } from '../../../services/FOMixpanel';
import { MIXPANEL_EVENTS } from '../../../services/constants';


@observer
class CardList extends React.Component {
  static propTypes = {
    cardListId: PropTypes.string.isRequired,
    collectionStore: PropTypes.object.isRequired,
    CardItemComponent: PropTypes.func.isRequired,
    showPerMileRate: PropTypes.bool,
    dispatchableDriver: PropTypes.bool,
    currentCoordinates: PropTypes.object,
    deleteItem: PropTypes.func,
    onItemClick: PropTypes.func,
    fetchPageOverride: PropTypes.func,
    caption: PropTypes.string,
    overrideResults: PropTypes.array,
    overrideLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuAnchorEl: null,
      itemId: null,
    };
  }

  get flipKey() {
    const {
      collectionStore: { loading, results },
      overrideResults, overrideLoading,
    } = this.props;
    return overrideResults ? overrideResults.length + overrideLoading : results;
  }

  handleMenuClick = itemId => (event) => {
    this.setState({
      menuAnchorEl: event.currentTarget,
      itemId,
    });
  };

  handleMenuClose = () => {
    this.setState({
      menuAnchorEl: null,
      itemId: null,
    });
  };

  handleMenuItemAction = () => {
    const { deleteItem } = this.props;
    const { itemId } = this.state;
    deleteItem(itemId);
    this.handleMenuClose();
  };

  fetchPage = (pageNumber: number) => {
    const { collectionStore: { downloadResults }, fetchPageOverride, cardListId } = this.props;
    if (fetchPageOverride) {
      fetchPageOverride(pageNumber);
    } else {
      downloadResults(pageNumber);
    }
    mixpanelTrack(MIXPANEL_EVENTS.PAGINATION_BUTTON, {
      Location: cardListId,
      Page: pageNumber,
    });
  };

  render() {
    const { menuAnchorEl } = this.state;
    const {
      collectionStore: { loading, results, pagination }, cardListId, overrideResults, currentCoordinates,
      CardItemComponent, deleteItem, onItemClick, caption, showPerMileRate, dispatchableDriver,
      overrideLoading,
    } = this.props;
    return (
      <Flipper
        flipKey={this.flipKey}
        spring='gentle'
      >
        <Grid container>
          {deleteItem
          && (
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuItemAction}>
                Delete
              </MenuItem>
            </Menu>
          )}
          {caption && (overrideResults ? overrideResults.length > 0 : results.length > 0)
          && (
            <Grid container item xs={12} justify='space-between' className='historical-searches__container'>
              <Grid item>
                <Typography variant='subtitle2'>
                  {caption}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='subtitle2'>
                  {pagination.totalItems ? `${pagination.totalItems} Shipments Available` : ''}
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            {(loading || overrideLoading)
              ? (<FOContentLoader />)
              : (
                <Grid container spacing={1}>
                  {(overrideResults || results).map((item, index) => (
                    <CardItemComponent
                      key={item.id}
                      collectionItem={item}
                      currentCoordinates={currentCoordinates}
                      showPerMileRate={showPerMileRate}
                      handleMenuClick={this.handleMenuClick}
                      onItemClick={onItemClick}
                      dispatchableDriver={dispatchableDriver}
                    />
                  ))}
                </Grid>)
            }
          </Grid>
          {pagination.totalPages > 1 && !(loading || overrideLoading)
          && (
              <Grid item xs={12}>
                <FOPagination
                  key={cardListId}
                  pageCount={pagination.totalPages}
                  onPageChange={this.fetchPage}
                  currentPage={pagination.page}
                />
              </Grid>
          )}
        </Grid>
      </Flipper>
    );
  }
}

export default CardList;
