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
import AnsweredTicket from "../components/AnsweredTicket";
import UnAnsweredTicket from "../components/UnAnsweredTicket";
import UserConversation from "../components/UserConversation";
import Callbackrequest from "../components/Callbackrequest";
import FAQdashboard from "../components/FAQdashboard";
import Help from "../components/Help"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Tickets />} />
        {/* <Route path="/header" element={<Header/>}/>
        <Route path="/footer" element={<Footer/>}/>   */}
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/visitor" element={<Visitor />} />
        <Route path="/FAQdashboard" element={<FAQdashboard />} />
          <Route path="/dashboardcontent" element={<DashboardContent />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/TotalTicket" element={<TotalTicket/>}/>
          <Route path="/OpenedTicket" element={<OpenedTicket/>}/>
          <Route path="/AnsweredTicket" element={<AnsweredTicket/>}/>
          <Route path="/UnansweredTicket" element={<UnAnsweredTicket/>}/>
          <Route path="/ClosedTicket" element={<ClosedTicket/>}/>
          <Route path="/RatedTicket" element={<RatedTicket/>}/>
          <Route path="/Callbackrequest" element={<Callbackrequest/>}/>
          <Route path="/user_conversation" element={<UserConversation/>} />
          <Route path="/Help" element={<Help/>}/>
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}



