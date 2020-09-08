webpackHotUpdate("app",{

/***/ "./src/components/v3/SearchLoadsContent/SearchLoadsContentForm/index.tsx":
/*!*******************************************************************************!*\
  !*** ./src/components/v3/SearchLoadsContent/SearchLoadsContentForm/index.tsx ***!
  \*******************************************************************************/
/*! exports provided: SearchSteps, LoadSortSearchHeaders, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchSteps", function() { return SearchSteps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadSortSearchHeaders", function() { return LoadSortSearchHeaders; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! firebase */ "./node_modules/firebase/dist/index.cjs.js");
/* harmony import */ var firebase__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(firebase__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var mobx_react__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobxreact.esm.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var utils_utility__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! utils/utility */ "./src/utils/utility.ts");
/* harmony import */ var services_constants__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! services/constants */ "./src/services/constants.ts");
/* harmony import */ var services_FOMixpanel__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! services/FOMixpanel */ "./src/services/FOMixpanel/index.ts");
/* harmony import */ var models_interfaces_shared_IPagination__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! models/interfaces/shared/IPagination */ "./src/models/interfaces/shared/IPagination/index.ts");
/* harmony import */ var services_Validations__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! services/Validations */ "./src/services/Validations.ts");
/* harmony import */ var components_v3_ReduxSets_ReduxPickupDropoffLocationSet__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! components/v3/ReduxSets/ReduxPickupDropoffLocationSet */ "./src/components/v3/ReduxSets/ReduxPickupDropoffLocationSet/index.tsx");
/* harmony import */ var components_v3_ReduxSets_LocationStepper__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! components/v3/ReduxSets/LocationStepper */ "./src/components/v3/ReduxSets/LocationStepper/index.tsx");
/* harmony import */ var components_v3_LoadDatePicker__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! components/v3/LoadDatePicker */ "./src/components/v3/LoadDatePicker/index.tsx");
/* harmony import */ var components_v3_RALPostContent_CurrentDateSelectPrompt__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! components/v3/RALPostContent/CurrentDateSelectPrompt */ "./src/components/v3/RALPostContent/CurrentDateSelectPrompt/index.tsx");
/* harmony import */ var components_v3_FOSwipeableBottomDrawer__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! components/v3/FOSwipeableBottomDrawer */ "./src/components/v3/FOSwipeableBottomDrawer/index.tsx");
/* harmony import */ var components_v3_ScrollEventComponent__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! components/v3/ScrollEventComponent */ "./src/components/v3/ScrollEventComponent/index.tsx");
/* harmony import */ var components_v3_WithFOLoading_FOLoadingSpinner__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! components/v3/WithFOLoading/FOLoadingSpinner */ "./src/components/v3/WithFOLoading/FOLoadingSpinner.tsx");
/* harmony import */ var assets_images_BigRoadFreight_Logo_Stacked_png__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! assets/images/BigRoadFreight-Logo-Stacked.png */ "./src/assets/images/BigRoadFreight-Logo-Stacked.png");
/* harmony import */ var assets_images_BigRoadFreight_Logo_Stacked_png__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(assets_images_BigRoadFreight_Logo_Stacked_png__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var assets_images_BigRoadFreight_Logo_Stacked_Gray_png__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! assets/images/BigRoadFreight-Logo-Stacked-Gray.png */ "./src/assets/images/BigRoadFreight-Logo-Stacked-Gray.png");
/* harmony import */ var assets_images_BigRoadFreight_Logo_Stacked_Gray_png__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(assets_images_BigRoadFreight_Logo_Stacked_Gray_png__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _SearchLoadsContentResults__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ../SearchLoadsContentResults */ "./src/components/v3/SearchLoadsContent/SearchLoadsContentResults/index.tsx");
/* harmony import */ var _SearchLoadsSortFilters__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ../SearchLoadsSortFilters */ "./src/components/v3/SearchLoadsContent/SearchLoadsSortFilters/index.tsx");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./styles */ "./src/components/v3/SearchLoadsContent/SearchLoadsContentForm/styles.ts");












var _stepFields, _sortFilterFields, _dec, _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_9___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_8___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




























var formFields = {
  pickupLocation: {
    name: 'pickupLocation',
    validator: [services_Validations__WEBPACK_IMPORTED_MODULE_25__["locationRequired"]]
  },
  dropoffLocation: {
    name: 'dropoffLocation'
  },
  pickupDate: {
    name: 'pickupDate'
  }
};
var SearchSteps;

(function (SearchSteps) {
  SearchSteps[SearchSteps["pickupLocation"] = 0] = "pickupLocation";
  SearchSteps[SearchSteps["dropoffLocation"] = 1] = "dropoffLocation";
  SearchSteps[SearchSteps["pickupDate"] = 2] = "pickupDate";
  SearchSteps[SearchSteps["results"] = 3] = "results";
})(SearchSteps || (SearchSteps = {}));

