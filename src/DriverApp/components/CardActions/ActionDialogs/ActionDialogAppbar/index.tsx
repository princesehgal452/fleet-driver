import React, { EventHandler, SyntheticEvent } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { EnterHandler } from 'react-transition-group/Transition';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import RateTabGroup from '../../../RateTabGroup';
import FOAppbar from '../../../../../components/FOAppBar';


const styles = (theme: Theme) => ({
  appbarLocation: {
    paddingLeft: theme.spacing(6),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(2.5),
  },
  locationArrow: {
    textAlign: 'center' as 'center',
  },
  loadPriceText: {
    marginTop: theme.spacing(1.5),
    fontSize: 30,
  },
  loadPrice: {
    '&::first-letter': {
      fontSize: 20,
      paddingRight: theme.spacing(1),
      color: theme.typography.h6.color,
    },
  },
});

const growStyle = {
  transformOrigin: 'top',
};

interface IActionDialogOwnProps {
  iconButtonHandler: EventHandler<SyntheticEvent>;
  onToggle?: (value: number) => void;
  toggleMainContent: EnterHandler;
  showPerMileRate?: number;
  showArrow?: boolean;
  showDropoffLocation?: boolean;
  showloadPrice: boolean;
  priceHasValue: boolean;
  disabled?: boolean;
  headerText: string;
  primaryText: React.ReactNode;
  loadPrice: React.ReactNode;
}

type IActionDialogProps = IActionDialogOwnProps & WithStyles<typeof styles>;

const ActionDialog = ({
                        iconButtonHandler, showPerMileRate, onToggle, showArrow, priceHasValue, disabled, classes,
                        showDropoffLocation, showloadPrice, toggleMainContent, loadPrice, primaryText, headerText,
                      }: IActionDialogProps) => (
  <FOAppbar position='static'>
    <Grid container>
      <Grid item xs={12}>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item>
            <Grid container alignItems='center'>
              <IconButton
                color='inherit'
                onClick={iconButtonHandler}
                disabled={disabled}
              >
                <Clear />
              </IconButton>
              <Typography variant='display3' color='inherit'>
                {headerText}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {(onToggle && showPerMileRate !== undefined) &&
            <RateTabGroup value={showPerMileRate} onClick={onToggle} />}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.appbarLocation}>
          <Grid container alignItems='center' wrap='nowrap'>
            {primaryText}
          </Grid>
          <Grow in={showloadPrice} style={growStyle} onEntered={toggleMainContent}>
            <Typography
              variant='button'
              className={classNames(classes.loadPriceText, { [classes.loadPrice]: priceHasValue })}
            >
              {loadPrice}
            </Typography>
          </Grow>
        </Grid>
      </Grid>
    </Grid>
  </FOAppbar>
);

export default withStyles(styles)(observer(ActionDialog));
