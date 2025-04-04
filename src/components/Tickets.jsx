// import React, { useState, useEffect, useRef } from "react";
// import Skeleton from "react-loading-skeleton";
// import ReactPaginate from "react-paginate";
// import Header from "./Header";
// import "./Tickets.css";
// import { useOutletContext } from "react-router-dom";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
 
//   FaArrowLeft,
//   FaArrowRight,
 
// } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faFileAlt,
//   faClock,
//   faComment,
//   faInfoCircle,
//   faHashtag,
//   faStar,
//   faSpinner,
//   faBriefcase,
//   faEnvelope,
//   faCheckCircle,
// } from "@fortawesome/free-solid-svg-icons";


// import {
//   getAllTicketsInfo,
//   getTicketCount,
//   getStarredTicketCount,
//   getTicketRemark,
//   saveTicketRemark,
//   updateResolutionStatus,
//   getFollowUpTickets,
// } from "../services/Services";

// export default function Tickets() {
 
//   const { searchQuery } = useOutletContext();

//   const [ticketData, setTicketData] = useState({
//     ticket_count: 0,
//     Opened: 0,
//     Closed: 0,
//     Inprogress:0,
//     Rated: 0,
//   });
//   const navigate = useNavigate();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const ticketId = queryParams.get("ticket_id");

//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [updatedTickets, setUpdatedTickets] = useState([]);
//   const [ticketCount, setTicketCount] = useState(0);

//   const [starredCount, setStarredCount] = useState(0);
//   const [ticketRemarks, setTicketRemarks] = useState([]);
//   const [remarksList, setRemarksList] = useState([]);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [FollowUp, setFollowUp] = useState([]);
//   const [followUpDate, setFollowUpDate] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);

//   // const [searchQuery, setSearchQuery] = useState("");

//   // Pagination
//   const [page, setPage] = useState(1);
//    const ticketsPerPage = 5; // Only 5 tickets per page

//   const fetchData = async (page) => {
//     setLoading(true);
  
//     try {
//       console.log("Fetching ticket data...");
      
//       // Fetch ticket count separately
//       const ticketCountResponse = await getTicketCount();
//       const totalTicketCount = ticketCountResponse?.ticket_count || 0;
    
     
 

//       const response = await getAllTicketsInfo(page);
  
//       if (response && response.data) {
//         setTickets(prevTickets => [...prevTickets, ...response.data]);
//         setTotalPages(response.total_pages || 1);
//       } else {
//         setTickets([]);
//         setTotalPages(1);
//       }
  
//       const ticketArray = response.data || [];
//       const followUpTickets = await getFollowUpTickets();
//       console.log("Fetched Follow-Up Tickets:", followUpTickets);

      
//       const openedTicketCount = ticketArray.filter(
//         (ticket) => ticket.status === "Open"
//       ).length;
      
//       // Separate counts for each closed condition
//       const resolvedClosedCount = ticketArray.filter(
//         (ticket) => ticket.status === "Resolved and Closed"
//       ).length;
      
//       const noResponseClosedCount = ticketArray.filter(
//         (ticket) => ticket.status === "No Response from Client so Closed"
//       ).length;
      
//       // Total closed tickets count (sum of both conditions)
//       const closedTicketCount = resolvedClosedCount + noResponseClosedCount;
      
//       const inprogressTicketCount = ticketArray.filter(
//         (ticket) => ticket.status === "In Progress, communication is going on with client."
//       ).length;

//       console.log("Total Ticket Count:", totalTicketCount);
//       console.log("Opened Ticket Count:", openedTicketCount);
//       console.log("Resolved and Closed Count:", resolvedClosedCount);
//       console.log("No Response from Client so Closed Count:", noResponseClosedCount);
//       console.log("Total Closed Ticket Count:", closedTicketCount);
      
