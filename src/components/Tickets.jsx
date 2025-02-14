import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBriefcase, FaEnvelope, FaCheckCircle, FaStar } from "react-icons/fa";
import {
  getAllTicketsInfo,
  getTicketCount,
  getStarredTicketCount,
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

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticketId = queryParams.get("ticket_id");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedTickets, setUpdatedTickets] = useState([]);

  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startPos = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startPos.current = e.clientY;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current && scrollContainerRef.current) {
      const deltaY = startPos.current - e.clientY;
      scrollContainerRef.current.scrollTop += deltaY;
      startPos.current = e.clientY;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const updateTicketRemarkAndStatus = (ticketId, remark, status) => {
    setUpdatedTickets((prevState) => {
      const updated = prevState.map((ticket) => {
        if (ticket.ticket_id === ticketId) {
          return {
            ...ticket,
            remark,
            status,
          };
        }
        return ticket;
      });
      return updated;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        console.log("Fetching ticket data...");

        // Fetch tickets data
        const ticketsArray = await getAllTicketsInfo();
        console.log("Fetched Tickets Array:", ticketsArray);
        setTickets(ticketsArray);

        // Calculate total and categorized ticket counts
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

        // Fetch the general ticket count
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

    fetchData();
  }, []);

  const sortedTickets = tickets.sort((a, b) => {
    if (a.status === "Opened" && b.status !== "Opened") {
      return -1;
    }
    if (a.status !== "Opened" && b.status === "Opened") {
      return 1;
    }
    return new Date(b.updated) - new Date(a.updated);
  });

  console.log("Sorted Tickets:", sortedTickets);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
     
      <h4 className="text-center mt-4" style={{ color: "blue" }}>
        Tickets Summary
      </h4>
      <div className="container mt-5">
        <div className="row g-4 mb-4">
        {links.map((link) => {
            const Icon = link.icon;
            const ticketCount =
              link.name === "Total"
                ? ticketData.ticket_count
                : link.name === "Rated"
                ? ticketData.Rated // Display Rated count here
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
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Updated </th>
                      <th>Remark</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTickets.length > 0 ? (
                      sortedTickets.map((ticket) => (
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
                            {new Date(ticket.updated).toLocaleDateString(
                              "en-GB"
                            )}
                            <br />
                            {new Date(ticket.updated).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </td>
                          <td>{ticket.remark || "No remark"}</td>
                          <td>
                            <span
                              className={`badge bg-${
                                ticket.status === "Opened"
                                  ? "success"
                                  : "danger"
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
      </div>
    </div>
  );
}
