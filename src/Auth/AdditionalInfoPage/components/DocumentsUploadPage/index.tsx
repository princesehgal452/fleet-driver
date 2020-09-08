import React from 'react';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import { connect } from 'react-redux';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import withStyles, { CSSProperties, WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import Collapse from '@material-ui/core/Collapse';

import FOUploadField from '../../../../components/FOUploadField';
import { IDriverAppStore } from '../../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../../../DriverApp/store/DriverAppStore';
import { DOCUMENT_TYPES } from '../../../../services/constants';


const styles = (theme: Theme) => ({
  root: {
    maxWidth: '100%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  registrationPage: {
    height: '100vh',
  },
  dummyOtherSection: {
    marginBottom: theme.spacing(3),
  },
  otherSection: {
    marginBottom: theme.spacing(8),
  },
});

const formName = 'registerDocuments';
const growFromTopStyle: CSSProperties = {
  transformOrigin: 'top',
};

interface IDocumentsUploadPageOwnProps {
  registrationPage?: boolean;
}

type IDocumentsUploadPageProps =
  IDocumentsUploadPageOwnProps
  & IDriverAppStore
  & InjectedFormProps
  & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class DocumentsUploadPage extends React.Component<IDocumentsUploadPageProps> {
  state = {
    showAll: false,
    clickedShowAll: false,
  };

  setClickedShowAllTrue = (event) => {
    event.preventDefault();
    this.setState({ clickedShowAll: true });
  };

  setShowAllTrue = () => {
    this.setState({ showAll: true });
  };

  render() {
    const { showAll, clickedShowAll } = this.state;
    const { driverAppStore, handleSubmit, registrationPage, classes } = this.props;
    const { userStore: { updateDocument, FOUser: { documents } } } = driverAppStore as DriverAppStore;
    return (
      <form
        onSubmit={handleSubmit}
        className={classNames(classes.root, { [classes.registrationPage]: registrationPage })}
      >
        <Grid container justify='center' spacing={1}>
          <Grid item xs={12}>
            <Typography variant='h6' align='center'>
              You can manage all your carrier documents from here.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle1' align='center'>
              Once uploaded you can dispatch to anyone.
            </Typography>
          </Grid>
          {DOCUMENT_TYPES.slice(0, 3).map(document => (
            <Grid item xs={12}>
              <Field
                component={FOUploadField}
                name={document.value}
                label={document.label}
                fullWidth
                prefilled={documents && documents[document.value]}
                uploadDocumentAction={updateDocument}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Collapse in={!clickedShowAll} onExited={this.setShowAllTrue}>
              <Grid
                container
                className={classNames({ [classes.dummyOtherSection]: registrationPage })}
              >
                <Grid item xs={12}>
                  <Typography variant='body1' align='center'>
                    Ensure that your W9, Insurance and Carrier Authority are uploaded to book shipments faster.
                  </Typography>
                </Grid>
                {/*dummyOther is only as a placeholder to change state*/}
                <Grid item xs={12} onClick={this.setClickedShowAllTrue}>
                  <Field
                    component={FOUploadField}
                    name='dummyOther'
                    label='Other'
                    fullWidth
                    uploadDocumentAction={updateDocument}
                  />
                </Grid>
              </Grid>
            </Collapse>
            <Collapse in={showAll}>
              <Grid container>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <Grid item xs={12}>
            <Grow in={showAll} mountOnEnter style={growFromTopStyle}>
              <Grid container spacing={1} className={classNames({ [classes.otherSection]: registrationPage })}>
                {DOCUMENT_TYPES.slice(3).map(document => (
                  <Grid item xs={12}>
                    <Field
                      component={FOUploadField}
                      name={document.value}
                      label={document.label}
                      fullWidth
                      prefilled={documents && documents[document.value]}
                      uploadDocumentAction={updateDocument}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Field
                    component={FOUploadField}
                    name='other'
                    label='Other'
                    fullWidth
                    prefilled={documents && documents['other'] && documents['other']['other']}
                    uploadDocumentAction={updateDocument}
                  />
                </Grid>
              </Grid>
            </Grow>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const DocumentUploadForm = reduxForm({
  form: formName,
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(withStyles(styles)(DocumentsUploadPage));

const DocumentUploadFormConnect = connect(
  () => ({}),
  null,
  null,
  { forwardRef: true },
)(DocumentUploadForm);

export default DocumentUploadFormConnect;
