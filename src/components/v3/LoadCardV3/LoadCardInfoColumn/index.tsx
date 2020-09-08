import React, { ReactNode } from 'react';
import { Box, useTheme } from '@material-ui/core';
import { observer } from 'mobx-react';
import { ITheme } from 'theme/ITheme';


interface ILoadCardInfoColumnOwnProps {
  title: string;
  value: ReactNode;
  usedInHeader?: boolean;
}

const LoadCardInfoColumn = observer(({ title, value, usedInHeader }: ILoadCardInfoColumnOwnProps) => {
  const theme: ITheme = useTheme();

  return (
    <>
      <Box fontSize={usedInHeader ? 11 : 10} color={theme.palette.text.secondary}>
        {title}
      </Box>
      <Box fontSize={12} fontWeight={usedInHeader ? 500 : 400} whiteSpace='normal' color={theme.palette.text.primary}>
        {value}
      </Box>
    </>
  );
});

export default LoadCardInfoColumn;
