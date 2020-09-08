import React, { memo, ReactNode } from 'react';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import './AdditionalOptionsLocation.scss';
import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => ({
  ExpansionPanelSummaryRoot: {
    minHeight: 'inherit !important',
  },
  ExpansionPanelSummaryContent: {
    margin: 'inherit !important',
  },
  ExpansionPanelDetailsRoot: {
    paddingTop: 0,
    paddingBottom: theme.spacing(1),
  },
}));

interface IAdditionalOptionsLocationOwnProps {
  expandSearchForm: () => void;
  collapsedSearchForm: boolean;
  children: ReactNode;
}

type IAdditionalOptionsLocationProps = IAdditionalOptionsLocationOwnProps;

const AdditionalOptionsLocation = memo((
  { expandSearchForm, collapsedSearchForm, children }: IAdditionalOptionsLocationProps) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <ExpansionPanel
          expanded={!collapsedSearchForm}
          onChange={expandSearchForm}
          elevation={0}
          square
        >
          <ExpansionPanelSummary
            classes={{ expanded: classes.ExpansionPanelSummaryRoot, content: classes.ExpansionPanelSummaryContent }}
            color='secondary'
            expandIcon={<ArrowDropDown />}
          >
            <Typography variant='body1'>
              Advanced Options
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails classes={{ root: classes.ExpansionPanelDetailsRoot }}>
            {children}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  );
});

export default AdditionalOptionsLocation;
