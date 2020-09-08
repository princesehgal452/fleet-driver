import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import LocationPriceLoadInfo from '../LocationsPriceLoadInfo';
import { CardItemWrapper } from '../CardList/CardItemWrapper';
import FOGrid from '../../../components/FOGrid';


@observer
class PostMyTruckCard extends React.Component {
  static propTypes = {
    collectionItem: PropTypes.object,
    handleMenuClick: PropTypes.func,
  };

  render() {
    const { collectionItem, handleMenuClick } = this.props;
    return (
      <CardItemWrapper id={collectionItem.id}>
        <Grid item xs={12}>
          <Paper>
            <Grid container>
              <Grid
                container
                justify='space-between'
                alignItems='center'
              >
                <FOGrid justify='space-between' vSpacing={0.25} hSpacing={1}>
                  <Typography variant='caption'>
                    {`Posted ${moment.unix(collectionItem.timestamp).fromNow()}`}
                  </Typography>
                  {handleMenuClick ? (
                    <MoreIcon onClick={handleMenuClick(collectionItem.id)} />
                  ) : (
                    <div />
                  )}
                </FOGrid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <LocationPriceLoadInfo
                  pickup={collectionItem.pickup}
                  dropoff={collectionItem.dropoff}
                  radius={collectionItem.radius}
                  equipmentTypeList={collectionItem.equipmentTypeList}
                  perMileRate={collectionItem.perMileRate}
                  availableDate={collectionItem.availableDate}
                  expiresOn={collectionItem.expiresOn}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </CardItemWrapper>
    );
  }
}

export { PostMyTruckCard };
export default PostMyTruckCard;
