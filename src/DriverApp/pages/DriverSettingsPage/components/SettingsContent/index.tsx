import React, { ReactNode } from 'react';
import FOGrid from '../../../../../components/FOGrid';


interface ISettingsContent {
  children: ReactNode;
}

const SettingsContent = ({ children }: ISettingsContent) => (
  <FOGrid vSpacing={0} hSpacing={2.5}>{children}</FOGrid>
);

export default SettingsContent;
