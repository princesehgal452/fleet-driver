import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import config from '../../../../config';
import { getTokenHeader } from '../GetTokenHeader';
import { ApiFail } from '../../../utils/ErrorService';
import { LoadStatus, SortValues, TRACKINGMODES } from '../../constants';
import { Pagination } from '../../../models/interfaces/shared/IPagination';
import { ILoadData } from '../../../models/interfaces/shared/ILoadData';
import Load from '../../../models/dataStructures/Load';


const loadObj: ILoadData = {
  loadId: '5ef0eebe6cd998fe7aa05afb',
  shortId: 'fo-fklc',
  status: LoadStatus.BOOKED,
  trackingNumber: '',
  account: {},
  brokerId: 'wswDSzqXSqMmuaXwTJnBYAjHuTm1',
  token: '',
  source: 'FleetOps',
  key: '',
  payload: {
    loadPay: {
      amount: 123,
      perMileRate: 0.35,
      currency: 'CAD',
      priceIsEstimated: false,
      range: { high: null, originalHigh: null, low: null, originalLow: null },
      emailUpdates: null,
      originalAmount: null,
    },
    daysUntilPayment: null,
    customerName: null,
    assignedDate: '2020-06-22T17:56:14.989000',
    loadStatus: 'PC',
    tripDetails: {
      pickupStartTime: '01:55 PM',
      pickupEndTime: '01:55 PM',
      dropoffs: [{
        dropoffEndDate: '',
        dropoffEndTime: '01:55 PM',
        dropoffStartDate: '2020-06-30T00:00:00',
        cosigneeInfo: {
          address: {
            description: '',
            coordinates: '',
            city: '',
            state: '',
            country: '',
            county: '',
            streetNumber: '',
            streetName: '',
            postalCode: '',
          },
          fullName: '',
          hideReceiverInfo: null,
          freightCharges: null,
        },
        dropoffLocation: '327 Boyd Street, Los Angeles, CA, USA',
        dropoffStartTime: '01:55 PM',
        dropoffCoordinates: { lat: 34.0469671, lng: -118.2433587 },
        receiverInfo: {
          fullName: '',
          address: [{
            description: '',
            coordinates: '',
            city: '',
            state: '',
            country: '',
            county: '',
            streetNumber: '',
            streetName: '',
            postalCode: '',
          }],
        },
        dropoffAddress: {
          streetNumber: '327',
          streetName: 'Boyd Street',
          city: 'Los Angeles',
          state: 'California',
          postalCode: '90013',
          country: 'United States',
          county: 'Los Angeles County',
        },
      }],
      pickupLocation: '1 Apple Park Way, Cupertino, CA, USA',
      hideAddressInfo: null,
      pickupCoordinates: { lat: 37.3294281, lng: -122.0102583 },
      pickupStartDate: '2020-06-22T00:00:00',
      pickupEndDate: '',
      pickupAddress: {
        streetNumber: '1',
        streetName: 'Apple Park Way',
        city: 'Cupertino',
        state: 'California',
        postalCode: '95014',
        country: 'United States',
        county: 'Santa Clara County',
      },
    },
    loads: [{
      loadContentDetails: {
        weight: { unit: 'lb(s)', amount: 123 },
        equipmentTypes: {
          specialized: {
            animalCarrier: false,
            movingVan: false,
            heavyHaulers: false,
            boatHauler: false,
          },
          container: false,
          tanker: false,
          auto: false,
          reefer: false,
          flatbed: {
            stepDeck: false,
            maxi: false,
            doubleDrop: false,
            lowboy: false,
            removableGooseneck: false,
            flatbed: false,
            landoll: false,
          },
          powerOnly: false,
          van: true,
          hopperBottom: false,
          dumpTruck: false,
        },
        additional: {
          cashOnDelivery: null,
          teamRequired: null,
          mode: { prepaid: null, collect: null },
          customerCheck: null,
        },
        handlingUnits: { type: null, amount: null },
        ftl: true,
        ltl: { nfmcClass: null },
        equipmentSpecifications: {
          hazMat: false,
          palletExchange: false,
          liftGate: false,
          curtains: false,
          airRide: false,
          insulated: false,
          tempControlled: false,
          openTop: false,
          eTrack: false,
          walkingFloor: false,
          hotShot: false,
          conestoga: false,
          extendable: false,
          blanketWrap: false,
          sideKit: false,
          bTrain: false,
          chassis: false,
          chains: false,
          loadRamps: false,
          loadOut: false,
          intermodal: false,
          vented: false,
          tarps: false,
        },
        package: { type: null, quantity: null },
        commodityDescription: { hazardousMaterialsCheck: null, description: '', specialCareInstructions: '' },
        dimensions: {
          length: { unit: 'inch', amount: 0 },
          height: { unit: 'inch', amount: 0 },
          width: { unit: 'inch', amount: 0 },
        },
      },
    }],
    brokerName: ['FO Test Broker N'],
    loadName: null,
  },
  locationProcessingRetry: 0,
  locationProcessed: false,
  postedBy: {
    id: '5b3d2686bdafc7000a609290',
    email: 'test+user1@fleetops.ai',
    phone: '+14541231212',
    emailVerified: true,
    userType: 'broker',
    displayName: 'FO Test Broker N',
    creationTimestamp: 1530734213000,
    disabled: false,
    firebaseUID: 'wswDSzqXSqMmuaXwTJnBYAjHuTm1',
    additionalInfo: { equipmentType: '23', freightType: '23', preferredLane: '23' },
    uploadedFiles: {
      docInterstateCertificate: 'StillUploadingFile',
      liabilityInsuranceDoc: 'https://s3-us-west-2.amazonaws.com/docs.fleetops.ai/1545060784-truck_and.png',
      docDot: 'https://s3-us-west-2.amazonaws.com/docs.fleetops.ai/1545060799-truck_and.png',
      liabilityInsuranceProviderEmail: '23@1.com',
      liabilityInsuranceProviderName: '23',
    },
    equipmentTypeList: [],
    truckType: '',
    preferredPerMileRate: { price: 0, currency: 'USD' },
    truckCount: 0,
    officePhone: '',
    companyName: 'FleetOps',
    companyLogo: 'https://fleetops-user-documents.s3.amazonaws.com/5b3d2686bdafc7000a609290/profile/companyLogo.png',
    companyType: 'Owner-Operator',
    address: { line1: '123 Edwayd', line2: '', city: 'Toronto', state: 'MI', postalCode: 'M1H1H1' },
    mcNumber: '123123',
    preferredLanes: { states: ['OR', 'WY'], followMoney: false, skipOnboarding: false },
    agreedToTermsAndConditions: {},
    channel: 'bigroad',
    firstLogin: false,
    tutorial: {
      firstLoadMatch: '2019-07-15T19:56:32.395000',
      searchPage: '2020-05-29T03:32:22.527000',
      myLoadsPage: '2020-06-01T19:31:38.500000',
      settingsPage: '2020-06-01T19:31:43.893000',
      RALPage: '2020-06-10T21:07:45.888000',
    },
    tac: '2019-08-30T15:10:18.005000',
    operatingLanes: [],
    permissions: null,
    dispatchable: 'new',
    lastLogin: '2020-06-22T19:12:07.747000',
    freightType: 'FTL',
    shipmentVolume: { low: 10, high: 20, frequency: 'weekly' },
    industry: 'Construction',
    documents: { w9: '5b3d2686bdafc7000a609290/documents/5a01f0b7028d482ecefa5012bb6b8f07.pdf' },
    communicationsPreferences: {
      load_request_responses: true,
      scientific_recommendations: true,
      brf_certified_recommendations: true,
      contact_email: null,
      email: true,
      push: true,
    },
  },
  interactions: [{ eventType: 'BO', timestamp: 1592848393.4493945, matchId: '5ef0f0096cd998fe7aa05b00' }],
  matches: [{
    matchId: '5ef0f0096cd998fe7aa05b00',
    loadId: '5ef0eebe6cd998fe7aa05afb',
    status: 'BO',
    notifications: {},
    timestamp: 1592848393,
    cost: 0,
    personId: '758',
    interactions: [{
      eventType: 'AUTR',
      userType: 'broker',
      firebaseUID: 'wswDSzqXSqMmuaXwTJnBYAjHuTm1',
      timestamp: 1592848575,
      metadata: { mode: 'automated' },
      displayName: 'FO Test Broker N',
      phone: '+14541231212',
      email: 'test+user1@fleetops.ai',
      mcNumber: '123123',
      companyName: 'FleetOps',
    }, {
      eventType: 'AC',
      userType: 'broker',
      firebaseUID: 'wswDSzqXSqMmuaXwTJnBYAjHuTm1',
      timestamp: 1592848393,
      metadata: {},
      displayName: 'FO Test Broker N',
      phone: '+14541231212',
      email: 'test+user1@fleetops.ai',
      mcNumber: '123123',
      companyName: 'FleetOps',
    }],
    autoMatchId: null,
    uploadedFiles: {},
    active: true,
    accepted: false,
    liked: false,
    sentBy: '',
    truck: {
      _id: '5ba129360fe4dd099ad66088',
      personId: '758',
      email: 'justin@fleetrover.com',
      fleetId: '258',
      firstName: 'Justin',
      lastName: '',
      hosSettings: {},
      roles: ['driver'],
      phone: '',
      freightType: '',
      preferredLane: '',
      equipmentType: '',
      homeCountry: 'US',
      crossBorder: true,
      dotNumber: '2323',
      mcNumber: '123123',
      equipmentTypeList: ['van'],
      preferredPerMileRate: { price: 2.25, currency: 'USD' },
      truckCount: 10,
      officePhone: '+14160000002',
      companyName: 'fleetOps Inc.',
      preferredLanes: { states: [], followMoney: false, skipOnboarding: true },
      dispatchable: 'notDispatchable',
      truckId: '5ba129360fe4dd099ad66088',
      fleet: {
        _id: '5c7813e34a81dd633cdb1848',
        fleetId: '258',
        carrierName: 'BigRoad Freight Express',
        freightDispatcherEnabled: false,
        address: ['123 Fake St', 'Waterloo', 'ON', 'United States', 'N2K4L1'],
        addressLocation: {},
        dotNumber: '2323',
      },
      userType: 'driver',
      lastLogin: '2020-06-22T14:44:26.721000',
      lastLocation: {
        _id: '5ef0c3cb6cd998fe7aa05aa9',
        asOf: '2020-06-22T14:44:27.981000',
        bearing: '',
        hosStatus: 'NA',
        personId: '758',
        position: { lon: '74.12399599999999', lat: '15.299326499999998', accuracy: '32601' },
        speed: '0',
        source: 'web-ip',
      },
    },
    metadata: {},
    tracking: { mode: TRACKINGMODES.AUTOMATED },
  }],
};

