import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../comp/DashboardLayout";
import DashboardContent from "../comp/DashboardContent";
import Sidebar from "../comp/Sidebar";
import Visitor from "../components/Visitor";
import Tickets from "../components/Tickets";
import TotalTicket from "../comp/TotalTicket";
import OpenedTicket from "../comp/OpenedTicket";
import ClosedTicket from "../comp/ClosedTicket";
import RatedTicket from "../comp/RatedTicket";
import AnsweredTicket from "../comp/AnsweredTicket";
import UnAnsweredTicket from "../comp/UnAnsweredTicket";
import UserConversation from "../comp/UserConversation";
import Callbackrequest from "../comp/Callbackrequest";
import FAQdashboard from "../comp/FAQdashboard";

import Help from "../comp/Help"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
        {/* <Route path="/header" element={<Header/>}/>
        <Route path="/footer" element={<Footer/>}/> */}
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/visitor" element={<Visitor />} />
        <Route path="/FAQdashboard" element={<FAQdashboard />} />
          <Route path="/dashboardcontent" element={<DashboardContent />} />
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/TotalTicket" element={<TotalTicket/>}/>
          <Route path="/OpenedTicket" element={<OpenedTicket/>}/>
          <Route path="/AnsweredTicket" element={<AnsweredTicket/>}/>
          <Route path="/UnAnsweredTicket" element={<UnAnsweredTicket/>}/>
          <Route path="/ClosedTicket" element={<ClosedTicket/>}/>
          <Route path="/RatedTicket" element={<RatedTicket/>}/>
          <Route path="/Callbackrequest" element={<Callbackrequest/>}/>
          <Route path="/user_conversation?user_id" element={<UserConversation/>} />
          <Route path="/Help" element={<Help/>}/>
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}
