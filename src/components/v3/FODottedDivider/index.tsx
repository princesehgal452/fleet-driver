import React from 'react';
import { Divider, makeStyles } from '@material-ui/core';
import { ITheme } from 'theme/ITheme';


const useStyles = makeStyles((theme: ITheme) => ({
  root: {
    backgroundColor: 'unset',
    border: 'none',
    borderBottom: `1px dashed ${theme.palette.borderColor}`,
  },
}));

const FODottedDivider = () => {
  const classes = useStyles();

  return (
    <Divider className={classes.root} />
  );
};

export default FODottedDivider;
