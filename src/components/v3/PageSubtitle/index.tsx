import React, { ReactNode } from 'react';
import { Box, BoxProps } from '@material-ui/core';

interface IPageSubtitleOwnProps {
  className?: string;
  title: string | ReactNode;
}

type IPageSubtitleProps = IPageSubtitleOwnProps & BoxProps;

const PageSubtitle = ({ className, title, children, ...other }: IPageSubtitleProps) => (
  <Box
    className={className}
    fontWeight={500}
    fontSize={18}
    {...other}
  >
    {title}
    {children}
  </Box>
);

export default PageSubtitle;
