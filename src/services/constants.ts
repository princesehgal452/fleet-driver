import camelCase from 'lodash/camelCase';
import { ILabelAndValue } from '../models/interfaces/shared/ILabelAndValue';


const driverBase = 'driver';

export const ROUTES = {
  LOGIN: 'login',
  DRIVER_SEARCH: `${driverBase}/search`,
  DRIVER_POST: `${driverBase}/post`,
  DRIVER_SETTINGS: `${driverBase}/settings`,
  DRIVER_VIEW: `${driverBase}/view`,
  DRIVER_RAL: `${driverBase}/requestLoad`,
  TENDER_SHOW: `${driverBase}/tender`,
  POD_INVOICE_SHOW: `${driverBase}/podinvoice`,
  DOCUMENTS_SHOW: 'upload',
  BOOK_SHOW: 'bookload',
};

export const GA_TRACKING = {
  CATEGORIES: {
    DRIVER: 'Driver',
  },
  ACTIONS: {
    NEW_SEARCH: 'New Search',
    NEW_RAL: 'New Request a load',
    LIKED_LOAD: 'Liked a Load',
    ACCEPTED_MATCH: 'Accepted a Match/Load',
    PREFERRED_LANE: 'Selected a Preferred Lane',
    EQUIPMENT: 'Selected an Equipment',
    EMAIL_CLICK: 'Email Click',
    PHONE_CLICK: 'Phone Click',
    ONBOARD_COMPLETE: 'Onboarding Completed',
  },
  PAGEVIEWS: {
    LIKED_LOAD: '/driver/like',
    EMAIL_CLICK: '/driver/email',
    PHONE_CLICK: '/driver/phone',
    NEW_RAL: '/driver/newRAL',
  },
};

export enum MIXPANEL_KEYS {
  DISPLAY_NAME = '$name',
  PHONE = '$phone',
  EMAIL = '$email',
  DATE_TIME = 'Date/Time',
  CITY = 'City',
  STATE = 'State',
  COUNTRY = 'Country',
  POSTAL_CODE = 'Postal Code',
  FIRST_LOGIN_DATE = 'First Login Date',
  CURRENT_LOCATION = 'Last Location',
  USER_TYPE = 'User Type',
  MCNUMBER = 'MC Number',
  CARRIER_NAME = 'Carrier Name',
  COMPANY_TYPE = 'Company Type',
  EQUIPMENT_LIST = 'Equipment List',
  PREFERRED_LANES = 'Preferred Lanes',
  PICKUP_LOCATION = 'Pickup Address',
  DROPOFF_LOCATION = 'Dropoff Address',
  SEARCHED_CITY = 'Searched Cities',
  SEARCHED_STATE = 'Searched States',
  ONBOARDING_COMPLETE_DATE = 'Onboarding Completed',
  LOAD_SOURCE = 'Load Source',
  DOCUMENT_TYPE = 'Document Type',
  DOCUMENT_TYPES = 'Document Types',
}

export enum MIXPANEL_EVENTS {
  RAL = 'Requested a Load',
  SEARCH = 'Searched Loads',
  LIKE = 'Liked a Load',
  CONTACT = 'Contact Button Clicked',
  MCNUMBER = 'Selected McNumber in Onboarding',
  SELECTED_PREFERRED_LANES_ONBOARDING = 'Selected Preferred Lanes in Onboarding',
  SELECTED_EQUIPMENT_ONBOARDING = 'Selected Equipments in Onboarding',
  DISPATCHER_INVITED_DRIVERS = 'Dispatcher sent invitation to drivers',
  LOAD_DETAILS = 'Opened Load Details',
  LOADS_TAB = 'Opened My Loads - LOADS tab',
  ACTIVE_TAB = 'Opened My Loads - ACTIVE tab',
  ADVANCED_OPTIONS = 'Advanced Options Clicked',
  PAGINATION_BUTTON = 'Pagination Button Clicked',
  SEND_TO = 'Send To Button Clicked',
  SEND_LOAD = 'Send Load Button Clicked',
  NO_RESULTS = 'No Results on Page',
  DISPATCHABLE_DRIVER_LOAD_CONFIRM = 'Dispatchable Driver Confirmed load',
  DISPATCHABLE_DRIVER_LOAD_DECLINE = 'Dispatchable Driver Declined load',
  REQUEST_CALLBACK_BUTTON = 'Request Callback Button Clicked',
  SEND_REQUEST_BUTTON = 'Send Request Button Clicked',
  CANCEL_REQUEST_BUTTON = 'Cancel Request Button Clicked',
  DOCUMENT_UPLOADED = 'Document Uploaded',
  BOOK_BUTTON_CLICKED = 'Book Button Clicked',
  BOOK_CONFIRM_CLICKED = 'Book Confirm Clicked',
}

