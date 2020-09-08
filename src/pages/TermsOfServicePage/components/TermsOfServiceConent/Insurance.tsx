import React from 'react';
import { List } from '@material-ui/core';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';
import DottedListItem from '../DottedListItem';
import DottedListItemText from '../DottedListItemText';

const Insurance = () => (
  <>
    <Header>
      INSURANCE
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC. agrees to maintain, at its own expense, at all times, at least the following insurance coverage amounts:
        </NumberedListItemText>
        <List>
          <DottedListItem>
            <DottedListItemText>
              General Liability: $1,000,000
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              Auto Liability: $1,000,000
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              Contingent Cargo Liability: $100,000
            </DottedListItemText>
          </DottedListItem>
        </List>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Upon request, FLEETROVER INC. may procure insurance coverage amounts that exceed these limits, and the evidence of such coverage shall be in the form of an insurance certificate provided to you on request. FLEETROVER INC.’s maximum liability to you for any loss shall be limited to FLEETROVER INC.’s insurance policy terms and conditions and the dollar amounts for coverage hereinbelow.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC.’s contingent cargo insurance is subject to the terms, conditions and certain limitations and/or exclusions as contained in the policy, and the terms, conditions and requirements as outlined within this Agreement, which are subject to change at any time. The existence of FLEETROVER INC.’s contingent cargo insurance in no way shifts or places any legal or contractual liability on FLEETROVER INC., nor does it exonerate the your duties and liabilities under the 49 USC §14706 or this Agreement.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default Insurance;
