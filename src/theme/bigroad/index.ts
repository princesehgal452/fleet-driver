import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { IPalette, IThemeOptions } from 'theme/ITheme';
import themeCommon from '../index';
import customPalette from './palette';
import buttonOverrides from './buttons';

const palette: IPalette = { ...customPalette, ...themeCommon.palette };
const overrides = { ...themeCommon.overrides, ...buttonOverrides };

const bigroadTheme = createMuiTheme({
  ...themeCommon,
  palette,
  overrides,
} as IThemeOptions);

export default bigroadTheme;
