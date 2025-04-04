

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
 
  CartesianGrid,

} from "recharts";
import {
  faBriefcase,
  faEnvelope,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  getAllTicketsInfo,
  getTicketCount,
  getStarredTicketCount,
  getFollowUpTickets,
} from "../services/Services";
import "./Tickets.css";
import "./Dashboard.css";

// Card links configuration
const links = [
  { name: "Total", url: "/TotalTicket", icon: faBriefcase, bgColor: "bg-primary" },
  { name: "Opened", url: "/OpenedTicket", icon: faEnvelope, bgColor: "bg-success" },
  { name: "Closed", url: "/ClosedTicket", icon: faCheckCircle, bgColor: "bg-danger" },
  { name: "Inprogress", url: "/InprogressTicket", icon: faSpinner, bgColor: "bg-warning" },
];

const COLORS = ["#007bff", "#28a745", "#dc3545", "#ffc107"];

export default function Dashboard() {
  const [ticketData, setTicketData] = useState({
    ticket_count: 0,
    Opened: 0,
    Closed: 0,
    Inprogress: 0,
  });
  const [loading, setLoading] = useState(false);
   const [totalPages, setTotalPages] = useState(1);
   const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);

  // const fetchData = async (page) => {

  //    setLoading(true);
   
  //    try {
  //      console.log("Fetching ticket data...");
       
  //      // Fetch ticket count separately
  //      const ticketCountResponse = await getTicketCount();
  //      const totalTicketCount = ticketCountResponse?.ticket_count || 0;
   
  //      const response = await getAllTicketsInfo(page);
   
  //      if (response && response.data) {
  //        setTickets(response.data);
  //        setTotalPages(response.total_pages || 1);
  //      } else {
  //        setTickets([]);
  //        setTotalPages(1);
  //      }
   
  //      const ticketArray = response.data || [];
  //      const followUpTickets = await getFollowUpTickets();
  //      console.log("Fetched Follow-Up Tickets:", followUpTickets);
 
       
  //      const openedTicketCount = ticketArray.filter(
  //        (ticket) => ticket.status === "Open"
  //      ).length;
       
  //      // Separate counts for each closed condition
  //      const resolvedClosedCount = ticketArray.filter(
  //        (ticket) => ticket.status === "Resolved and Closed"
  //      ).length;
       
  //      const noResponseClosedCount = ticketArray.filter(
  //        (ticket) => ticket.status === "No Response from Client so Closed"
  //      ).length;
       
  //      // Total closed tickets count (sum of both conditions)
  //      const closedTicketCount = resolvedClosedCount + noResponseClosedCount;
       
  //      const inprogressTicketCount = ticketArray.filter(
  //        (ticket) => ticket.status === "In Progress, communication is going on with client."
  //      ).length;
 
  //      console.log("Total Ticket Count:", totalTicketCount);
  //      console.log("Opened Ticket Count:", openedTicketCount);
  //      console.log("Resolved and Closed Count:", resolvedClosedCount);
  //      console.log("No Response from Client so Closed Count:", noResponseClosedCount);
  //      console.log("Total Closed Ticket Count:", closedTicketCount);
       
  //      setTicketData({
  //        ticket_count: totalTicketCount,
  //        Opened: openedTicketCount,
  //        Closed: closedTicketCount,
  //        Inprogress:inprogressTicketCount,
  //        ResolvedClosed: resolvedClosedCount, // Separate count
  //        NoResponseClosed: noResponseClosedCount, // Separate count
  //        Rated: 0,
  //      });
       
  //    } catch (error) {
  //      console.error("Error fetching ticket data:", error);
  //      setError(error.message || "An error occurred while fetching data.");
  //    } finally {
  //      setLoading(false);
  //    }
  //  };

   const fetchData = async () => {
      setLoading(true);
      try {
        const ticketCountResponse = await getTicketCount();
        setTicketData(prev => ({
          ...prev,
          ticket_count: ticketCountResponse.ticket_count || 0,
        }));
        
        const ticketsArray = await getAllTicketsInfo();
        const followUpTickets = await getFollowUpTickets();
  
        const opened = ticketsArray.filter(t => t.status === "Open").length;
        const closed = ticketsArray.filter(
          t => t.status === "Resolved and Closed" || t.status === "No Response from Client so Closed"
        ).length;
        const inprogress = ticketsArray.filter(
          t => t.status === "In Progress, communication is going on with client."
        ).length;
  
        setTicketData(prev => ({
          ...prev,
          ticket_count: ticketsArray.length,
          Opened: opened,
          Closed: closed,
          Inprogress: inprogress,
        }));
  
        const updatedTickets = ticketsArray.map(ticket => {
          const followUp = followUpTickets.find(f => f.ticket_id === ticket.ticket_id);
          return {
            ...ticket,
            follow_up_date: followUp ? followUp.follow_up_date : "No Follow-Up",
          };
        });
  
        setTickets(updatedTickets);
  
        const ratedResponse = await getStarredTicketCount();
        setTicketData(prev => ({
          ...prev,
          Rated: ratedResponse.starred_ticket_count || 0,
        }));
  
      
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);
  const barChartData = [
    { name: "Total", Total: ticketData.ticket_count },
    { name: "Opened", Opened: ticketData.Opened },
    { name: "Closed", Closed: ticketData.Closed },
    { name: "Inprogress", Inprogress: ticketData.Inprogress },
  ];


  // Prepare Pie Chart Data
  const pieChartData = [
    { name: "Total", value: ticketData.ticket_count },
    { name: "Opened", value: ticketData.Opened },
    { name: "Closed", value: ticketData.Closed },
    { name: "Inprogress", value: ticketData.Inprogress },
  ];

  return (
    <div className="tickets-container">
      <h4 className="ticket-summary-title">Tickets Analysis</h4>

      <div className="container ticket-summary-section">
     
                     {/* Bar Chart */}
                              <div className="col-12 col-md-12">
                                <div className="bar-chart-container">
                                  {/* <h5 className="text-center">Tickets Overview</h5> */}
                                  {loading ? (
                                    <Skeleton height={300} />
                                  ) : (
                                    <ResponsiveContainer width="100%" height={260}>
                                      <BarChart data={barChartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, "dataMax"]} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Total" 
                                        fill="#007bff" 
                                        name="Total Tickets" />
                                        <Bar
                                          dataKey="Opened"
                                          fill="#28a745"
                                          name="Opened Tickets"
                                        />
                                        <Bar
                                          dataKey="Closed"
                                          fill="#dc3545"
                                          name="Closed Tickets"
                                        />
                                        <Bar dataKey="Inprogress"
                                         fill="#ffc107" 
                                         name="Inprogress Tickets" />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  )}
                                </div>
                                <div className="col-12 col-md-12 d-flex align-items-center justify-content-between">
  {/* Ticket Summary Section */}
  <div className="ticket-counts p-3 me-4" style={{ flex: 1 }}>
    <h5 className="text-center">Ticket Summary</h5>
    <ul className="list-group">
      {pieChartData.map((item, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
          style={{ color: COLORS[index % COLORS.length], fontWeight: "bold" }}
        >
          {item.name} 
          <span className="badge bg-secondary">{item.value}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Pie Chart Section */}
  <div className="chart-container" style={{ flex: 1 }}>
    {loading ? (
      <Skeleton height={300} />
    ) : (
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {pieChartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )}
  </div>
</div>

</div>
</div>
      </div>
   
  );
}