//       setTicketData({
//         ticket_count: totalTicketCount,
//         Opened: openedTicketCount,
//         Closed: closedTicketCount,
//         Inprogress:inprogressTicketCount,
//         ResolvedClosed: resolvedClosedCount, // Separate count
//         NoResponseClosed: noResponseClosedCount, // Separate count
//         Rated: 0,
//       });
      
//       setTicketData({
//         ticket_count: ticketCountResponse?.ticket_count || 0,
//         Opened: ticketCountResponse?.Opened || 0,
//         Closed: ticketCountResponse?.Closed || 0,
//         Inprogress: ticketCountResponse?.Inprogress || 0,
//       });
//     } catch (error) {
//       console.error("Error fetching ticket data:", error);
//       setError(error.message || "An error occurred while fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   useEffect(() => {
//     fetchData(page);
//   }, [page]);

//   useEffect(() => {
//     const updatedStatus = localStorage.getItem("updatedStatus");
//     if (updatedStatus) {
//       const { ticketId, newStatus } = JSON.parse(updatedStatus);

//       setTickets((prevTickets) =>
//         prevTickets.map((ticket) =>
//           ticket.ticket_id === ticketId
//             ? { ...ticket, resolution_status: newStatus }
//             : ticket
//         )
//       );

//         localStorage.removeItem("updatedStatus"); // Clear stored status
//     }
//   }, []); // ✅ Ensure this runs when tickets change

//   useEffect(() => {
//     const fetchTotalTicketCount = async () => {
//       try {
//         console.log("Fetching total ticket count...");
//         const response = await getTicketCount(); 
//         console.log("Total Ticket Count:", response);
  
//         setTicketData((prevData) => ({
//           ...prevData,
//           ticket_count: response.count || 0, // Ensure default value if undefined
//         }));
//       } catch (error) {
//         console.error("Error fetching total ticket count:", error);
//       }
//     };
  
//     fetchTotalTicketCount();
//   }, []);


//   // Get the new remark from input field
//   const handleSaveRemark = async (ticketId) => {
//     try {
//       const agent_remarks = ticketRemarks[ticketId] || "";
//       console.log("New Remark to Save:", agent_remarks);
//       // console.log("Follow-up Date:", followUpDate);

//       // ✅ Save remark
//       await saveTicketRemark(ticketId, agent_remarks, followUpDate);
//       console.log("Saving remark..and followUpdate.");

//       // ✅ Fetch updated follow-up tickets
//       console.log("Fetching updated follow-up tickets...");
//       const followUpTickets = await getFollowUpTickets();
//       const updatedFollowUp = followUpTickets.find(
//         (ticket) => ticket.ticket_id === ticketId
//       );

//       if (updatedFollowUp) {
//         setFollowUpDate(updatedFollowUp.follow_up_date);
//         console.log("Updated Follow-Up Date:", updatedFollowUp.follow_up_date);

//         // ✅ Update tickets state with the new follow-up date
//         setTickets((prevTickets) =>
//           prevTickets.map((ticket) =>
//             ticket.ticket_id === ticketId
//               ? { ...ticket, follow_up_date: updatedFollowUp.follow_up_date }
//               : ticket
//           )
//         );
//       }
      

//       alert("Remark and follow-up date saved successfully!");
//     } catch (error) {
//       console.error("Error saving remark or follow-up date:", error);
//     }
//   };

//   const getBadgeClass = (statuses) => {
//     if (statuses === "Open") return "status-badge-success";
//     else if (statuses === "Assigned") return "status-badge-info";
//     else if (statuses === "Resolved and Closed" || statuses === "No Response from Client so Closed")
//       return "status-badge-danger";
//     else if (statuses === "In Progress, communication is going on with client.")
//       return "status-badge-warning";
//     else if (statuses === "Lead generated for sale, assign to sales department")
//       return "status-badge-primary";
//     else return "status-badge-secondary";
//   };
  
//   const filteredTickets = tickets
//   .filter((ticket) => {
//     const status = (ticket.status || "").toLowerCase(); // Ensure status is always a lowercase string

