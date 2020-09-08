import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    backgroundColor: 'unset',
    border: 'none',
    borderBottom: '1px dashed #C7C4C4',
  },
});

const FODottedDivider = () => {
  const classes = useStyles();

  return (
    <Divider className={classes.root} />
  );
};

export default FODottedDivider;
