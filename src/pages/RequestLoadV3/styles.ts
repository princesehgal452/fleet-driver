import { ITheme } from 'theme/ITheme';

const styles = (theme: ITheme) => ({
  root: {
    height: '100%',
    background: theme.palette.background.paper,
  },
  horizontalListContainer: {
    padding: theme.spacing(0, 2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    borderTop: `1px dashed ${theme.palette.borderColor}`,
    borderBottom: `1px dashed ${theme.palette.borderColor}`,
  },
});

export default styles;
