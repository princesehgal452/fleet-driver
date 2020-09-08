import React, { ChangeEvent, Component } from 'react';
import Image from '@material-ui/icons/Image';
import { CheckCircle, CloudUpload, ErrorOutline, PictureAsPdf } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { WrappedFieldProps } from 'redux-form';
import { bytesToSize } from '../../utils/utility';


const acceptedInputTypes = 'image/png, image/jpeg, .pdf';

const styles = (theme: Theme) => ({
  button: {
    padding: theme.spacing(1.5, 2),
    minHeight: 82,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 1.5),
      minHeight: 75,
    },
  },
  image: {
    marginRight: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
});

interface IFOUploadFieldOwnProps {
  label: string;
  uploadDocumentAction: (label: string, file: File) => Promise<any>;
  prefilled?: string;
  error?: string;
}

type IFOUploadFieldProps = IFOUploadFieldOwnProps & WrappedFieldProps & WithStyles<typeof styles>;

class FOUploadField extends Component<IFOUploadFieldProps> {
  state = {
    uploading: false,
  };

  onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { input: { onChange, name }, uploadDocumentAction } = this.props;

    if (e.target.files && e.target.files.length > 0 && e.target.files[0].size > 0) {
      const file = e.target.files[0];
      this.setState({ uploading: true });
      try {
        await uploadDocumentAction(name, file);
        onChange({ file, pdf: Boolean(file.type.match('.pdf')), size: bytesToSize(file.size) });
      } catch (error) {
      } finally {
        this.setState({ uploading: false });
      }
    } else {
      onChange(null);
    }
  };

  render() {
    const { uploading } = this.state;
    const { input, label, prefilled, error, classes } = this.props;

    return (
      <Paper>
        <Button fullWidth component='label' className={classes.button} disabled={uploading}>
          <input
            type='file'
            accept={acceptedInputTypes}
            onChange={this.onChange}
            className={classes.input}
          />
          <Grid container alignItems='center'>
            <Grid item>
              <Grid container alignItems='center'>
                {input.value.file
                  ? input.value.pdf
                    ? <PictureAsPdf fontSize='large' color='secondary' className={classes.image} />
                    : <Image fontSize='large' color='secondary' className={classes.image} />
                  : error ? <ErrorOutline fontSize='large' color='error' className={classes.image} />
                    : prefilled
                      ? <CheckCircle fontSize='large' color='secondary' className={classes.image} />
                      : <CloudUpload fontSize='large' className={classes.image} />}
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant='button'>
                    {label}
                  </Typography>
                </Grid>
                {uploading ? (
                  <Grid item xs={12}>
                    {uploading && (
                      <LinearProgress color='primary' />
                    )}
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant='body2'>
                        {input.value && input.value.file.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='caption'>
                        {input.value && input.value.size}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(FOUploadField);
