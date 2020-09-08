import { ITheme } from 'theme/ITheme';

const styles = (theme: ITheme) => ({
  formContainer: {
    position: 'relative',
    height: '100%',
  },
  formBodyContent: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  formItem: {
    marginBottom: theme.spacing(2.5),
  },
  actionBtnGroup: {
    position: 'absolute',
    bottom: 0,
  },
  actionButtons: {
    borderRadius: 0,
  },
  closeAction: {
    background: 'transparent',
  },
});

export default styles;
