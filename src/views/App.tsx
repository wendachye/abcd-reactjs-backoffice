import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { store, persistor, history } from 'redux/store';
import AdminLayout from 'layouts/Admin';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" render={() => <AdminLayout />} />
            <Redirect from="*" to="/" />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
