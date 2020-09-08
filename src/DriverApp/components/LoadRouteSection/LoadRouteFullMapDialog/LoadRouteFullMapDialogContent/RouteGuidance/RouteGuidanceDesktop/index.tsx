import React, { memo } from 'react';
import { observer } from 'mobx-react';
import { Grid, Grow, makeStyles } from '@material-ui/core';
import LoadRouteNavigation from '../../../../LoadRouteNavigation';
import { growFromTopStyle } from '../../../../../../../utils/utility';
import AisinRouteData from '../../../../../../../models/dataStructures/Aisin/AisinRouteData';


const useStyles = makeStyles({
  root: {
    height: '100%',
  },
  navigation: {
    flex: 1,
    overflowY: 'auto' as 'auto',
  },
  navigationList: {
    height: 0, // important for scroll to work
  },
});

interface IRouteGuidanceDesktopOwnProps {
  dialogEntered: boolean;
  routeData: AisinRouteData;
}

const RouteGuidanceDesktop = observer(({ dialogEntered, routeData }: IRouteGuidanceDesktopOwnProps) => {
  const classes = useStyles();

  return (
    <Grid container direction='column' className={classes.root}>
      <div className={classes.navigation}>
        <Grow
          in={dialogEntered}
          style={growFromTopStyle}
          mountOnEnter
          unmountOnExit
        >
          <div className={classes.navigationList}>
            <LoadRouteNavigation routeData={routeData} />
          </div>
        </Grow>
      </div>
    </Grid>
  );
});

export default RouteGuidanceDesktop;
