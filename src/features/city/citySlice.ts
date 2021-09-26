import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { City, CityMap } from '../../models';

export interface CityState {
  listCity: Array<City>;
  loading: boolean;
}

const initialState: CityState = {
  listCity: [],
  loading: false,
};
const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList: (state) => {
      state.loading = true;
    },
    fetchCitySuccess: (state, action: PayloadAction<Array<City>>) => {
      state.listCity = action.payload;
      state.loading = false;
    },
    fetchCityFailed: (state) => {
      state.loading = false;
    },
  },
});
// City Action

export const cityActions = citySlice.actions;

// City Selector

export const selectCityList = (state: RootState) => state.city.listCity;

export const selectCityMap = createSelector(selectCityList, (listCity) =>
  listCity.reduce((map: CityMap, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

export const selectcityOptions = createSelector(selectCityList, (listCity) => {
  return listCity.map((city) => ({
    value: city.code,
    label: city.name,
  }));
});

// City Slice
const cityReducer = citySlice.reducer;
export default cityReducer;