//     // Status-based filtering
//     if (!filterStatus || filterStatus === "All") return true;
//     if (filterStatus === "Open") return status.includes("open"); // Matches "Open", "Opened"
//     if (filterStatus === "Closed") return status.includes("closed"); // Matches any status containing "closed"
//     if (filterStatus === "In-Progress") return status.includes("in progress"); // Matches "In-Progress"
    

//     return false;
//   })
//   // .filter((ticket) => 
//   //   (ticket.ticket_title || "").toLowerCase().includes((searchQuery || "").toLowerCase()) ||
//   //   (ticket.ticket_id ? ticket.ticket_id.toString().includes(searchQuery) : false)
//   // )
//   // .sort((a, b) => new Date(b.updated) - new Date(a.updated)); // Sort by most recent update

//   .filter((ticket) => {
//     const query = (searchQuery ?? "").toLowerCase();
//     const titleMatch = (ticket.ticket_title ?? "").toLowerCase().includes(query);
//     const idMatch = ticket.ticket_id ? ticket.ticket_id.toString().includes(query) : false;
//     return titleMatch || idMatch;
//   })
//   .sort((a, b) => {
//     const dateA = new Date(a.updated);
//     const dateB = new Date(b.updated);
//     return dateB - dateA; // Sort by most recent update
//   });


//   // // Calculate total pages
//   const calculatedTotalPages = Math.ceil((filteredTickets?.length || 0) / ticketsPerPage);
//   const startIndex = (page - 1) * ticketsPerPage; // Ensure correct starting index
//   const currentTickets = filteredTickets?.slice(
//     Math.max(0, startIndex), 
//     startIndex + ticketsPerPage
//   ) || [];
  

//   // Handle next & previous page navigation
//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage((prevPage) => prevPage + 1);
//       fetchData(page + 1); // ✅ Fetch new page data
//     }
//   };
  
//   const handlePrevPage = () => {
//     if (page > 1) {
//       setPage((prevPage) => prevPage - 1);
//       fetchData(page - 1); // ✅ Fetch previous page data
//     }
//   };
  
//   // Bar Chart Data
//   const barChartData = [
//     { name: "Total", Total: ticketData.ticket_count },
//     { name: "Opened", Opened: ticketData.Opened },
//     { name: "Closed", Closed: ticketData.Closed },
//     { name: "Inprogress", Inprogress: ticketData.Inprogress },
//   ];
//   const links = [
//     {
//       name: "Total",
//       url: "/dashboardlayout/TotalTicket",
//       icon: faBriefcase,
//       bgColor: "bg-primary",
//       count: ticketData.ticket_count,
//     },
//     {
//       name: "Opened",
//       url: "/dashboardlayout/OpenedTicket",
//       icon: faEnvelope,
//       bgColor: "bg-success",
//       count: ticketData.Opened,
//     },
//     {
//       name: "Closed",
//       url: "/dashboardlayout/ClosedTicket",
//       icon: faCheckCircle,
//       bgColor: "bg-danger",
//       count: ticketData.Closed,
//     },
//     // {
//     //   name: "Rated",
//     //   url: "/RatedTicket",
//     //   icon: FaStar,
//     //   bgColor: "bg-info",
//     // },
//     {
//       name: "Inprogress",
//       url: "/dashboardlayout/InprogressTicket",
//       icon: faSpinner,
//       bgColor: "bg-warning",
//       count: ticketData.Inprogress,
//     },
//   ];

//   return (
//     <div className="tickets-container">
    
//       {/* Page Title */}
//       <h4 className="ticket-summary-title">Tickets Summary</h4>

//       <div className="container ticket-summary-section">
//         <div className="row g-4 d-flex align-items-stretch">
//           {/* Ticket Summary Cards */}
//           {/* <div className="col-12 col-md-6">
//             <div className="row g-4">
//               {loading
//                 ? [...Array(4)].map((_, index) => (
//                     <div key={index} className="col-6 text-center">
//                       <Skeleton height={120} width="100%" />
//                     </div>
//                   ))
//                 : links.map((link) => {
//                     const Icon = link.icon;
//                     const ticketCount =
//                       link.name === "Total"
//                         ? ticketData.ticket_count
//                         : ticketData[link.name] || 0;