var stepFields = (_stepFields = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_stepFields, SearchSteps.pickupLocation, [formFields.pickupLocation]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_stepFields, SearchSteps.dropoffLocation, [formFields.dropoffLocation]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_stepFields, SearchSteps.pickupDate, [formFields.pickupDate]), _stepFields);
var loadSortOptions = [{
  label: 'Highest Price',
  value: false,
  fieldName: 'rate'
}, {
  label: 'Hazmat',
  value: false,
  fieldName: 'hazmat'
}, {
  label: 'Nearest Pickup',
  value: false,
  fieldName: 'pickUpDate'
}, {
  label: 'Tracking',
  value: false,
  fieldName: 'tracking'
}, {
  label: 'Recent Posting',
  value: false,
  fieldName: 'newest'
}];
var laneFilterOptions = [{
  label: 'Short',
  value: true,
  fieldName: 'ShortHaul'
}, {
  label: 'Local',
  value: true,
  fieldName: 'LocalHaul'
}, {
  label: 'Long',
  value: true,
  fieldName: 'LongHaul'
}];
var sortByFields = {
  partners: {
    name: 'partners',
    options: [{
      value: 'brf0',
      iconActive: assets_images_BigRoadFreight_Logo_Stacked_png__WEBPACK_IMPORTED_MODULE_33___default.a,
      iconDisabled: assets_images_BigRoadFreight_Logo_Stacked_Gray_png__WEBPACK_IMPORTED_MODULE_34___default.a
    }, {
      value: 'brf1',
      iconActive: assets_images_BigRoadFreight_Logo_Stacked_png__WEBPACK_IMPORTED_MODULE_33___default.a,
      iconDisabled: assets_images_BigRoadFreight_Logo_Stacked_Gray_png__WEBPACK_IMPORTED_MODULE_34___default.a
    }, {
      value: 'brf2',
      iconActive: assets_images_BigRoadFreight_Logo_Stacked_png__WEBPACK_IMPORTED_MODULE_33___default.a,
      iconDisabled: assets_images_BigRoadFreight_Logo_Stacked_Gray_png__WEBPACK_IMPORTED_MODULE_34___default.a
    }]
  },
  loadSorts: {
    name: 'loadSorts',
    options: loadSortOptions
  }
};
var filterFields = {
  equipmentTypeList: {
    name: 'equipmentTypeList'
  },
  perMileRate: {
    name: 'perMileRate'
  },
  weight: {
    name: 'weight'
  },
  laneSize: {
    name: 'laneSize',
    options: laneFilterOptions
  },
  loadSize: {
    name: 'loadSize'
  }
};
var advancedFields = {
  // pickupDate: {
  //   name: 'pickupDate',
  // },
  dropoffDate: {
    name: 'dropoffDate'
  },
  pickupRadius: {
    name: 'radius'
  },
  dropoffRadius: {
    name: 'dropoffRadius'
  }
};
var chipLabels = ['Sort By', 'Filter', 'Advanced'];
var LoadSortSearchHeaders;

(function (LoadSortSearchHeaders) {
  LoadSortSearchHeaders[LoadSortSearchHeaders["sortBy"] = 0] = "sortBy";
  LoadSortSearchHeaders[LoadSortSearchHeaders["filter"] = 1] = "filter";
  LoadSortSearchHeaders[LoadSortSearchHeaders["advanced"] = 2] = "advanced";
})(LoadSortSearchHeaders || (LoadSortSearchHeaders = {}));

var sortFilterFields = (_sortFilterFields = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_sortFilterFields, LoadSortSearchHeaders.sortBy, [sortByFields.partners, sortByFields.loadSorts]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_sortFilterFields, LoadSortSearchHeaders.filter, [filterFields.equipmentTypeList, filterFields.perMileRate, filterFields.weight, filterFields.laneSize, filterFields.loadSize]), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_sortFilterFields, LoadSortSearchHeaders.advanced, [// advancedFields.pickupDate,
advancedFields.dropoffDate, advancedFields.pickupRadius, advancedFields.dropoffRadius]), _sortFilterFields);
var formName = 'searchLoadsV3Form';

var perMileRateDefaultValue = function perMileRateDefaultValue() {
  var _currentUser$foUser, _currentUser$foUser$p;

  var _firebase$auth = firebase__WEBPACK_IMPORTED_MODULE_12___default.a.auth(),
      currentUser = _firebase$auth.currentUser;

  if (currentUser && ((_currentUser$foUser = currentUser.foUser) === null || _currentUser$foUser === void 0 ? void 0 : (_currentUser$foUser$p = _currentUser$foUser.preferredPerMileRate) === null || _currentUser$foUser$p === void 0 ? void 0 : _currentUser$foUser$p.price)) {
    return currentUser.foUser.preferredPerMileRate.price;
  }

  return 0;
};

