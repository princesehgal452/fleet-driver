import React, { ReactNode, useState } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import HeaderChips from './HeaderChips';
import LoadFilterBody from './LoadFilterBody';
import LoadFilterAcceptCancelButtons from './LoadFilterAcceptCancelButtons';


const useStyles = makeStyles((theme: Theme) => ({
  root: (props) => ({
    height: props.height,
  }),
  bodyPadding: {
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 10,
  },
}));

const headerHeight = '';

interface IReduxLoadFilters {
  height: number;
  chipLabels: string[];
  show: boolean;
  bodyContent: ReactNode;
  showBadge: boolean[];
  onAccept: () => void;
  onCancel: () => void;
}

const ReduxLoadFilters = ({ height, chipLabels, show, bodyContent, showBadge, onAccept, onCancel }: IReduxLoadFilters) => {
  const classes = useStyles({ height });

  const [tabState, setTabState] = useState(0);

  return (
    <div className={classes.root}>
      <Grid container className={classes.bodyPadding}>
        <Grid item xs={12}>
          <HeaderChips
            showBadge={showBadge}
            tabState={tabState}
            setTabState={setTabState}
            chipLabels={chipLabels}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadFilterBody
            height={height - 116}
            index={tabState}
            bodyContent={bodyContent}
          />
        </Grid>
      </Grid>
      <LoadFilterAcceptCancelButtons show={show} onAccept={onAccept} onCancel={onCancel} />
    </div>
  );
};

export default ReduxLoadFilters;
