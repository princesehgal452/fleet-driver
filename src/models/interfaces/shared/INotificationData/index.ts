import { IMatchData } from '../IMatchData';
import { IPostedBy } from '../IPostedBy';
import { LoadStatus, MatchStatus, notificationTypes } from '../../../../services/constants';
import { ILoadData } from '../ILoadData';


interface IData {
  match: IMatchData;
}

export const mockLoadData: ILoadData = {
  _id: '1405381599749201531321687',
  loadId: '1405381599749201531321687',
  status: LoadStatus.FINDING_COVERAGE,
  trackingNumber: '',
  account: null,
  brokerId: 'wswDSzqXSqMmuaXwTJnBYAjHuTm1',
  token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk1OGE0NGZhNThmZGVkZDE1YTE1YmMwMzk1ODM5NGVjMDA0OTdjYzAifQ.eyJpc3MiOiJodHRwcz' +
    'ovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmxlZXRvcHMtcCIsIm5hbWUiOiJGTyBUZXN0IEJyb2tlciIsImF1ZCI6ImZsZWV0b3BzLXAiLCJh' +
    'dXRoX3RpbWUiOjE1MzEzMjE1OTcsInVzZXJfaWQiOiJ3c3dEU3pxWFNxTW11YVh3VEpuQllBakh1VG0xIiwic3ViIjoid3N3RFN6cVhTcU1tdW' +
    'FYd1RKbkJZQWpIdVRtMSIsImlhdCI6MTUzMTMyMTU5NywiZXhwIjoxNTMxMzI1MTk3LCJlbWFpbCI6InRlc3QrdXNlcjFAZmxlZXRvcHMuYWki' +
    'LCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0K3VzZXIxQGZsZWV0b3BzLmFpIl' +
    '19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.TmKsbVvubWB_zIYhPFPTVqzKJ98JieUlP1V71uZTd4MxBG-44E63p7-LyHvb86L-' +
    'wQLUeHbsJMso1NM7u6-9wrIGeiFuuHSMf4x1_kzVDiNuOevCo0jIkuH5jkp2xb-3etA-DBGctUHWMD7Io_ZVcizoyct_va_zbak_CcUHzUOjEE' +
    'QoTvSudUJyqaMQgQOynbQPbN8KkcxF0_LYYywNz5ScQh4loR2NacO33tqancYZlw8Ug1lmwGW5NbK39ZWnKOLkzLClcW2vkoHlRbYe_mjs5p6M' +
    'pffv-gFAzkwAAqnh9_TExbN6ucuYbcsaYqWaxMPx5x5Gm4-aYw_Lx9SGPw',
  source: '',
  key: '',
  payload: {
    assignedDate: '07/11/2018',
    customerName: 'Not yet assigned',
    daysUntilPayment: 4,
    loads: [{
      loadContentDetails: {
        additional: {
          teamRequired: false,
          mode: {
            collect: false,
            prepaid: true,
          },
          customerCheck: false,
          cashOnDelivery: '',
        },
        commodityDescription: {
          description: '',
          specialCareInstructions: '',
          hazardousMaterialsCheck: false,
        },
        dimensions: {
          length: {
            unit: 'in(s)',
            amount: '0',
          },
          height: {
            unit: 'in(s)',
            amount: '0',
          },
          width: {
            unit: 'in(s)',
            amount: '0',
          },
        },
        equipmentTypes: {
          container: false,
          van: false,
          powerOnly: false,
          flatbed: {
            doubleDrop: false,
            flatbed: false,
            removableGooseneck: false,
            landoll: false,
            maxi: false,
            lowboy: false,
            stepDeck: false,
          },
          tanker: false,
          reefer: true,
          dumpTruck: false,
          auto: false,
          hopperBottom: false,
          specialized: {
            boatHauler: false,
            heavyHaulers: false,
            animalCarrier: false,
            movingVan: false,
          },
        },
        equipmentSpecifications: {
          openTop: false,
          tarps: false,
          airRide: false,
          hotShot: false,
          curtains: false,
          hazMat: false,
          chassis: false,
          sideKit: false,
          palletExchange: false,
          bTrain: false,
          extendable: false,
          eTrack: false,
          walkingFloor: false,
          loadOut: false,
          blanketWrap: false,
          liftGate: false,
          insulated: false,
          chains: false,
          loadRamps: false,
          intermodal: false,
          vented: false,
          tempControlled: false,
          conestoga: false,
        },
        ltl: {
          nmfcClass: '',
        },
        ftl: true,
        handlingUnits: {
          type: '',
          quantity: '',
        },
        weight: {
          unit: 'lb(s)',
          amount: '0',
        },
        dropoffLocation: '123 Fake Road, York, PA, USA',
        package: {
          type: '',
          quantity: '',
        },
      },
    }],
    loadPay: {
      currency: 'USD',
      billOfLading: { additionalEmail: '', generateBillOfLading: false, sendToDriver: false },
      amount: 1,
      emailUpdates: true,
      range: { high: 2, originalLow: 1, originalHigh: 2, low: 1 },
    },
    loadName: 1531321689014,
    loadStatus: 'uncovered',
    tripDetails: {
      pickupStartTime: '11:09 am',
      pickupCoordinates: { lng: -79.43535050000003, lat: 43.8603767 },
      pickupEndDate: '01/18/2019',
      dropoffs: [{
        receiverInfo: { fullName: '', address: '' },
        dropoffLocation: '3641 Kingsway, Vancouver, BC, Canada',
        dropoffStartDate: '04/19/2019',
        dropoffEndDate: '04/19/2019',
        dropoffStartTime: '11:12 am',
        dropoffCoordinates: { lng: -123.02514639999998, lat: 49.2324111 },
        consigneeInfo: { freightCharges: false, fullName: '', hideReceiverInfo: true, address: '' },
        dropoffEndTime: '12:07 pm',
      }],
      pickupLocation: '9550 Yonge Street, Richmond Hill, ON, Canada',
      pickupEndTime: '12:09 pm',
      pickupStartDate: '01/18/2019',
      hideAddressInfo: true,
    },
    brokerName: 'FO Test Broker',
  },
  locationProcessingRetry: 0,
  locationProcessed: false,
  postedBy: {
    email: 'test+user1@fleetops.ai',
    phone: '+14169659813',
    emailVerified: true,
    userType: 'driver',
    displayName: 'FO Test Broker',
    creationTimestamp: 1530734213000,
    disabled: false,
    firebaseUID: 'wswDSzqXSqMmuaXwTJnBYAjHuTm1',
    additionalInfo: {},
    uploadedFiles: {
      docInterstateCertificate: '',
      liabilityInsuranceDoc: '',
      liabilityInsuranceProviderEmail: '',
      docDot: '',
      liabilityInsuranceProviderName: '',
    },
    equipmentTypeList: [],
    truckType: '',
    preferredPerMileRate: { price: 0, currency: 'USD' },
    truckCount: 0,
    officePhone: '',
    companyName: '',
    companyType: 'Company Driver',
    address: { line1: '', line2: '', city: '', state: '', coordinate: { lat: 0, lng: 0 } },
    mcNumber: '3123',
    preferredLanes: { states: [], followMoney: true, skipOnboarding: false },
    agreedToTermsAndConditions: {},
    channel: '',
    firstLogin: true,
  },
};

