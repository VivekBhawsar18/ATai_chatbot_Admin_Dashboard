import React, { useState, useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import ReactPaginate from "react-paginate";
import "./Tickets.css"
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaEnvelope,
  FaCheckCircle,
  FaStar,
 FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faFileAlt,
  faClock,
  faComment,
  faInfoCircle,
  faHashtag,} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  getAllTicketsInfo,
  getTicketCount,
  getStarredTicketCount,
  getTicketRemark,
  saveTicketRemark,
} from "../services/Services";

export default function Tickets() {
  const links = [
    {
      name: "Total",
      url: "/TotalTicket",
      icon: FaBriefcase,
      bgColor: "bg-primary",
    },
    {
      name: "Opened",
      url: "/OpenedTicket",
      icon: FaEnvelope,
      bgColor: "bg-success",
    },
    {
      name: "Closed",
      url: "/ClosedTicket",
      icon: FaCheckCircle,
      bgColor: "bg-danger",
    },
    {
      name: "Rated",
      url: "/RatedTicket",
      icon: FaStar,
      bgColor: "bg-info",
    },
  ];

  const [ticketData, setTicketData] = useState({
    ticket_count: 0,
    Opened: 0,
    Closed: 0,
    Rated: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketId = queryParams.get("ticket_id");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedTickets, setUpdatedTickets] = useState([]);

  const [starredCount, setStarredCount] = useState(0);
  const [ticketRemarks, setTicketRemarks] = useState([]);
  const [remarksList, setRemarksList] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Pending");

    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const ticketsPerPage = 5; // Only 5 tickets per page

  // const scrollContainerRef = useRef(null);
  // const isDragging = useRef(false);
  // const startPos = useRef(0);

  // const handleMouseDown = (e) => {
  //   isDragging.current = true;
  //   startPos.current = e.clientY;
  // };

  // const handleMouseMove = (e) => {
  //   if (isDragging.current && scrollContainerRef.current) {
  //     const deltaY = startPos.current - e.clientY;
  //     scrollContainerRef.current.scrollTop += deltaY;
  //     startPos.current = e.clientY;
  //   }
  // };

  // const handleMouseUpOrLeave = () => {
  //   isDragging.current = false;
  // };

  const fetchData = async () => {
    setLoading(true);

    try {
      console.log("Fetching ticket data...");

      const ticketsArray = await getAllTicketsInfo();
      console.log("Fetched Tickets Array:", ticketsArray);
      setTickets(ticketsArray);

      const totalTicketCount = ticketsArray.length;
      const openedTicketCount = ticketsArray.filter(
        (ticket) => ticket.status === "Opened"
      ).length;
      const closedTicketCount = ticketsArray.filter(
        (ticket) => ticket.status === "Closed"
      ).length;

      console.log("Total Ticket Count:", totalTicketCount);
      console.log("Opened Ticket Count:", openedTicketCount);
      console.log("Closed Ticket Count:", closedTicketCount);

      setTicketData({
        ticket_count: totalTicketCount,
        Opened: openedTicketCount,
        Closed: closedTicketCount,
        Rated: 0,
      });

      // Fetch the starred ticket count

      const ratedTicketResponse = await getStarredTicketCount();
      console.log("Rated Ticket Response:", ratedTicketResponse);
      setTicketData((prevState) => ({
        ...prevState,
        Rated: ratedTicketResponse.starred_ticket_count || 0,
      }));

      const ticketCountResponse = await getTicketCount();
      console.log("Ticket Count Response:", ticketCountResponse);
      setTicketData((prevState) => ({
        ...prevState,
        ticket_count: ticketCountResponse.ticket_count || 0,
      }));



    } catch (error) {
      console.error("Error fetching ticket data:", error);
      setError(error.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // const fetchRemarks = async () => {
  //   try {
  //     console.log("Fetching remarks for userId:", ticketId);
  //     const response = await getTicketRemark(ticketId);
  //     console.log("Remarks fetched:", response);
  //     setRemarksList(response.agent_remarks || []);
  //   } catch (err) {
  //     console.error("Error fetching remarks:", err);
  //   }
  // };
  
  


  useEffect(() => {
    fetchData();
  }, []);

  // const handleRemarkChange = (ticketId, agent_remarks) => {
  //   setTicketRemarks((prevRemarks) => ({
  //     ...prevRemarks,
  //     [ticketId]: agent_remarks,
  //   }));
  // };

  // const handleSaveRemark = async (ticketId) => {
  //   try {
  //     if (!ticketId) {
  //       console.error("Error: Ticket ID is missing!");
  //       return;
  //     }

  // // Fetch the latest remark for this ticket
  // console.log(`Fetching remark for ticketId: ${ticketId}`);
  // const existingRemark = await getTicketRemark(ticketId);
  // console.log("Existing Remark:", existingRemark);

  // // Get the new remark from input field
  // const agent_remarks = ticketRemarks[ticketId] || "";
  // console.log("New Remark to Save:", agent_remarks);

  // // Only save if new remark is different
  // if (agent_remarks.trim() === existingRemark.trim()) {
  //   alert("No changes detected in the remark.");
  //   return;
  // }

  // Save the new remark
  // await saveTicketRemark(ticketId, agent_remarks);
  // alert("Remark saved successfully!");

  // Fetch latest remark from API and update the UI
  // const updatedRemark = await getTicketRemark(ticketId);
  // setTicketRemarks((prev) => ({
  //   ...prev,
  //   [ticketId]: updatedRemark,
  // }));
  // } catch (error) {
  //   console.error("Error saving remark:", error);
  // }
  // };

  // Get the new remark from input field
  const handleSaveRemark = async (ticketId) => {
    try {
      const agent_remarks = ticketRemarks[ticketId] || "";
      console.log("New Remark to Save:", agent_remarks);

      await saveTicketRemark(ticketId, agent_remarks);
      console.log("Saving remark...");

      console.log("Fetching updated remarks...");
      const updatedRemarks = await getTicketRemark(ticketId);

      console.log("Updated Remarks:", updatedRemarks); // Fixed log
      setRemarksList(updatedRemarks.agent_remarks || []);
    } catch (error) {
      console.error("Error saving remark:", error);
    }
  };

    // Filter tickets based on status
    const filteredTickets = tickets.filter(
      (tickets) => filterStatus === "All" || tickets.status === filterStatus)
      .sort(
        (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
      );
    
  
    // Calculate total pages
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
    const startIndex = currentPage * ticketsPerPage;
    const currentTickets = filteredTickets.slice(startIndex, startIndex + ticketsPerPage);
  
    // Handle next & previous page navigation
    const handleNextPage = () => {
      if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };
  
    const handlePrevPage = () => {
      if (currentPage > 0) setCurrentPage(currentPage - 1);
    };
  

  // const filteredTickets = tickets
  //   .filter(
  //     (ticket) => filterStatus === "All" || ticket.status === filterStatus
  //   )
  //   .sort(
  //     (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
  //   );

  // Bar Chart Data
  const barChartData = [
    { name: "Total", Total: ticketData.ticket_count },
    { name: "Opened", Opened: ticketData.Opened },
    { name: "Closed", Closed: ticketData.Closed },
    { name: "Rated", Rated: ticketData.Rated },
  ];

  
    return (
      <div className="tickets-container">
        {/* Page Title */}
        <h4 className="ticket-summary-title">Tickets Summary</h4>
    
        <div className="container ticket-summary-section">
          <div className="row g-4 d-flex align-items-stretch">
    
            {/* Ticket Summary Cards */}
            <div className="col-12 col-md-6">
              <div className="row g-4">
                {loading ? (
                  [...Array(4)].map((_, index) => (
                    <div key={index} className="col-6 text-center">
                      <Skeleton height={120} width="100%" />
                    </div>
                  ))
                ) : (
                  links.map((link) => {
                    const Icon = link.icon;
                    const ticketCount =
                      link.name === "Total"
                        ? ticketData.ticket_count
                        : ticketData[link.name] || 0;
    
                    return (
                      <div key={link.name} className="col-6 text-center">
                        <Link to={link.url} className="text-decoration-none">
                          <div className={`dashboard-card ${link.bgColor}`}>
                            <Icon size="2rem" />
                            <h5>{link.name}</h5>
                            <p>{ticketCount}</p>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
    
            {/* Bar Chart */}
            <div className="col-12 col-md-6">
              <div className="bar-chart-container">
                <h5 className="text-center">Tickets Overview</h5>
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
                      <Bar dataKey="Total" fill="#007bff" name="Total Tickets" />
                      <Bar dataKey="Opened" fill="#28a745" name="Opened Tickets" />
                      <Bar dataKey="Closed" fill="#dc3545" name="Closed Tickets" />
                      <Bar dataKey="Rated" fill="#54B4D3" name="Rated Tickets" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            {/* Filter Buttons */}
          <div className="filter-button-container">
            {["All", "Pending", "Opened", "Closed"].map((status) => (
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
    
          {/* Tickets Table with Scroll */}
          <div className="bg-white p-3 rounded shadow mb-4">
            <div className="table-container">
              <table className="ticket-table">
                {/* Sticky Header */}
                <thead>
  <tr>
    <th><FontAwesomeIcon icon={faHashtag} /> ID</th>
    <th><FontAwesomeIcon icon={faFileAlt} /> Title</th>
    <th><FontAwesomeIcon icon={faClock} /> Updated</th>
    <th><FontAwesomeIcon icon={faComment} /> Remark</th>
    <th><FontAwesomeIcon icon={faInfoCircle} /> Status</th>
  </tr>
</thead>
    
                {/* Table Body */}
                <tbody>
                  {loading ? (
                    [...Array(5)].map((_, index) => (
                      <tr key={index}>
                        <td><Skeleton width={50} /></td>
                        <td><Skeleton width="80%" /></td>
                        <td><Skeleton width={100} /></td>
                        <td><Skeleton width="60%" /></td>
                        <td><Skeleton width={80} /></td>
                      </tr>
                    ))
                  ) : currentTickets.length > 0 ? (
                    currentTickets.map((ticket) => (
                      <tr key={ticket.ticket_id}>
                        <td>
                          <Link to={`/user_conversation?user_id=${ticket.ticket_id}`}>
                            {ticket.ticket_id}
                          </Link>
                        </td>
                        <td>{ticket.ticket_title}</td>
                        <td>
                          {new Date(ticket.updated).toLocaleDateString("en-GB")}
                          <br />
                          {new Date(ticket.updated).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </td>
                        <td>{ticket.updatedRemarks ?? "No Remark"}</td>
                        <td>
                          <span className={`status-badge ${
                            ticket.status === "Pending" ? "status-badge-warning" :
                            ticket.status === "Opened" ? "status-badge-success" :
                            "status-badge-danger"
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No Tickets available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
    
          {/* Pagination */}
          <div className="pagination-container">
            <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 0}>
              <FaArrowLeft /> Previous
            </button>
            <span>Page {currentPage + 1} of {totalPages || 1}</span>
            <button className="pagination-button" onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
              Next <FaArrowRight />
            </button>
          </div>
          </div>
    
          
        </div>
      </div>
    );
    
}
