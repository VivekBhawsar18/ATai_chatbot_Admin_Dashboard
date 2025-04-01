// import React, { useState, useEffect } from "react";
// import Skeleton from "react-loading-skeleton";
// import "./Dashboard.css";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
 
//   FaArrowLeft,
//   FaArrowRight,
//   FaSearch,
// } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faClock,
//   faComment,
//   faInfoCircle,
//   faHashtag,
//   faStar as faStarSolid,
//   faSpinner,
//   faBriefcase,
//   faEnvelope,
//   faCheckCircle,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   getAllTicketsInfo,
//   getTicketCount,
//   getStarredTicketCount,
//   getTicketRemark,
//   saveTicketRemark,
//   updateResolutionStatus,
//   getFollowUpTickets,
// } from "../services/Services";
// import "./Tickets.css";
// import "./Dashboard.css";

// // Card links configuration
// const links = [
//   {
//     name: "Total",
//     url: "/TotalTicket",
//     icon: faBriefcase,
//     bgColor: "bg-primary",
//   },
//   {
//     name: "Opened",
//     url: "/OpenedTicket",
//     icon: faEnvelope,
//     bgColor: "bg-success",
//   },
//   {
//     name: "Closed",
//     url: "/ClosedTicket",
//     icon: faCheckCircle,
//     bgColor: "bg-danger",
//   },
//   {
//     name: "Inprogress",
//     url: "/InprogressTicket",
//     icon: faSpinner,
//     bgColor: "bg-info",
//   },
// ];

// // CountCards Component displays summary cards
// function CountCards({ ticketData }) {
//   return (
//     <div className="row g-4">
//       {links.map((link) => {
//         const Icon = link.icon;
//         const ticketCount =
//           link.name === "Total"
//             ? ticketData.ticket_count
//             : ticketData[link.name] || 0;
//         return (
//           <div key={link.name} className="col-6 text-center">
//             <Link to={link.url} className="text-decoration-none">
//               <div className={`dashboard-card ${link.bgColor}`}>
//                 <Icon size="2rem" />
//                 <h5>{link.name}</h5>
//                 <p>{ticketCount}</p>
//               </div>
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // TicketsBarGraph Component displays the bar chart
// function TicketsBarGraph({ barChartData, loading }) {
//   return (
//     <div className="bar-chart-container">
//       <h5 className="text-center">Tickets Overview</h5>
//       {loading ? (
//         <Skeleton height={300} />
//       ) : (
//         <ResponsiveContainer width="100%" height={260}>
//           <BarChart data={barChartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis domain={[0, "dataMax"]} />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Total" fill="#007bff" name="Total Tickets" />
//             <Bar dataKey="Opened" fill="#28a745" name="Opened Tickets" />
//             <Bar dataKey="Closed" fill="#dc3545" name="Closed Tickets" />
//             <Bar dataKey="Inprogress" fill="#54B4D3" name="inprogressTickets" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// }

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const ticketId = queryParams.get("ticket_id");

//   const [ticketData, setTicketData] = useState({
//     ticket_count: 0,
//     Opened: 0,
//     Closed: 0,
//     Rated: 0,
//   });
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination (if needed)
//   const [currentPage, setCurrentPage] = useState(0);
//   const ticketsPerPage = 5; // Only 5 tickets per page

//   const fetchData = async () => {
//     setLoading(true);
   
//       try {
//             console.log("Fetching ticket data...");
      
//             const ticketsArray = await getAllTicketsInfo();
//             console.log("Fetched Tickets Array:", ticketsArray);
//             setTickets(ticketsArray);
      
//             const followUpTickets = await getFollowUpTickets();
//             console.log("Fetched Follow-Up Tickets:", followUpTickets);
      
//             const totalTicketCount = ticketsArray.length;
//             const openedTicketCount = ticketsArray.filter(
//               (ticket) => ticket.status === "Open"
//             ).length;
            
//             // Separate counts for each closed condition
//             const resolvedClosedCount = ticketsArray.filter(
//               (ticket) => ticket.status === "Resolved and Closed"
//             ).length;
            
//             const noResponseClosedCount = ticketsArray.filter(
//               (ticket) => ticket.status === "No Response from Client so Closed"
//             ).length;
            
//             // Total closed tickets count (sum of both conditions)
//             const closedTicketCount = resolvedClosedCount + noResponseClosedCount;
            
//             const inprogressTicketCount = ticketsArray.filter(
//               (ticket) => ticket.status === "In Progress, communication is going on with client."
//             ).length;
      
//             console.log("Total Ticket Count:", totalTicketCount);
//             console.log("Opened Ticket Count:", openedTicketCount);
//             console.log("Resolved and Closed Count:", resolvedClosedCount);
//             console.log("No Response from Client so Closed Count:", noResponseClosedCount);
//             console.log("Total Closed Ticket Count:", closedTicketCount);
            
//             setTicketData({
//               ticket_count: totalTicketCount,
//               Opened: openedTicketCount,
//               Closed: closedTicketCount,
//               Inprogress:inprogressTicketCount,
//               ResolvedClosed: resolvedClosedCount, // Separate count
//               NoResponseClosed: noResponseClosedCount, // Separate count
//               Rated: 0,
//             });

//       // Optionally update tickets with follow-up info
//       const updatedTickets = ticketsArray.map((ticket) => {
//         const followUp = followUpTickets.find(
//           (f) => f.ticket_id === ticket.ticket_id
//         );
//         return {
//           ...ticket,
//           follow_up_date: followUp ? followUp.follow_up_date : "No Follow-Up",
//         };
//       });

//       setTickets(updatedTickets);