//                     return (
//                       <div key={link.name} className="col-6 text-center">
//                         <Link to={link.url} className="text-decoration-none">
//                           <div className={`dashboard-card ${link.bgColor}`}>
//                           <FontAwesomeIcon icon={link.icon} size="2x" />
//                             <h5>{link.name}</h5>
//                             <p>{ticketCount}</p>
//                           </div>
//                         </Link>
//                       </div>
//                     );
//                   })}
//             </div>
//           </div> */}
          
//           <div className="col-12">
//           <div className="row g-4">
//   {loading
//     ? [...Array(4)].map((_, index) => (
//         <div key={index} className="col-12 col-md-3 text-center">
//           <Skeleton height={120} width="100%" />
//         </div>
//       ))
//     : links.map((link) => {
//         const ticketCount =
//           link.name === "Total"
//             ? ticketData.ticket_count
//             : ticketData[link.name] || 0;

//         return (
//           <div key={link.name} className="col-12 col-md-3 text-center">
//             <Link to={link.url} className="text-decoration-none">
//               <div className={`dashboard-card ${link.bgColor}`}>
//                 <FontAwesomeIcon icon={link.icon} size="2x" />
//                 <h5>{link.name}</h5>
//                 {/* <p>{ticketCount}</p> */}
//                 <p>{link.count}</p>
//               </div>
//             </Link>
//           </div>
//         );
//       })}
// </div>

// </div>
 

//           {/* Bar Chart */}
//           {/* <div className="col-12 col-md-6">
//             <div className="bar-chart-container">
//               <h5 className="text-center">Tickets Overview</h5>
//               {loading ? (
//                 <Skeleton height={300} />
//               ) : (
//                 <ResponsiveContainer width="100%" height={260}>
//                   <BarChart data={barChartData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis domain={[0, "dataMax"]} />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="Total" 
//                     fill="#007bff" 
//                     name="Total Tickets" />
//                     <Bar
//                       dataKey="Opened"
//                       fill="#28a745"
//                       name="Opened Tickets"
//                     />
//                     <Bar
//                       dataKey="Closed"
//                       fill="#dc3545"
//                       name="Closed Tickets"
//                     />
//                     <Bar dataKey="Inprogress"
//                      fill="#ffc107" 
//                      name="Inprogress Tickets" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div> */}
//           {/* Search Bar
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by ID or Title..."
//           className="search-input"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <FaSearch className="search-icon" />
//       </div> */}
//           {/* Filter Buttons */}
//           <div className="filter-button-container">
//   {["All", "Open", "Closed", "In-Progress"].map(
//     (status) => (
//       <button
//         key={status}
//         className={`filter-button ${
//           filterStatus === status
//             ? "filter-button-active"
//             : "filter-button-outline"
//         }`}
//         onClick={() => {
//           setFilterStatus(status);
//           setPage(0);
//         }}
//       >
//         {status}
//       </button>
//     )
//   )}
// </div>


//           {/* Tickets Table with Scroll */}
//           <div className="bg-white p-3 rounded shadow mb-4">
//             <div className="table-container">
//               <table className="ticket-table">
//                 {/* Sticky Header */}
//                 <thead>
//                   <tr>
//                     <th>
//                       <FontAwesomeIcon icon={faHashtag} /> ID
//                     </th>
//                     <th>
//                       <FontAwesomeIcon icon={faFileAlt} /> Title
//                     </th>
//                     <th>
//                       <FontAwesomeIcon icon={faClock} /> Updated
//                     </th>
//                     <th>
//                       <FontAwesomeIcon icon={faComment} /> Remark
//                     </th>
//                     <th>
//                       <FontAwesomeIcon icon={faStar} /> Follow-Up Date
//                     </th>
//                     <th>
//                       <FontAwesomeIcon icon={faInfoCircle} /> Status
//                     </th>
//                   </tr>
//                 </thead>

