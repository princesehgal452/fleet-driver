import React from 'react';
import { observer } from 'mobx-react';
import moment, { Moment } from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import FOAddress from '../../../components/FOAddress';


const styles = (theme: Theme) => ({
  address: {
    fontSize: 18,
  },
});

const momentFormat = date => moment(date).format('MMM D, h:mm A');

const getFormattedDate = (date: Moment) => {
  if ((date instanceof moment)) {
    return moment(date).isValid()
      ? moment(date).format('MMM D, h:mm A')
      : 'Pending';
  }
  if ((date === undefined) || !(date instanceof Date)) {
    return '-';
  }
  return momentFormat(date);
};

interface IMatchLocationOwnProps {
  address: string;
  displayFullAddress: boolean;
  date: Moment;
}

type IMatchLocationProps = IMatchLocationOwnProps & WithStyles<typeof styles>;

const MatchLocation = observer(({ address, displayFullAddress, date, classes }: IMatchLocationProps) => (
  <Grid container direction='column'>
    <Grid item>
      <Typography variant='h6' className={classes.address}>
        {address && (
          <FOAddress address={address} displayFullAddress={displayFullAddress} />
        )}
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant='body2'>
        {getFormattedDate(date)}
      </Typography>
    </Grid>
  </Grid>
));

export default withStyles(styles)(MatchLocation);
