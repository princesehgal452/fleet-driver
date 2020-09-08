import React from 'react';
import { observer } from 'mobx-react';
import InviteNewDriverContent from './InviteNewDriverContent';
import FOBottomSheet from '../../../components/FOBottomSheet';


interface IInviteNewDriverOwnProps {
  open: boolean;
  closeHandler: () => void;
}

type IInviteNewDriverProps = IInviteNewDriverOwnProps;

const InviteNewDriver = observer(({ open, closeHandler }: IInviteNewDriverProps) => (
  <FOBottomSheet open={open} closeHandler={closeHandler}>
    <InviteNewDriverContent closeHandler={closeHandler} />
  </FOBottomSheet>
));

export default InviteNewDriver;
