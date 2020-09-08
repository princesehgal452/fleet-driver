import themeConstants from './constants';
import colors from './constants/colors';

const themeCommon = {
  typography: {
    caption: {
      color: '#6e6e6e',
    },
  },
  palette: {
    common: {
      black: '#222',
      white: '#fff',
    },
    text: {
      primary: '#282828',
      secondary: '#626163',
      disabled: '#C2C2C2',
    },
    confirmation: '#254461',
    borderColor: '#C7C4C4',
    buttonDisabled: {
      color: '#9AA6B1',
      backgroundColor: '#E9E9E9',
    },
    info: {
      main: '#254461',
    },
    error: {
      main: '#FA3A2F',
    },
    warning: {
      main: '#FCE34D',
    },
    bottomAppBarText: '#565656',
  },
  overrides: {
    MuiFormHelperText: {
      root: {
        minHeight: 'auto',
      },
    },
    MuiBottomNavigationAction: {
      root: {
        maxWidth: 'inherit',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiBottomNavigation: {
      root: {
        boxShadow: 'inset 0px 3px 3px -2px rgba(0,0,0,0.2)',
      },
    },
  },
  custom: {
    colors,
    constants: themeConstants,
    borderRadius: {
      radius2: 2,
      radius4: 4,
      radius8: 8,
      radius12: 12,
      radius25: 25,
      radiusCircle: '50%',
    },
    fullHeight: { // can be used as class using useTheme
      height: themeConstants.fullHeight,
    },
  },
};

export default themeCommon;
