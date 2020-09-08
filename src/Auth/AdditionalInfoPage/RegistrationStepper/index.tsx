import React from 'react';
import { observer } from 'mobx-react';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


interface IRegistrationStepperOwnProps {
  maxPage: number;
  page: number;
  disabled: boolean;
  onNextClick: () => void;
  onBackClick: () => void;
}

const RegistrationStepper = observer(({ page, maxPage, disabled, onBackClick, onNextClick }: IRegistrationStepperOwnProps) => (
  <MobileStepper
    variant='progress'
    steps={maxPage}
    activeStep={page - 1}
    nextButton={(
      <Button size='small' color='primary' onClick={onNextClick} disabled={disabled}>
        Next
        {<KeyboardArrowRight />}
      </Button>
    )}
    backButton={(
      <Button size='small' onClick={onBackClick} disabled={disabled || page - 1 <= 0}>
        {<KeyboardArrowLeft />}
        Back
      </Button>
    )}
  />
));

export default RegistrationStepper;
