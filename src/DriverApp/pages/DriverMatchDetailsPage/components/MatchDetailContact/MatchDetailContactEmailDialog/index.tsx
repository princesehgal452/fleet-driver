import React, { memo, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Load from '../../../../../../models/dataStructures/Load';
import { UserStore } from '../../../../../store/UserStore';
import FOFullPageDialog from '../../../../../../components/FOFullPageDialog';
import FOSelectListItem from '../../../../../../components/FOSelectListItem';
import Typography from '@material-ui/core/Typography';
import MatchDetailContactEmailDialogActionButton from './MatchDetailContactEmailDialogActionButtons';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const acceptRateEmail = (load: Load, userStore: UserStore) => {
  const {
    pickups: { 0: { location: pickupLocation } },
    dropoffs: { 0: { location: dropoffLocation } },
    contact: { displayName: brokerName, email },
  } = load;

  const { FOUser: { displayName: carrierName, companyName } } = userStore;

  const subject = `${carrierName} needs more detail on your shipment from ${pickupLocation} to ${dropoffLocation}`;
  const body =
    `Hi ${brokerName},

I'd like to book this shipment, can you send me the load details?

Thank you.
`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const sendOfferEmail = (load: Load, userStore: UserStore) => {
  const {
    pickups: { 0: { location: pickupLocation } },
    dropoffs: { 0: { location: dropoffLocation } },
    contact: { displayName: brokerName, email },
  } = load;

  const { FOUser: { displayName: carrierName, companyName } } = userStore;

  const subject = `${carrierName} needs more detail on your shipment from ${pickupLocation} to ${dropoffLocation}`;
  const body =
    `Hi ${brokerName},

I'd like to book this shipment for <insert rate>. 

Thank you.`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const requestRateEmail = (load: Load, userStore: UserStore) => {
  const {
    pickups: { 0: { location: pickupLocation } },
    dropoffs: { 0: { location: dropoffLocation } },
    contact: { displayName: brokerName, email },
  } = load;

  const { FOUser: { displayName: carrierName, companyName } } = userStore;

  const subject = `${carrierName} needs more detail on your shipment from ${pickupLocation} to ${dropoffLocation}`;
  const body =
    `Hi ${brokerName},

How much does this load pay?

Thank you.`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const customEmail = (load: Load, userStore: UserStore) => {
  const {
    pickups: { 0: { location: pickupLocation } },
    dropoffs: { 0: { location: dropoffLocation } },
    contact: { displayName: brokerName, email },
  } = load;

  const { FOUser: { displayName: carrierName, companyName } } = userStore;

  const subject = `${carrierName} needs more detail on your shipment from ${pickupLocation} to ${dropoffLocation}`;
  const body =
    `Hi ${brokerName},

${carrierName}
${companyName}`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const emailTemplates = {
  ACCEPT_RATE: {
    label: 'Ask for more detail and accept rate',
    template: acceptRateEmail,
  },
  SEND_OFFER: {
    label: 'Ask for more detail and send offer',
    template: sendOfferEmail,
  },
  REQUEST_RATE: {
    label: 'Ask for more detail and request rate',
    template: requestRateEmail,
  },
};

interface IMatchDetailContactEmailDialogProps {
  open: boolean;
  closeHandler: () => void;
  load: Load;
  userStore: UserStore;
}

const onTemplateClick = (setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>, option: string) => () => {
  setSelectedTemplate(option);
};

const handleUseTemplate = (load: Load, userStore: UserStore, selectedTemplate: string) => () => {
  window.location = emailTemplates[selectedTemplate].template(load, userStore);
};

const handleCustomEmail = (load: Load, userStore: UserStore, setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>) => () => {
  setSelectedTemplate('');
  window.location = customEmail(load, userStore);
};

const MatchDetailContactEmailDialog = memo(({ open, closeHandler, load, userStore }: IMatchDetailContactEmailDialogProps) => {
  const classes = useStyles();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  return (
    <FOFullPageDialog
      open={open}
      dialogTitle='Email Templates'
      closeHandler={closeHandler}
      dialogActionContent={
        <MatchDetailContactEmailDialogActionButton
          templateSelected={Boolean(selectedTemplate.length)}
          onUseTemplateClick={handleUseTemplate(load, userStore, selectedTemplate)}
          onCustomMessageClick={handleCustomEmail(load, userStore, setSelectedTemplate)}
        />
      }
    >
      <div className={classes.root}>
        <Grid container spacing={2}>
          {
            Object.keys(emailTemplates).map(keyName => (
              <Grid item xs={12} key={keyName}>
                <FOSelectListItem
                  onClick={onTemplateClick(setSelectedTemplate, keyName)}
                  selected={selectedTemplate === keyName}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant='subtitle2'>
                        {emailTemplates[keyName].label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FOSelectListItem>
              </Grid>
            ))
          }
        </Grid>
      </div>
    </FOFullPageDialog>
  );
});

export default MatchDetailContactEmailDialog;
