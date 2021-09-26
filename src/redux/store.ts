import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user', 'project'],
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_REDUX_ENCRYPTOR_KEY || '',
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

let middleware = [sagaMiddleware, routerMiddleware(history)];

if (process.env.REACT_APP_MODE === 'DEBUG') {
  const logger = createLogger({
    collapsed: true,
  });

  middleware = [...middleware, logger];
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
    ...middleware,
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor, history };
