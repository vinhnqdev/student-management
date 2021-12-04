import { LinearProgress, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  dashboardActions,
  selectDashboardLoading,
  selectListHighestStudent,
  selectListHighestStudentByCity,
  selectListLowestStudent,
  selectStatisticStudent,
} from '../dashboardSlice';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import DashboardTable from '../components/DashboardTable';
import { cityActions, selectCityMap } from '../../city/citySlice';

const mdTheme = createTheme();

function DashboardContent() {
  const dispatch = useAppDispatch();
  const statisticStudent = useAppSelector(selectStatisticStudent);
  const listHighestStudent = useAppSelector(selectListHighestStudent);
  const listLowestStudent = useAppSelector(selectListLowestStudent);
  const listHighstStudentByCity = useAppSelector(selectListHighestStudentByCity);
  const listCityMap = useAppSelector(selectCityMap);
  const loading = useAppSelector(selectDashboardLoading);

  useEffect(() => {
    dispatch(dashboardActions.fetchDashboard());
    dispatch(cityActions.fetchCityList());
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
            minHeight: '100vh',
            position: 'relative',
          }}
        >
          {loading && <LinearProgress sx={{ position: 'absolute', left: 0, top: '5px', width: '100%' }} />}

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Statistic Section */}
            <Box sx={{ marginBottom: '30px' }}>
              <Typography variant="h5" mb={1} sx={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Statistic
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={6} md={6} lg={3} item>
                  <Paper elevation={4} sx={{ padding: '10px' }}>
                    <Box>
                      <MaleIcon fontSize="large" color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '17px' }}>
                        Male:{' '}
                        <Typography
                          sx={{ display: 'inline', color: '#1975D2', fontWeight: 700, fontSize: '22px' }}
                        >
                          {statisticStudent.maleTotal}
                        </Typography>{' '}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid xs={6} md={6} lg={3} item>
                  <Paper elevation={4} sx={{ padding: '10px' }}>
                    <Box>
                      <FemaleIcon fontSize="large" color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '17px' }}>
                        Female:{' '}
                        <Typography
                          sx={{ display: 'inline', color: '#1975D2', fontWeight: 700, fontSize: '22px' }}
                        >
                          {statisticStudent.femaleTotal}
                        </Typography>{' '}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid xs={6} md={6} lg={3} item>
                  <Paper elevation={4} sx={{ padding: '10px' }}>
                    <Box>
                      <CallMadeIcon fontSize="large" color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '17px' }}>
                        Mark &gt; 8:{' '}
                        <Typography
                          sx={{ display: 'inline', color: '#1975D2', fontWeight: 700, fontSize: '22px' }}
                        >
                          {statisticStudent.gt8}
                        </Typography>{' '}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid xs={6} md={6} lg={3} item>
                  <Paper elevation={4} sx={{ padding: '10px' }}>
                    <Box>
                      <CallReceivedIcon fontSize="large" color="primary" />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '17px' }}>
                        Mark &lt; 5:{' '}
                        <Typography
                          sx={{ display: 'inline', color: '#1975D2', fontWeight: 700, fontSize: '22px' }}
                        >
                          {statisticStudent.lt5}
                        </Typography>{' '}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>

            {/*  Highest and Lowest Students Table*/}
            <Box sx={{ marginBottom: '30px' }}>
              <Typography variant="h5" mb={1} sx={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Highest and Lowest Mark
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} item>
                  <DashboardTable listStudent={listHighestStudent} />
                </Grid>
                <Grid xs={12} md={6} item>
                  <DashboardTable listStudent={listLowestStudent} />
                </Grid>
              </Grid>
            </Box>

            {/*  Highest and Lowest Students Table By City*/}
            <Box sx={{ marginBottom: '30px' }}>
              <Typography variant="h5" mb={1} sx={{ textTransform: 'uppercase', fontWeight: '500' }}>
                Highest and Lowest Mark By City
              </Typography>
              <Grid container spacing={3}>
                {listHighstStudentByCity.map((x) => (
                  <Grid xs={12} md={6} item key={x.cityId}>
                    <Typography>{listCityMap[x.cityId].name}</Typography>
                    <DashboardTable listStudent={x.student} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
