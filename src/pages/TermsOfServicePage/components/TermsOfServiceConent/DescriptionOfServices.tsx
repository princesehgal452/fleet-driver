import React from 'react';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';

const DescriptionOfServices = () => (
  <>
    <Header>
      DESCRIPTION OF SERVICES
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC. provides a platform via the Mobile App and our Website (defined above as the “Services”) so that Shippers may submit Shipments through the Service.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Once FLEETROVER INC. accepts a Shipment for posting, the Shipment’s details, as provided by the Shipper, will be posted to the Service. The Shipper may cancel a Shipment at any time prior to a Carrier accepting it. You may view a list of Shipments available to you at any time and accept a Shipment through the Service. Once you accept a Shipment, you will be assigned to perform transportation services related to the Shipment.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC. will notify the Shipper that the Shipment has been accepted. It also will notify you that the Shipment has been assigned to you; PROVIDED, however, that FLEETROVER INC. does not guarantee that your attempt to accept any Shipment will be successful. FLEETROVER INC. assigns Shipments to the first Carrier which accepts the posting. If the original Carrier assignment fails for whatever reason, the Shipment will be re-posted to the Service.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Within a reasonable time after accepting tender of cargo for transport, you shall upload to the Service your bill of lading for the shipment. You shall not name FLEETROVER INC. as either a shipper or consignee on any bill of lading. FLEETROVER INC. is not responsible for any Shipment terms entered into between you and a Shipper.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Unless otherwise agreed, freight charges stated in the App and agreed to by your acceptance of Shipments hereunder include the transportation of the cargo from origin to destination; the cost of any fuel, tolls, ferry charges or other expenses related to the operation or maintenance of your equipment; and any other specialized services or equipment contemplated in the load tender (including, but not limited to amounts for refrigerated trailers, lift-gate service, loading or unloading, etc.). If any additional services not contemplated at the time a Shipment is posted are provided by Carrier. Carrier will use its best efforts to provide FLEETROVER INC. advance notice of any and all unspecified ancillary services or costs incurred so that FLEETROVER INC. may attempt to obtain Shipper approval of such charges. Absent express prior agreement, FLEETROVER INC. does not guarantee that invoices for accessorial and/or ancillary services will be paid.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Once a Shipment is completed, you shall post to the Service a proof of delivery signed by the authorized recipient within 24 hours of delivery.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC. may, as a convenience and value added service, provide you through the Service with access to GPS services, Google Maps or similar service to suggest routing. However, any such routing information is for your convenience only. It is not instructional or mandatory.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default DescriptionOfServices;
