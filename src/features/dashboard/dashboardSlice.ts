import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Student } from '../../models';

export interface StatisticStudent {
  maleTotal: number;
  femaleTotal: number;
  gt8: number;
  lt5: number;
}

export interface DashboardState {
  statistic: StatisticStudent;
  loading: boolean;
  list5HighestStudent: Array<Student>;
  list5LowestStudent: Array<Student>;
  listHighestStudentByCity: Array<StudentByCity>;
}

export interface StudentByCity {
  cityId: string;
  student: Student[];
}

const initialState: DashboardState = {
  loading: false,
  statistic: {
    maleTotal: 0,
    femaleTotal: 0,
    gt8: 0,
    lt5: 0,
  },
  list5HighestStudent: [],
  list5LowestStudent: [],
  listHighestStudentByCity: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboard: (state) => {
      state.loading = true;
    },
    fetchDashboardSuccess: (state) => {
      state.loading = false;
    },
    fetchDashboardFailed: (state) => {
      state.loading = false;
    },
    setStatistic: (state, action: PayloadAction<StatisticStudent>) => {
      state.statistic = action.payload;
    },
    setListHighestStudent: (state, action: PayloadAction<Student[]>) => {
      state.list5HighestStudent = action.payload;
    },
    setListLowestStudent: (state, action: PayloadAction<Student[]>) => {
      state.list5LowestStudent = action.payload;
    },
    setListHighestStudentByCity: (state, action: PayloadAction<Array<StudentByCity>>) => {
      console.log('STORE', action.payload);
      state.listHighestStudentByCity = action.payload;
    },
  },
});

// Dasboard Actions
export const dashboardActions = dashboardSlice.actions;

// Dasboard Selector
export const selectStatisticStudent = (state: RootState) => state.dashboard.statistic;
export const selectListHighestStudent = (state: RootState) => state.dashboard.list5HighestStudent;
export const selectListLowestStudent = (state: RootState) => state.dashboard.list5LowestStudent;
export const selectListHighestStudentByCity = (state: RootState) => state.dashboard.listHighestStudentByCity;

// Dashboard Slice
const dashboardReducer = dashboardSlice.reducer;

export default dashboardReducer;
