import React, { useEffect, useState } from "react";
import { getAllTicketsInfo } from "../services/Services"; // Fetch tickets
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeletor styles

export default function TotalTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ticket data when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTicketsInfo();
        // Sort tickets by date (newest first)
        const sortedTickets = fetchedTickets.sort(
          (a, b) => new Date(b.updated) - new Date(a.updated)
        );
        setTickets(sortedTickets);
      } catch (err) {
        setError("Error fetching tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h4 style={{ color: "blue" }}>All Tickets</h4>

        {/* Scrollable Table Wrapper */}
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            border: "1px solid #ccc",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <table
            className="table table-bordered table-striped"
            style={{ width: "100%" }}
          >
            {/* Sticky Table Header */}
            <thead
              className="bg-light"
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                background: "white",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <tr>
                <th>Ticket ID</th>
                <th>Title</th>
                <th>Updated</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                // Display Skeletor Loader for 5 rows while loading
                [...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={50} />
                    </td>
                    <td>
                      <Skeleton width={200} />
                    </td>
                    <td>
                      <Skeleton width={150} />
                    </td>
                    <td>
                      <Skeleton width={80} />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan="4" className="text-danger text-center">
                    {error}
                  </td>
                </tr>
              ) : tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.ticket_id}>
                    <td>{ticket.ticket_id}</td>
                    <td>{ticket.ticket_title}</td>
                    <td>{new Date(ticket.updated).toLocaleString()}</td>
                    <td>{ticket.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No tickets available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
