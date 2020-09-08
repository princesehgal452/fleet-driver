import React from 'react';
import { observer } from 'mobx-react';
import Load from 'models/dataStructures/Load';
import LoadsmartLogo from 'assets/images/png/LoadsmartLogo.png';


interface ILoadCardInfoColumnOwnProps {
  load: Load;
  className: any;
}

const LoadCompanyLogo = observer(({ load, className }: ILoadCardInfoColumnOwnProps) => {


  const hasCompanyLogo = (load?.loadSmart || load?.companyLogo);
  const companyLogoSrc = load?.loadSmart ? LoadsmartLogo : load?.companyLogo;
  return (
    <>
      {
        hasCompanyLogo && (
          <img src={companyLogoSrc} className={className} />
        )
      } 
    </>
  );

});

export default LoadCompanyLogo;
