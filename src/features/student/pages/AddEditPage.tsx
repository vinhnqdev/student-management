import { Container, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AddEditForm from '../components/AddEditForm';
import { cityActions } from '../../city/citySlice';
import { Student } from '../../../models';
import studentApi from '../../../api/studentApi';
function AddEditPage() {
  const [updateStudent, setUpdateStudent] = useState<Student>();
  const { idStudent } = useParams<{ idStudent: string }>();
  const isUpdateMode = !!idStudent;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isUpdateMode) return;
    (async () => {
      const updateStudentInfo = await studentApi.getStudentById(idStudent);
      setUpdateStudent(updateStudentInfo);
    })();
  }, [idStudent, isUpdateMode]);

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);

  const initialValues: Student = {
    name: '',
    age: '',
    gender: 'male',
    mark: '',
    city: '',
    ...updateStudent,
  } as Student;

  //idStudent
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
            {(!isUpdateMode || updateStudent) && <AddEditForm intitalValues={initialValues} />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AddEditPage;
