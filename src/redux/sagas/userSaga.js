import { takeLatest, all, put, select, call } from 'redux-saga/effects';
import { setUser, logout } from 'redux/slices/userSlice';

export default function* sagaWatcher() {
  yield all([
    takeLatest(setUser.TRIGGER, handleSetUser),
    takeLatest(logout.TRIGGER, handleLogout),
  ]);
}

function* handleSetUser(action) {
  try {
    yield put(setUser.request());

    const { user, accessToken } = action.payload;

    yield put(setUser.success({ user, accessToken }));
  } catch (error) {
    console.log('setUser', error);
    yield put(setUser.failure());
  } finally {
    yield put(setUser.fulfill());
  }
}

function* handleLogout() {
  try {
    yield put(logout.request());

    // const state = yield select();

    // if (state.user?.accessToken?.id) {
    //   httpClient.insertAuthToken(state.user.accessToken.id);
    //   httpClient.post('/api/v1/users/logout');
    // }

    yield put(logout.success());
  } catch (error) {
    console.log('logout', error);
    yield put(logout.failure());
  } finally {
    yield put(logout.fulfill());
  }
}
