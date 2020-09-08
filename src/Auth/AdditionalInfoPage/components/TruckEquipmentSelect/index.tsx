import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { Box, Button, Dialog, Grid } from '@material-ui/core';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import FOTransitionUp from '../../../../components/FOTransitionUp';
import { DriverTruck } from '../../../../models/dataStructures/DriverTruck';
import TruckSelectContent from '../../../../components/TruckSelectContent';
import { getAppContainer } from '../../../../utils/utility';
import { FOUser } from '../../../../models/dataStructures/FOUser';


const styles = (theme: Theme) => ({
  fullHeight: {
    height: '100%',
  },
});

interface ITruckEquipmentSelectOwnProps {
  driver: FOUser | DriverTruck | null;
  onClose: () => void;
  handleDriverSelect: (driver, newEquipmentTypeList: string[]) => void;
  showClear?: boolean;
  title?: string;
  subTitle?: string;
  isGeotab?: boolean;
  selectValue?: string;
}

interface ITruckEquipmentSelectState {
  selectValue: string;
}

type ITruckEquipmentSelectProps = ITruckEquipmentSelectOwnProps & WithStyles<typeof styles>;

@observer
class TruckEquipmentSelect extends React.Component<ITruckEquipmentSelectProps, ITruckEquipmentSelectState> {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '',
    };
  }

  handleTruckButtonClick = (value) => () => {
    const { handleDriverSelect, driver, isGeotab } = this.props;
    const { selectValue } = this.state;
    if (driver) {
      if (value === selectValue) {
        if (!isGeotab) {
          handleDriverSelect(driver, []);
        }
        this.resetState();
      } else {
        if (!isGeotab) {
          handleDriverSelect(driver, [value]);
        }
        this.setValue(value);
      }
    }
  };

  handleSelectChange = (event) => {
    this.handleTruckButtonClick(event.target.value)();
  };

  setValue = (selectValue) => {
    this.setState({
      selectValue,
    });
  };

  resetState = () => {
    this.setState({ selectValue: '' });
  };

  handleSaveGeotab = () => {
    const { handleDriverSelect, driver, onClose } = this.props;
    const { selectValue } = this.state;
    handleDriverSelect(driver, (selectValue.length > 0 ? [selectValue] : []));
    onClose();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectValue !== this.props.selectValue) {
      this.setState({ selectValue: this.props.selectValue });
    }
  }

  render() {
    const { driver, onClose, showClear, title, subTitle, isGeotab, classes } = this.props;
    const { selectValue } = this.state;
    return (
      <Dialog
        fullScreen
        open={Boolean(driver)}
        onExited={this.resetState}
        TransitionComponent={FOTransitionUp}
        container={getAppContainer}
      >
        <Grid container direction='row' justify='center' alignItems='stretch'
              className={classNames({ [classes.fullHeight]: !isGeotab })}>
          <Grid item xs={12} md={isGeotab ? 8 : 12} lg={isGeotab ? 6 : 12} xl={isGeotab ? 4 : 12}
                className={classNames({ [classes.fullHeight]: !isGeotab })}>
            <Grid container direction="column" justify="space-between" alignItems="stretch"
                  className={classNames({ [classes.fullHeight]: !isGeotab })}>
              <Grid item className={classes.fullHeight}>
                <TruckSelectContent
                  title={title}
                  subTitle={subTitle}
                  showClear={showClear}
                  selectValue={selectValue}
                  selectHandler={this.handleSelectChange}
                  truckButtonClickHandler={this.handleTruckButtonClick}
                  onClose={onClose}
                  isGeotab={isGeotab}
                />
              </Grid>
              {
                isGeotab &&
                <Grid item>
                  <Box mt={4}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                      <Grid item>
                        <Button onClick={onClose} size='large'>
                          Back
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button color='secondary' onClick={this.handleSaveGeotab} size='large'>
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TruckEquipmentSelect);