var SearchLoadsContentFormContainer = (_dec = Object(mobx_react__WEBPACK_IMPORTED_MODULE_14__["inject"])('driverAppStore'), _dec(_class = Object(mobx_react__WEBPACK_IMPORTED_MODULE_14__["observer"])(_class = (_temp = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(SearchLoadsContentFormContainer, _React$Component);

  var _super = _createSuper(SearchLoadsContentFormContainer);

  function SearchLoadsContentFormContainer(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, SearchLoadsContentFormContainer);

    _this = _super.call(this, props);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "findFieldsHaveAnyValue", function (field) {
      if (_this.props[field.name] !== undefined) {
        if (_this.props[field.name] && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3___default()(_this.props[field.name]) === 'object') {
          return Object.keys(_this.props[field.name]).find(function (nestedFieldName) {
            if (field.name === filterFields.laneSize.name) {
              return _this.props[field.name][nestedFieldName] === false;
            }

            return _this.props[field.name][nestedFieldName] === true;
          });
        }

        if (field.name === filterFields.perMileRate.name) {
          if (_this.props[field.name] === perMileRateDefaultValue()) {
            return false;
          }
        }

        return true;
      }

      return false;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "showBadge", function () {
      return [Boolean(sortFilterFields[LoadSortSearchHeaders.sortBy].find(_this.findFieldsHaveAnyValue)), Boolean(sortFilterFields[LoadSortSearchHeaders.filter].find(_this.findFieldsHaveAnyValue)), Boolean(sortFilterFields[LoadSortSearchHeaders.advanced].find(_this.findFieldsHaveAnyValue))];
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "initialValuesHelper", function (initialValuesObject, fieldsObject) {
      var initialValues = _objectSpread({}, initialValuesObject);

      Object.keys(fieldsObject).forEach(function (key) {
        return fieldsObject[key].forEach(function (field) {
          initialValues = _objectSpread(_objectSpread({}, initialValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, field.name, _this.props[field.name]));
        });
      });
      return initialValues;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "setFiltersOpen", function (filterNewState, revertFilterValues) {
      var perMileRate = _this.props.perMileRate;

      if (filterNewState) {
        _this.setState({
          filtersOpen: filterNewState
        });

        if (revertFilterValues) {
          // Set initialize again to ease reset of form
          var initialize = _this.props.initialize;
          var initialValues = {}; // initialize main step fields

          initialValues = _this.initialValuesHelper(initialValues, stepFields);

          if (perMileRate !== undefined) {
            initialValues.perMileRate = perMileRate || perMileRateDefaultValue();
          } // initialize sort fields
          // initialValues = this.initialValuesHelper(initialValues, sortFilterFields);


          initialize(initialValues);
        }
      }

      if (!filterNewState) {
        _this.setState({
          filtersOpen: filterNewState
        });

        var reset = _this.props.reset;

        if (revertFilterValues) {
          reset();
        }

        setTimeout(_this.programmaticFormSubmit(), 500);
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "setCurrentStep", function (newStep) {
      _this.setState({
        currentStep: newStep
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "goBackToRAL", function () {
      var returnToRAL = _this.state.returnToRAL;

      if (returnToRAL === SearchSteps.results) {
        _this.setState({
          showRALSubmitConfirmation: true
        });
      } else {
        _this.setCurrentStep(returnToRAL);
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "proceedToResults", function (returnToRAL) {
      return function () {
        _this.setState({
          currentStep: SearchSteps.results,
          showCurrentDatePrompt: false,
          returnToRAL: returnToRAL
        });
      };
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "closeCurrentDateSelectPrompt", function () {
      _this.setState({
        showCurrentDatePrompt: false
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "hideRalSubmittedConfirmation", function () {
      _this.setState({
        showRALSubmitConfirmation: false
      });
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "submitHandler", function (stepNumber) {
      return /*#__PURE__*/function () {
        var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(values) {
          var currentStep, _this$props, dropoffLocation, pickupDate, driverAppStore, isRALSearch, _ref2, _ref2$searchStoreV, _ref2$searchStoreV$se, setPreviousQuery, setResults, setPagination, downloadSearchResults, submitValues, isToday, _ref3, totalItems, valuesParsed;

          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(stepNumber !== undefined)) {
                    _context.next = 4;
                    break;
                  }

                  _this.setCurrentStep(stepNumber);

                  _context.next = 41;
                  break;

                case 4:
                  currentStep = _this.state.currentStep;
                  _this$props = _this.props, dropoffLocation = _this$props.dropoffLocation, pickupDate = _this$props.pickupDate, driverAppStore = _this$props.driverAppStore, isRALSearch = _this$props.isRALSearch;
                  _ref2 = driverAppStore, _ref2$searchStoreV = _ref2.searchStoreV3, _ref2$searchStoreV$se = _ref2$searchStoreV.searchResults, setPreviousQuery = _ref2$searchStoreV$se.setPreviousQuery, setResults = _ref2$searchStoreV$se.setResults, setPagination = _ref2$searchStoreV$se.setPagination, downloadSearchResults = _ref2$searchStoreV.downloadSearchResults;
                  submitValues = _objectSpread({}, values);

                  if (!(currentStep === SearchSteps.pickupLocation)) {
                    _context.next = 13;
                    break;
                  }

                  setPreviousQuery(_this.parseSubmitValuesForApi(submitValues));

                  if ((dropoffLocation === null || dropoffLocation === void 0 ? void 0 : dropoffLocation.description) && (dropoffLocation === null || dropoffLocation === void 0 ? void 0 : dropoffLocation.coordinates)) {
                    if (pickupDate && !isRALSearch) {
                      _this.setState({
                        currentStep: SearchSteps.results
                      });
                    } else {
                      _this.setState({
                        currentStep: SearchSteps.pickupDate
                      });
                    }
                  } else {
                    _this.setState({
                      currentStep: SearchSteps.dropoffLocation
                    });
                  }

                  _context.next = 41;
                  break;

                case 13:
                  if (!(currentStep === SearchSteps.dropoffLocation)) {
                    _context.next = 18;
                    break;
                  }

                  setPreviousQuery(_this.parseSubmitValuesForApi(submitValues));

                  if (!pickupDate || isRALSearch) {
                    _this.setState({
                      currentStep: SearchSteps.pickupDate
                    });
                  } else {
                    _this.setState({
                      currentStep: SearchSteps.results
                    });
                  }

                  _context.next = 41;
                  break;

                case 18:
                  if (!(currentStep === SearchSteps.pickupDate)) {
                    _context.next = 34;
                    break;
                  }

                  setPreviousQuery(_this.parseSubmitValuesForApi(submitValues));
                  setResults([]);
                  setPagination(new models_interfaces_shared_IPagination__WEBPACK_IMPORTED_MODULE_24__["Pagination"]());

                  if (!isRALSearch) {
                    _context.next = 31;
                    break;
                  }

                  isToday = Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["isSelectedDateToday"])(submitValues.pickupDate);
                  _context.next = 26;
                  return downloadSearchResults(1);

                case 26:
                  _this.hideRalSubmittedConfirmation();

                  _ref3 = driverAppStore, totalItems = _ref3.searchStoreV3.searchResults.pagination.totalItems;

                  if (isToday && totalItems > 0) {
                    _this.setState({
                      showCurrentDatePrompt: true
                    });
                  } else {
                    _this.programmaticFormSumitToRAL();
                  }

                  _context.next = 32;
                  break;

                case 31:
                  _this.setState({
                    currentStep: SearchSteps.results
                  });

                case 32:
                  _context.next = 41;
                  break;

                case 34:
                  if (!(currentStep === SearchSteps.results)) {
                    _context.next = 41;
                    break;
                  }

                  valuesParsed = _this.parseSubmitValuesForApi(submitValues);
                  setPreviousQuery(valuesParsed);
                  setResults([]);
                  setPagination(new models_interfaces_shared_IPagination__WEBPACK_IMPORTED_MODULE_24__["Pagination"]());
                  _context.next = 41;
                  return downloadSearchResults(1);

                case 41:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }();
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "formSubmitVoidHandler", function () {// We are always programmatically submitting the form
      // Use this.programmaticFormSubmit to handle form submits
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "parseSubmitValuesForApi", function (submitValues) {
      var _this$props2 = _this.props,
          driverAppStore = _this$props2.driverAppStore,
          pickupLocation = _this$props2.pickupLocation,
          dropoffLocation = _this$props2.dropoffLocation,
          pickupDate = _this$props2.pickupDate,
          loadSorts = _this$props2.loadSorts,
          equipmentTypeList = _this$props2.equipmentTypeList,
          perMileRate = _this$props2.perMileRate,
          weight = _this$props2.weight,
          laneSize = _this$props2.laneSize,
          loadSize = _this$props2.loadSize,
          dropoffDate = _this$props2.dropoffDate,
          radius = _this$props2.radius,
          dropoffRadius = _this$props2.dropoffRadius;
      var _ref4 = driverAppStore,
          setSortFilter = _ref4.searchStoreV3.setSortFilter;

      if (pickupLocation && pickupLocation.coordinates) {
        Object(services_FOMixpanel__WEBPACK_IMPORTED_MODULE_23__["mixpanelSetSearchRALCitiesStates"])(pickupLocation);
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, formFields.pickupLocation.name, Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorLocation"])(pickupLocation)));
      } else {
        submitValues = Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["omit"])(submitValues, [formFields.pickupLocation.name]);
      }

      if (dropoffLocation && dropoffLocation.coordinates) {
        Object(services_FOMixpanel__WEBPACK_IMPORTED_MODULE_23__["mixpanelSetSearchRALCitiesStates"])(dropoffLocation);
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, formFields.dropoffLocation.name, Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorLocation"])(dropoffLocation)));
      } else {
        submitValues = Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["omit"])(submitValues, [formFields.dropoffLocation.name]);
      }

      if (!pickupDate) {
        submitValues = Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["omit"])(submitValues, [formFields.pickupDate.name]);
      }

      var sorts = [];

      if (loadSorts) {
        sortByFields.loadSorts.options.forEach(function (_ref5) {
          var fieldName = _ref5.fieldName;
          var filterFieldValue = loadSorts[fieldName];

          if (filterFieldValue) {
            sorts.push(fieldName);
          }
        });
      }

      setSortFilter(sorts);

      if (equipmentTypeList) {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, filterFields.equipmentTypeList.name, Object.keys(equipmentTypeList)));
      }

      if (perMileRate !== undefined) {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, filterFields.perMileRate.name, Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorMileRate"])(perMileRate)));
      } else {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, filterFields.perMileRate.name, Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorMileRate"])(perMileRateDefaultValue())));
      }

      if (weight) {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, filterFields.weight.name, Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorWeightValue"])("0,".concat(weight))));
      }

      if (laneSize) {
        var optionsChosen = filterFields.laneSize.options.reduce(function (acc, curr) {
          if (laneSize[curr.fieldName] === undefined) {
            return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(acc), [curr.fieldName]); // defaults to true
          }

          if (laneSize[curr.fieldName] === true) {
            return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(acc), [curr.fieldName]);
          }

          return acc;
        }, []);
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, filterFields.laneSize.name, optionsChosen.join(',')));
      }

      if (loadSize && loadSize !== 'ALL') {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, filterFields.loadSize.name, loadSize));
      }

      if (pickupDate) {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, formFields.pickupDate.name, pickupDate));
      } else {
        submitValues = Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["omit"])(submitValues, ['pickupDate']);
      }

      if (dropoffDate) {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, advancedFields.dropoffDate.name, dropoffDate));
      }

      if (radius) {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, advancedFields.pickupRadius.name, Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorRadius"])(radius)));
      }

      if (dropoffRadius) {
        submitValues = _objectSpread(_objectSpread({}, submitValues), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, advancedFields.dropoffRadius.name, Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorRadius"])(dropoffRadius)));
      }

      return submitValues;
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "programmaticFormSubmit", function (stepNumber) {
      return function () {
        var _this$props3 = _this.props,
            handleSubmit = _this$props3.handleSubmit,
            drawerClosed = _this$props3.drawerClosed;

        if (drawerClosed) {
          return;
        }

        var submitter = handleSubmit(_this.submitHandler(stepNumber)); // submitter won't be called if form is invalid

        submitter(); // submits
      };
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "programmaticFormSumitToRAL", /*#__PURE__*/_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {
      var _this$props4, driverAppStore, reflectDrawerState, push, isRALSearch, pickupLocation, dropoffLocation, pickupDate, dropoffDate, equipmentTypeList, perMileRate, radius, _ref7, postMyTruck, submitValues;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$props4 = _this.props, driverAppStore = _this$props4.driverAppStore, reflectDrawerState = _this$props4.reflectDrawerState, push = _this$props4.history.push, isRALSearch = _this$props4.isRALSearch, pickupLocation = _this$props4.pickupLocation, dropoffLocation = _this$props4.dropoffLocation, pickupDate = _this$props4.pickupDate, dropoffDate = _this$props4.dropoffDate, equipmentTypeList = _this$props4.equipmentTypeList, perMileRate = _this$props4.perMileRate, radius = _this$props4.radius;
              _ref7 = driverAppStore, postMyTruck = _ref7.truckStore.postMyTruck;
              submitValues = {
                availableDate: new Date(),
                radius: Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorRadius"])(services_constants__WEBPACK_IMPORTED_MODULE_22__["deadheadDefault"]),
                // Take from user set deadhead in settings once implemented || default
                perMileRate: Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorMileRate"])(perMileRateDefaultValue())
              };

              if (pickupLocation && pickupLocation.coordinates) {
                Object(services_FOMixpanel__WEBPACK_IMPORTED_MODULE_23__["mixpanelSetSearchRALCitiesStates"])(pickupLocation);
                submitValues = _objectSpread(_objectSpread({}, submitValues), {}, {
                  pickup: Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorLocation"])(pickupLocation)
                });
              } else {
                submitValues = Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["omit"])(submitValues, ['pickup']);
              }

              if (dropoffLocation && dropoffLocation.coordinates) {
                Object(services_FOMixpanel__WEBPACK_IMPORTED_MODULE_23__["mixpanelSetSearchRALCitiesStates"])(dropoffLocation);
                submitValues = _objectSpread(_objectSpread({}, submitValues), {}, {
                  dropoff: Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorLocation"])(dropoffLocation)
                });
              } else {
                submitValues = Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["omit"])(submitValues, ['dropoff']);
              }

              if (pickupDate) {
                submitValues = _objectSpread(_objectSpread({}, submitValues), {}, {
                  availableDate: pickupDate
                });
              }

              if (dropoffDate) {
                submitValues = _objectSpread(_objectSpread({}, submitValues), {}, {
                  expiresOn: dropoffDate
                });
              }

              if (equipmentTypeList) {
                submitValues = _objectSpread(_objectSpread({}, submitValues), {}, {
                  equipmentTypeList: Object.keys(equipmentTypeList)
                });
              }

              if (perMileRate) {
                submitValues = _objectSpread(_objectSpread({}, submitValues), {}, {
                  perMileRate: Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorMileRate"])(perMileRate)
                });
              }

              if (radius) {
                submitValues = _objectSpread(_objectSpread({}, submitValues), {}, {
                  radius: Object(utils_utility__WEBPACK_IMPORTED_MODULE_21__["refactorRadius"])(radius)
                });
              }

              _context2.prev = 10;
              console.log('submitvalues-----', submitValues);
              _context2.next = 14;
              return postMyTruck(submitValues);

            case 14:
              if (isRALSearch) {
                _this.setState({
                  showRALSubmitConfirmation: true
                }, function () {
                  _this.proceedToResults(SearchSteps.results)();
                });
              } else {
                setTimeout(push, 200, '/driver/requestLoad');
                reflectDrawerState(false);
              }

              _context2.next = 20;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](10);
              console.log('RAL Post error');

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[10, 17]]);
    })));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "swipeDownHandler", function () {
      var extendedFabFilter = _this.state.extendedFabFilter;

      if (!extendedFabFilter) {
        _this.setState({
          extendedFabFilter: true
        });
      }
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "swipeUpHandler", function () {
      var extendedFabFilter = _this.state.extendedFabFilter;

      if (extendedFabFilter) {
        _this.setState({
          extendedFabFilter: false
        });
      }
    });

    _this.state = {
      selectedOperatingLane: props.selectedOperatingLane,
      currentStep: SearchSteps.pickupLocation,
      filtersOpen: false,
      showCurrentDatePrompt: false,
      showRALSubmitConfirmation: false,
      returnToRAL: SearchSteps.pickupDate,
      extendedFabFilter: true
    };
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(SearchLoadsContentFormContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props5 = this.props,
          selectedOperatingLane = _this$props5.selectedOperatingLane,
          drawerClosed = _this$props5.drawerClosed,
          reset = _this$props5.reset,
          prefillSearchQuery = _this$props5.prefillSearchQuery;

      if (prevProps.selectedOperatingLane !== selectedOperatingLane) {
        if (selectedOperatingLane) {
          this.setCurrentStep(SearchSteps.pickupDate);
        } else {
          this.setCurrentStep(SearchSteps.pickupLocation);
        }

        this.setState({
          selectedOperatingLane: selectedOperatingLane
        });
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
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          currentStep = _this$state.currentStep,
          selectedOperatingLane = _this$state.selectedOperatingLane,
          filtersOpen = _this$state.filtersOpen,
          showCurrentDatePrompt = _this$state.showCurrentDatePrompt,
          showRALSubmitConfirmation = _this$state.showRALSubmitConfirmation,
          extendedFabFilter = _this$state.extendedFabFilter;
      var _this$props6 = this.props,
          _this$props6$loadingS = _this$props6.loadingSelectedLane,
          loadingSelectedLane = _this$props6$loadingS === void 0 ? false : _this$props6$loadingS,
          driverAppStore = _this$props6.driverAppStore,
          pickupLocation = _this$props6.pickupLocation,
          dropoffLocation = _this$props6.dropoffLocation,
          pickupDate = _this$props6.pickupDate,
          partners = _this$props6.partners,
          equipmentTypeList = _this$props6.equipmentTypeList,
          reflectDrawerState = _this$props6.reflectDrawerState,
          loadSorts = _this$props6.loadSorts,
          laneSize = _this$props6.laneSize,
          loadSize = _this$props6.loadSize,
          change = _this$props6.change,
          drawerClosed = _this$props6.drawerClosed,
          handleSubmit = _this$props6.handleSubmit,
          classes = _this$props6.classes,
          isRALSearch = _this$props6.isRALSearch,
          prefillSearchQuery = _this$props6.prefillSearchQuery;
      var _ref8 = driverAppStore,
          searchStoreV3 = _ref8.searchStoreV3,
          ralSubmitLoading = _ref8.truckStore.loading,
          enqueueSnackbarStore = _ref8.snackbarStore.enqueueSnackbarStore;
      var recentSearches = searchStoreV3.recentSearches,
          recentPickupLocations = searchStoreV3.recentPickupLocations,
          recentDropoffLocations = searchStoreV3.recentDropoffLocations,
          isLoadingMatches = searchStoreV3.searchResults.loading;

      var ReturnToRAL = function ReturnToRAL() {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
          onClick: _this2.goBackToRAL,
          className: classes.backButton
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", null, "Return To"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", null, "Request A Load"));
      };

      var showRALBackButton = currentStep === SearchSteps.results && isRALSearch && !showRALSubmitConfirmation;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_v3_WithFOLoading_FOLoadingSpinner__WEBPACK_IMPORTED_MODULE_32__["default"], {
        loading: loadingSelectedLane
      }, showRALBackButton && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(ReturnToRAL, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("form", {
        onSubmit: handleSubmit(this.formSubmitVoidHandler),
        className: classes.fullHeight
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Grid"], {
        container: true,
        direction: "column",
        justify: "flex-start",
        alignItems: "stretch",
        className: currentStep !== SearchSteps.results ? classes.fullHeight : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Grid"], {
        item: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_v3_ReduxSets_LocationStepper__WEBPACK_IMPORTED_MODULE_27__["default"], {
        reflectDrawerState: reflectDrawerState,
        disabled: drawerClosed,
        step: currentStep,
        programmaticFormSubmit: this.programmaticFormSubmit,
        pickupLocationFieldValue: pickupLocation || (selectedOperatingLane === null || selectedOperatingLane === void 0 ? void 0 : selectedOperatingLane.pickup),
        dropoffLocationFieldValue: dropoffLocation || (selectedOperatingLane === null || selectedOperatingLane === void 0 ? void 0 : selectedOperatingLane.dropoff),
        stepText: this.stepText
      })), currentStep <= SearchSteps.dropoffLocation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Grid"], {
        item: true,
        className: classes.flexGrow
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_v3_ReduxSets_ReduxPickupDropoffLocationSet__WEBPACK_IMPORTED_MODULE_26__["default"], {
        step: currentStep,
        change: change,
        pickupLocationField: formFields.pickupLocation,
        dropoffLocationField: formFields.dropoffLocation,
        recentPickupLocations: recentPickupLocations,
        recentDropoffLocations: recentDropoffLocations,
        pickupLocationFieldValue: pickupLocation,
        dropoffLocationFieldValue: dropoffLocation,
        pastLocationLoading: recentSearches.loading,
        downloadPastLocations: recentSearches.downloadResults,
        downloadNextResults: recentSearches.downloadNextResults,
        pagination: recentSearches.pagination,
        programmaticFormSubmit: this.programmaticFormSubmit,
        showNearBy: true,
        showSkip: true
      })), currentStep >= SearchSteps.pickupDate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Grid"], {
        item: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_v3_LoadDatePicker__WEBPACK_IMPORTED_MODULE_28__["default"], {
        staticPicker: currentStep === SearchSteps.pickupDate,
        dateField: formFields.pickupDate,
        onClose: this.programmaticFormSubmit(),
        disableReselect: isRALSearch
      })), currentStep === SearchSteps.results && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Grid"], {
        item: true,
        xs: 12
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement("div", {
        className: "ignore-FOSwipeable"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_v3_ScrollEventComponent__WEBPACK_IMPORTED_MODULE_31__["default"], {
        onScrollDown: this.swipeDownHandler,
        onScrollUp: this.swipeUpHandler
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SearchLoadsContentResults__WEBPACK_IMPORTED_MODULE_35__["default"], {
        searchStoreV3: searchStoreV3,
        pickupDateFieldValue: pickupDate,
        ralSubmitLoading: ralSubmitLoading,
        reflectDrawerState: reflectDrawerState,
        setCurrentStep: this.setCurrentStep,
        enqueueSnackbarStore: enqueueSnackbarStore,
        programmaticFormSumitToRAL: this.programmaticFormSumitToRAL,
        showRALSubmitConfirmation: showRALSubmitConfirmation,
        isRALSearch: isRALSearch,
        hideRalSubmittedConfirmation: this.hideRalSubmittedConfirmation
      }))))), !drawerClosed && !showRALSubmitConfirmation && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_19__["Zoom"], {
        "in": currentStep === SearchSteps.results,
        unmountOnExit: true,
        mountOnEnter: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(_SearchLoadsSortFilters__WEBPACK_IMPORTED_MODULE_36__["default"], {
        change: change,
        showBadge: this.showBadge(),
        chipLabels: chipLabels,
        partnersField: sortByFields.partners,
        loadSortsField: sortByFields.loadSorts,
        loadSortsFieldValue: loadSorts,
        equipmentTypeListField: filterFields.equipmentTypeList,
        equipmentTypeListFieldValue: equipmentTypeList,
        perMileRateField: filterFields.perMileRate,
        weightField: filterFields.weight,
        laneSizeField: filterFields.laneSize,
        laneSizeFieldValue: laneSize,
        loadSizeField: filterFields.loadSize,
        loadSizeFieldValue: loadSize,
        dropoffLocationFieldValue: dropoffLocation,
        pickupDateField: formFields.pickupDate,
        dropoffDateField: advancedFields.dropoffDate,
        pickupRadiusField: advancedFields.pickupRadius,
        dropoffRadiusField: advancedFields.dropoffRadius,
        searchStoreV3: searchStoreV3,
        setFiltersOpen: this.setFiltersOpen,
        filtersOpen: filtersOpen,
        extendedFabFilter: extendedFabFilter
      }))), isRALSearch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_v3_FOSwipeableBottomDrawer__WEBPACK_IMPORTED_MODULE_30__["default"], {
        maxHeight: 200,
        isDrawerOpen: showCurrentDatePrompt,
        variant: "temporary"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_11___default.a.createElement(components_v3_RALPostContent_CurrentDateSelectPrompt__WEBPACK_IMPORTED_MODULE_29__["default"], {
        loading: isLoadingMatches,
        proceedToResults: this.proceedToResults,
        handleClose: this.closeCurrentDateSelectPrompt,
        programmaticFormSumitToRAL: this.programmaticFormSumitToRAL
      })));
    }
  }, {
    key: "stepText",
    get: function get() {
      var _this$state2 = this.state,
          currentStep = _this$state2.currentStep,
          showRALSubmitConfirmation = _this$state2.showRALSubmitConfirmation;
      var _this$props7 = this.props,
          driverAppStore = _this$props7.driverAppStore,
          drawerClosed = _this$props7.drawerClosed,
          isRALSearch = _this$props7.isRALSearch;
      var _ref9 = driverAppStore,
          _ref9$searchStoreV3$s = _ref9.searchStoreV3.searchResults,
          totalItems = _ref9$searchStoreV3$s.pagination.totalItems,
          results = _ref9$searchStoreV3$s.results,
          loading = _ref9$searchStoreV3$s.loading;

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
          return "We found ".concat(totalItems, " ").concat(totalItems === 1 ? 'load' : 'loads', "!");
        }

        return 'Sorry, we couldn\'t find any loads for you.';
      }

      return undefined;
    }
  }]);

  return SearchLoadsContentFormContainer;
}(react__WEBPACK_IMPORTED_MODULE_11___default.a.Component), _temp)) || _class) || _class);
var SearchLoadsContentForm = Object(redux_form__WEBPACK_IMPORTED_MODULE_18__["reduxForm"])({
  form: formName,
  touchOnChange: true,
  destroyOnUnmount: false,
  enableReinitialize: true
})(SearchLoadsContentFormContainer);
var selector = Object(redux_form__WEBPACK_IMPORTED_MODULE_18__["formValueSelector"])(formName);

