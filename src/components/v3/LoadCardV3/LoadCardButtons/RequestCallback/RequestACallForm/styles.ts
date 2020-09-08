import { ITheme } from 'theme/ITheme';

const styles = (theme: ITheme) => ({
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 0,
  },
  calendarIcon: {
    position: 'relative',
    top: '2px',
    fontSize: theme.typography.pxToRem(16),
  },
});
export default styles;
