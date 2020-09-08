import React from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import Sort from '@material-ui/icons/Sort';
import SearchSort from '../../components/SearchSort';
import FloatingAction from './FloatingAction';
import { IDriverAppStore } from '../../../models/dataStructures/IDriverAppStore';
import { DriverAppStore } from '../../store/DriverAppStore';


const styles = (theme: Theme) => ({
  root: {
    position: 'absolute' as 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: theme.zIndex.appBar,
  },
});

type IFloatingActionsProps = IDriverAppStore & RouteComponentProps & WithStyles<typeof styles>;

@inject('driverAppStore')
@observer
class FloatingActions extends React.Component<IFloatingActionsProps> {
  state = {
    searchRef: undefined,
  };
  setSearchRef = (node) => {
    this.setState({ searchRef: node });
  };

  render() {
    const { searchRef } = this.state;
    const { driverAppStore, location: { pathname } } = this.props;
    const { searchStore } = driverAppStore as DriverAppStore;
    return (
      <>
        <SearchSort searchStore={searchStore} setRef={searchRef}>
          <FloatingAction
            show={Boolean(pathname.match('^/driver/search/results$'))}
            icon={<div ref={this.setSearchRef}><Sort /></div>}
          />
        </SearchSort>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(FloatingActions));
