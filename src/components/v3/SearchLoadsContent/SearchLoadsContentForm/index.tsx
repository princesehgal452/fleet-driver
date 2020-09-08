import React, { Dispatch } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { change, formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { WithStyles, Zoom, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
  omit,
  refactorLocation,
  refactorMileRate,
  refactorRadius,
  refactorWeightValue,
  isSelectedDateToday,
} from 'utils/utility';
import { ILabelAndValue } from 'models/interfaces/shared/ILabelAndValue';
import { SortValues, deadheadDefault } from 'services/constants';
import { mixpanelSetSearchRALCitiesStates } from 'services/FOMixpanel';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { Pagination } from 'models/interfaces/shared/IPagination';
import { locationRequired } from 'services/Validations';

import ReduxPickupDropoffLocationSet from 'components/v3/ReduxSets/ReduxPickupDropoffLocationSet';
import { IPartner } from 'components/v3/ReduxSets/ReduxLoadFilters/LoadFilterItems/LoadFilterPartners/LoadFilterPartnersCard';
import LocationStepper from 'components/v3/ReduxSets/LocationStepper';
import LoadDatePicker from 'components/v3/LoadDatePicker';
import CurrentDateSelectPrompt from 'components/v3/RALPostContent/CurrentDateSelectPrompt';
import FOSwipeableBottomDrawer from 'components/v3/FOSwipeableBottomDrawer';
import ScrollEventComponent from 'components/v3/ScrollEventComponent';
import FOLoadingSpinner from 'components/v3/WithFOLoading/FOLoadingSpinner';
import BRFLogoStackedActive from 'assets/images/BigRoadFreight-Logo-Stacked.png';
import BRFLogoStackedInactive from 'assets/images/BigRoadFreight-Logo-Stacked-Gray.png';

import SearchLoadsContentResults from '../SearchLoadsContentResults';
import SearchLoadsSortFilters from '../SearchLoadsSortFilters';
import styles from './styles';

const formFields = {
  pickupLocation: {
    name: 'pickupLocation',
    validator: [locationRequired],
  },
  dropoffLocation: {
    name: 'dropoffLocation',
  },
  pickupDate: {
    name: 'pickupDate',
  },
};

export enum SearchSteps {
  pickupLocation,
  dropoffLocation,
  pickupDate,
  results,
}

const stepFields = {
  [SearchSteps.pickupLocation]: [
    formFields.pickupLocation,
  ],
  [SearchSteps.dropoffLocation]: [
    formFields.dropoffLocation,
  ],
  [SearchSteps.pickupDate]: [
    formFields.pickupDate,
  ],
};

export interface IOption extends ILabelAndValue<boolean> {
  fieldName: string;
}

const loadSortOptions: IOption[] = [
  { label: 'Highest Price', value: false, fieldName: 'rate' },
//   { label: 'Hazmat', value: false, fieldName: 'hazmat' },
  { label: 'Nearest Pickup', value: false, fieldName: 'pickUpDate' },
  { label: 'Tracking', value: false, fieldName: 'tracking' },
  { label: 'Recent Posting', value: false, fieldName: 'newest' },
];

const laneFilterOptions: IOption[] = [
  { label: 'Short', value: true, fieldName: 'ShortHaul' },
  { label: 'Local', value: true, fieldName: 'LocalHaul' },
  { label: 'Long', value: true, fieldName: 'LongHaul' },
];

const sortByFields = {
  partners: {
    name: 'partners',
    options: [{
      value: 'brf0',
      iconActive: BRFLogoStackedActive,
      iconDisabled: BRFLogoStackedInactive,
    }, {
      value: 'brf1',
      iconActive: BRFLogoStackedActive,
      iconDisabled: BRFLogoStackedInactive,
    }, {
      value: 'brf2',
      iconActive: BRFLogoStackedActive,
      iconDisabled: BRFLogoStackedInactive,
    }] as IPartner[],
  },
  loadSorts: {
    name: 'loadSorts',
    options: loadSortOptions,
  },
};

const filterFields = {
  equipmentTypeList: {
    name: 'equipmentTypeList',
  },
  perMileRate: {
    name: 'perMileRate',
  },
  weight: {
    name: 'weight',
  },
  laneSize: {
    name: 'laneSize',
    options: laneFilterOptions,
  },
  loadSize: {
    name: 'loadSize',
  },
};

const advancedFields = {
  // pickupDate: {
  //   name: 'pickupDate',
  // },
  dropoffDate: {
    name: 'dropoffDate',
  },
  pickupRadius: {
    name: 'radius',
  },
  dropoffRadius: {
    name: 'dropoffRadius',
  },
};

const chipLabels = ['Sort By', 'Filter', 'Advanced'];

export enum LoadSortSearchHeaders {
  sortBy,
  filter,
  advanced,
}

const sortFilterFields = {
  [LoadSortSearchHeaders.sortBy]: [
    sortByFields.partners,
    sortByFields.loadSorts,
  ],
  [LoadSortSearchHeaders.filter]: [
    filterFields.equipmentTypeList,
    filterFields.perMileRate,
    filterFields.weight,
    filterFields.laneSize,
    filterFields.loadSize,
  ],
  [LoadSortSearchHeaders.advanced]: [
    // advancedFields.pickupDate,
    advancedFields.dropoffDate,
    advancedFields.pickupRadius,
    advancedFields.dropoffRadius,
  ],
};

const formName = 'searchLoadsV3Form';

interface ISearchLoadsContentFormState {
  selectedOperatingLane;
  currentStep: SearchSteps;
  filtersOpen: boolean;
  showCurrentDatePrompt: boolean;
  showRALSubmitConfirmation: boolean;
  returnToRAL: SearchSteps;
  extendedFabFilter: boolean;
}

interface ISearchLoadsContentFormOwnProps {
  selectedOperatingLane?;
  loadingSelectedLane?: boolean;
  drawerClosed: boolean;
  isRALSearch?: boolean;
  prefillSearchQuery?;
  reflectDrawerState: Dispatch<boolean>;
}

const perMileRateDefaultValue = () => {
  const { currentUser } = firebase.auth();
  if (currentUser && currentUser.foUser?.preferredPerMileRate?.price) {
    return currentUser.foUser.preferredPerMileRate.price;
  }
  return 0;
};

type ISearchLoadsContentFormProps =
  ISearchLoadsContentFormOwnProps
  & IDriverAppStore
  & InjectedFormProps
  & RouteComponentProps
  & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SearchLoadsContentFormContainer extends React.Component<ISearchLoadsContentFormProps, ISearchLoadsContentFormState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOperatingLane: props.selectedOperatingLane,
      currentStep: SearchSteps.pickupLocation,
      filtersOpen: false,
      showCurrentDatePrompt: false,
      showRALSubmitConfirmation: false,
      returnToRAL: SearchSteps.pickupDate,
      extendedFabFilter: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedOperatingLane, drawerClosed, reset, prefillSearchQuery } = this.props;

    if (prevProps.selectedOperatingLane !== selectedOperatingLane) {
      if (selectedOperatingLane) {
        this.setCurrentStep(SearchSteps.pickupDate);
      } else {
        this.setCurrentStep(SearchSteps.pickupLocation);
      }
      this.setState({ selectedOperatingLane });
    }
    
    if (prevProps.drawerClosed !== drawerClosed) {
      if (drawerClosed) {
        reset();
        this.setCurrentStep(SearchSteps.pickupLocation);
        this.hideRalSubmittedConfirmation();
      }
    }

    if (prevProps.prefillSearchQuery !== prefillSearchQuery) {
      if (prefillSearchQuery) {
        this.setCurrentStep(SearchSteps.results);
      }
    }
  }

  get stepText() {
    const { currentStep, showRALSubmitConfirmation } = this.state;
    const { driverAppStore, drawerClosed, isRALSearch } = this.props;
    const { searchStoreV3: { searchResults: { pagination: { totalItems }, results, loading } } } = driverAppStore as DriverAppStore;

    if (drawerClosed) {
      if (isRALSearch) {
        return 'Request your load!';
      }
      return 'Find your load!';
    }

    if (loading && !isRALSearch) {
      return 'We made your search!';
    }

    if (currentStep === SearchSteps.pickupDate) {
      return 'Select Date';
    }

    if (currentStep === SearchSteps.results && !showRALSubmitConfirmation) {
      if (results.length > 0) {
        return `We found ${totalItems} ${totalItems === 1 ? 'load' : 'loads'}!`;
      }
      return 'Sorry, we couldn\'t find any loads for you.';
    }
    return undefined;
  }
  
  findFieldsHaveAnyValue = (field) => {
    if (this.props[field.name] !== undefined) {
      if (this.props[field.name] && typeof this.props[field.name] === 'object') {
        return Object.keys(this.props[field.name]).find((nestedFieldName) => {
          if (field.name === filterFields.laneSize.name) {
            return this.props[field.name][nestedFieldName] === false;
          }
          return this.props[field.name][nestedFieldName] === true;
        });
      }
      if (field.name === filterFields.perMileRate.name) {
        if (this.props[field.name] === perMileRateDefaultValue()) {
          return false;
        }
      }
      return true;
    }
    return false;
  };

  showBadge = () => [
    Boolean(sortFilterFields[LoadSortSearchHeaders.sortBy]
      .find(this.findFieldsHaveAnyValue)),
    Boolean(sortFilterFields[LoadSortSearchHeaders.filter]
      .find(this.findFieldsHaveAnyValue)),
    Boolean(sortFilterFields[LoadSortSearchHeaders.advanced]
      .find(this.findFieldsHaveAnyValue)),
  ];

  initialValuesHelper = (initialValuesObject, fieldsObject) => {
    let initialValues = { ...initialValuesObject };
    Object.keys(fieldsObject).forEach((key) => fieldsObject[key].forEach((field) => {
      initialValues = { ...initialValues, [field.name]: this.props[field.name] };
    }));
    return initialValues;
  };

  setFiltersOpen = (filterNewState: boolean, revertFilterValues?: boolean) => {
    const { perMileRate } = this.props;
    if (filterNewState) {
      this.setState({ filtersOpen: filterNewState });
      if (revertFilterValues) {
        // Set initialize again to ease reset of form
        const { initialize } = this.props;
        let initialValues = {};
        // initialize main step fields
        initialValues = this.initialValuesHelper(initialValues, stepFields);
        if (perMileRate !== undefined) {
          initialValues.perMileRate = perMileRate || perMileRateDefaultValue();
        }
        // initialize sort fields
        // initialValues = this.initialValuesHelper(initialValues, sortFilterFields);
        initialize(initialValues);
      }
    }
    if (!filterNewState) {
      this.setState({ filtersOpen: filterNewState });
      const { reset } = this.props;
      if (revertFilterValues) {
        reset();
      }
      setTimeout(this.programmaticFormSubmit(), 500);
    }
  };

  setCurrentStep = (newStep: SearchSteps) => {
    this.setState({ currentStep: newStep });
  };

  /**
   * RAL Search flow related
   */
  goBackToRAL = () => {
    const { returnToRAL } = this.state;
    if (returnToRAL === SearchSteps.results) {
      this.setState({ showRALSubmitConfirmation: true });
    } else {
      this.setCurrentStep(returnToRAL);
    }
  };

  proceedToResults = (returnToRAL: SearchSteps) => () => {
    this.setState({ currentStep: SearchSteps.results, showCurrentDatePrompt: false, returnToRAL });
  };

  closeCurrentDateSelectPrompt = () => {
    this.setState({ showCurrentDatePrompt: false });
  };

  hideRalSubmittedConfirmation = () => {
    this.setState({ showRALSubmitConfirmation: false });
  };

  submitHandler = (stepNumber?: SearchSteps) => async (values) => {
    // this method is called if form is valid only
    if (stepNumber !== undefined) {
      this.setCurrentStep(stepNumber);
    } else {
      const { currentStep } = this.state;
      const { dropoffLocation, pickupDate, driverAppStore, isRALSearch } = this.props;
      const { searchStoreV3: { searchResults: { setPreviousQuery, setResults, setPagination }, downloadSearchResults } } = driverAppStore as DriverAppStore;

      const submitValues = { ...values };
      if (currentStep === SearchSteps.pickupLocation) {
        setPreviousQuery(this.parseSubmitValuesForApi(submitValues));
        if (dropoffLocation?.description && dropoffLocation?.coordinates) {
          if (pickupDate && !isRALSearch) {
            this.setState({ currentStep: SearchSteps.results });
          } else {
            this.setState({ currentStep: SearchSteps.pickupDate });
          }
        } else {
          this.setState({ currentStep: SearchSteps.dropoffLocation });
        }
      } else if (currentStep === SearchSteps.dropoffLocation) {
        setPreviousQuery(this.parseSubmitValuesForApi(submitValues));
        if (!pickupDate || isRALSearch) {
          this.setState({ currentStep: SearchSteps.pickupDate });
        } else {
          this.setState({ currentStep: SearchSteps.results });
        }
      } else if (currentStep === SearchSteps.pickupDate) {
        setPreviousQuery(this.parseSubmitValuesForApi(submitValues));
        setResults([]);
        setPagination(new Pagination());
        if (isRALSearch) {
          const isToday = isSelectedDateToday(submitValues.pickupDate);
          await downloadSearchResults(1);
          this.hideRalSubmittedConfirmation();
          const { searchStoreV3: { searchResults: { pagination: { totalItems } } } } = driverAppStore as DriverAppStore;
          if (isToday && totalItems > 0) {
            this.setState({ showCurrentDatePrompt: true });
          } else {
            this.programmaticFormSumitToRAL();
          }
        } else {
          this.setState({ currentStep: SearchSteps.results });
        }
      } else if (currentStep === SearchSteps.results) {
        const valuesParsed = this.parseSubmitValuesForApi(submitValues);
        setPreviousQuery(valuesParsed);
        setResults([]);
        setPagination(new Pagination());
        await downloadSearchResults(1);
      }
    }
  };

  formSubmitVoidHandler = () => {
    // We are always programmatically submitting the form
    // Use this.programmaticFormSubmit to handle form submits
  };

  parseSubmitValuesForApi = (submitValues) => {
    const {
      driverAppStore,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      loadSorts,
      equipmentTypeList,
      perMileRate,
      weight,
      laneSize,
      loadSize,
      dropoffDate,
      radius,
      dropoffRadius,
    } = this.props;
    const { searchStoreV3: { setSortFilter } } = driverAppStore as DriverAppStore;
    if (pickupLocation && pickupLocation.coordinates) {
      mixpanelSetSearchRALCitiesStates(pickupLocation);
      submitValues = { ...submitValues, [formFields.pickupLocation.name]: refactorLocation(pickupLocation) };
    } else {
      submitValues = omit(submitValues, [formFields.pickupLocation.name]);
    }
    if (dropoffLocation && dropoffLocation.coordinates) {
      mixpanelSetSearchRALCitiesStates(dropoffLocation);
      submitValues = { ...submitValues, [formFields.dropoffLocation.name]: refactorLocation(dropoffLocation) };
    } else {
      submitValues = omit(submitValues, [formFields.dropoffLocation.name]);
    }
    if (!pickupDate) {
      submitValues = omit(submitValues, [formFields.pickupDate.name]);
    }
    const sorts: SortValues[] = [];
    if (loadSorts) {
      sortByFields.loadSorts.options.forEach(({ fieldName }) => {
        const filterFieldValue = loadSorts[fieldName];
        if (filterFieldValue) {
          sorts.push(fieldName);
        }
      });
    }
    setSortFilter(sorts);
    if (equipmentTypeList) {
      submitValues = { ...submitValues, [filterFields.equipmentTypeList.name]: Object.keys(equipmentTypeList) };
    }
    if (perMileRate !== undefined) {
      submitValues = { ...submitValues, [filterFields.perMileRate.name]: refactorMileRate(perMileRate) };
    } else {
      submitValues = { ...submitValues, [filterFields.perMileRate.name]: refactorMileRate(perMileRateDefaultValue()) };
    }
    if (weight) {
      submitValues = { ...submitValues, [filterFields.weight.name]: refactorWeightValue(`0,${weight}`) };
    }
    if (laneSize) {
      const optionsChosen = filterFields.laneSize.options.reduce((acc, curr) => {
        if (laneSize[curr.fieldName] === undefined) {
          return [...acc, curr.fieldName]; // defaults to true
        }
        if (laneSize[curr.fieldName] === true) {
          return [...acc, curr.fieldName];
        }
        return acc;
      }, []);
      submitValues = { ...submitValues, [filterFields.laneSize.name]: optionsChosen.join(',') };
    }
    if (loadSize && loadSize !== 'ALL') {
      submitValues = { ...submitValues, [filterFields.loadSize.name]: loadSize };
    }
    if (pickupDate) {
      submitValues = { ...submitValues, [formFields.pickupDate.name]: pickupDate };
    } else {
      submitValues = omit(submitValues, ['pickupDate']);
    }
    if (dropoffDate) {
      submitValues = { ...submitValues, [advancedFields.dropoffDate.name]: dropoffDate };
    }
    if (radius) {
      submitValues = { ...submitValues, [advancedFields.pickupRadius.name]: refactorRadius(radius) };
    }
    if (dropoffRadius) {
      submitValues = { ...submitValues, [advancedFields.dropoffRadius.name]: refactorRadius(dropoffRadius) };
    }
    return submitValues;
  };

  programmaticFormSubmit = (stepNumber?: SearchSteps) => () => {
    const { handleSubmit, drawerClosed } = this.props;
    if (drawerClosed) {
      return;
    }
    const submitter = handleSubmit(this.submitHandler(stepNumber));
    // submitter won't be called if form is invalid
    submitter(); // submits
  };

  programmaticFormSumitToRAL = async () => {
    const {
      driverAppStore,
      reflectDrawerState,
      history: { push },
      isRALSearch,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      equipmentTypeList,
      perMileRate,
      radius,
    } = this.props;
    const { truckStore: { postMyTruck } } = driverAppStore as DriverAppStore;

    let submitValues = {
      availableDate: new Date(),
      radius: refactorRadius(deadheadDefault), // Take from user set deadhead in settings once implemented || default
      perMileRate: refactorMileRate(perMileRateDefaultValue()),
    };

    if (pickupLocation && pickupLocation.coordinates) {
      mixpanelSetSearchRALCitiesStates(pickupLocation);
      submitValues = { ...submitValues, pickup: refactorLocation(pickupLocation) };
    } else {
      submitValues = omit(submitValues, ['pickup']);
    }
    if (dropoffLocation && dropoffLocation.coordinates) {
      mixpanelSetSearchRALCitiesStates(dropoffLocation);
      submitValues = { ...submitValues, dropoff: refactorLocation(dropoffLocation) };
    } else {
      submitValues = omit(submitValues, ['dropoff']);
    }
    if (pickupDate) {
      submitValues = { ...submitValues, availableDate: pickupDate };
    }
    if (dropoffDate) {
      submitValues = { ...submitValues, expiresOn: dropoffDate };
    }
    if (equipmentTypeList) {
      submitValues = { ...submitValues, equipmentTypeList: Object.keys(equipmentTypeList) };
    }
    if (perMileRate) {
      submitValues = { ...submitValues, perMileRate: refactorMileRate(perMileRate) };
    }
    if (radius) {
      submitValues = { ...submitValues, radius: refactorRadius(radius) };
    }
    try {
      await postMyTruck(submitValues);
      if (isRALSearch) {
        this.setState({ showRALSubmitConfirmation: true }, () => {
          this.proceedToResults(SearchSteps.results)();
        });
      } else {
        setTimeout(push, 200, '/driver/requestLoad');
        reflectDrawerState(false);
      }
    } catch (e) {
      console.log('RAL Post error');
    }
  };

  swipeDownHandler = () => {
    const { extendedFabFilter } = this.state;
    if (!extendedFabFilter) {
      this.setState({ extendedFabFilter: true });
    }
  };

  swipeUpHandler = () => {
    const { extendedFabFilter } = this.state;
    if (extendedFabFilter) {
      this.setState({ extendedFabFilter: false });
    }
  };

  render() {
    const { currentStep, selectedOperatingLane, filtersOpen, showCurrentDatePrompt, showRALSubmitConfirmation, extendedFabFilter } = this.state;
    const {
      loadingSelectedLane = false,
      driverAppStore,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      partners,
      equipmentTypeList,
      reflectDrawerState,
      loadSorts,
      laneSize,
      loadSize,
      change,
      drawerClosed,
      handleSubmit,
      classes,
      isRALSearch,
      prefillSearchQuery,
    } = this.props;

    const { searchStoreV3, truckStore: { loading: ralSubmitLoading } } = driverAppStore as DriverAppStore;
    const {
      recentSearches,
      recentPickupLocations,
      recentDropoffLocations,
      searchResults: {
        loading: isLoadingMatches,
      },
    } = searchStoreV3;

    const ReturnToRAL = () => (
      <div onClick={this.goBackToRAL} className={classes.backButton}>
        <div>Return To</div>
        <div>Request A Load</div>
      </div>
    );

    const showRALBackButton = currentStep === SearchSteps.results && isRALSearch && !showRALSubmitConfirmation;
    return (
      <FOLoadingSpinner loading={loadingSelectedLane}>
        {
          showRALBackButton && (
            <ReturnToRAL />
          )
        }
        <form onSubmit={handleSubmit(this.formSubmitVoidHandler)} className={classes.fullHeight}>
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='stretch'
            className={currentStep !== SearchSteps.results ? classes.fullHeight : ''}
          >
            <Grid item>
              <LocationStepper
                reflectDrawerState={reflectDrawerState}
                disabled={drawerClosed}
                step={currentStep}
                programmaticFormSubmit={this.programmaticFormSubmit}
                pickupLocationFieldValue={pickupLocation || selectedOperatingLane?.pickup}
                dropoffLocationFieldValue={dropoffLocation || selectedOperatingLane?.dropoff}
                stepText={this.stepText}
              />
            </Grid>
            {currentStep <= SearchSteps.dropoffLocation && (
              <Grid item className={classes.flexGrow}>
                <ReduxPickupDropoffLocationSet
                  step={currentStep}
                  change={change}
                  pickupLocationField={formFields.pickupLocation}
                  dropoffLocationField={formFields.dropoffLocation}
                  recentPickupLocations={recentPickupLocations}
                  recentDropoffLocations={recentDropoffLocations}
                  pickupLocationFieldValue={pickupLocation}
                  dropoffLocationFieldValue={dropoffLocation}
                  pastLocationLoading={recentSearches.loading}
                  downloadPastLocations={recentSearches.downloadResults}
                  downloadNextResults={recentSearches.downloadNextResults}
                  pagination={recentSearches.pagination}
                  programmaticFormSubmit={this.programmaticFormSubmit}
                  showNearBy
                  showSkip
                />
              </Grid>
            )}

            {currentStep >= SearchSteps.pickupDate && (
              <Grid item>
                <LoadDatePicker
                  staticPicker={currentStep === SearchSteps.pickupDate}
                  dateField={formFields.pickupDate}
                  onClose={this.programmaticFormSubmit()}
                  disableReselect={isRALSearch}
                />
              </Grid>
            )}
            {currentStep === SearchSteps.results && (
              <Grid item xs={12}>
                <div className='ignore-FOSwipeable'>
                  <ScrollEventComponent
                    onScrollDown={this.swipeDownHandler}
                    onScrollUp={this.swipeUpHandler}
                  >
                    <SearchLoadsContentResults
                      searchStoreV3={searchStoreV3}
                      pickupDateFieldValue={pickupDate}
                      ralSubmitLoading={ralSubmitLoading}
                      reflectDrawerState={reflectDrawerState}
                      setCurrentStep={this.setCurrentStep}
                      programmaticFormSumitToRAL={this.programmaticFormSumitToRAL}
                      showRALSubmitConfirmation={showRALSubmitConfirmation}
                      isRALSearch={isRALSearch}
                      hideRalSubmittedConfirmation={this.hideRalSubmittedConfirmation}
                    />
                  </ScrollEventComponent>
                </div>
              </Grid>
            )}
          </Grid>
          {!drawerClosed && !showRALSubmitConfirmation && (
            <Zoom
              in={currentStep === SearchSteps.results}
              unmountOnExit
              mountOnEnter
            >
              <SearchLoadsSortFilters
                change={change}
                showBadge={this.showBadge()}
                chipLabels={chipLabels}
                partnersField={sortByFields.partners}
                loadSortsField={sortByFields.loadSorts}
                loadSortsFieldValue={loadSorts}
                equipmentTypeListField={filterFields.equipmentTypeList}
                equipmentTypeListFieldValue={equipmentTypeList}
                perMileRateField={filterFields.perMileRate}
                weightField={filterFields.weight}
                laneSizeField={filterFields.laneSize}
                laneSizeFieldValue={laneSize}
                loadSizeField={filterFields.loadSize}
                loadSizeFieldValue={loadSize}
                dropoffLocationFieldValue={dropoffLocation}
                pickupDateField={formFields.pickupDate}
                dropoffDateField={advancedFields.dropoffDate}
                pickupRadiusField={advancedFields.pickupRadius}
                dropoffRadiusField={advancedFields.dropoffRadius}
                searchStoreV3={searchStoreV3}
                setFiltersOpen={this.setFiltersOpen}
                filtersOpen={filtersOpen}
                extendedFabFilter={extendedFabFilter}
              />
            </Zoom>
          )}
        </form>

        {
          isRALSearch && (
            <FOSwipeableBottomDrawer
              maxHeight={200}
              isDrawerOpen={showCurrentDatePrompt}
              variant='temporary'
            >
              <CurrentDateSelectPrompt
                loading={isLoadingMatches}
                proceedToResults={this.proceedToResults}
                handleClose={this.closeCurrentDateSelectPrompt}
                programmaticFormSumitToRAL={this.programmaticFormSumitToRAL}
              />
            </FOSwipeableBottomDrawer>
          )
        }
      </FOLoadingSpinner>
    );
  }
}

