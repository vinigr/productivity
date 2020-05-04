import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as RRD from 'react-router-dom';

const Login = lazy(() => import('./modules/Auth/Login'));
const Dashboard = lazy(() => import('./modules/Dashboard/Dashboard'));

const Routes = (RRD as any).Routes;

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<span>loading...</span>}>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesApp;
