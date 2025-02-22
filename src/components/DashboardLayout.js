import React from 'react';
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import Visitor from './Visitor';
// import { Outlet } from 'react-router-dom';


export default function DashboardLayout() {
  const isAuthenticated = false;  // Replace with your actual authentication check

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        {isAuthenticated ? <DashboardContent /> : <Visitor />}
        {/* <Outlet /> */}
      </div>
    </div>
  );
}