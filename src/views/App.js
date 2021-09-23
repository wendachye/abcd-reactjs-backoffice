import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { store, persistor, history } from 'redux/store';
import AdminLayout from 'layouts/Admin';
import AuthLayout from 'layouts/Auth';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <Switch>
              <Route path="/" render={(props) => <AdminLayout {...props} />} />
              <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
              <Redirect from="*" to="/" />
            </Switch>
          </BrowserRouter>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
