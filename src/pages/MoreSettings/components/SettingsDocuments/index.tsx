import React from 'react';
import { inject, observer } from 'mobx-react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { IDriverAppStore } from 'models/dataStructures/IDriverAppStore';
import { DriverAppStore } from 'DriverApp/store/DriverAppStore';
import DOCUMENT_TYPES from 'constants/DocumentTypes';
import DocumentItem from './DocumentItem';
import styles from './styles';

type ISettingsDocumentsProps = IDriverAppStore & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class SettingsDocuments extends React.Component<ISettingsDocumentsProps> {
  render() {
    const { driverAppStore: { userStore: { FOUser } } } = this.props;
    const { documents } = FOUser;
    return (
      <Grid
        container
        direction='row'
      >
        {DOCUMENT_TYPES.map((documentType) => (
          <Grid item xs={4} md={3} lg={2}>
            <DocumentItem
              key={documentType.value}
              documentType={documentType}
              documents={documents}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(SettingsDocuments);
