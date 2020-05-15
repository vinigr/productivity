import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthService from './services/auth';
import Loading from './modules/common/Loading';

const Login = lazy(() => import('./modules/Auth/Login'));
const Register = lazy(() => import('./modules/Auth/Register'));

const Dashboard = lazy(() => import('./modules/Dashboard/Dashboard'));
const Home = lazy(() => import('./modules/Home/Home'));

const NewProject = lazy(() => import('./modules/Project/NewProject'));
const NewActivity = lazy(() => import('./modules/Activity/NewActivity'));

const PrivateRoute = (props: any) => {
  if (!AuthService.loggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <Route {...props} />;
};

const AuthRoute = (props: any) => {
  if (AuthService.loggedIn()) {
    return <Navigate to="/" replace />;
  }

  return <Route {...props} />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <AuthRoute path="login" element={<Login />} />
          <AuthRoute path="register" element={<Register />} />
          <PrivateRoute path="/" element={<Dashboard />}>
            <Route path="/" element={<Home />} />
            <Route path="new-project" element={<NewProject />} />
            <Route path="new-activity" element={<NewActivity />} />
          </PrivateRoute>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesApp;
