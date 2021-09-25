import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { ListParams, Student } from '../../models';

export interface StudentState {
  studentList: Student[];
  filter: ListParams;
  loading: boolean;
  totalPages: number;
}

const initialState: StudentState = {
  studentList: [],
  filter: {
    _page: 1,
    _limit: 10,
  },
  loading: false,
  totalPages: 0,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudent: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchStudentSuccess: (state, action: PayloadAction<Student[]>) => {
      state.loading = false;
      state.studentList = action.payload;
    },
    fetchStudentFailed: (state) => {
      state.loading = false;
    },
    totalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    fiter: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },
    debouce: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
  },
});

export const studentActions = studentSlice.actions;

export const selectListStudent = (state: RootState) => state.student.studentList;
export const selectFilter = (state: RootState) => state.student.filter;
export const selectTotalPages = (state: RootState) => state.student.totalPages;
export const selectStudentLoading = (state: RootState) => state.student.loading;
const studentReducer = studentSlice.reducer;
export default studentReducer;
