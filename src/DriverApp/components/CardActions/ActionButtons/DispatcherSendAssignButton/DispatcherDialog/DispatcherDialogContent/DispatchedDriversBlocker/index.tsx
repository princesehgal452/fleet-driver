import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';


const styles = (theme: Theme) => ({
  root: {
    position: 'relative' as 'relative',
  },
  overlay: {
    position: 'absolute' as 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fade(theme.palette.common.white, 0.8),
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    cursor: 'not-allowed',
  },
});

interface IDispatchedDriversBlockerOwnProps {
  block: boolean;
  children: ReactNode;
}

type IDispatchedDriversBlockerProps = IDispatchedDriversBlockerOwnProps & WithStyles<typeof styles>;

const DispatchedDriversBlocker = observer(({ block, classes, children }:
                                             IDispatchedDriversBlockerProps) => (
  <div className={classes.root}>
    <div>
      {children}
    </div>
    {block && (
      <div className={classNames(classes.overlay)}>
        <Typography variant='subtitle2'>Already sent to this driver</Typography>
      </div>
    )}
  </div>
));

export default withStyles(styles)(DispatchedDriversBlocker);
