import React from 'react';
import { ILaneAddress, IOperatingLane } from '../../../../../../models/interfaces/shared/IOperatingLanes';
import OperatingLanesForm from './OperatingLanesForm';
import FOBottomSheet from '../../../../../../components/FOBottomSheet';
import { refactorLocation } from '../../../../../../utils/utility';


interface IOperatingLanesFormDialogContainerOwnProps {
  operatingLane?: IOperatingLane;
  open: boolean;
  loading: boolean;
  closeHandler: () => void;
  onSubmit: (receivingDataPickup: ILaneAddress, receivingDataDropoff: ILaneAddress) => void;
}

type IOperatingLanesFormDialogContainerProps = IOperatingLanesFormDialogContainerOwnProps;


const formDataNormalize = (onSubmit: (receivingDataPickup: ILaneAddress, receivingDataDropoff: ILaneAddress) => void) => (formData) => {
  const { pickupLane, dropoffLane } = formData;
  const pickupRefactored = refactorLocation(pickupLane, true);
  const dropoffRefactored = refactorLocation(dropoffLane, true);
  onSubmit({
    city: pickupRefactored.city,
    state: pickupRefactored.state,
    country: pickupRefactored.country,
  }, {
    city: dropoffRefactored.city,
    state: dropoffRefactored.state,
    country: dropoffRefactored.country,
  });
};

const OperatingLanesFormDialog = ((
  { open, onSubmit, operatingLane, loading, closeHandler }: IOperatingLanesFormDialogContainerProps,
) => (
  <FOBottomSheet open={open} closeHandler={closeHandler}>
    <OperatingLanesForm operatingLane={operatingLane} loading={loading} closeHandler={closeHandler} onSubmit={formDataNormalize(onSubmit)} />
  </FOBottomSheet>
));


export default OperatingLanesFormDialog;