//       // Update starred (rated) count
//       const ratedTicketResponse = await getStarredTicketCount();
//       setTicketData((prev) => ({
//         ...prev,
//         Rated: ratedTicketResponse.starred_ticket_count || 0,
//       }));

//       // Update total ticket count if needed
//       const ticketCountResponse = await getTicketCount();
//       setTicketData((prev) => ({
//         ...prev,
//         ticket_count: ticketCountResponse.ticket_count || 0,
//       }));
//     } catch (error) {
//       console.error("Error fetching ticket data:", error);
//       setError(error.message || "An error occurred while fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Calculate Bar Chart Data based on ticketData counts
//   const barChartData = [
//     { name: "Total", Total: ticketData.ticket_count },
//     { name: "Opened", Opened: ticketData.Opened },
//     { name: "Closed", Closed: ticketData.Closed },
//     { name: "Inprogress", Rated: ticketData.Inprogress },
//   ];

//   return (
//     <div className="tickets-container">
//       {/* Page Title */}
//       <h4 className="ticket-summary-title">Tickets Analysis</h4>

//       {/* Count Cards Section */}
//       <div className="container ticket-summary-section">
//       <div className="row g-4 d-flex align-items-stretch">
//       <div className="col-12 col-md-6">
//       <div className="row g-4">
//         {loading
//                        ? [...Array(4)].map((_, index) => (
//                            <div key={index} className="col-6 text-center">
//                              <Skeleton height={120} width="100%" />
//                            </div>
//                          ))
//                        : links.map((link) => {
//                            const Icon = link.icon;
//                            const ticketCount =
//                              link.name === "Total"
//                                ? ticketData.ticket_count
//                                : ticketData[link.name] || 0;
       
//                            return (
//                              <div key={link.name} className="col-6 text-center">
//                                <Link to={link.url} className="text-decoration-none">
//                                  <div className={`dashboard-card ${link.bgColor}`}>
//                                     <FontAwesomeIcon icon={link.icon} size="2x" />
//                                    <h5>{link.name}</h5>
//                                    <p>{ticketCount}</p>
//                                  </div>
//                                </Link>
//                              </div>
//                            );
//                          })}
//                    </div>
//                  </div>
               
       
//                  {/* Bar Chart */}
                 
//                            <div className="col-12 col-md-6">
//                              <div className="bar-chart-container">
//                                <h5 className="text-center">Tickets Overview</h5>
//                                {loading ? (
//                                  <Skeleton height={300} />
//                                ) : (
//                                  <ResponsiveContainer width="100%" height={260}>
//                                    <BarChart data={barChartData}>
//                                      <CartesianGrid strokeDasharray="3 3" />
//                                      <XAxis dataKey="name" />
//                                      <YAxis domain={[0, "dataMax"]} />
//                                      <Tooltip />
//                                      <Legend />
//                                      <Bar dataKey="Total" fill="#007bff" name="Total Tickets" />
//                                      <Bar
//                                        dataKey="Opened"
//                                        fill="#28a745"
//                                        name="Opened Tickets"
//                                      />
//                                      <Bar
//                                        dataKey="Closed"
//                                        fill="#dc3545"
//                                        name="Closed Tickets"
//                                      />
//                                      <Bar dataKey="Inprogress" fill="#54B4D3" name="Inprogress Tickets" />
//                                    </BarChart>
//                                  </ResponsiveContainer>
//                                )}
//                              </div>
//                            </div>
//                  </div>
//                  </div>
//                  </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      console.log("Fetching ticket data...");

      const ticketsArray = await getAllTicketsInfo();
      console.log("Fetched Tickets Array:", ticketsArray);

      const totalTicketCount = ticketsArray.length;
      const openedTicketCount = ticketsArray.filter((t) => t.status === "Open").length;
      const closedTicketCount = ticketsArray.filter(
        (t) => t.status === "Resolved and Closed" || t.status === "No Response from Client so Closed"
      ).length;
      const inprogressTicketCount = ticketsArray.filter(
        (t) => t.status === "In Progress, communication is going on with client."
      ).length;

      setTicketData({
        ticket_count: totalTicketCount,
        Opened: openedTicketCount,
        Closed: closedTicketCount,
        Inprogress: inprogressTicketCount,
      });

      // Fetch Starred Tickets
      const ratedTicketResponse = await getStarredTicketCount();
      setTicketData((prev) => ({ ...prev, Rated: ratedTicketResponse.starred_ticket_count || 0 }));

      // Fetch Total Ticket Count
      const ticketCountResponse = await getTicketCount();
      setTicketData((prev) => ({ ...prev, ticket_count: ticketCountResponse.ticket_count || 0 }));
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <div className="row g-4 d-flex align-items-stretch">
          {/* Cards Section */}
           <div className="col-12 col-md-6">
                      <div className="row g-4">
                        {loading
                          ? [...Array(4)].map((_, index) => (
                              <div key={index} className="col-6 text-center">
                                <Skeleton height={120} width="100%" />
                              </div>
                            ))
                          : links.map((link) => {
                              const Icon = link.icon;
                              const ticketCount =
                                link.name === "Total"
                                  ? ticketData.ticket_count
                                  : ticketData[link.name] || 0;
          
                              return (
                                <div key={link.name} className="col-6 text-center">
                                  <Link to={link.url} className="text-decoration-none">
                                    <div className={`dashboard-card ${link.bgColor}`}>
                                    <FontAwesomeIcon icon={link.icon} size="2x" />
                                      <h5>{link.name}</h5>
                                      <p>{ticketCount}</p>
                                    </div>
                                  </Link>
                                </div>
                              );
                            })}
                      </div>
                    </div>
          

          {/* Pie Chart Section */}
          <div className="col-12 col-md-6">
            <div className="chart-container">
              <h5 className="text-center">Tickets Overview</h5>
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

