// import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import { observer, inject } from 'mobx-react';
// import Button from '@material-ui/core/Button';
// import DriverGoogleMap from '../../components/DriverGoogleMap';
// import FOLoadingAndNoData from '../../../components/WithFOLoading/FOLoadingAndNoData';
//
// import './DriverMapPage.scss';
//
//
// @withRouter
// @inject('driverAppStore')
// @observer
// class DriverMapPageComponent extends React.Component {
//   static propTypes = {
//     matchId: PropTypes.string,
//     loadId: PropTypes.string,
//     driverAppStore: PropTypes.object,
//     history: PropTypes.object,
//   };
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       match: null,
//       load: null,
//     };
//   }
//
//   componentDidMount() {
//     this.downloadLoadOrMatch();
//   }
//
//   downloadLoadOrMatch = async () => {
//     const { matchId, loadId, driverAppStore } = this.props;
//     if (matchId) {
//       const match = await driverAppStore.downloadMatch(matchId);
//       this.setState({ match });
//     } else if (loadId) {
//       const load = await driverAppStore.downloadLoad(loadId);
//       this.setState({ load });
//     }
//   };
//
//   showLoadDetails = () => {
//     const { history, matchId, loadId } = this.props;
//     history.push(matchId ? `/driver/match/${matchId}/detail` : `/driver/load/${loadId}/detail`);
//   };
//
//   render() {
//     const { matchId, loadId, driverAppStore } = this.props;
//     const match = driverAppStore.getMatch(matchId);
//     const loadObject = driverAppStore.getLoad(loadId);
//     const load = loadObject || (match ? match.load : null);
//     const { isLoading } = driverAppStore;
//     const routes = load ? [
//       {
//         origin: {
//           lat: load.pickups[0].lat,
//           lng: load.pickups[0].lng,
//         },
//         destination: {
//           lat: load.dropoffs[0].lat,
//           lng: load.dropoffs[0].lng,
//         },
//       },
//     ] : [];
//     if (!isLoading && routes && routes.length === 0) {
//       this.showLoadDetails();
//     }
//     return (
//       <FOLoadingAndNoData isLoading={isLoading}>
//         <div className='driver-map-page'>
//           <DriverGoogleMap
//             routes={routes}
//             containerElement={<div style={{ height: '100vh' }} />}
//             mapElement={<div style={{ height: '100%' }} />}
//           />
//           <Button
//             className='btn-details'
//             variant='contained'
//             onClick={this.showLoadDetails}
//           >
//             Details
//           </Button>
//         </div>
//       </FOLoadingAndNoData>
//     );
//   }
// }
//
// export const DriverMapPage = DriverMapPageComponent;
// export default DriverMapPage;
