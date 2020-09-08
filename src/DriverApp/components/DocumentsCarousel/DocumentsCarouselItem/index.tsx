import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardActionArea from '@material-ui/core/CardActionArea';
import Image from '@material-ui/icons/Image';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import { UserStore } from '../../../store/UserStore';
import { getDocumentNameFromKey } from '../../../../utils/utility';
import { DOCUMENT_TYPES } from '../../../../services/constants';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
  },
  gridItem: {
    margin: theme.spacing(0.5),
  },
  paperCard: {
    height: '100%',
    width: 130,
  },
  description: {
    padding: theme.spacing(0, 0.5),
  },
}));

const initiateDocumentDownload = (
  getDocument: (label: string, documentName?: string) => Promise<void>, setLoading: Dispatch<SetStateAction<boolean>>, label: string, documentName?: string) =>
  async () => {
    setLoading(true);
    await getDocument(label, documentName);
    setLoading(false);
  };

const getDocumentName = (documents, documentKey) => () => getDocumentNameFromKey(documents, documentKey);

const getDocumentLabel = (documentKey: string) => () => {
  const document = DOCUMENT_TYPES.find(document => document.value === documentKey);
  return document ? document.label : '';
};

const checkIfPDF = (documentName?: string) => () => documentName && documentName.includes('pdf');

interface IDocumentsCarouselItemOwnProps {
  documentKey: string;
  userStore: UserStore;
  handleCarouselItemClick?: () => void;
}

type IDocumentsCarouselItemProps = IDocumentsCarouselItemOwnProps & RouteComponentProps;

const DocumentsCarouselItem = observer(({ documentKey, userStore, history, match, handleCarouselItemClick }: IDocumentsCarouselItemProps) => {
  const classes = useStyles();
  const { FOUser: { documents }, getDocument } = userStore;
  const [loading, setLoading] = useState(false);
  const documentName = useMemo(getDocumentName(documents, documentKey), [documents, documentKey]);
  const documentLabel = useMemo(getDocumentLabel(documentKey), [documentKey]);
  const isPdf = useMemo(checkIfPDF(documentName), [documentName]);
  return (
    <Paper key={documentKey} className={classes.gridItem}>
      <CardActionArea
        className={classes.paperCard}
        onClick={handleCarouselItemClick || initiateDocumentDownload(getDocument, setLoading, documentKey, documentName)}
      >
        <Grid container justify='space-between' className={classes.root}>
          <Grid item container alignContent='center' justify='center'>
            {loading
              ? <CircularProgress color='primary' />
              : isPdf
                ? <PictureAsPdf fontSize='large' color='primary' />
                : <Image fontSize='large' color='primary' />}
          </Grid>
          <Grid item xs={12} className={classes.description}>
            <Grid container alignContent='flex-end'>
              <Grid item xs={12}>
                <Typography variant='body2' align='center'>{documentLabel}</Typography>
              </Grid>
              <Typography align='center' variant='caption' noWrap>{documentName}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Paper>
  );
});

export default withRouter(DocumentsCarouselItem);
