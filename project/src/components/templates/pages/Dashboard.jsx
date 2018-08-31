import React from 'react';
import { renderRoutes } from 'react-router-config';

import MainLayout from '../layouts/main-layout.jsx';
import Logo from '../common/Logo';
import User from '../common/User';
import Navigation from '../common/Navigation';

const Dashboard = (props) => {
  return (
    <MainLayout>
      <div className="dashboard">
        <aside className="dashboard__left">
          <Logo />
          <User/>
          <Navigation />
          <div className="dashboard__left-footer">
            <div>User agreement</div>
            <div>Privacy Policy</div>
          </div>
        </aside>
        <section className="dashboard__right">
          {renderRoutes(props.route.routes)}
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
