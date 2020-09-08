import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { IPalette, IThemeOptions } from 'theme/ITheme';
import themeCommon from '../index';
import customPalette from './palette';

const palette: IPalette = {
  ...customPalette,
  ...themeCommon.palette,
};

const dialogOverrides = {
  MuiDialog: {
    root: {
      position: 'absolute !important',
    },
    paperFullScreen: {
      height: '100%',
    },
  },
};

const overrides = { ...themeCommon.overrides, ...dialogOverrides };

const geotabTheme = createMuiTheme({
  ...themeCommon,
  palette,
  overrides,
} as IThemeOptions);

export default geotabTheme;
