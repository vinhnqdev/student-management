import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  dashboardActions,
  selectListHighestStudent,
  selectListHighestStudentByCity,
  selectListLowestStudent,
  selectStatisticStudent,
} from '../dashboardSlice';

const mdTheme = createTheme();

function DashboardContent() {
  const dispatch = useAppDispatch();
  const statisticStudent = useAppSelector(selectStatisticStudent);
  const listHighestStudent = useAppSelector(selectListHighestStudent);
  const listLowestStudent = useAppSelector(selectListLowestStudent);
  const listHighstStudentByCity = useAppSelector(selectListHighestStudentByCity);

  console.log(statisticStudent);
  console.log(listHighestStudent);
  console.log(listLowestStudent);
  console.log(listHighstStudentByCity);

  useEffect(() => {
    dispatch(dashboardActions.fetchDashboard());
  }, [dispatch]);

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
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={3} item>
                Grid Item1
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                Grid Item1
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                Grid Item1
              </Grid>
              <Grid xs={12} md={6} lg={3} item>
                Grid Item1
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
