import React from 'react';
import TermsAndConditionsButton from '../../Auth/AdditionalInfoPage/TermsAndConditionsButton';


interface ITermsAndConditionsContainerOwnProps {
  acceptButtonLabel?: string;
}

type ITermsAndConditionsContainerProps = ITermsAndConditionsContainerOwnProps;

const TermsAndConditionsContainer = ({ acceptButtonLabel = 'Agree & Continue' }: ITermsAndConditionsContainerProps) => (
  <div>
    <div>
      Tap "{acceptButtonLabel}" to accept the
      <br/>
      BigRoadFreight <TermsAndConditionsButton />
    </div>
  </div>
);

export default TermsAndConditionsContainer;
