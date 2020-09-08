import React from 'react';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';

const CareerSelection = () => (
  <>
    <Header>
      CARRIER SELECTION
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC. is not responsible in any way for the acts and/or omissions of Carriers or their drivers.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC. provides a means for Shippers and Carriers to rate and review each other and to have those ratings made available to other Users. We do not express any opinion, nor does FLEETROVER INC. make any assurances regarding, the truth or accuracy of any User reviews or ratings. FLEETROVER INC. does not regularly monitor or remove reviews or ratings, or any portion thereof, unless they contain Content we deem inappropriate in our sole discretion.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default CareerSelection;
