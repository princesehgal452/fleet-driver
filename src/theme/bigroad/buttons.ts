import themeCommon from '../index';
import palette from './palette';

const renderPseudoClassStyles = (backgroundColor, color = 'inherit') => ({
  '&:hover': {
    backgroundColor,
    color,
  },
  '&:active': {
    backgroundColor,
    color,
  },
  '@media (hover: none)': {
    '&:hover': {
      backgroundColor: `${backgroundColor} !important`,
      color,
    },
  },
});

const buttonOverrides = {
  MuiButton: {
    root: {
      textTransform: 'capitalize',
      '&$disabled': {
        color: themeCommon.palette.buttonDisabled.color,
        backgroundColor: themeCommon.palette.buttonDisabled.backgroundColor,
        border: 'transparent !important',
      },
    },
    sizeSmall: {
      borderRadius: 2,
    },
    containedPrimary: { // green filled white text
      backgroundColor: palette.primary.main,
      ...renderPseudoClassStyles(palette.primary.dark, palette.primary.contrastText),
    },
    containedSecondary: { // dark grey filled white text
      backgroundColor: palette.secondaryGrey.main,
      ...renderPseudoClassStyles(palette.secondaryGrey.dark, palette.secondaryGrey.contrastText),
    },
    outlinedPrimary: { // grey border green text
      borderColor: 'rgba(0,0,0,0.2)',
      color: palette.primary.main,
      background: themeCommon.palette.common.white,
      ...renderPseudoClassStyles(palette.primary.main, palette.secondaryGrey.contrastText),
    },
    outlinedSecondary: { // grey filled green text
      backgroundColor: palette.tertiary.main,
      color: palette.primary.main,
      border: 'none !important',
      ...renderPseudoClassStyles(palette.tertiary.dark, palette.primary.dark),
    },
  },
};

export default buttonOverrides;
