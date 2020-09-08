import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TruckSelectCard from './TruckSelectCard';
import { TRUCKS_EQUIPMENT_TYPES } from '../../services/constants';
import Flatbed from '../../assets/images/png/Flatbed.png';
import Reefer from '../../assets/images/png/Reefer.png';
import DryVan from '../../assets/images/png/DryVan.png';
import FlatbedWhite from '../../assets/images/png/FlatbedWhite.png';
import ReeferWhite from '../../assets/images/png/ReeferWhite.png';
import DryVanWhite from '../../assets/images/png/DryVanWhite.png';


const useStyles = makeStyles((theme: Theme) => ({
  root: props => ({
    height: '100%',
    backgroundColor: props.isGeotab ? '#fff' : theme.palette.background.default,
  }),
  grid: {
    padding: theme.spacing(2),
  },
  divider: {
    marginTop: '25px',
  },
  truckButton: {
    height: theme.spacing(16),
    margin: '0 auto',
  },
}));

interface ITruckSelectContentProps {
  onClose: () => void;
  showClear?: boolean;
  title?: string;
  subTitle?: string;
  selectValue: string;
  loading?: boolean;
  truckButtonClickHandler: (value) => () => void;
  selectHandler: (event) => void;
  isGeotab?: boolean;
}

const TruckSelectContent = ({ truckButtonClickHandler, selectHandler, showClear, selectValue, title, subTitle, onClose, loading, isGeotab }: ITruckSelectContentProps) => {
  const classes = useStyles({ isGeotab });

  return (
    <Grid container className={classes.root} direction='column' justify='space-between'>
      <Grid container spacing={4} className={classes.grid}>
          {showClear && (
          <Grid item>
            <IconButton onClick={onClose}>
              <Clear />
            </IconButton>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant='h4' align='center'>
            {title}
            {subTitle && (
              <>
                <br />
                <Typography variant='h6' align='center'>
                  {subTitle}
                </Typography>
                <Divider className={classes.divider} />
              </>
            )}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {
            isGeotab &&
            <Typography variant='h6' align='center'>
              Equipment type
            </Typography>
          }
          <Typography variant={isGeotab ? 'body1' : 'subtitle2'} align='center'>
            Please select your equipment type
          </Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <TruckSelectCard
            selectValue={selectValue}
            truckButtonClickHandler={truckButtonClickHandler}
            truckImage={isGeotab ? DryVanWhite : DryVan}
            truckType='van'
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TruckSelectCard
            selectValue={selectValue}
            truckButtonClickHandler={truckButtonClickHandler}
            truckImage={isGeotab ? ReeferWhite : Reefer}
            truckType='reefer'
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TruckSelectCard
            selectValue={selectValue}
            truckButtonClickHandler={truckButtonClickHandler}
            truckImage={isGeotab ? FlatbedWhite : Flatbed}
            truckType='flatbed'
          />
        </Grid>
        <Grid item xs={6} sm={12}>
          <Grid container className={classes.truckButton} alignItems='center' justify='center'>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Other</InputLabel>
                <Select
                  value={(selectValue
                    && (selectValue !== 'reefer')
                    && (selectValue !== 'van')
                    && (selectValue !== 'flatbed'))
                    ? selectValue : ''}
                  onChange={selectHandler}
                >
                  {TRUCKS_EQUIPMENT_TYPES.slice(3).map((truck) => (
                    <MenuItem key={truck.value} value={truck.value}>{truck.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {
        !isGeotab &&
        <Button variant='contained' color='primary' disabled={loading} onClick={onClose}>
          Save
        </Button>
      }
    </Grid>
  );
};

export default TruckSelectContent;
