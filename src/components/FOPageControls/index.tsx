import React, { Dispatch, ReactElement, RefObject, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { AppBar, makeStyles, Theme } from '@material-ui/core';
import { sidebarWidth } from '../../DriverApp/components/DriverSideMenu';
import FOScrollHide from '../FOScrollHide';

const useStyles = makeStyles((theme: Theme) => ({
  root: props => ({
    marginTop: props.height,
  }),
  appbar: props => ({
    top: props.mainControlHeight,
    [theme.breakpoints.up('md')]: {
      left: sidebarWidth,
      width: 'unset',
    },
  }),
}));

interface IFOPageControlsProps {
  mainControlHeight: number;
  children: ReactElement;
  isGeotab?: boolean;
}

const containerRefHandler = React.createRef<HTMLDivElement>();
const setRefHandler = (setHeight: Dispatch<number>, containerRefHandler: RefObject<HTMLDivElement>) => () => {
  setHeight(containerRefHandler.current?.firstChild?.offsetHeight);
};

const FOPageControls = observer((({ mainControlHeight, children, isGeotab }: IFOPageControlsProps) => {
  const [height, setHeight] = useState(0);
  useEffect(setRefHandler(setHeight, containerRefHandler), []);
  const classes = useStyles({ height, mainControlHeight, isGeotab });

  return (
    <div className={classes.root} ref={containerRefHandler}>
      <FOScrollHide useTrigger threshold={height > 200 ? (height - 60) : 200}>
        <AppBar elevation={0} color='inherit' position={isGeotab ? 'absolute' : 'fixed'} className={classes.appbar}>
          {children}
        </AppBar>
      </FOScrollHide>
    </div>
  );
}));

export default FOPageControls;