const SearchLoadsContentForm = reduxForm({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
  enableReinitialize: true,
})(SearchLoadsContentFormContainer);

const selector = formValueSelector(formName);

const assignLocationProperties = (selectedObject) => {
  if (selectedObject) {
    return {
      description: selectedObject.description || selectedObject.address,
      city: selectedObject.city,
      state: selectedObject.state,
      country: selectedObject.country,
      coordinates: selectedObject.coordinates,
    };
  }
};

const reverseEquipmentType = (formValueArray) => {
  if (formValueArray) {
    let rawValue = {};
    return formValueArray.reduce((obj, item) => ({ ...obj, [item]: true }), rawValue);
  }
};

const reverseLaneSize = (laneSizeString) => {
  if (laneSizeString) {
    const rawValue = {};
    return filterFields.laneSize.options.reduce((obj, item) => {
      if (!laneSizeString.includes(item.fieldName)) {
        return { ...obj, [item.fieldName]: false };
      }
      return obj;
    }, rawValue);
  }
};

const getInitialValues = ({ selectedOperatingLane, prefillSearchQuery }: ISearchLoadsContentFormProps) => {
  const initialValues = {};

  initialValues[filterFields.perMileRate.name] = perMileRateDefaultValue();

  if (selectedOperatingLane) {
    initialValues[formFields.pickupLocation.name] = assignLocationProperties(selectedOperatingLane.pickup);
    initialValues[formFields.dropoffLocation.name] = assignLocationProperties(selectedOperatingLane.dropoff);
  }
  if (prefillSearchQuery) {
    initialValues[formFields.pickupLocation.name] = assignLocationProperties(prefillSearchQuery.pickupLocation);
    initialValues[formFields.dropoffLocation.name] = assignLocationProperties(prefillSearchQuery.dropoffLocation);
    initialValues[formFields.pickupDate.name] = prefillSearchQuery.pickupDate;
    initialValues[sortByFields.partners.name] = prefillSearchQuery.partners;
    initialValues[sortByFields.loadSorts.name] = prefillSearchQuery.loadSorts;
    initialValues[filterFields.equipmentTypeList.name] = reverseEquipmentType(prefillSearchQuery.equipmentTypeList);
    initialValues[filterFields.perMileRate.name] = prefillSearchQuery.perMileRate?.price;
    initialValues[filterFields.weight.name] = prefillSearchQuery.weight?.high;
    initialValues[filterFields.laneSize.name] = reverseLaneSize(prefillSearchQuery.laneSize);
    initialValues[filterFields.loadSize.name] = prefillSearchQuery.loadSize;
    initialValues[advancedFields.dropoffDate.name] = prefillSearchQuery.dropoffDate;
    initialValues[advancedFields.pickupRadius.name] = prefillSearchQuery.radius?.amount;
    initialValues[advancedFields.dropoffRadius.name] = prefillSearchQuery.dropoffRadius?.amount;
  }

  return initialValues;
};


