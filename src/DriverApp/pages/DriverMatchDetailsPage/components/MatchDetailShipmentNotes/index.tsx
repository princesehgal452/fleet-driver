import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';

import './MatchDetailShipmentNotes.scss';
import { formatNumberToString } from '../../../../../utils/utility';

@observer
class MatchDetailShipmentNotes extends React.Component {
  static propTypes = {
    loadContentDetails: PropTypes.object,
  };

  getDimensions() {
    const { loadContentDetails } = this.props;
    if (!loadContentDetails || !loadContentDetails.dimensions || loadContentDetails.ftl) {
      return null;
    }
    const {
      height: { amount: hAmount, unit: hUnit },
      length: { amount: lAmount, unit: lUnit },
      width: { amount: wAmount, unit: wUnit },
    } = loadContentDetails.dimensions;
    return (
      <>
        {hAmount && (`H: ${formatNumberToString(hAmount)} ${hUnit} `)}
        {lAmount && (`L: ${formatNumberToString(lAmount)} ${lUnit} `)}
        {wAmount && (`W: ${formatNumberToString(wAmount)} ${wUnit} `)}
        {(hAmount || lAmount || wAmount) && <br />}
      </>
    );
  }

  getNotes() {
    const { loadContentDetails } = this.props;
    if (!loadContentDetails || !loadContentDetails.commodityDescription) {
      return null;
    }
    const { commodityDescription: { specialCareInstructions, description } } = loadContentDetails;
    return (
      <>
        {specialCareInstructions && `${specialCareInstructions}`}
        {specialCareInstructions && <br />}
        {description && `${description}`}
        {description && <br />}
      </>
    );
  }

  getHazardous() {
    const { loadContentDetails } = this.props;
    if (!loadContentDetails?.commodityDescription) {
      return null;
    }
    const { commodityDescription: { hazardousMaterialsCheck } } = loadContentDetails;
    return (
      <>
        {hazardousMaterialsCheck && 'Hazardous Material'}
        {hazardousMaterialsCheck && <br />}
      </>
    );
  }

  render() {
    return (
      <div className='match-detail-page-shipment-notes'>
        <div className='title-section'>
          <Typography variant='subtitle2' className='location-text'>
            Shipping Notes
          </Typography>
        </div>
        <div className='body-section'>
          <Typography varient='body1'>
            {this.getDimensions()}
            {this.getNotes()}
            {this.getHazardous()}
          </Typography>
        </div>
      </div>
    );
  }
}

export default MatchDetailShipmentNotes;
