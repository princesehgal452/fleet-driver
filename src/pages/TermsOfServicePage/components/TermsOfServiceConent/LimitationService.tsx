import React from 'react';
import Header from '../Header';
import NumberedList from '../NumberedList';
import NumberedListItem from '../NumberedListItem';
import NumberedListItemText from '../NumberedListItemText';

const LimitationService = () => (
  <>
    <Header>
      LIMITATIONS ON USE OF THE SERVICE
    </Header>
    <NumberedList>
      <NumberedListItem>
        <NumberedListItemText>
          You agree not to use the Service to upload, transmit, display, or distribute any User Content that: (a) violates any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of publicity, or any other intellectual property or proprietary right; or (b) is unlawful, harassing, abusive, tortious, threatening, harmful, invasive of another’s privacy, vulgar, defamatory, false, intentionally misleading, trade libelous, pornographic, obscene, patently offensive (e.g., material that promotes racism, bigotry, hatred, or physical harm of any kind against any group or individual) or otherwise objectionable material of any kind or nature or which is harmful to minors in any way.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          In addition, you agree not to use the Service to: (a) upload, transmit, or distribute any computer viruses, worms, or any software intended to damage or alter a computer system or data; (b) send unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes, or any other form of duplicative or unsolicited messages, whether commercial or otherwise; (c) harvest, collect, gather or assemble information or data regarding other Users, including e-mail addresses, without their consent; (d) interfere with, disrupt, or create an undue burden on servers or networks connected to the Service or violate the regulations, policies or procedures of such networks; (e) attempt to gain unauthorized access to the Service, other computer systems or networks connected to or used together with the Service, through password mining or other means; (f) harass or interfere with another User’s use and enjoyment of the Service; or (g) introduce software or automated agents or scripts to the Service so as to produce multiple accounts, generate automated searches, requests and queries, or to strip, scrape, or mine data from the Service.
        </NumberedListItemText>
      </NumberedListItem>
      <NumberedListItem>
        <NumberedListItemText>
          FLEETROVER INC. reserves the right to review any User Content, investigate, and /or take appropriate action against you in its sole discretion, including removing or modifying User Content, terminating your Account, and/or reporting you to law enforcement authorities. However, FLEETROVER INC. has no obligation, to monitor, modify or remove any User Content.
        </NumberedListItemText>
      </NumberedListItem>
    </NumberedList>
  </>
);

export default LimitationService;
