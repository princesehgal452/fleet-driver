import React, { memo, ReactNode } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';


const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    borderRadius: '14px !important',
    borderColor: theme.palette.grey['200'],
  },
  title: {
    fontSize: theme.typography.pxToRem(16),
  },
  expansionPanelRoot: {
    minHeight: '0px !important',
    paddingLeft: 20,
    paddingRight: 20,
  },
  expansionPanelContent: {
    margin: 'inherit !important',
  },
  expansionPanelDetails: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 18,
  },
}));

interface IFOFiltersAccordionProps {
  title: string;
  children: ReactNode;
}

const FOFiltersAccordion = memo(({ title, children }: IFOFiltersAccordionProps) => {
  const classes = useStyles();

  return (
    <div>
      <ExpansionPanel elevation={0} variant='outlined' className={classes.paper}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          classes={{
            root: classes.expansionPanelRoot,
            content: classes.expansionPanelContent,
          }}
        >
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
});

export default FOFiltersAccordion;
