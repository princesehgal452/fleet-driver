import React from 'react';
import { List } from '@material-ui/core';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';
import DottedListItem from '../DottedListItem';
import DottedListItemText from '../DottedListItemText';

const Licenses = () => (
  <>
    <Header>
      LICENSES
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText header>
          Accounts
        </NumberedListItemText>
        <NumberedListItemText>
          In order to use certain features of the Service, you must register for an account with FLEETROVER INC. (“Account”) and provide certain information as prompted by the registration and Shipment creation form. You represent and warrant that: (a) all required registration information you submit is truthful and accurate; and (b) you will maintain the accuracy of such information. You may delete your Account at any time, for any reason, by contacting FLEETROVER INC. or following the instructions on the Service. You are responsible for maintaining the confidentiality of your Account login credentials and are fully responsible for all activities that occur under your Account. You agree to immediately notify FLEETROVER INC. of any unauthorized use, or suspected unauthorized use of your Account or any other breach of security. FLEETROVER INC. is not liable for any loss or damage arising from your failure to comply with the above requirements.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Telephone Calls and Text Messages
        </NumberedListItemText>
        <NumberedListItemText>
          Upon registration for an account, you will be asked to provide us with a telephone number at which we can reach you. That number is required to connect Shippers with Carriers for the transportation of cargo and so that FLEETROVER INC. can reach you with informational calls and SMS and/or MMS text messages related to the transportation of cargo. The frequency of text messages that we send to you depends on your transactions with us and you consent to receive text messages sent through an automatic telephone dialing system. All calls to and from FLEETROVER INC. may be monitored or recorded for quality and training purposes.
        </NumberedListItemText>
        <NumberedListItemText>
          If you elect to receive promotional text messages in connection with your account, we may also send you promotional text messages and you consent to receive text messages sent through an automatic telephone dialing system.
        </NumberedListItemText>
        <NumberedListItemText>
          All charges are billed by and payable to your wireless service provider. Please contact your wireless service provider for pricing plans and details. If you wish to opt out of such text messages, you may do so by following the "opt-out" instructions in the text message, or by editing your account settings. Message and data rates may apply. We will treat data collected through text messages in accordance with our Privacy Policy.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Site
        </NumberedListItemText>
        <NumberedListItemText>
          FLEETROVER INC. owns and retains ownership in the Site and all intellectual property therein. Subject to the terms of this Agreement, FLEETROVER INC. grants you a limited, non-transferable, non-exclusive, revocable license to use the Site for your internal business use during the term of this Agreement.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Mobile App
        </NumberedListItemText>
        <NumberedListItemText>
          FLEETROVER INC. owns and retains ownership in the Mobile App and all intellectual property therein. Subject to the terms of this Agreement, FLEETROVER INC. grants you a limited, non-transferable, non-exclusive, revocable license to install and use the Mobile App, in executable object code format only, solely on your own handheld mobile device and for your internal business use during the term of this Agreement.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Restrictions
        </NumberedListItemText>
        <NumberedListItemText>
          The rights granted to you in this Agreement are subject to the following restrictions:
        </NumberedListItemText>
        <List>
          <DottedListItem>
            <DottedListItemText>
              You shall not license, sell, rent, lease, transfer, assign, distribute, host, or otherwise commercially exploit the Service;
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              You shall not modify, make derivative works of, disassemble, reverse compile or reverse engineer any part of the Service;
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              You shall not access the Service in order to build a similar or competitive service; and
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              Except as expressly stated herein, no part of the Service may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means.
            </DottedListItemText>
          </DottedListItem>
        </List>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Limited Support
        </NumberedListItemText>
        <NumberedListItemText>
          Users may contact FLEETROVER INC.’s technical support center for any support- related issues arising from the use of the Service by following the instructions on the Service.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default Licenses;
