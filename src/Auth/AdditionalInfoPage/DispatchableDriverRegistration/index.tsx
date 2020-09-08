import React from 'react';
import { observer } from 'mobx-react';


interface IDispatchableDriverRegistration {
  nextPageHandler: () => void;
  page: number;
  maxPage: number;
}

const DispatchableDriverRegistration = observer(({
                                                   nextPageHandler, page, maxPage,
                                                 }: IDispatchableDriverRegistration) => {
  if (page <= maxPage) {
    nextPageHandler();
  }
  return (
    <></>
  );
});

export default DispatchableDriverRegistration;
