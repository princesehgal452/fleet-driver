import React from 'react';
import { List } from '@material-ui/core';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';
import DottedListItem from '../DottedListItem';
import DottedListItemText from '../DottedListItemText';

const UserContent = () => (
  <>
    <Header>
      USER CONTENT
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText header>
          User Content
        </NumberedListItemText>
        <NumberedListItemText>
          You are solely responsible for your User Content. You assume all risks associated with use of your User Content, including any reliance on its accuracy, completeness or usefulness by others, or any disclosure of your User Content that makes you or any third party personally identifiable. You hereby represent and warrant that your User Content does not violate any provision of this Agreement. For the avoidance of doubt, User Content may include third party content you submit. You agree not to submit third party content unless you have the consent of the applicable third party owner of such content. You may not state or imply that your User Content is in any way provided, sponsored or endorsed by FLEETROVER INC. You acknowledge and agree that FLEETROVER INC. is not responsible for any loss or damage resulting from anyone’s use or reliance on User Content and FLEETROVER INC. makes no guarantees regarding the accuracy, completeness, usefulness currency, suitability, or quality of any User Content, and assumes no responsibility for any User Content.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          License
        </NumberedListItemText>
        <NumberedListItemText>
          Users hereby grant, and represent and warrant that they have the right to grant, to FLEETROVER INC. an irrevocable, nonexclusive, royalty-free and fully paid, sublicenseable, worldwide license, to use, copy, modify, create derivative works of, distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels, now known or hereafter devised (including in connection with the Services and FLEETROVER INC.'s business and on third-party sites and services), without further notice to or consent from You, and without the requirement of payment to You or any other person or entity. All rights in and to the User Content not expressly granted to FLEETROVER INC. in this Agreement are reserved by Users.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Anonymous Data
        </NumberedListItemText>
        <NumberedListItemText>
          FLEETROVER INC. may create anonymous data records (“Anonymous Data”) from your User Content by using commercially reasonable efforts to exclude any and all information (such as company name) that makes the data identifiable to you. FLEETROVER INC. may use and disclose Anonymous Data for any purpose, including improving the Service.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Disclosure
        </NumberedListItemText>
        <NumberedListItemText>
          FLEETROVER INC. may share your User Content (a) with third party service providers; (b) if another company acquires FLEETROVER INC.; and/or (c) to comply with relevant laws, to respond to subpoenas or warrants or assist in preventing any violation or potential violation of the law or this Agreement.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText header>
          Copyright Complaints and Copyright Agent – DMCA Provision
        </NumberedListItemText>
        <List>
          <DottedListItem>
            <DottedListItemText>
              FLEETROVER INC. respects the intellectual property of others, and expects Users to do the same. If you believe, in good faith, that any materials on the Services infringe upon your copyrights, please send the following information to FLEETROVER INC.’s Copyright Agent at support@fleetops.ai
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              A description of the copyrighted work that you claim has been infringed, including specific location on the Services where the material you claim is infringing is located. Include enough information to allow FLEETROVER INC. to locate the material, and explain why you think an infringement has taken place;
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              A description of the location where the original or an authorized copy of the copyrighted work exists – for example, the URL (Internet address) where it is posted or the name of the book in which it has been published;
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              Your address, telephone number, and e-mail address;
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              A statement by you, made under penalty of perjury, that the information in your notice is accurate, and that you are the copyright owner or authorized to act on the copyright owner's behalf; and
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              An electronic or physical signature of the owner of the copyright or the person authorized to act on behalf of the owner of the copyright interest.
            </DottedListItemText>
          </DottedListItem>
          <DottedListItem>
            <DottedListItemText>
              We may terminate access, usage or subscription to the Site, as the case may be, for repeat infringers in appropriate circumstances.
            </DottedListItemText>
          </DottedListItem>
        </List>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default UserContent;
