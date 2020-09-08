import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: (props) => ({
    background: theme.palette.background.paper,
    borderRadius: 4,
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    position: 'relative',
    backgroundImage: props.backgroundImage,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: 100,
    minWidth: 120,
    color: '#fff',
  }),
  cardColGridContainer: {
    height: '100%',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  verticalMiddle: {
    verticalAlign: 'middle',
  },
  arrowIcon: {
    verticalAlign: 'bottom',
  },
}));

export default useStyles;
