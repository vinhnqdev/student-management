import { Container, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/private-theming';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import AddEditForm from '../components/AddEditForm';
import { cityActions } from '../../city/citySlice';
import { Student } from '../../../models';
import studentApi from '../../../api/studentApi';
import { toast } from 'react-toastify';

function AddEditPage() {
  const [updateStudent, setUpdateStudent] = useState<Student>();
  const { idStudent } = useParams<{ idStudent: string }>();
  const isUpdateMode = !!idStudent;
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isUpdateMode) return;
    (async () => {
      const updateStudentInfo = await studentApi.getStudentById(idStudent);
      setUpdateStudent(updateStudentInfo);
    })();
  }, [idStudent, isUpdateMode]);

  const handleAddEditStudent = async (student: Student) => {
    if (isUpdateMode) {
      // update Student
      try {
        await studentApi.updateStudent(student, student.id as string);
        toast.success('Update a student successfully.');
        history.push('/admin/student');
      } catch (error) {
        toast.error('Fail to update a student, try again.');
      }
    } else {
      // add student
      try {
        await studentApi.addStudent(student);
        toast.success('Add a student successfully.');
        history.push('/admin/student');
      } catch (error) {
        toast.error('Fail to add a student, try again.');
      }
    }
  };

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
          <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {(!isUpdateMode || updateStudent) && (
              <AddEditForm
                onAddEditStudent={handleAddEditStudent}
                intitalValues={initialValues}
                isUpdateMode={isUpdateMode}
              />
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AddEditPage;
