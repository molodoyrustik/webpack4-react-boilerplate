import React from 'react';
import { Redirect } from 'react-router-dom';

import IndexRedirect from './components/templates/pages/IndexRedirect';

import Signup from './components/templates/pages/Auth/Signup';
import Login from './components/templates/pages/Auth/Login';
import Reset from './components/templates/pages/Auth/Reset';
import Forgot from './components/templates/pages/Auth/Forgot';
import CheckForgotToken from './components/templates/pages/Auth/CheckForgotToken';

import Dashboard from './components/templates/pages/Dashboard';
import DashboardContent from './components/templates/pages/DashboardContent';

import Domains from './components/templates/pages/Domains';
import DomainAdd from './components/templates/pages/DomainAdd';

import Channels from './components/templates/pages/Channels';

import NotFound from './components/templates/pages/NotFound';

import AuthHoc from './components/HOC/authHoc';

const ReDirect = () => {
  return <Redirect to='/auth/login'/>;
};

const Routes = [
  {
    path: '/',
    exact: true,
    component: IndexRedirect,
  },
  {
    path: '/auth',
    exact: true,
    component: ReDirect,
  },
  {
    path: '/auth/signup',
    component: Signup,
  },
  {
    path: '/auth/login',
    component: Login,
  },
  {
    path: '/auth/reset',
    component: Reset,
  },
  {
    path: '/auth/forgot',
    exact: true,
    component: Forgot,
  },
  {
    path: '/auth/forgot/:id',
    component: CheckForgotToken,
  },
  {
    path: '/dashboard',
    component: AuthHoc(Dashboard),
    routes: [
      {
        path: '/dashboard/',
        exact: true,
        component: DashboardContent,
      },
      {
        path: '/dashboard/domains',
        exact: true,
        component: Domains,
      },
      {
        path: '/dashboard/domains/add-domain',
        component: DomainAdd,
      },
      {
        path: '/dashboard/channels',
        component: Channels,
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
  },
];

export default Routes;