export const DOCUMENT_TYPES: ILabelAndValue[] = [
  { value: 'w9', label: 'W9' },
  { value: 'coi', label: 'Certificate of Insurance (COI)' },
  { value: 'cau', label: 'Carrier Authority' },
  { value: 'ca', label: 'Carrier Agreement' },
  { value: 'workersComp', label: 'Worker\'s Comp' },
  { value: 'cvor', label: 'CVOR' },
  { value: 'weightPermits', label: 'Weight Permits' },
  { value: 'commodityPermits', label: 'Commodity Permits' },
  { value: 'specializedInsurance', label: 'Specialized Insurance' },
  { value: 'corporateDocuments', label: 'Corporate Documents' },
  { value: 'bondInformation', label: 'Bond Information' },
  { value: 'scacCode', label: 'Scac Code' },
  { value: 'ctpat', label: 'CTPAT' },
];

export const COMPANY_TYPES = [
  'Owner-Operator',
  'Company Driver',
  'Company Driver (Own Authority)',
  'Dispatcher',
].map(type => ({
  value: type,
  label: type,
}));

// if this constant is changed, the respective changes should be made to
// focore/models/enums/EquipmentTypes
export const TRUCKS_EQUIPMENT_TYPES = [
  { value: 'van', label: 'Van' },
  { value: 'reefer', label: 'Reefer' },
  { value: 'flatbed', label: 'Flatbed' },
  { value: 'stepDeck', label: 'Stepdeck' },
  { value: 'powerOnly', label: 'Power Only' },
  { value: 'hopperBottom', label: 'Hopper Bottom' },
  { value: 'doubleDrop', label: 'Double Drop' },
  { value: 'doubleTruck', label: 'Dump Truck' },
  { value: 'lowboy', label: 'Lowboy' },
  { value: 'auto', label: 'Auto Carrier' },
  { value: 'tanker', label: 'Tanker' },
  { value: 'container', label: 'Container' },
  { value: 'conestoga', label: 'Conestoga' },
];

export const TRUCKS_EQUIPMENT_TYPE_GROUPS = [
  {
    label: '',
    options: [
      'Flatbed',
      'Stepdeck',
      'Van',
      'Reefer',
      'Power only',
    ].map(type => ({
      value: camelCase(type),
      label: type,
    })),
  },
  {
    label: 'Other',
    options: [
      'Hopper bottom',
      'Double drop',
      'Dump trailer',
      'Low boy',
      'Auto carrier',
      'Tanker',
      'Containers',
      'Conestoga',
    ].map(type => ({
      value: camelCase(type),
      label: type,
    })),
  },
];

export const WEIGHT_TYPES = [
  {
    label: 'Any',
    value: 'any',
  },
  {
    label: 'Up to 26,000lbs',
    value: '0,26000',
  },
  {
    label: '26,001 - 33,000lbs',
    value: '26001,33000',
  },
  {
    label: '33,001 - 40,000lbs',
    value: '33001,40000',
  },
  {
    label: '40,000 + lbs',
    value: '40001,0',
  },
];

export const MILES_TYPES = [
  {
    label: '50',
    value: '50',
  },
  {
    label: '100',
    value: '100',
  },
  {
    label: '150',
    value: '150',
  },
  {
    label: '200',
    value: '200',
  },
  {
    label: '300',
    value: '300',
  },
  {
    label: '500',
    value: '500',
  },
];

export const FO_USER_TYPES = {
  broker: 'broker',
  driver: 'driver',
};

export const ACCEPTED_UPLOAD_TYPES = ['txt', 'pdf', 'png', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp'];

export enum registrationStatesDefaultDriver {
  success = -1,
  check,
  confirmInformation,
  equipmentList,
}

export enum registrationStatesDispatcher {
  success = -1,
  check,
  confirmInformation,
  selectDrivers,
}

export enum registrationStatesDispatchableDriver {
  success = -1,
  check = 0,
}

export enum MatchTabStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
}

export enum SortValues {
  RATE = 'rate',
  NEWEST = 'newest',
  PICKUP_DATE = 'pickUpDate',
}

export enum notificationTypes {
  // USER_LIKED_LOAD = 'user_liked_load',
  USER_CONFIRMED_MATCH = 'user_confirmed_match',
  USER_DECLINED_MATCH = 'user_declined_match',
  RAL_FOUND_MATCH = 'ral_found_match',
}

export enum AisinRouteSearchType {
  QUICK = 5,
  SHORT = 6,
  ALTERNATIVE = 16,
}

export enum AisinRouteType {
  FREEWAY_CLASS_ROAD_1 = 0,
  FREEWAY_CLASS_ROAD_2,
  HIGHWAY_CLASS_ROAD,
  THROUGHWAY_CLASS_ROAD,
  LOCAL_CLASS_ROAD,
  FRONTAGE_ROAD,
  VERY_LOW_SPEED_ROAD,
  PRIVATE_ROAD,
  WALKWAY,
  NON_NAVIGABLE_ROAD,
  RERRY_ROAD,
  CAR_TRAIN,
  PUBLIC_VEHILE_ONLY_ROAD,
  CARPOOL_LANE,
}

