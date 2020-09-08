import React, { memo, useState, useCallback } from 'react';
import { Grid, Box, Button, ExpansionPanel, ExpansionPanelDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Load from 'models/dataStructures/Load';

import useStyles from './styles';

interface ILoadCardTrackingToggleProps {
  load?: Load;
}

const DocumentsPanel = memo(({ load }: ILoadCardTrackingToggleProps) => {
  const classes = useStyles();
  const [viewDocuments, setViewDocuments] = useState(false);

  const triggerViewDocuments = useCallback((flag: boolean) => (e) => {
    setViewDocuments(flag);
  }, []);


  return (
    <ExpansionPanel expanded={viewDocuments} className={classes.root} elevation={0}>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={classes.gridContainer}
      >
        <Grid item xs={8}>
          <Box fontSize={12} fontWeight={500} position='relative'>
            Documents
            <ExpandMoreIcon
              onClick={triggerViewDocuments(!viewDocuments)}
              className={[
                classes.dropdown,
                viewDocuments
                  ? classes.dropdownOpen
                  : classes.dropdownClosed,
              ]}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Button
            fullWidth
            size='small'
            variant='contained'
            color='primary'
            disableElevation
          >
            View Tender
          </Button>
        </Grid>
      </Grid>
      <ExpansionPanelDetails className={classes.accordianDescription}>
        Add documents here
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});

export default DocumentsPanel;