var assignLocationProperties = function assignLocationProperties(selectedObject) {
  if (selectedObject) {
    return {
      description: selectedObject.description || selectedObject.address,
      city: selectedObject.city,
      state: selectedObject.state,
      country: selectedObject.country,
      coordinates: selectedObject.coordinates
    };
  }
};

var reverseEquipmentType = function reverseEquipmentType(formValueArray) {
  if (formValueArray) {
    var rawValue = {};
    return formValueArray.reduce(function (obj, item) {
      return _objectSpread(_objectSpread({}, obj), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, item, true));
    }, rawValue);
  }
};

var reverseLaneSize = function reverseLaneSize(laneSizeString) {
  if (laneSizeString) {
    var rawValue = {};
    return filterFields.laneSize.options.reduce(function (obj, item) {
      if (!laneSizeString.includes(item.fieldName)) {
        return _objectSpread(_objectSpread({}, obj), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()({}, item.fieldName, false));
      }

      return obj;
    }, rawValue);
  }
};

var getInitialValues = function getInitialValues(_ref10) {
  var selectedOperatingLane = _ref10.selectedOperatingLane,
      prefillSearchQuery = _ref10.prefillSearchQuery;
  var initialValues = {};
  initialValues[filterFields.perMileRate.name] = perMileRateDefaultValue();

  if (selectedOperatingLane) {
    initialValues[formFields.pickupLocation.name] = assignLocationProperties(selectedOperatingLane.pickup);
    initialValues[formFields.dropoffLocation.name] = assignLocationProperties(selectedOperatingLane.dropoff);
  }

  if (prefillSearchQuery) {
    var _prefillSearchQuery$p, _prefillSearchQuery$w, _prefillSearchQuery$r, _prefillSearchQuery$d;

    initialValues[formFields.pickupLocation.name] = assignLocationProperties(prefillSearchQuery.pickupLocation);
    initialValues[formFields.dropoffLocation.name] = assignLocationProperties(prefillSearchQuery.dropoffLocation);
    initialValues[formFields.pickupDate.name] = prefillSearchQuery.pickupDate;
    initialValues[sortByFields.partners.name] = prefillSearchQuery.partners;
    initialValues[sortByFields.loadSorts.name] = prefillSearchQuery.loadSorts;
    initialValues[filterFields.equipmentTypeList.name] = reverseEquipmentType(prefillSearchQuery.equipmentTypeList);
    initialValues[filterFields.perMileRate.name] = (_prefillSearchQuery$p = prefillSearchQuery.perMileRate) === null || _prefillSearchQuery$p === void 0 ? void 0 : _prefillSearchQuery$p.price;
    initialValues[filterFields.weight.name] = (_prefillSearchQuery$w = prefillSearchQuery.weight) === null || _prefillSearchQuery$w === void 0 ? void 0 : _prefillSearchQuery$w.high;
    initialValues[filterFields.laneSize.name] = reverseLaneSize(prefillSearchQuery.laneSize);
    initialValues[filterFields.loadSize.name] = prefillSearchQuery.loadSize;
    initialValues[advancedFields.dropoffDate.name] = prefillSearchQuery.dropoffDate;
    initialValues[advancedFields.pickupRadius.name] = (_prefillSearchQuery$r = prefillSearchQuery.radius) === null || _prefillSearchQuery$r === void 0 ? void 0 : _prefillSearchQuery$r.amount;
    initialValues[advancedFields.dropoffRadius.name] = (_prefillSearchQuery$d = prefillSearchQuery.dropoffRadius) === null || _prefillSearchQuery$d === void 0 ? void 0 : _prefillSearchQuery$d.amount;
  }

  return initialValues;
};

