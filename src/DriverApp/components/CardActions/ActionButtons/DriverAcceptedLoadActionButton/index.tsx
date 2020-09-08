import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import FOCardActionListItem from '../../../../../components/FOCardActionListItem';
import Load from '../../../../../models/dataStructures/Load';


interface IDriverAcceptedLoadActionButtonOwnProp {
  load: Load | null;
  message: string;
}

type IDriverAcceptedLoadActionButtonButtonProp = IDriverAcceptedLoadActionButtonOwnProp & RouteComponentProps;

const DriverAcceptedLoadActionButton = ({ load, message }: IDriverAcceptedLoadActionButtonButtonProp) => (
  load && (
    <>
      <FOCardActionListItem
        Icon={MonetizationOn}
        text={message}
        color='secondary'
        variant='contained'
        disabled
      />
    </>
  )
);

export default withRouter(observer(DriverAcceptedLoadActionButton));
