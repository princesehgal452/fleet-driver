import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Typography, Box, Theme, WithStyles, withStyles,  } from '@material-ui/core';
import { IDriverAppStore } from '../../../../../models/dataStructures/IDriverAppStore';
import SettingsContent from '../SettingsContent';
import TooltipPopover from '../../../../components/TooltipPopover';
import InfoIcon from '@material-ui/icons/Info';
import { DriverAppStore } from '../../../../store/DriverAppStore';

const styles = (theme: Theme) => ({
  title: {
    fontSize: theme.typography.pxToRem(18)
  }
});

interface IShortCodeOwnProps {
  showTooltip?: boolean;
  title?: string;
}

type IShortCodeProps = IShortCodeOwnProps & InjectedFormProps & IDriverAppStore & 
WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class ShortCode extends React.Component<IShortCodeProps> {
  render() {
    const { driverAppStore, showTooltip, title } = this.props;
    const { userStore: { FOUser: { truck } } } = driverAppStore as DriverAppStore;
    const shortCodeString = truck?.shortCode ? `BRF #${truck?.shortCode}` : 'Error retrieving BRF#, contact BigRoad Freight for assistance.';
    const tooltipDescription = 'Share this number with your shipper and broker partners to allow them to initiate tracking. You can also enter a partners email below and send them a tracking link.'

    return (
      <Grid container direction='column'>
        {
          title &&
          <Typography variant='h6' className='title'>{title}</Typography>
        }
        <Grid item xs={12}>
          <Typography variant='subtitle1' display='inline'>
            <Box fontWeight={500} display='inline'>
              {shortCodeString}
            </Box>
          </Typography>
        {
          truck?.shortCode && showTooltip && 
          <TooltipPopover popupId='infoTooltip' variant='popover' tooltip={tooltipDescription}>
            <InfoIcon fontSize='small' />
          </TooltipPopover>
        }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ShortCode);
