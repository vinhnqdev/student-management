import { Container, createTheme, CssBaseline, LinearProgress, Pagination } from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import {
  selectFilter,
  selectListStudent,
  selectStudentLoading,
  selectTotalPages,
  studentActions,
} from '../studentSlice';
import StudentTable from '../components/StudentTable';
import StudentFilter from '../components/StudentFilter';
import { cityActions, selectCityList } from '../../city/citySlice';
import studentApi from '../../../api/studentApi';

function StudentPage() {
  const [page, setPage] = useState(1);

  const filter = useAppSelector(selectFilter);
  const listStudent = useAppSelector(selectListStudent);
  const totalPages = useAppSelector(selectTotalPages);
  const loading = useAppSelector(selectStudentLoading);
  const cityList = useAppSelector(selectCityList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(studentActions.fetchStudent(filter));
  }, [dispatch, filter]);

  const handleChange = (event: any, page: number) => {
    setPage(page);
    dispatch(
      studentActions.fiter({
        ...filter,
        _page: page,
      })
    );
  };

  const handleSearchChange = (searchText: string) => {
    dispatch(
      studentActions.debouce({
        ...filter,
        _page: 1,
        name_like: searchText,
      })
    );
  };

  const handleCityChange = (city: string) => {
    dispatch(
      studentActions.fiter({
        ...filter,
        _page: 1,
        city,
      })
    );
  };

  const handleSortChange = (_sort: string, _order: 'asc' | 'desc') => {
    dispatch(
      studentActions.fiter({
        ...filter,
        _page: 1,
        _sort,
        _order,
      })
    );
  };

  const handleResetFilter = () => {
    dispatch(
      studentActions.fiter({
        _page: 1,
        _limit: 15,
      })
    );
  };

  const handleRemoveStudent = (id: string) => {
    studentApi.removeStudent(id);
  };

  const mdTheme = createTheme();
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {loading && <LinearProgress sx={{ position: 'absolute', left: 0, top: '10px', width: '100%' }} />}

            {/** Filter */}
            <StudentFilter
              onSelectCityChange={handleCityChange}
              cityList={cityList}
              onSearchChange={handleSearchChange}
              onSelectSortChange={handleSortChange}
              onResetFilter={handleResetFilter}
            />

            {/** Table */}
            <StudentTable listStudent={listStudent} onRemove={handleRemoveStudent} />

            {/** Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
                size="large"
                color="primary"
              />
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default StudentPage;
