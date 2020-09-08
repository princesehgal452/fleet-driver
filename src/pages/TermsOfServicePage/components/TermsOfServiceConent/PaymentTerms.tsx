import React from 'react';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';

const PaymentTerms = () => (
  <>
    <Header>
      PAYMENT TERMS
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText header>
          Rates and Payment
        </NumberedListItemText>
        <NumberedListItemText>
          For each Shipment, Shipper will pay FLEETROVER INC. the freight charge quoted to the Shipper upon acceptance of the applicable Shipment on the Service (“Carrier Fee”), as well as additional amounts, if any, paid by the Shipper for additional services provided by Carrier with respect to a Shipment.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          General Payment Terms
        </NumberedListItemText>
        <NumberedListItemText>
          You agree that you are responsible for the collection and/or payment of all taxes, which you may be liable for in any jurisdiction arising from your use of the Service. FLEETROVER INC. is not responsible for collecting, reporting, paying, or remitting to you any such taxes.
        </NumberedListItemText>
        <NumberedListItemText>
          FLEETROVER INC. shall pay freight charges quoted to you on the Service regardless of whether Shippers pay FLEETROVER INC. In exchange for this guarantee of payment, you shall not invoice or otherwise attempt to collect any amounts related to services provided with respect to any Shipment from any Shipper or any other third party; Carrier shall look solely to FLEETROVER INC. for payment of freight charges hereunder. You hereby waive any right you may otherwise have to proceed or commence any action against any Shipper for the collection of any freight bills arising out of transportation services hereunder. Furthermore, Carrier waives any and all lien rights with respect to any Shipment and if any lien is claimed with respect to any such Shipment by Carrier or a third party to which Carrier tenders such Shipment, Carrier shall immediately take such action as is necessary to satisfy such lien.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Service Incentive Payment
        </NumberedListItemText>
        <NumberedListItemText>
          FLEETROVER INC. may, in its sole discretion, offer to Carrier a Service Incentive Payment (“SIP”).  The SIP, if any, will be quoted separately from the Carrier Fee.  To qualify for the SIP: (i), Carrier must be in compliance with any and all applicable laws, rules and regulations at all times while performing services (including compliance with speed limits and hours of service regulations); (ii) Carrier must deliver the cargo at the appointed time; (iii) Carrier must provide a proof of delivery to FLEETROVER INC. within twenty-four hours of delivery which indicates that the cargo was delivered without shortage, loss or damage; and (iv) prior to payment, FLEETROVER INC. must not have received any complaint or claim from the Shipper or receiver regarding Carrier’s services with respect to the load in question.  If FLEETROVER INC. pays the SIP to Carrier, but later learns that the Carrier failed to abide by applicable law in performance of the services to which the SIP related, or if FLEETROVER INC. subsequently receives a claim or complaint from the Shipper or receiver related to the services to which the SIP related, Carrier will refund the SIP upon demand.  FLEETROVER INC. may offset the amount of such SIP against any funds due and owing to FLEETROVER INC.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Payment Facilitation and Processing
        </NumberedListItemText>
        <NumberedListItemText>
          All charges are facilitated through a third-party payment processing service. FLEETROVER INC. may replace its third-party payment processing services without notice to you.
        </NumberedListItemText>
        <NumberedListItemText>
          FLEETROVER INC.’s Payment processing services are provided by Stripe and subject to the Stripe Connected Account Agreement (available at https://stripe.com/us/connect-account/legal), which includes the Stripe Services Agreement (available at https://stripe.com/us/legal) (collectively, the "Stripe Terms"). By using the FLEETROVER INC. Platform to receive payment proceeds, you agree to be bound by the Stripe Terms, which may be modified from time to time. As a condition of FLEETROVER INC. enabling payment processing services through Stripe, you authorize FLEETROVER INC. to obtain all necessary access and perform all necessary activity on your Stripe Connected Account to facilitate your provision of Services as contemplated by the Agreement and your relationship with FLEETROVER INC. You further agree to provide accurate and complete information about you and your business, and authorize FLEETROVER INC. to share it and transaction information with Stripe for the purposes of facilitating of the payment processing services provided by Stripe. FLEETROVER INC. reserves the right to switch payment processing vendors in its sole discretion.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default PaymentTerms;
