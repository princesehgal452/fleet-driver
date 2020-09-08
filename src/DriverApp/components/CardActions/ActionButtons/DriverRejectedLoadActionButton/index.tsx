import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Cancel from '@material-ui/icons/Cancel';
import FOCardActionListItem from '../../../../../components/FOCardActionListItem';
import Load from '../../../../../models/dataStructures/Load';


interface IDriverRejectedLoadActionButtonOwnProp {
  load: Load | null;
}

type IDriverRejectedLoadActionButtonButtonProp = IDriverRejectedLoadActionButtonOwnProp & RouteComponentProps;

const DriverRejectedLoadActionButton = ({ load }: IDriverRejectedLoadActionButtonButtonProp) => (
  load && (
    <>
      <FOCardActionListItem
        Icon={Cancel}
        text='You have Rejected this load offer'
        color='error'
        variant='contained'
        disabled
      />
    </>
  )
);

export default withRouter(observer(DriverRejectedLoadActionButton));
