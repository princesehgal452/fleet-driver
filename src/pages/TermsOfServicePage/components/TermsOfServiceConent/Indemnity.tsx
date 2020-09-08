import React from 'react';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';

const Indemnity = () => (
  <>
    <Header>
      INDEMNITY
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText header>
          Indemnification of FLEETROVER INC.
        </NumberedListItemText>
        <NumberedListItemText>
          You agree to defend, indemnify and hold FLEETROVER INC. (and its officers, employees, and agents) harmless, including costs and attorneys’ fees, from any claim or demand made by any third party due to or arising out of your (i) use of the Service, (ii) User Content, (iii) interaction with any other User, (iv) violation of this Agreement; (v) violation of applicable laws or regulations; or (vi) your shipment services. FLEETROVER INC. reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us and you agree to cooperate with our defense of these claims. You agree not to settle any matter without the prior written consent of FLEETROVER INC. FLEETROVER INC. will use reasonable efforts to notify you of any such claim, action or proceeding upon becoming aware of it.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Indemnification of Shipper
        </NumberedListItemText>
        <NumberedListItemText>
          You agree to defend, indemnify and hold Shippers (and their officers, employees, and agents) harmless, including costs and attorneys’ fees, from any and all damages, claims or losses arising out of your performance of this Agreement, to the extent such damages, claims or losses are caused by you or your employees’ or agents’ negligence or intentional conduct.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default Indemnity;
