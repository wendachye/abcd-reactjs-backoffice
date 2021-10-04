import { takeLatest, all, put } from 'redux-saga/effects';
import {
  createProject,
  updateProject,
  deleteProject,
  createQuotation,
} from '../slices/projectSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CreateProjectPayload,
  CreateQuoationPayload,
  DeleteProjectPayload,
  UpdateProjectPayload,
} from 'types/ReduxPayload';

function* handleCreateProject(action: PayloadAction<CreateProjectPayload>) {
  try {
    yield put(createProject.request());

    const { project } = action.payload;

    yield put(createProject.success({ project }));
  } catch (error) {
    yield put(createProject.failure());
  } finally {
    yield put(createProject.fulfill());
  }
}

function* handleUpdateProject(action: PayloadAction<UpdateProjectPayload>) {
  try {
    yield put(updateProject.request());

    const { uuid, changes } = action.payload;

    yield put(updateProject.success({ uuid, changes }));
  } catch (error) {
    yield put(updateProject.failure());
  } finally {
    yield put(updateProject.fulfill());
  }
}

function* handleDeleteProject(action: PayloadAction<DeleteProjectPayload>) {
  try {
    yield put(deleteProject.request());

    const { uuid } = action.payload;

    yield put(deleteProject.success({ uuid }));
  } catch (error) {
    yield put(deleteProject.failure());
  } finally {
    yield put(deleteProject.fulfill());
  }
}

function* handleCreateQuotation(action: PayloadAction<CreateQuoationPayload>) {
  try {
    yield put(createQuotation.request());

    const { projectId, quotation } = action.payload;

    yield put(createQuotation.success({ projectId, quotation }));
  } catch (error) {
    yield put(createQuotation.failure());
  } finally {
    yield put(createQuotation.fulfill());
  }
}

export default function* sagaWatcher() {
  yield all([
    takeLatest(createProject.TRIGGER, handleCreateProject),
    takeLatest(updateProject.TRIGGER, handleUpdateProject),
    takeLatest(deleteProject.TRIGGER, handleDeleteProject),
    takeLatest(createQuotation.TRIGGER, handleCreateQuotation),
  ]);
}
