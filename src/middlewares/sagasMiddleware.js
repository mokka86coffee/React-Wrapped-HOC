import {takeEvery, call, put, all} from 'redux-saga/effects';

export const workerSaga = function* () {
  const __call = yield call(fetch, 'o');
  yield put({type: 'SAGA_ASYNC_ACTION'});
}

const watcherSagas = function*() {
  yield all([
    takeEvery('SAGA_ACTION', workerSaga)
  ]);
}


export {
  watcherSagas
};