import React from 'react';
import { Box } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import HeaderSection from './HeaderSection';
import DefinedTerms from './DefinedTerms';
import DescriptionOfServices from './DescriptionOfServices';
import YourResponsibilities from './YourResponsibilities';
import CareerSelection from './CareerSelection';
import PaymentTerms from './PaymentTerms';
import Licenses from './Licenses';
import Ownership from './Ownership';
import ModificationService from './ModificationService';
import LimitationService from './LimitationService';
import UserContent from './UserContent';
import ThirdpartySite from './ThirdpartySite';
import Indemnity from './Indemnity';
import ChoiceLaw from './ChoiceLaw';
import DisputeResolution from './DisputeResolution';
import TermAgreement from './TermAgreement';
import GeneralProvision from './GeneralProvision';

import styles from './styles';

type ITermsOfServiceContentProps = WithStyles<typeof styles>;

const TermsOfServiceContent = ({ classes }: ITermsOfServiceContentProps) => (
  <Box height='100%' className={classes.root}>
    <HeaderSection />
    <NumberedList header>
      <NumberedListItem>
        <DefinedTerms />
      </NumberedListItem>
      <NumberedListItem>
        <DescriptionOfServices />
      </NumberedListItem>
      <NumberedListItem>
        <YourResponsibilities />
      </NumberedListItem>
      <NumberedListItem>
        <CareerSelection />
      </NumberedListItem>
      <NumberedListItem>
        <PaymentTerms />
      </NumberedListItem>
      <NumberedListItem>
        <Licenses />
      </NumberedListItem>
      <NumberedListItem>
        <Ownership />
      </NumberedListItem>
      <NumberedListItem>
        <ModificationService />
      </NumberedListItem>
      <NumberedListItem>
        <LimitationService />
      </NumberedListItem>
      <NumberedListItem>
        <UserContent />
      </NumberedListItem>
      <NumberedListItem>
        <ThirdpartySite />
      </NumberedListItem>
      <NumberedListItem>
        <Indemnity />
      </NumberedListItem>
      <NumberedListItem>
        <ChoiceLaw />
      </NumberedListItem>
      <NumberedListItem>
        <DisputeResolution />
      </NumberedListItem>
      <NumberedListItem>
        <TermAgreement />
      </NumberedListItem>
      <NumberedListItem>
        <GeneralProvision />
      </NumberedListItem>
    </NumberedList>
  </Box>
);

export default withStyles(styles)(TermsOfServiceContent);
