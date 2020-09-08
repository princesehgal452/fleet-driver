import React, { forwardRef, memo } from 'react';
import classNames from 'classnames';
import AppBar, { AppBarProps } from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

import './FOAppBar.scss';


const useStyles = makeStyles({
  root: {
    padding: '0 10px',
  },
});

interface IFOAppbarOwnProps {
  children: React.ReactNode;
  disableGutters?: boolean;
}

type IFOAppbarProps = IFOAppbarOwnProps & AppBarProps;

const FOAppbar = memo(forwardRef(({ color = 'inherit', position = 'fixed', children, disableGutters, ...other }: IFOAppbarProps, ref) => {
  const classes = useStyles();

  return (
    <AppBar
      {...other}
      color={color}
      className={classNames({ [classes.root]: !disableGutters })}
      position={position}
      ref={ref}
    >
      <Toolbar disableGutters variant='dense'>
        {children}
      </Toolbar>
    </AppBar>
  );
}));

export default FOAppbar;