export enum AisinGuidanceCode {
  STRAIGHT = 0,
  STRAIGHT_FORWARD,
  SLIGHT_RIGHT,
  RIGHT,
  SHARP_RIGHT,
  U_TURN_RIGHT,
  BACK,
  U_TURN_LEFT,
  SHARP_LEFT,
  LEFT,
  SLIGHT_LEFT,
  SHARP_RIGHT_TOLL_ROUTE,
  SHARP_LEFT_TOLL_ROUTE,
  KEEP_RIGHT,
  KEEP_LEFT,
}

export enum InteractionEventTypes {
  LIKE = 'LK',
  NEGOTIATING = 'NG',
  NEGOTIATE_REJECT = 'NR',
  NEGOTIATE_ACCEPT = 'NA',
  ACCEPTED = 'AC',
  REJECT = 'RJ',
  DRIVER_ACCEPT = 'DAC',
  DISPATCHED = 'DSP',
  RECEIVED_DISPATCH = 'RDSP',
  REQUESTED_CALLBACK = 'SREQ',
  RECEIVED_REQUESTED_CALLBACK = 'RSREQ',
  CALLBACK_CANCELLED = 'SCAN',
  ACCEPT_PENDING = 'ACP',
  LOAD_LOST = 'LST',
  DOC_SAVE = 'DOCSAVE',
}

export enum LoadStatus {
  FINDING_COVERAGE = 'PC',
  BOOKED = 'BO',
  CANCELLED = 'CAN',
}

export enum MatchStatus {
  automatedMatch = 'AU',
  LOAD_LOST = 'LST',
  BOOKED = 'BO',
  ENROUTE_TO_PICKUP = 'ENPU',
  AT_PICKUP = 'ATPU',
  ENROUTE_TO_DROPOFF = 'ENDO',
  AT_DROPOFF = 'ATDO',
  COMPLETED = 'CO',
  CANCELLED = 'CAN',
  requestedALoaddMatch = 'RAL',
  activeMatch = 'active',
  activeMatchDispatcher = 'active_dispatcher',
  activeMatchDispatchableDriver = 'active_dispatchable_driver',
  NEARBY = 'NEARBY',
}

export enum TRACKINGMODES {
  AUTOMATED = 'automated',
  MANUAL = 'manual',
}

export enum DocumentStatus {
  PENDING = 'pending', // This means the document was uploaded but has not yet been Accepted/Rejected.
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum DocumentKeys {
  TENDER = 'tender',
  INVOICE = 'invoice',
  POD = 'pod',
}

export enum AppMode {
  BIGROAD = 'BIGROAD',
  GEOTAB = 'GEOTAB',
  AISIN = 'AISIN',
  V3 = 'V3',
}

export enum TrackingTripStatus {
  AWAITING_START = 'AWAITING_START',
  EN_ROUTE_PICKUP = 'EN_ROUTE_PICKUP',
  AT_PICKUP = 'AT_PICKUP',
  DELAYED = 'DELAYED',
  EN_ROUTE_DROPOFF = 'EN_ROUTE_DROPOFF',
  AT_DROPOFF = 'AT_DROPOFF',
  COMPLETED = 'COMPLETED',
}

export const TrackingSessionStatus = {
  // [TrackingTripStatus.AWAITING_START]: 'Awaiting Start',
  [TrackingTripStatus.EN_ROUTE_PICKUP]: 'On Route To Pickup',
  [TrackingTripStatus.AT_PICKUP]: 'On Site At Pickup',
  [TrackingTripStatus.DELAYED]: 'Delayed',
  [TrackingTripStatus.EN_ROUTE_DROPOFF]: 'On Route To Dropoff',
  [TrackingTripStatus.AT_DROPOFF]: 'On Site At Dropoff',
  // [TrackingTripStatus.COMPLETED]: 'On Route To Pickup',
};

export const TrackingMatchStatus = {
  [TrackingTripStatus.EN_ROUTE_PICKUP]: 'ENPU',
  [TrackingTripStatus.AT_PICKUP]: 'ATPU',
  [TrackingTripStatus.EN_ROUTE_DROPOFF]: 'ENDO',
  [TrackingTripStatus.AT_DROPOFF]: 'ATDO',
};

export enum TrackingSessionTabStates {
  CURRENT = 'current',
  UPCOMING = 'upcoming',
}

export enum UserType {
  OWNER_OPERATOR = 'driver',
  DISPATCHER = 'dispatcher',
  DISPATCHABLE_DRIVER = 'dispatchableDriver',
}

export enum Tutorial {
  MY_LOADS_PAGE = 'myLoadsPage',
  RAL_PAGE = 'RALPage',
  SEARCH_PAGE = 'searchPage',
  SETTINGS_PAGE = 'settingsPage',
  DRIVERS_PAGE = 'driversPage',
}

export const deadheadDefault = 50;
