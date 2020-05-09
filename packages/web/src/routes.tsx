import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Login = lazy(() => import('./modules/Auth/Login'));
const Register = lazy(() => import('./modules/Auth/Register'));

const Dashboard = lazy(() => import('./modules/Dashboard/Dashboard'));
const Home = lazy(() => import('./modules/Home/Home'));

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<span>loading...</span>}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesApp;
