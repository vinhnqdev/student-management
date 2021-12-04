import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from '../../api/cityApi';
import studentApi from '../../api/studentApi';
import { City, ListResponse, Student } from '../../models';
import { dashboardActions, StatisticStudent, StudentByCity } from './dashboardSlice';

function* fetchStatisticStudent() {
  const data: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { gender: 'male', _page: 1 }),
    call(studentApi.getAll, { gender: 'female', _page: 1 }),
    call(studentApi.getAll, { mark_gte: 8, _page: 1 }),
    call(studentApi.getAll, { mark_lte: 5, _page: 1 }),
  ]);
  const [listResponseMale, listResponFemale, listResponsegt8, listResponselt5] = data;

  const statisticData: StatisticStudent = {
    maleTotal: listResponseMale.pagination._totalRows,
    femaleTotal: listResponFemale.pagination._totalRows,
    lt5: listResponselt5.pagination._totalRows,
    gt8: listResponsegt8.pagination._totalRows,
  };

  yield put(dashboardActions.setStatistic(statisticData));
}

function* fetchListHighestStudent() {
  const { data: listHighestStudent }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardActions.setListHighestStudent(listHighestStudent));
}

function* fetchListLowestStudent() {
  const { data: listLowestStudent }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardActions.setListLowestStudent(listLowestStudent));
}

function* fetchListHighestStudentByCity() {
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getCities);
  const callList = cityList.map((city) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: city.code,
    })
  );
  const data: Array<ListResponse<Student>> = yield all(callList);

  const listStudentByCity: Array<StudentByCity> = cityList.map((city, index) => ({
    cityId: city.code,
    student: data[index].data,
  }));
  yield put(dashboardActions.setListHighestStudentByCity(listStudentByCity));
}

function* fetchDashboardData() {
  yield all([
    call(fetchStatisticStudent),
    call(fetchListHighestStudent),
    call(fetchListLowestStudent),
    call(fetchListHighestStudentByCity),
  ]);
  yield put(dashboardActions.fetchDashboardSuccess());
}

export function* DashboardSaga() {
  yield takeLatest(dashboardActions.fetchDashboard.type, fetchDashboardData);
}
