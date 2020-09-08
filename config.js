// development
// const apiHostAndPort = 'http://localhost:5055';
const env = 'DEV';
const apiHostAndPort = 'http://ec2-54-218-111-121.us-west-2.compute.amazonaws.com:5050'; // V1
//const apiHostAndPortV2 = 'https://staging-api-proxy.fleetops.ai/v1'; // Staging V2
 const apiHostAndPortV2 = 'http://localhost:5055/v1'; // Staging V2
const bigRoadSSOUrl = 'https://quality.bigroad.com/partner-sign-in/freight'; // BigRoad Staging
const geolocationAPI = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDWzus96n6vzsziFdZ_LjMZ_2chBOUKAUM';
const aisinAPI = 'https://mtlogi-routesearch.aw-cs-connected.com/RouteService/api/v4';
const appMode = process.env.appMode;
const firebaseConfig = {
  apiKey: 'AIzaSyDVLwOfPWL9iUEtExjTDT8k1LgydQzIzeA',
  authDomain: 'fleetops.ai',
  databaseURL: 'https://fleetops-p.firebaseio.com',
  projectId: 'fleetops-p',
  storageBucket: 'fleetops-p.appspot.com',
  messagingSenderId: '326879692618',
};
const sentry = {
  key: '', // If no key is provided then sentry is just reporting locally.
  options: {
    autoBreadcrumbs: false,
    deactivateStacktraceMerging: true,
  },
};
const googleAnalytics = {
  key: 'UA-123161674-1', // Dev/Staging project
};
const mixpanelConfig = {
  token: '21ea7debd2895a6d6f125a49aed73bcc',
};

/* staging
const env = 'STAGING';
const apiHostAndPort = 'http://ec2-54-218-111-121.us-west-2.compute.amazonaws.com:5050'; // V1
const apiHostAndPortV2 = 'https://staging-api-proxy.fleetops.ai/v1'; // Staging V2
const bigRoadSSOUrl = 'https://quality.bigroad.com/partner-sign-in/freight'; // BigRoad Staging
const geolocationAPI = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDWzus96n6vzsziFdZ_LjMZ_2chBOUKAUM';
const firebaseConfig = {
  apiKey: 'AIzaSyDVLwOfPWL9iUEtExjTDT8k1LgydQzIzeA',
  authDomain: 'fleetops.ai',
  databaseURL: 'https://fleetops-p.firebaseio.com',
  projectId: 'fleetops-p',
  storageBucket: 'fleetops-p.appspot.com',
  messagingSenderId: '326879692618'
};
const sentry = {
  key: '', // If no key is provided then sentry is just reporting locally.
  options: {
    autoBreadcrumbs: false,
    deactivateStacktraceMerging: true,
  },
};
const googleAnalytics = {
  key: 'UA-123161674-1', // Dev/Staging project
};
*/

/* production
const env = 'PROD';
const apiHostAndPort = "https://api.fleetops.ai";
const apiHostAndPortV2 = 'https://api.fleetops.ai/v1'; // Prod V2
const bigRoadSSOUrl = 'https://api.bigroad.com/partner-sign-in/freight'; // BigRoad Production
const geolocationAPI = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDWzus96n6vzsziFdZ_LjMZ_2chBOUKAUM';
const firebaseConfig = {
  apiKey: "AIzaSyCxSibAMCrrOu9iRSz5bAuPT4PwafE1KmM",
  authDomain: "fleetops-production.firebaseapp.com",
  databaseURL: "https://fleetops-production.firebaseio.com",
  projectId: "fleetops-production",
  storageBucket: "fleetops-production.appspot.com",
  messagingSenderId: "123222433082"
};
const sentry = {
  key: 'https://1156232bfe594909be2382e51be2fb2c@sentry.io/1284247',
  options: {},
};
const googleAnalytics = {
  key: 'UA-123161674-3', // Prod project
};
*/

const config = {
  env,
  isGetPaidEarlyEnabled: false,
  apiHostAndPort,
  bigRoadSSOUrl,
  geolocationAPI,
  aisinAPI,
  appMode,
  apiUrl: `${apiHostAndPort}/service`,
  apiUrlV2: apiHostAndPortV2,
  apiPdfUrl: `${apiHostAndPort}/pdf/generate`,
  testEmail: 'atkin.chris.9@gmail.com',
  testDriverId: '111111',
  testUid: '8865zuRUZkgIdaIkmPBKzHKbJ0I3',
  firebaseConfig,
  sentry,
  googleAnalytics,
  mixpanelConfig,
};

export default config;