const { CancelToken } = axios;
let source = CancelToken.source();

export const SearchLoads = async (pageNumber, { searchQuery, sortFilter }) => {
  source && source.cancel('Operation canceled due to new request.');
  source = axios.CancelToken.source();

  if (!searchQuery) {
    throw new Error('Invalid searchQuery provided');
  }

  const { currentUser } = firebase.auth();
  if (!currentUser) {
    throw new Error('No firebaseUID for user');
  }
  const tokenHeader = await getTokenHeader();

  let url = `${config.apiUrlV2}/search/?page=${pageNumber}`;
  sortFilter.forEach((filter: SortValues) => {
    url = `${url}&sortBy=${filter}`;
  });
  return axios.post(
    url,
    searchQuery,
    { headers: tokenHeader, cancelToken: source.token },
  ).then((response) => {
    if (response.data && response.data.data) {
      return {
        data: response.data.data.reduce((acc, load) => {
          try {
            acc.push(new Load(load));
          } catch (error) {
            console.log(`Search Error parsing LoadList load: ${error}`);
          }
          return acc;
        }, []),
        pagination: response.data.pagination,
      };
    }
    return {
      data: [],
      pagination: new Pagination(),
    };
  }).catch((error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      return ({
        data: [],
        pagination: new Pagination(),
      });
    }
    ApiFail(error);
    throw error;
  });
};
