import { createSlice } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';

const name = 'user';

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: null,
  dinerId: null,
  accessToken: null,
  users: [],
};

export const login = createRoutine(`${name}/login`);
export const setUser = createRoutine(`${name}/setUser`);
export const logout = createRoutine(`${name}/logout`);

const isRequestAction = (action) => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = (action) => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const userSlice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.SUCCESS, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(setUser.SUCCESS, (state, action) => {
        const { user, accessToken, dinerId } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
        state.dinerId = dinerId;
        state.isLoggedIn = true;
      })
      .addCase(logout.SUCCESS, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.dinerId = null;
        state.accessToken = null;
      })
      .addCase(logout.FAILURE, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.dinerId = null;
        state.accessToken = null;
      })
      .addMatcher(isRequestAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state, action) => {
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
