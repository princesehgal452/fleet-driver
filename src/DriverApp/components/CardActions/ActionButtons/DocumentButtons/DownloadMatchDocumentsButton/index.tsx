import React, { Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react';
import { saveAs } from 'file-saver';
import { CircularProgress } from '@material-ui/core';
import { CloudDownload } from '@material-ui/icons';
import Match from '../../../../../../models/dataStructures/Match';
import FOCardActionListItem from '../../../../../../components/FOCardActionListItem';


const getButtonText = ({ documents: { tender, invoice, pod } }: Match) => {
  // Show Download Tender when no invoice/pod or invoice/pod both rejected
  if (tender && (!invoice && !pod) || (tender && (invoice && pod && (invoice.rejected || pod.rejected)))) {
    return 'Download Tender';
  }
  return 'Download Documents';
};

const onClickHandler = ({ documents }: Match, setLoading: Dispatch<SetStateAction<boolean>>) => async () => {
  const { downloadAllDocuments } = documents;
  // const zip = new JSZip();
  setLoading(true);
  try {
    await downloadAllDocuments();
    const { pod, invoice, tender } = documents;
    if (tender && tender.blob) {
      saveAs(tender.blob, `tender`);
      // await zip.file(tender.blob);
    }
    if (invoice && invoice.blob && invoice.type) {
      saveAs(invoice.blob, `invoice`);
      // await zip.file(invoice.blob);
    }
    if (pod && pod.blob) {
      saveAs(pod.blob, `pod`);
      // await zip.file(pod.blob);
    }
    // if (zip.files && Object.keys(zip.files).length > 0) {
    // console.log(zip.files);
    // const content = await zip.generateAsync({ type: 'blob' });
    // saveAs(content);
    // }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

interface IDownloadMatchDocumentsButtonProps {
  bookedMatch: Match;
}

const DownloadMatchDocumentsButton = observer(({ bookedMatch }: IDownloadMatchDocumentsButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <FOCardActionListItem
      text={loading ? <CircularProgress /> : getButtonText(bookedMatch)}
      Icon={CloudDownload}
      variant='contained'
      yellow
      onClick={onClickHandler(bookedMatch, setLoading)}
    />
  );
});

export default DownloadMatchDocumentsButton;
