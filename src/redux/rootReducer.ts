import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import projectSlice from './slices/projectSlice';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  project: projectSlice,
  router: connectRouter(history),
});

export default rootReducer;
