import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';
import { Grid, makeStyles, Theme, Box, Typography } from '@material-ui/core';
import CreateAccount from './CreateAccount';
import CreateServiceAccount from './CreateServiceAccount';
import AccessErrorPrompt from './AccessErrorPrompt';
import classNames from 'classnames';
import { fetchRandomValueFromArr } from '../../../utils/utility';
import ftCreateAccountBackgrounds from '../../../assets/images/ftCreateAccountBackgrounds';
import FreightLogo from '../../../assets/images/png/ftCreateAccount/FreightLogo.png';

const useStyles = makeStyles((theme: Theme) => ({
  fullHeight: {
    height: '100%',
    overflowY: 'auto'
  },
  imageColumn: {
    backgroundImage: `url(${fetchRandomValueFromArr(ftCreateAccountBackgrounds)})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  imageColumnGrandient: {
    background: 'linear-gradient(180deg, rgba(22,101,216,0.47) 0%, #214D78B2 100%)',
  },
}));

type IFTAccountAccessProps = IDriverAppStore & RouteComponentProps;

const FTAccountAccess = inject('driverAppStore')(
  observer(
    ({ driverAppStore, history, location, match: { params }, }: IFTAccountAccessProps) => {
      const { userStore } = driverAppStore as DriverAppStore;
      const classes = useStyles();

      return (
        <Grid container className={classes.fullHeight}>
          <Grid item xs={12} sm={5} className={classNames(classes.fullHeight, classes.imageColumn)}>
            <Box className={classes.imageColumnGrandient} height='100%' p={3}>
              <Grid container direction='column' justify='center' className={classes.fullHeight}>
                <Grid item>
                  <Typography variant='h5' paragraph>
                    “I find FreightTab to be a very useful tool to run my
                    carrier operations smoothly.”
                  </Typography>
                  <Typography variant='subtitle' display='block'>Julio C.</Typography>
                  <Typography variant='subtitle'>New Me LLC</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} sm={7} lg={5} xl={4} className={classes.fullHeight}>
            <Box px={12} py={6} height='100%'>
              <Typography><img src={FreightLogo} /></Typography>
              <Grid container direction='column' justify='center' alignItems='stretch' className={classes.fullHeight} >
                <Grid item>
                  {params?.type === 'createAccount' && <CreateAccount />}
                  {params?.type === 'createServiceAccount' && (
                    <CreateServiceAccount />
                  )}
                  {params?.type === 'accessErrorPrompt' && (
                    <AccessErrorPrompt />
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      );
    }
  )
);

export default withRouter(FTAccountAccess);
