import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import DashBoard from '../../features/dashboard/pages/DashBoard';
import AddEditPage from '../../features/student/pages/AddEditPage';
import StudentPage from '../../features/student/pages/StudentPage';
import SideBar from '../Common/SideBar';
import Header from './Header';

function AdminPage() {
  const routeMatch = useRouteMatch();

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Header />
      <Grid container>
        <Grid item xs={12} md={2}>
          <SideBar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Switch>
            <Route path={`${routeMatch.path}/dashboard`}>
              <DashBoard />
            </Route>
            <Route path={`${routeMatch.path}/student`} exact>
              <StudentPage />
            </Route>
            <Route path={`${routeMatch.path}/student/add`}>
              <AddEditPage />
            </Route>
            <Route path={`${routeMatch.path}/student/:idStudent`}>
              <AddEditPage />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminPage;
