import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { observer } from 'mobx-react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { Divider, FormGroup, Grid, Typography, Box } from '@material-ui/core';
import TruckEquipmentSelect from '../TruckEquipmentSelect';
import FOSelectListItem from '../../../../components/FOSelectListItem';
import InviteNewDriver from '../../../../DriverApp/components/InviteNewDriver';
import FODriverOverviewCard from '../../../../components/FODriverOverviewCard';
import FOAddNewItem from '../../../../components/FOAddNewItem';
import { UserStore } from '../../../../DriverApp/store/UserStore';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import { DispatchableType } from '../../../../models/dataStructures/DispatchableType';
import ConfigStore from '../../../../DriverApp/store/ConfigStore';


const formName = 'dispatcherInfoDriverSelectForm';

const styles = () => ({
  subtitle: {
    fontWeight: 375,
  },
  divider: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  regularText: {
    fontWeight: 400
  },
  fullWidth: {
    width: '100%'
  }
});

interface IDispatcherInfoDriverSelectOwnProps {
  formRef: () => void;
  userStore: UserStore;
  configStore?: ConfigStore;
}

interface IDispatcherInfoDriverSelectState {
  selectedDriverTrucks: object;
  currentDriver: null | DriverTruck;
  openDriverInvitation: boolean;
  inviteDriverHighlightText: string;
  inviteDriverHighlightVisible: boolean;
}

type IDispatcherInfoDriverSelectProps =
  IDispatcherInfoDriverSelectOwnProps
  & InjectedFormProps
  & WithStyles<typeof styles>;

@observer
class DispatcherInfoDriverSelect extends React.Component<IDispatcherInfoDriverSelectProps, IDispatcherInfoDriverSelectState> {
  constructor(props: IDispatcherInfoDriverSelectProps) {
    super(props);
    this.state = {
      selectedDriverTrucks: {},
      currentDriver: null,
      openDriverInvitation: false,
      inviteDriverHighlightText: 'Don’t see your driver in this list? Invite them by tapping Send Invite.',
      inviteDriverHighlightVisible: false,
    };
  }

  componentDidMount() {
    const { userStore: { dispatcherTrucks } } = this.props;
    if (dispatcherTrucks.length > 0) {
      this.handleChange();
    }
    setTimeout(this.showInviteDriverHighlight, 2000);
  }

  showInviteDriverHighlight = () => {
    this.setState({ inviteDriverHighlightVisible: true });
  };

  handleChange = (driverTruck?: DriverTruck, newEquipmentTypeList: string[] = []) => {
    const { userStore: { dispatcherTrucks, setDispatcherTrucks }, change } = this.props;
    const apiDriversKeys: any[] = [];
    const trucks = dispatcherTrucks.map(({ truckId, equipmentTypeList, dispatchable, ...rest }) => {
      let dispatchableNewState = dispatchable;
      let truckEquipmentTypeList = equipmentTypeList;
      if ((truckId === (driverTruck && driverTruck.truckId))) {
        dispatchableNewState = newEquipmentTypeList.length > 0 ? DispatchableType.DISPATCHABLE : DispatchableType.NOTDISPATCHABLE;
        truckEquipmentTypeList = newEquipmentTypeList;
      }
      const apiTruckKeys = {
        truckId,
        equipmentTypeList: truckEquipmentTypeList,
        dispatchable: dispatchableNewState,
      };
      apiDriversKeys.push(apiTruckKeys);
      return new DriverTruck({
        ...rest,
        ...apiTruckKeys,
      });
    });
    setDispatcherTrucks(trucks);
    change('drivers', apiDriversKeys);
    const updatedSelectedDriverTrucks = trucks.reduce((previousValue, { truckId, dispatchable }) => ({
      ...previousValue,
      [truckId]: dispatchable === DispatchableType.DISPATCHABLE,
    }), {});
    this.setState({
      selectedDriverTrucks: updatedSelectedDriverTrucks,
    });
  };

  driverSelect = (driver: DriverTruck) => () => {
    this.setState({ currentDriver: driver });
  };

  resetCurrentDriver = () => {
    this.setState({ currentDriver: null });
  };

  toggleDriverInvitation = () => {
    const { openDriverInvitation: openDriverInvitationValue } = this.state;
    this.setState({ openDriverInvitation: !openDriverInvitationValue });
  };

  render() {
    const { formRef, handleSubmit, userStore: { dispatcherTrucks, FOUser, userFirstName }, configStore: { isGeotab }, classes } = this.props;
    const { selectedDriverTrucks, openDriverInvitation, inviteDriverHighlightText, inviteDriverHighlightVisible, currentDriver } = this.state;
    return (
      <>
        <form className={`form-container ${isGeotab && classes.fullWidth}`} ref={formRef} onSubmit={handleSubmit}>
          <div className='additional-info-form additional-info-form--drivers'>
            <div className='additional-info-form__header'>
              <div className='title-section'>
                <Box my={isGeotab ? 3 : 0}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography component='p' variant={isGeotab ? 'h5' : 'h4'} align='center'>
                        {`Hi ${userFirstName},`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography component='p' variant={isGeotab ? 'h6' : 'h5'} align='center'
                      className={classNames({ [classes.regularText]: isGeotab })}>
                        nice to see you here.
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider className={classes.divider} />
                    </Grid>
                    {FOUser?.truck?.dotNumber && (
                      <Grid item xs={12}>
                        <Typography component='p' variant={isGeotab ? 'body1' : 'h5'} align='center'>
                          {`DOT - ${FOUser?.truck?.dotNumber}`}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <Typography component='h1' variant={isGeotab ? 'subtitle1' : 'h5'} align='center' color={isGeotab ? 'textSecondary' : 'inherit'}>
                        Please set up your fleet.
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div>
              <FormGroup className='select-group'>
                <Grid container spacing={1} justify='center'>
                  {dispatcherTrucks.map((driverTruck) => (
                    <Grid item xs={12} key={`confirm-${driverTruck.truckId}`}>
                      <FOSelectListItem
                        selected={selectedDriverTrucks[driverTruck.truckId]}
                        onClick={this.driverSelect(driverTruck)}
                      >
                        <FODriverOverviewCard driver={driverTruck} showEquipment isGeotab={isGeotab} />
                      </FOSelectListItem>
                    </Grid>
                  ))}
                  {
                    !isGeotab && (
                      <Grid item xs={12}>
                        <FOAddNewItem openHandler={this.toggleDriverInvitation} text='Add New Driver' />
                        <InviteNewDriver open={openDriverInvitation} closeHandler={this.toggleDriverInvitation} />
                      </Grid>
                    )
                  }
                </Grid>
              </FormGroup>
            </div>
          </div>
        </form>
        <TruckEquipmentSelect
          driver={currentDriver}
          handleDriverSelect={this.handleChange}
          onClose={this.resetCurrentDriver}
          isGeotab={isGeotab}
          selectValue={currentDriver?.equipmentTypeList[0]}
        />
      </>
    );
  }
}

const DispatcherInfoDriverSelectForm = reduxForm({
  form: formName,
  destroyOnUnmount: true, // <------ dont preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(withStyles(styles)(DispatcherInfoDriverSelect));

const DispatcherInfoConnect = connect(
  null,
  null,
  null,
  { forwardRef: true },
)(DispatcherInfoDriverSelectForm);

export default DispatcherInfoConnect;
