import { call, delay, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authActions, User } from './authSlice';

function calculateRemainingTime(expirationTime: string) {
  const currentTime = new Date().getTime();
  const expirationDuration = new Date(expirationTime).getTime();
  const remainingTime = expirationDuration - currentTime;
  return remainingTime;
}

function* watchLogin(user: PayloadAction<User>) {
  const remainingTime: number = yield call(calculateRemainingTime, user.payload.expirationTime);
  yield delay(remainingTime);
  yield put(authActions.logout());
}

export function* authSaga() {
  yield takeLatest(authActions.setUser.type, watchLogin);
}
