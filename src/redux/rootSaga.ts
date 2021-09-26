import { all, spawn, call } from 'redux-saga/effects';
// import userSaga from './sagas/userSaga';
import projectSaga from './sagas/projectSaga';

export default function* rootSaga() {
  const sagas = [
    // userSaga,
    projectSaga,
  ];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error('Saga error, the saga will be restarted', e);
          }
        }
      }),
    ),
  );
}
