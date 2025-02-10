import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FaBriefcase,
  FaEnvelope,
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaRegThumbsUp,
  FaStar,
} from "react-icons/fa";
import {
  getAllTicketsInfo,
  getTicketCount,
  getStarredTicketCount,
  getUnresolvedTicketCount,
  getResolvedTicketCount,
} from "../services/Services"; // Import the functions

export default function Tickets() {
  const links = [
    {
      name: "TotalTicket",
      url: "/TotalTicket",
      icon: FaBriefcase,
      bgColor: "bg-primary",
    },
    {
      name: "OpenedTicket",
      url: "/OpenedTicket",
      icon: FaEnvelope,
      bgColor: "bg-success",
    },
    {
      name: "UnAnsweredTicket",
      url: "/UnAnsweredTicket",
      icon: FaArrowAltCircleLeft,
      bgColor: "bg-warning",
    },
    {
      name: "AnsweredTicket",
      url: "/AnsweredTicket",
      icon: FaRegThumbsUp,
      bgColor: "bg-success",
    },
    {
      name: "ClosedTicket",
      url: "/ClosedTicket",
      icon: FaCheckCircle,
      bgColor: "bg-danger",
    },
    {
      name: "RatedTicket",
      url: "/RatedTicket",
      icon: FaStar,
      bgColor: "bg-info",
    },
  ];

  const [ticketData, setTicketData] = useState({
    ticket_count: 0,
    OpenedTicket: 0,
    AnsweredTicket: 0,
    UnAnsweredTicket: 0,
    ClosedTicket: 0,
    RatedTicket: 0,
    UnresolvedTicket: 0,
    ResolvedTicket: 0,
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketId = queryParams.get("ticket_id");

  const [tickets, setTickets] = useState([]); // Store an array of tickets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);

  // Define event handlers correctly inside the component
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startPos.current = e.clientY; // Track the initial position of the mouse
  };

  const handleMouseMove = (e) => {
    if (isDragging.current && scrollContainerRef.current) {
      const deltaY = startPos.current - e.clientY; // Calculate mouse movement
      scrollContainerRef.current.scrollTop += deltaY;
      startPos.current = e.clientY; // Update the starting position
    }
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false; // End the drag event
  };

  // Use useEffect to fetch tickets and ticket count data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch all ticket data using services
        const ticketsArray = await getAllTicketsInfo();
        console.log("Fetched Tickets Array:", ticketsArray); // Debug log to check data
        setTickets(ticketsArray);

        // Calculate ticket counts dynamically
        const totalTicketCount = ticketsArray.length;
        const openedTicketCount = ticketsArray.filter(
          (ticket) => ticket.status === "Opened"
        ).length;
        const answeredTicketCount = ticketsArray.filter(
          (ticket) => ticket.action === "Answered"
        ).length;
        const unansweredTicketCount = ticketsArray.filter(
          (ticket) => ticket.action === "UnAnswered"
        ).length;
        const closedTicketCount = ticketsArray.filter(
          (ticket) => ticket.status === "Closed"
        ).length;

        setTicketData({
          ticket_count: totalTicketCount,
          OpenedTicket: openedTicketCount,
          AnsweredTicket: answeredTicketCount,
          UnAnsweredTicket: unansweredTicketCount,
          ClosedTicket: closedTicketCount,
          RatedTicket: 0,
          UnresolvedTicket: 0,
          ResolvedTicket:0,
        });
         // Fetch resolved ticket count
         const resolvedTicketResponse = await getResolvedTicketCount();
         console.log("Resolved Ticket Response:", resolvedTicketResponse);
         setTicketData((prevState) => ({
           ...prevState,
           ResolvedTicket: resolvedTicketResponse.resolved_ticket_count || 0,
           AnsweredTicket: resolvedTicketResponse.resolved_ticket_count || 0,  // Update answeredTicket based on Unresolved count
         }))
         // Fetch unresolved ticket count
         const unresolvedTicketResponse = await getUnresolvedTicketCount();
         console.log("Unresolved Ticket Response:", unresolvedTicketResponse);
         setTicketData((prevState) => ({
           ...prevState,
           UnresolvedTicket: unresolvedTicketResponse.unresolved_ticket_count || 0,
           UnAnsweredTicket: unresolvedTicketResponse.unresolved_ticket_count || 0,  // Update UnansweredTicket based on Unresolved count
         }))
       // Fetch the rated ticket count
       const ratedTicketResponse = await getStarredTicketCount();
       console.log("Rated Ticket Response:", ratedTicketResponse); // Check what the API returns
       setTicketData((prevState) => ({
         ...prevState,
         RatedTicket: ratedTicketResponse.starred_ticket_count || 0, // Update with correct field name
       }));
        // Fetch ticket count using services
        const ticketCountResponse = await getTicketCount();
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

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("Ticket Data:", ticketData); // Check ticket data in the console
  console.log("Tickets Array:", tickets); // Check if tickets array is populated

  return (
    <div className="container mt-5">
      {/* Tickets Summary Section */}
      <div className="row g-4 mb-4">
        {links.map((link) => {
          const Icon = link.icon;
          const ticketCount =
            link.name === "TotalTicket"
              ? ticketData.ticket_count
              : ticketData[link.name] || 0;
            
              

          return (
            <div key={link.name} className="col-12 col-md-3 text-center">
              <Link to={link.url} className="text-decoration-none">
                <div
                  className={`dashboard-card ${link.bgColor} text-white p-4 rounded shadow`}
                >
                  <Icon size="2rem" />
                  <h5>{link.name}</h5>
                  <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
                    {ticketCount}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
        {/* Recent Tickets Section */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h4 className="mb-4">Recent Tickets</h4>
          <div
            ref={scrollContainerRef}
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              cursor: isDragging.current ? "grabbing" : "grab",
              transition: "all 0.3s ease-in-out",
              borderRadius: "8px",
              padding: "10px",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            <table className="table table-bordered table-striped">
              <thead className="bg-light">
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Updated</th>
                  <th>Action</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <tr key={ticket.ticket_id}>
                      <td>
                        <Link
                          to={`/user_conversation?user_id=${encodeURIComponent(
                            ticket.ticket_id
                          )}`}
                        >
                          {ticket.ticket_id}
                        </Link>
                      </td>
                      <td>{ticket.ticket_title}</td>
                      <td>
                        {new Date(ticket.updated).toLocaleDateString()}
                        <br />
                        {new Date(ticket.updated).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>
                        <button
                          className={`btn btn-${
                            ticket.action === "Closed"
                              ? "success"
                              : ticket.action === "Answered"
                              ? "primary"
                              : ticket.action === "UnAnswered"
                              ? "warning"
                              : "danger"
                          } btn-sm`}
                        >
                          {ticket.action}
                        </button>
                      </td>
                      <td>
                        <span
                          className={`badge bg-${
                            ticket.status === "Opened" ? "success" : "danger"
                          }`}
                        >
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
      </div>
    </div>
  );
}
