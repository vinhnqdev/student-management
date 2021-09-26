import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';

import { citySaga } from '../features/city/citySaga';
import { DashboardSaga } from '../features/dashboard/dashboardSaga';
import { studentSaga } from '../features/student/studentSaga';

export default function* rootSaga() {
  yield all([DashboardSaga(), authSaga(), citySaga(), studentSaga()]);
}
