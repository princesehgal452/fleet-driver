import FOGrid from '../../../../../components/FOGrid';
import React, { memo, ReactNode } from 'react';


interface ISettingsHeaderProps {
  children: ReactNode;
}

const SettingsHeader = memo(({ children }: ISettingsHeaderProps) => (
  <FOGrid alignItems='center' justify='space-between' vSpacing={0} hSpacing={2.5}>{children}</FOGrid>
));

export default SettingsHeader;
