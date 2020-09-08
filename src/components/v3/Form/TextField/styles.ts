
const styles = (theme) => ({
  root: {
    color: theme.custom.colors.night,
  },
  labelAsterisk: {
    display: 'none',
    '&.Mui-error': {
      display: 'inline',
    },
  },
  underline: {
    '&:before': {
      borderColor: theme.custom.colors.stoneDark,
    },
    '.Mui-disabled&:before': {
      borderBottomStyle: 'solid',
    },
  },
  disabled: {
    color: theme.custom.colors.night,
  },
});

export default styles;
