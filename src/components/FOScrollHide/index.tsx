import React, { memo, ReactNode } from 'react';
import { Slide, useMediaQuery, useScrollTrigger, useTheme } from '@material-ui/core';


interface IFOScrollHideProps {
  useTrigger?: boolean;
  threshold?: number;
  children: ReactNode;
}

const FOScrollHide = memo(({ children, threshold, useTrigger }: IFOScrollHideProps) => {
  if (useTrigger) {
    const trigger = useScrollTrigger({ threshold });
    const theme = useTheme();
    const media = useMediaQuery(theme.breakpoints.up('md'));

    return (
      <Slide appear={false} direction='down' in={!trigger || media}>
        {children}
      </Slide>
    );
  }
  return (
    <>
      {children}
    </>
  );
});

export default FOScrollHide;
