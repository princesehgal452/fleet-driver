import React from 'react';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { change, formValueSelector, reduxForm, reset } from 'redux-form';
import { parseAddressAndRefactorLocation } from 'utils/utility';

import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { locationRequired } from 'services/Validations';
import { ILaneAddress, IOperatingLane } from 'models/interfaces/shared/IOperatingLanes';

import ReduxPickupDropoffLocationSet from 'components/v3/ReduxSets/ReduxPickupDropoffLocationSet';
import LocationStepper from 'components/v3/ReduxSets/LocationStepper';

import LaneIcon from 'assets/images/png/LaneIcon.png';
import AddLaneFinalStep from './AddLaneFinalStep';


const formFields = {
  pickupLane: {
    name: 'pickupLane',
    validator: [locationRequired],
  },
  dropoffLane: {
    name: 'dropoffLane',
  },
  name: 'name',
};

export enum SearchSteps {
  pickupLane,
  dropoffLane,
  name,
}

const formName = 'addLanesV3Form';

interface IAddLaneContentFormOwnProps {
  operatingLanes: IOperatingLane[];
  addLaneSaveHandler: (receivingDataPickup: ILaneAddress, receivingDataDropoff: ILaneAddress, name: string) => void;
  triggerSaveLane: (operatingLane?: IOperatingLane) => void;
  resetAfterSubmit?: boolean;
}

interface IAddLaneContentFormState {
  currentStep: SearchSteps;
}

type IAddLaneContentFormProps = IAddLaneContentFormOwnProps & IDriverAppStore;

@inject('driverAppStore')
@observer
class AddLaneContentFormContainer extends React.Component<IAddLaneContentFormProps, IAddLaneContentFormState> {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: SearchSteps.pickupLane,
    };
  }

  submitHandler = (stepNumber?: SearchSteps) => (values, dispatch) => {
    if (stepNumber !== undefined) {
      this.setState({ currentStep: stepNumber });
    } else {
      const { currentStep } = this.state;
      let submitValues = { ...values };
      if (currentStep === SearchSteps.pickupLane) {
        this.setState({ currentStep: SearchSteps.dropoffLane });
      } else if (currentStep === SearchSteps.dropoffLane) {
        this.setState({ currentStep: SearchSteps.name });
      } else if (currentStep === SearchSteps.name) {
        this.parseSubmitValuesForApi(submitValues);
        dispatch(reset('addLanesV3Form'));
        if (this.props.resetAfterSubmit) {
          this.resetSteps(dispatch);
        }
      }
    }
  };

  parseSubmitValuesForApi = async (submitValues) => {
    const { pickupLane, dropoffLane, name } = submitValues;
    const pickupRefactored = await parseAddressAndRefactorLocation(pickupLane, true);
    const dropoffRefactored = await parseAddressAndRefactorLocation(dropoffLane, true);
    this.props.addLaneSaveHandler(
      {
        city: pickupRefactored.city,
        state: pickupRefactored.state,
        country: pickupRefactored.country,
        coordinates: pickupRefactored.coordinates,
      }, {
        city: dropoffRefactored.city,
        state: dropoffRefactored.state,
        country: dropoffRefactored.country,
        coordinates: dropoffRefactored.coordinates,
      },
      name,
    );
  };

  programmaticFormSubmit = (stepNumber?: SearchSteps) => () => {
    const { handleSubmit, resetAfterSubmit } = this.props;
    const submitter = handleSubmit(this.submitHandler(stepNumber));
    submitter();
  };

  getStepText = (): string => {
    const { currentStep } = this.state;
    if (currentStep === 0) {
      return 'Preferred Pickup Lane?';
    }
    if (currentStep === 1) {
      return 'Preferred Drop-off Name?';
    }
    if (currentStep === 2) {
      return 'Enter Lane Name';
    }
    return '';
  };

  resetSteps = (dispatch) => {
    this.setState({ currentStep: SearchSteps.pickupLane });
    this.props.dispatch(reset('addLanesV3Form'));
  };

  render() {
    const { currentStep } = this.state;
    const { driverAppStore, pickupLane, dropoffLane, change, triggerSaveLane, operatingLanes } = this.props;

    const { searchStoreV3 } = driverAppStore as DriverAppStore;
    const { searchResults, recentSearches, recentPickupLocations, recentDropoffLocations, downloadSearchResults } = searchStoreV3;

    return (
      <form>
        <LocationStepper
          step={currentStep}
          stepText={this.getStepText()}
          programmaticFormSubmit={this.programmaticFormSubmit}
          pickupLocationFieldValue={pickupLane}
          dropoffLocationFieldValue={dropoffLane}
        />
        <ReduxPickupDropoffLocationSet
          step={currentStep}
          change={change}
          pickupLocationField={formFields.pickupLane}
          dropoffLocationField={formFields.dropoffLane}
          recentPickupLocations={recentPickupLocations}
          recentDropoffLocations={recentDropoffLocations}
          pickupLocationFieldValue={pickupLane}
          dropoffLocationFieldValue={dropoffLane}
          pastLocationLoading={recentSearches.loading}
          downloadPastLocations={recentSearches.downloadResults}
          downloadNextResults={recentSearches.downloadNextResults}
          pagination={recentSearches.pagination}
          programmaticFormSubmit={this.programmaticFormSubmit}
          pickupLocationAddonStart={<img src={LaneIcon} alt='Lane' height={18} />}
          dropoffLocationAddonStart={<img src={LaneIcon} alt='Lane' height={18} />}
          extraSteps={
            currentStep === 2 && (
              <AddLaneFinalStep
                programmaticFormSubmit={this.programmaticFormSubmit()}
                triggerSaveLane={triggerSaveLane}
                resetSteps={this.resetSteps}
              />
            )
          }
        >
        </ReduxPickupDropoffLocationSet>
      </form>
    );
  }
}

const AddLaneContentForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
  enableReinitialize: true,
})(AddLaneContentFormContainer);

const selector = formValueSelector(formName);
const getInitialValues = (props) => {
};

const AddLaneContentFormConnect = connect(
  (state, ownProps) => ({
    initialValues: getInitialValues(ownProps),
    [formFields.pickupLane.name]: selector(state, formFields?.pickupLane?.name),
    [formFields.dropoffLane.name]: selector(state, formFields?.dropoffLane?.name),
    [formFields.name]: selector(state, formFields?.name),
  }),
  (dispatch) => bindActionCreators({ change }, dispatch),
  null,
  { forwardRef: true },
)(AddLaneContentForm);

export default AddLaneContentFormConnect;
