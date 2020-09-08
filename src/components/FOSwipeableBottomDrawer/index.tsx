import React, { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import RemoveIcon from '@material-ui/icons/Remove';
import { Grid } from '@material-ui/core';
import FOSwipeable from 'components/FOSwipeable';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: '100 !important'
  },
  drawer: (props) => ({
    height: props.maxHeight,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  }),
  paper: {
    borderTopLeftRadius: '19px',
    borderTopRightRadius: '19px',
    bottom: '64px !important',
    borderTop: 0,
    overflowX: 'hidden',
    zIndex: 100,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      width: 0,
      background: 'transparent'
    },
    '&::-moz-scrollbar': {
      width: 0,
      background: 'transparent'
    }
  },
  drawerOpen: (props) => ({
    height: props.maxHeight,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  drawerClose: (props) => ({
    height: props.minHeight,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'hidden',
  }),
  drawerCloseBgGrey: (props) => ({
    background: theme.palette.grey[50]
  }),
  drawerContainer: {
    height: 24,
  },
  drawerIcon: {
    transform: 'scale(1.25)',
  },
}));

type IDrawerVariant = 'permanent' | 'persistent' | 'temporary' | undefined;

interface IFOSwipeableBottomDrawerOwnProps {
  minHeight?: number | string;
  maxHeight?: number | string;
  children: ReactNode;
  isDrawerOpen?: boolean;
  variant?: IDrawerVariant;
  drawerCloseBgGrey?: boolean;
  reflectDrawerState?: (isDrawerOpen: boolean) => void;
}

type IFOSwipeableBottomDrawerProps = IFOSwipeableBottomDrawerOwnProps;

const FOSwipeableBottomDrawer = memo(({
  children,
  minHeight = 0,
  maxHeight = 'calc(100% - 64px)',
  isDrawerOpen,
  reflectDrawerState,
  variant = 'permanent',
  drawerCloseBgGrey,
}: IFOSwipeableBottomDrawerProps) => {
  const classes = useStyles({ minHeight, maxHeight });
  const [isOpen, setOpen] = useState(isDrawerOpen);

  useEffect(() => {
    setOpen(isDrawerOpen);
  }, [isDrawerOpen]);

  const toggleDrawer = useCallback((isDrawerOpenNewState) => {
    setOpen(isDrawerOpenNewState);
    if (reflectDrawerState) {
      reflectDrawerState(isDrawerOpenNewState);
    }
  }, [reflectDrawerState]);

  const swipeDownHandler = useCallback(() => {
    toggleDrawer(false);
  }, []);

  const swipeUpHandler = useCallback(() => {
    toggleDrawer(true);
  }, []);

  return (
    <FOSwipeable onSwipeDown={swipeDownHandler} onSwipeUp={swipeUpHandler}>
      <Drawer
        anchor='bottom'
        variant={variant}
        open={variant === 'temporary' ? isOpen : undefined}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          root: clsx(classes.root),
          paper: clsx(classes.paper, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
            [classes.drawerCloseBgGrey]: !isOpen && drawerCloseBgGrey,
          }),
        }}
      >
        {
          // Show the draggable bar if half the drawer is visible
          minHeight
            ? (
              <Grid container justify='center' className={classes.drawerContainer}>
                <RemoveIcon color='disabled' fontSize='large' className={classes.drawerIcon} />
              </Grid>
            ) : null
        }
        {children}
      </Drawer>
    </FOSwipeable>
  );
});

export default FOSwipeableBottomDrawer;
