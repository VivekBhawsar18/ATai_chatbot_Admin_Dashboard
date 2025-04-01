// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DashboardLayout from "../components/DashboardLayout";
// import DashboardContent from "../components/DashboardContent";
// import Sidebar from "../components/Sidebar";
// import Visitor from "../components/Visitor";
// import Tickets from "../components/Tickets";
// import TotalTicket from "../components/TotalTicket";
// import OpenedTicket from "../components/OpenedTicket";
// import ClosedTicket from "../components/ClosedTicket";
// import RatedTicket from "../components/RatedTicket";
// import UserConversation from "../components/UserConversation";
// import Callbackrequest from "../components/Callbackrequest";
// import FAQdashboard from "../components/FAQdashboard";
// import Help from "../components/Help";
// import UploadCSV from "../components/UploadCSV";
// import LoginPage from "../components/LoginPage";

// export default function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//       <Route path="/" element={<LoginPage />} >

// {/* Dashboard Layout Wrapper with Nested Routes */}
// <Route path="/dashboardlayout" element={<DashboardLayout />}/>
//         {/* <Route path="/" element={<DashboardLayout />}> */}
//         {/* <Route index element={<Tickets />} /> */}
//         {/* <Route path="/header" element={<Header/>}/>
//         <Route path="/footer" element={<Footer/>}/>   */}
//         <Route path="/sidebar" element={<Sidebar/>}/>
//         <Route path="/visitor" element={<Visitor />} />
//         <Route path="/FAQdashboard" element={<FAQdashboard />} />
//           <Route path="/dashboardcontent" element={<DashboardContent />} />
//           <Route path="/tickets" element={<Tickets />} />
//           <Route path="/TotalTicket" element={<TotalTicket/>}/>
//           <Route path="/OpenedTicket" element={<OpenedTicket/>}/>
//          <Route path="/ClosedTicket" element={<ClosedTicket/>}/>
//           <Route path="/RatedTicket" element={<RatedTicket/>}/>
//           <Route path="/Callbackrequest" element={<Callbackrequest/>}/>
//           <Route path="/user_conversation" element={<UserConversation/>} />
//           <Route path="/Help" element={<Help/>}/>
//           <Route path="/UploadCSV" element={<UploadCSV/>}/>
//         </Route>

        
//       </Routes>
//     </BrowserRouter>
//   );
// }


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import DashboardContent from "../components/DashboardContent";
import Sidebar from "../components/Sidebar";
import Visitor from "../components/Visitor";
import Tickets from "../components/Tickets";
import TotalTicket from "../components/TotalTicket";
import OpenedTicket from "../components/OpenedTicket";
import ClosedTicket from "../components/ClosedTicket";
import RatedTicket from "../components/RatedTicket";
import InprogressTicket from "../components/InprogressTicket";
import UserConversation from "../components/UserConversation";
import Callbackrequest from "../components/Callbackrequest";
import FAQdashboard from "../components/FAQdashboard";
import Help from "../components/Help";
import SelfAssessmentReport from "../components/SelfAssessmentReport";
import LoginPage from "../components/LoginPage";
import Dashboard from "../components/Dashboard";


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard Layout Wrapper with Nested Routes */}
        <Route path="/dashboardlayout" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} /> 
          {/* <Route index element={<Tickets />} />   */}
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="visitor" element={<Visitor />} />
          <Route path="FAQdashboard" element={<FAQdashboard />} />
          <Route path="dashboardcontent" element={<DashboardContent />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="TotalTicket" element={<TotalTicket />} />
          <Route path="OpenedTicket" element={<OpenedTicket />} />
          <Route path="ClosedTicket" element={<ClosedTicket />} />
          <Route path="RatedTicket" element={<RatedTicket />} />
          <Route path="InprogressTicket" element={<InprogressTicket />} />
          <Route path="Callbackrequest" element={<Callbackrequest />} />
          <Route path="user_conversation" element={<UserConversation />} />
          <Route path="Help" element={<Help />} />
          <Route path="SelfAssessmentReport" element={<SelfAssessmentReport />} />
          <Route path="Dashboard" element={<Dashboard />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



