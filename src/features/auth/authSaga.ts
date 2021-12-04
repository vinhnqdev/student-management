import { call, cancel, delay, fork, put, takeLatest } from '@redux-saga/core/effects';
import { Task } from '@redux-saga/types';
import { PayloadAction } from '@reduxjs/toolkit';

import { authActions, User } from './authSlice';

function calculateRemainingTime(expirationTime: string) {
  const currentTime = new Date().getTime();
  const expirationDuration = new Date(expirationTime).getTime();
  const remainingTime = expirationDuration - currentTime;
  return remainingTime;
}

function* handleExpirationTime(user: PayloadAction<User>) {
  const remainingTime: number = yield call(calculateRemainingTime, user.payload.expirationTime);
  yield delay(remainingTime);
  yield put(authActions.logout());
}

let taskLoginObj: Task;

function* watchLogin(user: PayloadAction<User>) {
  taskLoginObj = yield fork(handleExpirationTime, user);
}

function* watchLogout() {
  yield cancel(taskLoginObj);
}

export function* authSaga() {
  yield takeLatest(authActions.setUser.type, watchLogin);

  yield takeLatest(authActions.logout.type, watchLogout);
}
