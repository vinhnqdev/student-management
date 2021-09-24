import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import { DashboardSaga } from '../features/dashboard/dashboardSaga';

export default function* rootSaga() {
  yield all([authSaga(), DashboardSaga()]);
}
