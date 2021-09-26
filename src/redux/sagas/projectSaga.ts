import { takeLatest, all, put } from 'redux-saga/effects';
import { createProject } from '../slices/projectSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ProjectType } from 'types/Project';

function* handleCreateProject(action: PayloadAction<{ project: ProjectType }>) {
  try {
    yield put(createProject.request());

    const { project } = action.payload;

    yield put(createProject.success({ project }));
  } catch (error) {
    console.log('createProject', error);
    yield put(createProject.failure());
  } finally {
    yield put(createProject.fulfill());
  }
}

export default function* sagaWatcher() {
  yield all([takeLatest(createProject.TRIGGER, handleCreateProject)]);
}
