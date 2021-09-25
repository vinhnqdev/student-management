import { call, debounce, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from '../../api/studentApi';
import { ListParams, ListResponse, Student } from '../../models';
import { studentActions } from './studentSlice';

function* fetchStudent(action: PayloadAction<ListParams>) {
  try {
    const res: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    yield put(studentActions.fetchStudentSuccess(res.data));
    yield put(studentActions.totalPages(Math.ceil(res.pagination._totalRows / res.pagination._limit)));
  } catch (error) {
    yield put(studentActions.fetchStudentFailed());
  }
}

function* handleDebouce(action: PayloadAction<ListParams>) {
  yield put(studentActions.fiter(action.payload));
}

export function* studentSaga() {
  yield takeLatest(studentActions.fetchStudent.type, fetchStudent);

  console.log('DEBOUCE');
  yield debounce(500, studentActions.debouce.type, handleDebouce);
}
