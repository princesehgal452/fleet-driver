import React from 'react';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';

const ThirdpartySite = () => (
  <>
    <Header>
      THIRD PARTY SITES AND LOCATION INFORMATION
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText header>
          Third Party Sites
        </NumberedListItemText>
        <NumberedListItemText>
          The Service might contain links to third party websites, services, and advertisements for third parties (collectively, “Third Party Sites”). Such Third Party Sites are not under the control of FLEETROVER INC. and FLEETROVER INC. is not responsible for any Third Party Sites. FLEETROVER INC. does not review, approve, monitor, endorse, warrant, or make any representations with respect to Third Party Sites. You use all Third Party Sites at your own risk. You should make whatever investigation you feel necessary or appropriate before proceeding with any transaction in connection with such Third Party Sites.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Location Information
        </NumberedListItemText>
        <NumberedListItemText>
          Location data provided by the Service is for basic location purposes only and is not intended to be relied upon in situations where precise location information is needed or where erroneous, inaccurate or incomplete location data may lead to death, personal injury, property or environmental damage, or other loss. Neither FLEETROVER INC., nor any of its content providers, guarantees the availability, accuracy, completeness, reliability, or timeliness of location data displayed by the Services, whether provided by FLEETROVER INC., third party content providers, or Users.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          Geolocational data that You upload, provide, or post on the Services may be accessible to certain Users of the Services. You assume any and all risk of providing such data to other Users of the Services.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default ThirdpartySite;
