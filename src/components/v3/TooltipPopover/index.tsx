import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { Typography, Popover, Button, withStyles, StyleRules, WithStyles, Box } from '@material-ui/core';
import {
  usePopupState,
  bindTrigger,
  bindPopover,
} from 'material-ui-popup-state/hooks';
import styles from './styles';

interface IPopoverProps {
  popupId: string;
  variant: string;
  tooltip: string;
  children: ReactNode;
}

const TooltipPopover = observer(({ popupId, variant, tooltip, children, classes }: IPopoverProps & WithStyles<typeof styles>) => {
  const popupState = usePopupState({ variant, popupId });
  return (
    <>
      <Box display='inline' className={classes.contentBox} {...bindTrigger(popupState)} mx={1}>
        {children}
      </Box>
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography className={classes.typography}>
          {tooltip}
        </Typography>
      </Popover>
    </>
  );
});

export default withStyles(styles)(TooltipPopover);
