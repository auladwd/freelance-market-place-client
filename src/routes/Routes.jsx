import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home/Home';
import AllJobs from '../pages/AllJobs/AllJobs';
import AddJob from '../pages/AddJob/AddJob';
import JobDetails from '../pages/JobDetails/JobDetails';
import MyAddedJobs from '../pages/MyAddedJobs/MyAddedJobs';
import MyAcceptedTasks from '../pages/MyAcceptedTasks/MyAcceptedTasks';
import UpdateJob from '../pages/UpdateJob/UpdateJob';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import NotFound from '../pages/Error/NotFound';
import PrivateRoute from '../components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'allJobs', element: <AllJobs /> },
      {
        path: 'allJobs/:id',
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'addJob',
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: 'myAddedJobs',
        element: (
          <PrivateRoute>
            <MyAddedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: 'updateJob/:id',
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-accepted-tasks',
        element: (
          <PrivateRoute>
            <MyAcceptedTasks />
          </PrivateRoute>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
]);

export default router;
