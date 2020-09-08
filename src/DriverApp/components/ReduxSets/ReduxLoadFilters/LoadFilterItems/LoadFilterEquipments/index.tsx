import React, { memo, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { Field, WrappedFieldProps } from 'redux-form';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import FOFiltersAccordion from 'components/FOFiltersAccordion';
import { IOption } from 'SearchLoadsContent/SearchLoadsContentForm';
import truck01 from 'assets/images/png/filterEquipments/truck01.png';
import truck02 from 'assets/images/png/filterEquipments/truck02.png';
import { TRUCKS_EQUIPMENT_TYPES } from 'services/constants';


interface IEquipmentTypeListOption extends IOption {
  img: string;
}

const equipmentImage = {
  van: truck01,
  reefer: truck02,
  flatbed: truck01,
  stepDeck: truck01,
  powerOnly: truck02,
  hopperBottom: truck01,
  doubleDrop: truck01,
  doubleTruck: truck02,
  lowboy: truck01,
  auto: truck01,
  tanker: truck02,
  container: truck01,
  conestoga: truck01,
};

const equipmentTypeList: IEquipmentTypeListOption[] = TRUCKS_EQUIPMENT_TYPES.map((truckType) => ({
  fieldName: truckType.value, label: truckType.label, value: false, img: equipmentImage[truckType.value],
})).concat([
  { fieldName: 'placeholder1', label: 'Place Holder', value: false, img: truck02 },
  { fieldName: 'placeholder2', label: 'Place Holder', value: false, img: truck01 },
]);

const useStyles = makeStyles((theme: Theme) => ({
  imgContainer: {
    width: 57,
    height: 57,
    backgroundColor: '#EFEFEF',
    border: '1px solid #D8D8D8',
    borderRadius: 100,
  },
  imgContainerActive: {
    backgroundColor: '#DAF7E3',
  },
  imgContainerChild: {
    width: 53,
    height: 53,
    margin: 1,
    border: '1px solid #31B958',
    borderRadius: 100,
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    paddingBottom: 8,
  },
  labelActive: {
    color: theme.palette.primary.main,
  },
}));

const FOEquipmentType = ({ input, label, currentValue, imgSrc }: WrappedFieldProps) => {
  const classes = useStyles();
  const active = useMemo(() => input.value, [input.value, currentValue]);
  const onClickHandler = useCallback((e) => {
    input.onChange(!input.value);
  }, [input]);

  return (
    <Grid container direction='column' alignItems='center' onClick={onClickHandler}>
      <Grid item>
        <div className={clsx(classes.imgContainer, { [classes.imgContainerActive]: active })}>
          <div className={clsx({ [classes.imgContainerChild]: active })}>
            <Grid container justify='center' alignItems='center'>
              <img src={imgSrc} />
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item>
        <Typography variant='subtitle1' className={clsx(classes.label, { [classes.labelActive]: active })}>
          {label}
        </Typography>
      </Grid>
    </Grid>
  );
};

const LoadFilterEquipments = memo(({ fieldName, equipmentTypeListFieldValue }) => {
  return (
    <FOFiltersAccordion title='EQUIPMENT(S)'>
      <Grid container justify='space-between'>
        {equipmentTypeList.map((option) => {
          const currentValue = equipmentTypeListFieldValue ? equipmentTypeListFieldValue[option.fieldName] : false;
          return (
            <Grid item xs={4}>
              <Field
                component={FOEquipmentType}
                name={`${fieldName}.${option.fieldName}`}
                label={option.label}
                // currentValue={currentValue}
                imgSrc={option.img}
              />
            </Grid>
          );
        })}
      </Grid>
    </FOFiltersAccordion>
  );
});

export default LoadFilterEquipments;
