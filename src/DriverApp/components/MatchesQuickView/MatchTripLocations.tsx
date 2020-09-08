import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Grid, Theme, withStyles } from '@material-ui/core';
import { ArrowDropDownCircleOutlined } from '@material-ui/icons';
import MatchLocation from './MatchLocation';

import './MatchTripLocations.scss';


const styles = (theme: Theme) => ({
  icon: {
    marginRight: theme.spacing(1.5 / 4),
    marginTop: theme.spacing(1 / 4),
  },
  invertIcon: {
    transform: `rotate(180deg)`,
  },
});

@observer
class MatchTripLocations extends React.Component {
  static propTypes = {
    pickup: PropTypes.object.isRequired,
    dropoff: PropTypes.object,
    displayFullAddress: PropTypes.bool,
  };

  render() {
    const { pickup, dropoff, displayFullAddress, classes } = this.props;
    const hasDropOff = Boolean(dropoff?.location || dropoff?.startDateTime);
    return (
      <Grid container className='match-trip-locations' wrap='nowrap' alignItems='center'>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container wrap='nowrap'>
                <Grid item>
                  <ArrowDropDownCircleOutlined
                    color='primary'
                    className={classNames(classes.icon, classes.invertIcon)}
                  />
                </Grid>
                <Grid item>
                  <MatchLocation
                    address={pickup.location}
                    date={pickup.startDateTime || null}
                    displayFullAddress={displayFullAddress}
                  />
                </Grid>
              </Grid>
            </Grid>
            {hasDropOff
            && (
              <Grid item xs={12}>
                <Grid container wrap='nowrap'>
                  <Grid item>
                    <ArrowDropDownCircleOutlined
                      color='secondary'
                      className={classNames(classes.icon)}
                    />
                  </Grid>
                  <Grid item>
                    <MatchLocation
                      address={dropoff.location}
                      date={dropoff.startDateTime || null}
                      displayFullAddress={displayFullAddress}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MatchTripLocations);
