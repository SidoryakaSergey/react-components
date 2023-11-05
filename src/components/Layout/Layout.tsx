import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <div>footer</div>
    </div>
  );
}

export default Layout;
