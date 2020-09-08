import React from 'react';
import { observer } from 'mobx-react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import FOSelectListItem from '../../../../components/FOSelectListItem';
import MatchDetailInfoCol from '../../../../DriverApp/pages/DriverMatchDetailsPage/components/MatchDetailInfoCol';
import { UserStore } from '../../../../DriverApp/store/UserStore';
import { DispatchableType } from '../../../../models/dataStructures/DispatchableType';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import TruckSVG from '../../../../assets/images/svg/driver/truck.svg';


const formName = 'dispatcherInfoDriversConfirmForm';

interface IDispatcherInfoDriversConfirmOwnProps {
  formRef: () => void;
  userStore: UserStore;
}

type IDispatcherInfoDriversConfirmProps = IDispatcherInfoDriversConfirmOwnProps & InjectedFormProps;

@observer
class DispatcherInfoDriversConfirm extends React.Component<IDispatcherInfoDriversConfirmProps> {
  toggleDriverSelect = (driverTruckId: string) => () => {
    const { userStore: { dispatcherTrucks, setDispatcherTrucks }, change } = this.props;
    const apiTrucksKeys: any[] = [];
    const trucks = dispatcherTrucks.map(({ truckId, equipmentTypeList, dispatchable, ...rest }) => {
      const apiDriverKeys = {
        truckId,
        equipmentTypeList,
      };
      const dispatchableNewState = (
        truckId === driverTruckId ?
          dispatchable === DispatchableType.DISPATCHABLE ?
            DispatchableType.NOTDISPATCHABLE
            : DispatchableType.DISPATCHABLE
          : dispatchable);
      if (dispatchableNewState === DispatchableType.DISPATCHABLE) {
        apiTrucksKeys.push(apiDriverKeys);
      }
      return new DriverTruck({
        ...rest,
        dispatchable: dispatchableNewState,
        ...apiDriverKeys,
      });
    });
    setDispatcherTrucks(trucks); // setting here locally in case the API call fails once the form tries to submit
    change('drivers', apiTrucksKeys);
    this.setState({ currentDriver: null });
  };

  render() {
    const { formRef, handleSubmit, userStore: { dispatcherTrucks } } = this.props;
    return (
      <form className='form-container' ref={formRef} onSubmit={handleSubmit}>
        <div className='additional-info-form additional-info-form--drivers'>
          <div className='additional-info-form__header'>
            <div className='title-section'>
              <Typography variant='h6' className='form-title'>
                Do all these drivers operate under your authority?
              </Typography>
              <div className='image-section'>
                <TruckSVG />
              </div>
            </div>
          </div>
          <div className='additional-info-form__content'>
            <FormGroup className='select-group'>
              <Grid container spacing={1}>
                {dispatcherTrucks.map(driverTruck => (driverTruck.equipmentTypeList.length > 0) && (
                  <Grid key={`select-${driverTruck.truckId}`} item xs={12}>
                    <FOSelectListItem
                      selected={driverTruck.dispatchable === DispatchableType.DISPATCHABLE}
                      onClick={this.toggleDriverSelect(driverTruck.truckId)}
                    >
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography variant='h6'>
                            {driverTruck.firstName} {driverTruck.lastName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <MatchDetailInfoCol
                            title='Equipment Type'
                            value={driverTruck.equipmentTypeList[0]}
                          />
                        </Grid>
                      </Grid>
                    </FOSelectListItem>
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </div>
        </div>
      </form>
    );
  }
}

const DispatcherInfoDriversConfirmForm = reduxForm({
  form: formName,
  destroyOnUnmount: true, // <------ dont preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(DispatcherInfoDriversConfirm);

const DispatcherInfoConnect = connect(
  null,
  null,
  null,
  { forwardRef: true },
)(DispatcherInfoDriversConfirmForm);

export default DispatcherInfoConnect;
