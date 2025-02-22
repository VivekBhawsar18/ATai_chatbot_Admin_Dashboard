import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBriefcase,
  FaEnvelope,
  FaCheckCircle,
  FaStar,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Import Recharts components
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
  const updateRated = queryParams.get("updateRated");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedTickets, setUpdatedTickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [starredCount, setStarredCount] = useState(0);

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

  // const updateTicketRemarkAndStatus = (ticketId, remark, status) => {
  //   setUpdatedTickets((prevState) => {
  //     const updated = prevState.map((ticket) => {
  //       if (ticket.ticket_id === ticketId) {
  //         return {
  //           ...ticket,
  //           remark,
  //           status,
  //         };
  //       }
  //       return ticket;
  //     });
  //     return updated;
  //   });
  // };


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

  // const sortedTickets = tickets.sort((a, b) => {
  //   if (a.status === "Opened" && b.status !== "Opened") {
  //     return -1;
  //   }
  //   if (a.status !== "Opened" && b.status === "Opened") {
  //     return 1;
  //   }
  //   return new Date(b.updated) - new Date(a.updated);
  // });
  // Filtering logic (ensures correct filtering)
  const filteredTickets = tickets
    .filter(
      (ticket) => filterStatus === "All" || ticket.status === filterStatus
    )
    .sort(
      (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
    );

  // console.log("Sorted Tickets:", sortedTickets);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  // Bar Chart Data
  const barChartData = [
    { name: "Total", Total: ticketData.ticket_count },
    { name: "Opened", Opened: ticketData.Opened },
    { name: "Closed", Closed: ticketData.Closed },
    { name: "Rated", Rated: ticketData.Rated },
  ];

  return (
    <div>
      <h4 className="text-center mt-4 text-primary">Tickets Summary</h4>
      <div className="container mt-5">
        <div>
          <div className="row g-4 d-flex align-items-stretch">
            {/* Ticket Summary */}
            <div className="col-12 col-md-6">
              <div className="row g-4">
                {links.map((link) => {
                  const Icon = link.icon;
                  const ticketCount =
                    link.name === "Total"
                      ? ticketData.ticket_count
                      : ticketData[link.name] || 0;

                    //   <p className="text-center">
                    //   ⭐ <b>Starred Ticket Count:</b> {starredCount}
                    // </p>
              
                    // {/* Pass update function as prop */}
                    // <Link to={`/user_conversation?updateStarredCount=true`}>
                    //   Go to User Conversation
                    // </Link>

                  return (
                    <div key={link.name} className="col-6 text-center">
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
              </div>
            </div>

            {/* Bar Chart */}
            <div className="col-12 col-md-6">
              <div className="bg-white p-4 rounded shadow">
                <h5 className="text-center">Tickets Overview</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    barCategoryGap="0%" // Ensures bars are closely aligned
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" minTickGap={0} />
                    <YAxis domain={[0, "dataMax"]} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="Total"
                      fill="#007bff"
                      barSize={50}
                      name="Total Tickets"
                    />
                    <Bar
                      dataKey="Opened"
                      fill="#28a745"
                      barSize={50}
                      name="Opened Tickets"
                    />
                    <Bar
                      dataKey="Closed"
                      fill="#dc3545"
                      barSize={50}
                      name="Closed Tickets"
                    />
                    <Bar
                      dataKey="Rated"
                      fill="#54B4D3"
                      barSize={50}
                      name="Rated Tickets"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow mb-4">
              {/* Filter Buttons */}
              <div className="text-center my-3">
                {["All", "Opened", "Closed"].map((status) => (
                  <button
                    key={status}
                    className={`btn mx-2 ${
                      filterStatus === status
                        ? `btn-${
                            status === "All"
                              ? "primary"
                              : status === "Opened"
                              ? "success"
                              : "danger"
                          }`
                        : `btn-outline-${
                            status === "All"
                              ? "primary"
                              : status === "Opened"
                              ? "success"
                              : "danger"
                          }`
                    }`}
                    onClick={() => setFilterStatus(status)}
                  >
                    {status === "All" && <FaBriefcase className="me-1" />}
                    {status === "Opened" && <FaEnvelope className="me-1" />}
                    {status === "Closed" && <FaCheckCircle className="me-1" />}
                    {status}
                  </button>
                ))}
              </div>

              <div
                ref={scrollContainerRef}
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  borderRadius: "16px",
                  position: "relative", // Ensures sticky positioning works inside
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
              >
                <div className="table-responsive">
                  <table
                    className="table table-bordered table-striped"
                    style={{ width: "100%" }}
                  >
                    <thead
                      className="bg-light"
                      style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1000, // Ensures it stays above other content
                        // background: "#f8f9fa", // Ensure it doesn’t become transparent
                        background: "white", // Prevents transparency issue
                        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", // Optional shadow for visibility
                      }}
                    >
                      <tr>
                        <th>
                          <i className="fas fa-hashtag"></i> ID
                        </th>
                        <th>
                          <i className="fas fa-file-alt"></i> Title
                        </th>
                        <th>
                          <i className="fas fa-clock"></i> Updated
                        </th>
                        <th>
                          <i className="fas fa-comment"></i> Remark
                        </th>
                        <th>
                          <i className="fas fa-info-circle"></i> Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        // Skeleton Loader: 5 Placeholder Rows
                        [...Array(5)].map((_, index) => (
                          <tr key={index} className="placeholder-glow">
                            <td>
                              <span className="placeholder col-6"></span>
                            </td>
                            <td>
                              <span className="placeholder col-8"></span>
                            </td>
                            <td>
                              <span className="placeholder col-6"></span>
                            </td>
                            <td>
                              <span className="placeholder col-8"></span>
                            </td>
                            <td>
                              <span className="placeholder col-3"></span>
                            </td>
                          </tr>
                        ))
                      ) : filteredTickets.length > 0 ? (
                        filteredTickets.map((ticket) => (
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
                                style={{ cursor: "pointer" }}
                              >
                                {ticket.status === "Opened" ? (
                                  <FaEnvelope className="me-1" />
                                ) : (
                                  <FaCheckCircle className="me-1" />
                                )}{" "}
                                {ticket.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            <FaExclamationTriangle className="text-warning me-2" />{" "}
                            No Tickets available.
                          </td>
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
    </div>
  );
}
