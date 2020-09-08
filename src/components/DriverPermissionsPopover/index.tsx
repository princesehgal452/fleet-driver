import React from 'react';
import { observer } from 'mobx-react';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { Grid, IconButton, Popover, PopoverOrigin, Switch, Typography } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import FOGrid from '../FOGrid';


const defaultTransformOrigin: PopoverOrigin = { vertical: 'top', horizontal: 'center' };
const defaultAnchorOrigin: PopoverOrigin = { vertical: 'bottom', horizontal: 'center' };

interface IDriverPermissionsPopoverProps {
  popupId: string;
  changeHandler: (key, value) => () => void;
  permissions: IDriverPermissions;
  transformOrigin?: PopoverOrigin;
  anchorOrigin?: PopoverOrigin;
}


const DriverPermissionsPopover = observer(({
  popupId,
  permissions,
  changeHandler,
  anchorOrigin = defaultAnchorOrigin,
  transformOrigin = defaultTransformOrigin,
}: IDriverPermissionsPopoverProps) => {
  const popupState = usePopupState({ variant: 'popover', popupId });

  return (
    <>
      <IconButton {...bindTrigger(popupState)}>
        <Settings />
      </IconButton>
      <Popover {...bindPopover(popupState)} anchorOrigin={anchorOrigin} transformOrigin={transformOrigin}>
        <FOGrid>
          <Grid item xs={12}>
            <Typography variant='h6'>
              Driver Settings
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify='space-between'>
              <Grid item>
                <Typography>Driver search for own freight</Typography>
              </Grid>
              <Grid item>
                <Switch
                  color='primary'
                  onClick={changeHandler('allowSearch', !permissions.allowSearch)}
                  checked={permissions.allowSearch}
                >
                  Driver search for own freight
                </Switch>
              </Grid>
            </Grid>
          </Grid>
        </FOGrid>
      </Popover>
    </>
  );
});

export default DriverPermissionsPopover;
