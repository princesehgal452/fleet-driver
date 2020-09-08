import React, { ReactNode } from 'react';
import ReactGA from 'react-ga';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import { GA_TRACKING, MIXPANEL_KEYS } from '../../../../services/constants';
import BigRoadFreightLogo from '../../../../assets/images/svg/login-page/Big_road_freight_logo.svg';
import TermsOfServicePng from '../../../../assets/images/png/register-page/Terms_of_service.png';
import mixpanel from 'mixpanel-browser';
import { mixpanelTrack } from '../../../../services/FOMixpanel';


const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    padding: theme.spacing(1),
    textAlign: 'center',
  },
  brfLogo: {
    padding: '5px',
  },
});

interface IFinalPageOwnProps {
  message?: ReactNode;
  buttonText?: string;
  onClose?: (() => void) | null;
  onboardingComplete?: boolean;
  autoCloseTime?: number;
}

type IFinalPageProps = IFinalPageOwnProps & WithStyles<typeof styles>;

class FinalPage extends React.PureComponent<IFinalPageProps> {

  static defaultProps = { autoCloseTime: 5000, buttonText: 'Okay' }; // auto close the page and move on to redirect URL after 5 seconds

  componentDidMount() {
    const { onClose, message, onboardingComplete, autoCloseTime } = this.props;
    if (!message && onClose) {
      setTimeout(onClose, autoCloseTime);
    }
    if (onboardingComplete) {
      ReactGA.event({
        category: GA_TRACKING.CATEGORIES.DRIVER,
        action: GA_TRACKING.ACTIONS.ONBOARD_COMPLETE,
      });
      mixpanel.people.set_once({ [MIXPANEL_KEYS.ONBOARDING_COMPLETE_DATE]: new Date().toISOString() });
      mixpanelTrack(MIXPANEL_KEYS.ONBOARDING_COMPLETE_DATE);
    }
  }

  render() {
    const { onClose, message, classes, buttonText } = this.props;
    return (
      <Zoom in>
        <Grid container spacing={2} alignContent='center' justify='center' alignItems='center' className={classes.root}>
          <Grid item xs={12}>
            <BigRoadFreightLogo className={classes.brfLogo} />
          </Grid>
          <Grid item xs={12}>
            <img src={TermsOfServicePng} alt='Terms of Service' />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body1' align='center'>
              {message}
            </Typography>
          </Grid>
          {onClose && (
            <Grid item>
              <Button variant='contained' color='primary' onClick={onClose}>
                {buttonText}
              </Button>
            </Grid>
          )}
        </Grid>
      </Zoom>
    );
  }
}

export default withStyles(styles)(FinalPage);
