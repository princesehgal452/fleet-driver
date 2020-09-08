import React from 'react';
import { observer } from 'mobx-react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import FOGrid from '../../../../components/FOGrid';
import TruckEquipmentSelect from '../../../../Auth/AdditionalInfoPage/components/TruckEquipmentSelect';


interface IDispatchableDriverEquipmentProps {
  driver: DriverTruck;
  onEditClick: () => void;
}

const displayEquipment = (equipmentType: string) => equipmentType.charAt(0).toUpperCase() + equipmentType.slice(1);

const DispatchableDriverEquipment = observer(({ driver: { equipmentTypeList }, onEditClick }: IDispatchableDriverEquipmentProps) => (
  <FOGrid>
    <Grid item xs={12}>
      <Grid container justify='space-between'>
        <Grid item>
          <Typography variant='h6'>Equipment Type</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={onEditClick}><Edit /></IconButton>
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid item>
        <Typography>{equipmentTypeList.length > 0 && displayEquipment(equipmentTypeList[0])}</Typography>
      </Grid>
    </Grid>
  </FOGrid>
));

export default DispatchableDriverEquipment;
