import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { CardItemWrapper } from '../../CardList/CardItemWrapper';
import HistoryIcon from '@material-ui/icons/History';
import FOAddress from '../../../../components/FOAddress';

const styles = () => ({
  root: {
    padding: '10px',
  },
});


@observer
class HistoricalSearchesCard extends React.Component {
  static propTypes = {
    collectionItem: PropTypes.object,
    onItemClick: PropTypes.func,
  };

  handleOnClick = () => {
    const { collectionItem, onItemClick } = this.props;
    onItemClick(collectionItem);
  };

  render() {
    const { collectionItem: { pickup, dropOff, equipmentTypeList, id }, classes } = this.props;
   
    return (
      <CardItemWrapper id={id}>
        <Grid item xs={12} onClick={this.handleOnClick}>
          <Paper>
            <CardActionArea>
              <Grid container className={classes.root}>
                <Grid item xs={1} md={1}>
                  <Grid container justify='center'>
                    <Grid item>
                      <HistoryIcon />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={9} md={9}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='subtitle1'>
                        {pickup.location ? <FOAddress address={pickup.location} /> : '-' }
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.subHeading}>
                      <Typography variant='caption'>Pickup</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='subtitle1'>
                       {dropOff.location ? <FOAddress address={dropOff.location} /> : '-' }
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.subHeading}>
                      <Typography variant='caption'>Dropoff</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2} md={2}>
                  <Grid container justify='flex-end'>
                    <Grid item>  {equipmentTypeList} </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardActionArea>
          </Paper>
        </Grid>
      </CardItemWrapper>
    );
  }
}

export default withStyles(styles)(HistoricalSearchesCard);
