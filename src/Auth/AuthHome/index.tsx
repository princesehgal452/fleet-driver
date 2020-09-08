import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';

import BigRoadFreight from '../../assets/images/svg/login-page/big_road_freight.svg';
import LoginTrack from '../../assets/images/svg/login-page/login_truck.svg';
import { ROUTES } from '../../services/constants';

import './AuthHome.scss';

// const tutorialSteps = [
//   {
//     label: 'How to be happy :)',
//     imgPath: 'https://material-ui.com/static/images/steppers/1-happy.jpg',
//   },
//   {
//     label: '1. Work with something that you like, like…',
//     imgPath: 'https://material-ui.com/static/images/steppers/2-work.jpg',
//   },
//   {
//     label: '2. Keep your friends close to you and hangout with them',
//     imgPath: 'https://material-ui.com/static/images/steppers/3-friends.jpg',
//   },
// ];

const swipeSteps = [
  {
    title: 'Join BigRoad Freight Today',
    subHeading: 'Book the loads you want, when you want them. Keep more money in your pocket!',
  },
];

const styles = () => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  img: {
    height: '25vh',
    overflow: 'hidden',
    width: '100%',
  },
});

class AuthHome extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  handleStepChange = (activeStep) => {
    this.setState({ activeStep });
  };

  render() {
    const { theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = swipeSteps.length;
    return (
      <div className='auth-home-page'>
        <div className='auth-home-page__container'>
          <BigRoadFreight className='logo-image' />
          <div className='auth-carousel'>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {/* {tutorialSteps.map(step => ( */}
              {/* <img key={step.label} className={classes.img} src={step.imgPath} alt={step.label} /> */}
              {/* ))} */}
              {
                swipeSteps.map(step => (
                  <div className='auth-carousel-stepper'>
                    <Typography variant='h6' className='auth-carousel-stepper--title'>
                      {step.title}
                    </Typography>
                    <br />
                    <Typography variant='subheading' className='auth-carousel-stepper--subheading'>
                      {step.subHeading}
                    </Typography>
                  </div>
                ))
              }
            </SwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position='static'
              activeStep={activeStep}
              className='tutorial-slider'
            />
          </div>
          <div className='login-form'>
            <Button className='btn-signup' component={Link} to='/register/driver'>
              Sign Up
            </Button>
            <Button className='btn-login' component={Link} to={`/${ROUTES.LOGIN}`}>
              Log In
            </Button>
          </div>
        </div>
        <LoginTrack className='truck-image' />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AuthHome);