var SearchLoadsContentFormConnect = Object(react_redux__WEBPACK_IMPORTED_MODULE_16__["connect"])(function (state, ownProps) {
  var _ref11;

  return _ref11 = {
    initialValues: getInitialValues(ownProps)
  }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, formFields.pickupLocation.name, selector(state, formFields.pickupLocation.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, formFields.dropoffLocation.name, selector(state, formFields.dropoffLocation.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, formFields.pickupDate.name, selector(state, formFields.pickupDate.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, sortByFields.partners.name, selector(state, sortByFields.partners.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, sortByFields.loadSorts.name, selector(state, sortByFields.loadSorts.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, filterFields.equipmentTypeList.name, selector(state, filterFields.equipmentTypeList.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, filterFields.perMileRate.name, selector(state, filterFields.perMileRate.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, filterFields.weight.name, selector(state, filterFields.weight.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, filterFields.laneSize.name, selector(state, filterFields.laneSize.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, filterFields.loadSize.name, selector(state, filterFields.loadSize.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, advancedFields.dropoffDate.name, selector(state, advancedFields.dropoffDate.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, advancedFields.pickupRadius.name, selector(state, advancedFields.pickupRadius.name)), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_ref11, advancedFields.dropoffRadius.name, selector(state, advancedFields.dropoffRadius.name)), _ref11;
}, function (dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_15__["bindActionCreators"])({
    change: redux_form__WEBPACK_IMPORTED_MODULE_18__["change"]
  }, dispatch);
}, null, {
  forwardRef: true
})(SearchLoadsContentForm);
/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_17__["withRouter"])(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_20__["withStyles"])(_styles__WEBPACK_IMPORTED_MODULE_37__["default"])(SearchLoadsContentFormConnect)));

/***/ })

})
//# sourceMappingURL=app.82bff4b10815280d4fae.hot-update.js.map