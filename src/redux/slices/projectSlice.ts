import { createSlice, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';
import { ProjectType } from 'types/Project';

const name = 'project';

interface InitialState {
  loading: boolean;
  projects: ProjectType[];
}

const initialState: InitialState = {
  loading: false,
  projects: [],
};

export const createProject = createRoutine(`${name}/createProject`);

const isRequestAction = (action: AnyAction) => {
  return action.type.startsWith(name) && action.type.endsWith('REQUEST');
};

const isFullfillAction = (action: AnyAction) => {
  return action.type.startsWith(name) && action.type.endsWith('FULFILL');
};

export default createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProject.SUCCESS, (state, action: PayloadAction<{ project: ProjectType }>) => {
        const { project } = action.payload;
        state.projects = [...state.projects, project];
      })
      .addMatcher(isRequestAction, (state) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state) => {
        state.loading = false;
      });
  },
}).reducer;
