import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { getCityAndState } from 'utils/utility';


const addressParser = async (address, displayFullAddress, { cityOnly, stateOnly }) => {
  if (!displayFullAddress) {
    const addressParsed = await getCityAndState(address, { cityOnly, stateOnly });
    return addressParsed;
  }
  return displayFullAddress ? address : '';
};

interface IFOAddressProp {
  address: string;
  displayFullAddress?: boolean;
  cityOnly?: boolean
  stateOnly?: boolean
}

interface IFOAddressState {
  addressParsed: string;
}

const FOAddress = observer(({ address, displayFullAddress, stateOnly, cityOnly }: IFOAddressProp) => {
  const [addressParsed, setAddressParsed] = useState('');

  useEffect(() => {
    async function updateAddress() {
      const newAddress = await addressParser(address, displayFullAddress, { cityOnly, stateOnly });
      setAddressParsed(newAddress);
    }

    updateAddress();
  }, [address, displayFullAddress, cityOnly, stateOnly]);

  return (
    <>
      {addressParsed}
    </>
  );
});

export default FOAddress;
