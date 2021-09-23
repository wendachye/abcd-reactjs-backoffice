import { takeLatest, all, put } from 'redux-saga/effects';
import { createProject } from 'redux/slices/projectSlice';

export default function* sagaWatcher() {
  yield all([takeLatest(createProject.TRIGGER, handleCreateProject)]);
}

function* handleCreateProject(action) {
  try {
    yield put(createProject.request());

    const { project } = action.payload;

    console.log(project);

    yield put(createProject.success({ project }));
  } catch (error) {
    console.log('createProject', error);
    yield put(createProject.failure());
  } finally {
    yield put(createProject.fulfill());
  }
}
