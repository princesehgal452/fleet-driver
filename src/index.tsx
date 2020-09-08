import React from 'react';
import { render } from 'react-dom';
import { Provider as MobxProvider } from 'mobx-react';
import { Provider as ReduxProvider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import App from './App'; //
import reducers from './reducers';
import history from './utils/history';
import driverAppStore from './DriverApp/store/DriverAppStore';

import './assets/stylesheets/main.scss';


function renderWithHotReload(AppComponent: React.ComponentType) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(),
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  render(
    <Router history={history}>
      <ReduxProvider store={store}>
        <MobxProvider driverAppStore={driverAppStore}>
          <CssBaseline>
            <AppComponent />
          </CssBaseline>
        </MobxProvider>
      </ReduxProvider>
    </Router>,
    document.getElementById('root'),
  );
}

renderWithHotReload(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const nextApp = require('./App').default;
    renderWithHotReload(nextApp);
  });
}
