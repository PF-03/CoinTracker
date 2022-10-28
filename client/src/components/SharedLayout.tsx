import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavbar from './navbar/LandingNavbar';

export default function SharedLayout() {
  return (
    <>
      <LandingNavbar />
      <Outlet />
    </>
  );
}