//                 {/* Table Body */}
//                 <tbody>
//                   {loading ? (
//                     [...Array(5)].map((_, index) => (
//                       <tr key={index}>
//                         <td>
//                           <Skeleton width={50} />
//                         </td>
//                         <td>
//                           <Skeleton width="80%" />
//                         </td>
//                         <td>
//                           <Skeleton width={100} />
//                         </td>
//                         <td>
//                           <Skeleton width="60%" />
//                         </td>
//                         <td>
//                           <Skeleton width={80} />
//                         </td>
//                         <td>
//                           <Skeleton width="60%" />
//                         </td>
//                       </tr>
//                     ))
//                   ) : currentTickets.length > 0 ? (
//                     currentTickets.map((ticket) => (
//                       <tr key={ticket.ticket_id}>
//                         <td>
//                           <Link
//                             to={`/dashboardlayout/user_conversation?user_id=${ticket.ticket_id}`}
//                           >
//                             {ticket.ticket_id}
//                           </Link>
//                         </td>
//                         <td>{ticket.ticket_title}</td>
//                         <td>
//                           {new Date(ticket.updated).toLocaleDateString("en-GB")}
//                           <br />
//                           {new Date(ticket.updated).toLocaleTimeString(
//                             "en-US",
//                             {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                               hour12: true,
//                             }
//                           )}
//                         </td>
//                         <td>{ticket.agent_remarks ?? "No Remark"}</td>
//                         <td>{ticket.follow_up_date ?? "No followup"}</td>
//                         <td>
//                           <span
//                             className={`statuses-badge ${getBadgeClass(
//                               ticket.status
//                             )}`}
//                           >
//                             {ticket.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5">No Tickets available.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination */}
//           <div className="pagination-container">
//   <button className="pagination-button" onClick={handlePrevPage} disabled={page === 1}>
//     <FaArrowLeft /> Previous
//   </button>
//   <span>Page {page} of {totalPages}</span>
//   <button className="pagination-button" onClick={handleNextPage} disabled={page >= totalPages}>
//     Next <FaArrowRight />
//   </button>
// </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faClock,
  faComment,
  faInfoCircle,
  faHashtag,
  faStar,
  faSpinner,
  faBriefcase,
  faEnvelope,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import {
  getAllTicketsInfo,
  getTicketCount,
  getStarredTicketCount,
  getTicketRemark,
  saveTicketRemark,
  updateResolutionStatus,
  getFollowUpTickets,
} from "../services/Services";

import "./Tickets.css";

