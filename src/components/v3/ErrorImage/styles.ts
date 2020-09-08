import { ITheme } from 'theme/ITheme';

const styles = (theme: ITheme) => ({
  root: {
    height: '100%',
    padding: '0 45px',
    '& svg': {
      width: '100%',
      height: 'auto',
    },
  },
  content: {
    marginTop: theme.spacing(10),
  },
});
export default styles;
