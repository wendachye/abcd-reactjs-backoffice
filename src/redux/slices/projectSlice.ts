import { createSlice, AnyAction, PayloadAction, createDraftSafeSelector } from '@reduxjs/toolkit';
import { createRoutine } from 'redux-saga-routines';
import { ProjectType } from 'types/Project';
import { RootState } from 'hooks/useRedux';
import {
  CreateProjectPayload,
  CreateQuoationPayload,
  DeleteProjectPayload,
  UpdateProjectPayload,
} from 'types/ReduxPayload';

const name = 'project';

interface InitialState {
  loading: boolean;
  projects: ProjectType[];
}

const initialState: InitialState = {
  loading: false,
  projects: [],
};

// actions
export const createProject = createRoutine<CreateProjectPayload>(`${name}/createProject`);
export const updateProject = createRoutine<UpdateProjectPayload>(`${name}/updateProject`);
export const deleteProject = createRoutine<DeleteProjectPayload>(`${name}/deleteProject`);
export const createQuotation = createRoutine<CreateQuoationPayload>(`${name}/createQuotation`);

// reducers
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
      .addCase(createProject.SUCCESS, (state, action: PayloadAction<CreateProjectPayload>) => {
        const { project } = action.payload;
        state.projects = [...state.projects, project];
      })
      .addCase(updateProject.SUCCESS, (state, action: PayloadAction<UpdateProjectPayload>) => {
        const { uuid, changes } = action.payload;
        const projectIndex = state.projects.findIndex((project) => project.uuid === uuid);
        const newProject = {
          ...state.projects[projectIndex],
          ...changes,
        };
        state.projects[projectIndex] = newProject;
      })
      .addCase(deleteProject.SUCCESS, (state, action: PayloadAction<DeleteProjectPayload>) => {
        const { uuid } = action.payload;
        state.projects = state.projects.filter((project) => project.uuid !== uuid);
      })
      .addCase(createQuotation.SUCCESS, (state, action: PayloadAction<CreateQuoationPayload>) => {
        const { projectId, quotation } = action.payload;
        const projectIndex = state.projects.findIndex((project) => project.uuid === projectId);
        const newProject = {
          ...state.projects[projectIndex],
          quotations: [...state.projects[projectIndex].quotations, quotation],
        };
        state.projects[projectIndex] = newProject;
      })
      .addMatcher(isRequestAction, (state) => {
        state.loading = true;
      })
      .addMatcher(isFullfillAction, (state) => {
        state.loading = false;
      });
  },
}).reducer;

// selectors
const selectSelf = (state: RootState) => state.project;
export const selectProjects = createDraftSafeSelector(selectSelf, (state) => state.projects);
export const selectProjectLoading = createDraftSafeSelector(selectSelf, (state) => state.loading);
export const selectProjectByUUID = (uuid: string) =>
  createDraftSafeSelector(selectSelf, (state) =>
    state.projects.find((project) => project.uuid === uuid),
  );
export const selectProjectQuotationByReference = (uuid: string, reference: string) =>
  createDraftSafeSelector(selectSelf, (state) => {
    const project = state.projects.find((project) => project.uuid === uuid);

    if (project) {
      return project.quotations.find((quotation) => quotation.reference === reference);
    }
  });
