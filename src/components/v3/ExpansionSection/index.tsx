import React from 'react';
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './styles';

interface IExpansionSectionOwnProps {
  children: any;
  label: string;
  noPadding?: boolean;
}

type IExpansionSectionProps = IExpansionSectionOwnProps & WithStyles<typeof styles>;

const ExpansionSection = ({ children, label, classes, noPadding = false }: IExpansionSectionProps) => (
  <ExpansionPanel
    className={classes.root}
  >
    <ExpansionPanelSummary
      classes={{
        root: classes.expandSummary,
        content: classes.expandSummaryContent,
        expandIcon: classes.expandSummaryIcon,
      }}
      expandIcon={<ExpandMoreIcon />}
    >
      <Typography className={classes.heading}>{label}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails classes={noPadding ? { root: classes.noPadding } : {}}>
      {children}
    </ExpansionPanelDetails>
  </ExpansionPanel>
);

export default withStyles(styles)(ExpansionSection);
