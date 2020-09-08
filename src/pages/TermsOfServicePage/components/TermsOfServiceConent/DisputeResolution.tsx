import React from 'react';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';

const DisputeResolution = () => (
  <>
    <Header>
      DISPUTE RESOLUTION
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText>
          In the event of a dispute arising out of this Agreement related to claims by or against FLEETROVER INC., a party’s recourse shall be exclusively settled through binding and confidential arbitration. Arbitration shall be subject to the Federal Arbitration Act. The arbitration shall be conducted before one arbitrator from the Transportation ADR Council, Inc. (“TAC”). Arbitration proceedings shall be conducted under the rules of the TAC.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Upon agreement of the parties, arbitration proceedings may be conducted outside of the administrative control of the TAC. The decision of the arbitrator shall be binding and final and the award of the arbitrator may be entered as judgment in any court of competent jurisdiction. The prevailing party shall be entitled to recovery of costs, expenses and reasonable attorney fees as well as those incurred in any action for injunctive relief, or in the event further legal action is taken to enforce the award of the arbitrator.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Arbitration proceedings shall be conducted in Toronto, Ontario, or at such place as mutually agreed upon in writing by the parties. At any time, either party may apply to a court of competent jurisdiction in Toronto, Ontario for injunctive or other equitable relief. In the event that either party is granted equitable relief, the party against whom judgment is entered shall be liable for all costs and expenses incurred by the prevailing party including, but not limited to, reasonable attorney fees. This paragraph shall not apply to enforcement of an award of arbitration.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          The parties may also proceed in Small Claims Court in Toronto, Ontario to resolve any dispute where reasonably expected damages are less than $5,000. Unless preempted or controlled by federal law and regulations, this agreement shall be interpreted and enforced according to the laws of the Province of Ontario.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          This paragraph does not apply to claims you may have against a Shipper.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default DisputeResolution;
