import React, { ReactNode } from 'react';
import { SnackbarProvider } from 'notistack';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { ITheme } from 'theme/ITheme';


const styles = (theme: ITheme) => ({
  info: {
    backgroundColor: theme.palette.info.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
});

interface IFOSnackbarProviderOwnProps {
  isGeotab: boolean;
  children: ReactNode;
}

type IFOSnackbarProviderProps = IFOSnackbarProviderOwnProps & WithStyles<typeof styles>;

const FOSnackbarProvider = ({ children, classes, isGeotab }: IFOSnackbarProviderProps) => (
  <SnackbarProvider
    maxSnack={2}
    anchorOrigin={{ vertical: 'bottom', horizontal: isGeotab ? 'right' : 'left' }}
    classes={{
      variantSuccess: classes.info,
      variantError: classes.error,
      variantWarning: classes.warning,
      variantInfo: classes.info,
    }}
  >
    {children}
  </SnackbarProvider>
);

export default withStyles(styles)(FOSnackbarProvider);
