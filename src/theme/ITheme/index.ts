import { Palette } from '@material-ui/core/styles/createPalette';
import { ThemeOptions, Theme } from '@material-ui/core';

interface IPaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
  bottomAppBarText?: string;
}
interface IButtonDisabled {
  color?: string;
  backgroundColor: string;
}
export interface IPalette extends Palette {
  borderColor?: string;
  secondaryGrey: IPaletteColor;
  tertiary: IPaletteColor;
  buttonDisabled: IButtonDisabled;
}
export interface IBorderRadius extends Palette {
  radius2: number;
  radius4: number;
  radius8: number;
  radius12: number;
  radius25: number;
  radiusCircle: string;
}

export interface ICustom extends Palette {
  constants?: any;
  borderRadius: IBorderRadius;
}

export interface ITheme extends Theme {
  palette: IPalette;
  custom: ICustom;
}

export interface IThemeOptions extends ThemeOptions {
  palette: IPalette;
}
