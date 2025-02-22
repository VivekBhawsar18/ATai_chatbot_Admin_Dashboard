import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAllTicketsInfo } from "../services/Services"; // Assuming this function fetches all tickets

const ClosedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ticket data when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTicketsInfo();
        // Filter tickets to only show closed ones
        const closedTickets = fetchedTickets.filter(
          (ticket) => ticket.status === "Closed"
        );
        setTickets(closedTickets);
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
      {/* Heading */}
      <div className="text-center mb-4">
        <h4 style={{ color: "blue" }}>Closed Tickets</h4>
         {/* Scrollable Table */}
      <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ddd" }}>
        <table className="table table-bordered table-striped">
          <thead
            className="bg-light"
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#f8f9fa",
              zIndex: 2,
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
              // Skeleton Loader - Display 5 Placeholder Rows
              [...Array(5)].map((_, index) => (
                <tr key={index}>
                  <td><Skeleton width={80} /></td>
                  <td><Skeleton width={150} /></td>
                  <td><Skeleton width={120} /></td>
                  <td><Skeleton width={80} /></td>
                </tr>
              ))
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
                <td colSpan="4" className="text-center">
                  No closed tickets available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

     
    </div>
  );
};

export default ClosedTicket;
