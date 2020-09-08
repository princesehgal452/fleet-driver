import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import './DetailSection.scss';

@observer
class DetailSection extends React.Component {
  static propTypes = {
    sectionTitle: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const { sectionTitle, children } = this.props;
    return (
      <Paper className='DetailSection'>
        <Grid container className='DetailSection__container' alignItems='center'>
          <Grid item xs={12}>
            <Typography variant='h6' noWrap>
              {sectionTitle}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {children}
      </Paper>
    );
  }
}

export { DetailSection };
export default DetailSection;
