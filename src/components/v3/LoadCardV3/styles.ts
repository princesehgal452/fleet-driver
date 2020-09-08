import { makeStyles } from '@material-ui/core';
import { ITheme } from 'theme/ITheme';

const useStyles = makeStyles((theme: ITheme) => ({
  root: (props) => ({
    position: 'relative',
    border: props.showMap ? `1px solid ${theme.palette.divider}` : 'none',
    borderRadius: props.showMap ? theme.custom.borderRadius.radius4 : 0,
    padding: props.isDetailsView ? theme.spacing(0, 1) : 0,
  }),
  fullHeight: {
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  logoExpanded: {
    position: 'absolute',
    top: -20,
    left: 6,
    zIndex: 20,
    height: 40,
  },
  logoSmall: {
    maxWidth: 55,
  },
  sortByBlock: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(0.5),
    zIndex: 1,
  },
  loadContent: (props) => ({
    border: (!props.showMap && !props.isDetailsView) ? `1px solid ${theme.palette.divider}` : 'none',
    borderRadius: theme.custom.borderRadius.radius4,
    position: 'relative',
    top: (!props.showMap && props.isDetailsView) ? -20 : 0,
  }),
  loadBasicDetails: (props) => ({
    marginTop: '-26px',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    background: (!props.showMap && !props.isDetailsView) ? theme.palette.tertiary.main : theme.palette.common.white,
  }),
  loadDetails: (props) => ({
    margin: (props.isDetailsView) ? theme.spacing(1) : theme.spacing(0),
    border: (props.isDetailsView) ? `1px solid ${theme.palette.divider}` : 'none',
    borderRadius: theme.custom.borderRadius.radius4,
  }),
}));
export default useStyles;
