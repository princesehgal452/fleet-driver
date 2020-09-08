import React, { memo, ReactNode } from 'react';
import { Typography } from '@material-ui/core';


interface ISettingsTitleProps {
  children: ReactNode;
}

const SettingsTitle = memo(({ children }:ISettingsTitleProps) => (
  <Typography variant='subtitle1' noWrap color='primary'>
    {children}
  </Typography>
));

export default SettingsTitle;
