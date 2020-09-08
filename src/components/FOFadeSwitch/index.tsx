import React from 'react';
import { observer } from 'mobx-react';
import Fade from '@material-ui/core/Fade';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';


const styles = (theme: Theme) => ({
  outer: {
    position: 'relative' as 'relative',
    all: 'inherit' as 'inherit',
  },
  inner: {
    position: 'absolute' as 'absolute',
  },
});

interface IFOFadeSwitch {
  condition: boolean;
  ifContent: React.ReactNode;
  elseContent: React.ReactNode;
}

const FOFadeSwitch = ({ condition, ifContent, elseContent, classes }:
                        (IFOFadeSwitch & WithStyles<typeof styles>)) => (
  <div className={classes.outer}>
    <div className={classes.inner}>
      <Fade in={condition} mountOnEnter unmountOnExit>
        <div>{ifContent}</div>
      </Fade>
    </div>
    <div className={classes.inner}>
      <Fade in={!condition} mountOnEnter unmountOnExit>
        <div>{elseContent}</div>
      </Fade>
    </div>
  </div>
);

export default withStyles(styles)(observer(FOFadeSwitch));
