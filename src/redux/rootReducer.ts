import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
// import userSlice from './slices/userSlice';
import projectSlice from './slices/projectSlice';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  // user: userSlice,
  project: projectSlice,
  router: connectRouter(history),
});

export default rootReducer;
