import { call, put, takeLatest } from '@redux-saga/core/effects';
import cityApi from '../../api/cityApi';
import { City, ListResponse } from '../../models';
import { cityActions } from './citySlice';

function* fetchCityList() {
  const response: ListResponse<City> = yield call(cityApi.getCities);
  const cityList: Array<City> = response.data;
  yield put(cityActions.fetchCitySuccess(cityList));
}

export function* citySaga() {
  yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}
