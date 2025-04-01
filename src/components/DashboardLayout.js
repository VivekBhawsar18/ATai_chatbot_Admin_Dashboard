// import React from 'react';
// import Sidebar from "../components/Sidebar";
// import DashboardContent from "../components/DashboardContent";
// import Visitor from './Visitor';
// import { Outlet } from 'react-router-dom';


// export default function DashboardLayout() {
//   const isAuthenticated = false;  

//   return (
//     <div style={{ display: "flex" }}>
//       <Sidebar />
//       <div style={{ flex: 1 }}>
//         {isAuthenticated ? <DashboardContent /> : <Visitor />}
//          <Outlet /> 
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import DashboardContent from "../components/DashboardContent";
// import Visitor from "./Visitor";
// import Header from "../components/Header"; // ✅ Import Header
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout() {
//   const isAuthenticated = true; // Change this based on authentication logic
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ Add search state

//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <Header onSearch={setSearchQuery} /> {/* ✅ Single Header with Search */}
//       <div style={{ display: "flex", flex: 1 }}>
//         <Sidebar />
//         <div style={{ flex: 1, padding: "20px" }}>
//           {isAuthenticated ? <DashboardContent /> : <Visitor />}
//           <Outlet context={{ searchQuery }} /> {/* ✅ Pass searchQuery to children */}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/DashboardContent";
import Visitor from './Visitor';
import { Outlet } from 'react-router-dom';
import Header from "./Header";

export default function DashboardLayout() {
  const isAuthenticated = false;
  const [searchQuery, setSearchQuery] = useState(""); // ✅ State for search input

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header onSearch={setSearchQuery} /> {/* ✅ Pass search setter */}
        {isAuthenticated ? <DashboardContent /> : <Visitor />}
        <Outlet context={{ searchQuery }} /> {/* ✅ Pass search query */}
      </div>
    </div>
  );
}
