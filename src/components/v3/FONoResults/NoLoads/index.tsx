import React, { memo, ReactNode } from 'react';

import NoLoadsSVG from 'assets/images/svg/NoLoadsSVG.svg';

import FONoResults from '..';


interface INoNotificationsProps {
  routeToRAL?: () => void;
  message: ReactNode;
}

const NoLoads = memo(({ routeToRAL, message }: INoNotificationsProps) => {

  return (
    <FONoResults
      buttonText='Request a load'
      buttonOnClick={routeToRAL}
      image={<NoLoadsSVG />}
      message={message}
    />
  );
});

export default NoLoads;