const match = {
  matchId: '',
  interactions: [],
  load: {
    ...mockLoadData,
  },
  cost: 0,
  personId: '',
  timestamp: 0,
  status: MatchStatus.automatedMatch,
  uploadedFiles: {},
  notifications: {},
  loadId: '',
  _id: '',
} as IMatchData;

export class INotificationData {
  id = '';
  type = notificationTypes.RAL_FOUND_MATCH;
  read = true;
  updatedAt = new Date();
  data = {
    match,
  };
  postedBy: IPostedBy = {
    displayName: '',
    additionalInfo: {},
    address: {
      line1: '',
      city: '',
      line2: '',
      coordinate: {
        lat: 0, lng: 0,
      },
      state: '',
    },
    emailVerified: false,
    userType: '',
    creationTimestamp: '',
    disabled: false,
    firebaseUID: '',
    uploadedFiles: {
      docDot: '',
      docInterstateCertificate: '',
      liabilityInsuranceDoc: '',
      liabilityInsuranceProviderEmail: '',
      liabilityInsuranceProviderName: '',
    },
    equipmentTypeList: [],
    truckType: '',
    preferredPerMileRate: {
      currency: '',
      price: 0,
    },
    truckCount: 0,
    officePhone: '',
    companyName: '',
    companyType: '',
    mcNumber: '',
    preferredLanes: {
      followMoney: false,
      skipOnboarding: false,
      states: [],
    },
    agreedToTermsAndConditions: {},
    channel: '',
    firstLogin: false,
  };
}