const SearchLoadsContentFormConnect = connect(
  (state, ownProps) => ({
    initialValues: getInitialValues(ownProps),
    [formFields.pickupLocation.name]: selector(state, formFields.pickupLocation.name),
    [formFields.dropoffLocation.name]: selector(state, formFields.dropoffLocation.name),
    [formFields.pickupDate.name]: selector(state, formFields.pickupDate.name),
    [sortByFields.partners.name]: selector(state, sortByFields.partners.name),
    [sortByFields.loadSorts.name]: selector(state, sortByFields.loadSorts.name),
    [filterFields.equipmentTypeList.name]: selector(state, filterFields.equipmentTypeList.name),
    [filterFields.perMileRate.name]: selector(state, filterFields.perMileRate.name),
    [filterFields.weight.name]: selector(state, filterFields.weight.name),
    [filterFields.laneSize.name]: selector(state, filterFields.laneSize.name),
    [filterFields.loadSize.name]: selector(state, filterFields.loadSize.name),
    [advancedFields.dropoffDate.name]: selector(state, advancedFields.dropoffDate.name),
    [advancedFields.pickupRadius.name]: selector(state, advancedFields.pickupRadius.name),
    [advancedFields.dropoffRadius.name]: selector(state, advancedFields.dropoffRadius.name),
  }),
  (dispatch) => bindActionCreators({ change }, dispatch),
  null,
  { forwardRef: true },
)(SearchLoadsContentForm);

export default withRouter(withStyles(styles)(SearchLoadsContentFormConnect));
