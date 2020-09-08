import React, { memo } from 'react';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import FOAppbar from '../../../../components/FOAppBar';
import DocumentsUploadPage from '../../../../Auth/AdditionalInfoPage/components/DocumentsUploadPage';


const styles = (theme: Theme) => ({
  root: {
    marginTop: 65,
  },
  button: {
    padding: theme.spacing(2),
  },
});

interface IDocumentsUploadDialogContentOwnProps {
  closeHandler: () => void;
}

type IDocumentsUploadDialogContentProps = IDocumentsUploadDialogContentOwnProps & WithStyles<typeof styles>;

const DocumentsUploadDialogContent = memo(({ closeHandler, classes }: IDocumentsUploadDialogContentProps) => (
  <div>
    <FOAppbar>
      <Grid container alignItems='center'>
        <Grid item>
          <IconButton onClick={closeHandler} color='inherit'>
            <Clear />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='h5' color='inherit'>
            Upload Documents
          </Typography>
        </Grid>
      </Grid>
    </FOAppbar>
    <div className={classes.root}>
      <DocumentsUploadPage />
    </div>
    <Grid container justify='center'>
      <Grid item xs={12} sm={6} md={3} className={classes.button}>
        <Button color='secondary' variant='contained' onClick={closeHandler} fullWidth>Done</Button>
      </Grid>
    </Grid>
  </div>
));

export default withStyles(styles)(DocumentsUploadDialogContent);
