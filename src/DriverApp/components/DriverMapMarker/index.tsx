import React from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from 'react-google-maps';

import './DriverMapMarker.scss';

class DriverMapMarker extends React.PureComponent {
  static propTypes = {
    marker: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpenInfoWindow: false
    };
  }

  onToggleOpen = () => {
    this.setState({
      isOpenInfoWindow: !this.state.isOpenInfoWindow
    })
  };

  render () {
    const { marker } = this.props;
    return (
      <div>
        {marker.location &&
        <Marker position={marker.location} onClick={this.onToggleOpen} >
          {this.state.isOpenInfoWindow &&
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <div>
              <div className='info-item'>
                <div className='info-item__title'>Type: </div>
                <div className='info-item__value'>{marker.type}</div>
              </div>
            </div>
          </InfoWindow>}
        </Marker>
        }
      </div>
    )
  }
}

export default DriverMapMarker