export default function Tickets() {
  const links = [
    {
      name: "Total",
      url: "/dashboardlayout/TotalTicket",
      icon: faBriefcase,
      bgColor: "bg-primary",
    },
    {
      name: "Opened",
      url: "/dashboardlayout/OpenedTicket",
      icon: faEnvelope,
      bgColor: "bg-success",
    },
    {
      name: "Closed",
      url: "/dashboardlayout/ClosedTicket",
      icon: faCheckCircle,
      bgColor: "bg-danger",
    },
    {
      name: "Inprogress",
      url: "/dashboardlayout/InprogressTicket",
      icon: faSpinner,
      bgColor: "bg-warning",
    },
  ];

  const { searchQuery } = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [ticketData, setTicketData] = useState({
    ticket_count: 0,
    Opened: 0,
    Closed: 0,
    Inprogress: 0,
    Rated: 0,
  });

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketRemarks, setTicketRemarks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [followUpDate, setFollowUpDate] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const ticketsPerPage = 5;

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

  const getBadgeClass = status => {
    if (status === "Open") return "status-badge-success";
    if (status === "Assigned") return "status-badge-info";
    if (["Resolved and Closed", "No Response from Client so Closed"].includes(status))
      return "status-badge-danger";
    if (status.includes("In Progress")) return "status-badge-warning";
    if (status.includes("Lead generated")) return "status-badge-primary";
    return "status-badge-secondary";
  };

  const filteredTickets = tickets
    .filter(ticket => {
      const status = (ticket.status || "").toLowerCase();
      if (filterStatus === "All") return true;
      if (filterStatus === "Open") return status.includes("open");
      if (filterStatus === "Closed") return status.includes("closed");
      if (filterStatus === "In-Progress") return status.includes("in progress");
      return false;
    })
    .filter(ticket =>
      (ticket.ticket_title || "").toLowerCase().includes((searchQuery || "").toLowerCase()) ||
      (ticket.ticket_id ? ticket.ticket_id.toString().includes(searchQuery) : false)
    )
    .sort((a, b) => new Date(b.updated) - new Date(a.updated));

  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
  const startIndex = currentPage * ticketsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, startIndex + ticketsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="tickets-container">
      <h4 className="ticket-summary-title">Tickets Summary</h4>

      <div className="container ticket-summary-section">
        <div className="row g-4 d-flex align-items-stretch">
        <div className="col-12">
  <div className="row g-4">
    {loading
      ? [...Array(4)].map((_, index) => (
          <div key={index} className="col-12 col-md-3 text-center">
            <Skeleton height={120} width="100%" />
          </div>
        ))
      : links.map((link) => {
          const ticketCount =
            link.name === "Total"
              ? ticketData.ticket_count
              : ticketData[link.name] || 0;

          return (
            <div key={link.name} className="col-12 col-md-3 text-center">
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


          {/* Filter Buttons */}
          <div className="filter-button-container">
            {["All", "Open", "Closed", "In-Progress"].map(status => (
              <button
                key={status}
                className={`filter-button ${
                  filterStatus === status ? "filter-button-active" : "filter-button-outline"
                }`}
                onClick={() => {
                  setFilterStatus(status);
                  setCurrentPage(0);
                }}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Ticket Table */}
          <div className="bg-white p-3 rounded shadow mb-4">
            <div className="table-container">
              <table className="ticket-table">
                <thead>
                  <tr>
                    <th><FontAwesomeIcon icon={faHashtag} /> ID</th>
                    <th><FontAwesomeIcon icon={faFileAlt} /> Title</th>
                    <th><FontAwesomeIcon icon={faClock} /> Updated</th>
                    <th><FontAwesomeIcon icon={faComment} /> Remark</th>
                    <th><FontAwesomeIcon icon={faStar} /> Follow-Up</th>
                    <th><FontAwesomeIcon icon={faInfoCircle} /> Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, index) => (
                      <tr key={index}>
                        <td><Skeleton width={50} /></td>
                        <td><Skeleton width="80%" /></td>
                        <td><Skeleton width={100} /></td>
                        <td><Skeleton width="60%" /></td>
                        <td><Skeleton width={80} /></td>
                        <td><Skeleton width="60%" /></td>
                      </tr>
                    ))
                  ) : currentTickets.length > 0 ? (
                    currentTickets.map(ticket => (
                      <tr key={ticket.ticket_id}>
                        <td>
                          <Link to={`/dashboardlayout/user_conversation?user_id=${ticket.ticket_id}`}>
                            {ticket.ticket_id}
                          </Link>
                        </td>
                        <td>{ticket.ticket_title}</td>
                        <td>
                          {new Date(ticket.updated).toLocaleDateString("en-GB")}<br />
                          {new Date(ticket.updated).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>{ticket.agent_remarks || "No Remark"}</td>
                        <td>{ticket.follow_up_date || "No Follow-Up"}</td>
                        <td>
                          <span className={`statuses-badge ${getBadgeClass(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="6">No Tickets available.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <FaArrowLeft /> Previous
            </button>
            <span>Page {currentPage + 1} of {totalPages || 1}</span>
            <button
              className="pagination-button"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
