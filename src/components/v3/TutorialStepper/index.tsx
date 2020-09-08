import React, { Dispatch, memo, SetStateAction } from 'react';
import { Button, MobileStepper } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';


const nextHandler = (setActiveStep: Dispatch<SetStateAction<number>>, prevStepNumber: number, lastStep: number, closeHandler: () => void) => () => {
  if (lastStep === prevStepNumber) {
    closeHandler();
  } else {
    setActiveStep(prevStepNumber + 1);
  }
};

const backHandler = (setActiveStep: Dispatch<SetStateAction<number>>, prevStepNumber: number) => () => {
  setActiveStep(prevStepNumber - 1);
};

interface ITutorialStepper {
  steps: any[];
  closeHandler: () => void;
}

const TutorialStepper = memo(({ steps, closeHandler }: ITutorialStepper) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;
  const lastStep = maxSteps - 1;

  const handleNext = nextHandler(setActiveStep, activeStep, lastStep, closeHandler);
  const handleBack = backHandler(setActiveStep, activeStep);

  return (
    <div>
      <img src={steps[activeStep]} onClick={handleNext} />
      <MobileStepper
        steps={maxSteps}
        position='static'
        variant='dots'
        activeStep={activeStep}
        nextButton={(
          <Button size='small' onClick={handleNext}>
            {activeStep === lastStep ? 'Done' : 'Next'}
            <KeyboardArrowRight />
          </Button>
        )}
        backButton={(
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        )}
      />
    </div>
  );
});

export default TutorialStepper;
