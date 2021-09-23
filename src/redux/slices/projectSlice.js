import { createSlice } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';

const name = 'project';

const initialState = {
  loading: false,
  projects: [],
};

export const createProject = createRoutine(`${name}/createProject`);

const isRequestAction = (action) => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = (action) => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export const slice = createSlice({
  name,
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createProject.SUCCESS, (state, action) => {
        const { project } = action.payload;

        state.projects = [...state.projects, project];
      })
      .addMatcher(isRequestAction, (state, action) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state, action) => {
        state.loading = false;
      });
  },
});

export default slice.reducer;
