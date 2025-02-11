import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCallbackRequests } from "../services/Services"; // Import only the necessary API

export default function Callbackrequest() {
  const [tickets, setTickets] = useState([]); // Store an array of tickets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // Store the success message after update
  const [statusFilter, setStatusFilter] = useState("Pending"); // State to filter by status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch all callback requests using the service
        const callbackRequests = await getCallbackRequests();
        setTickets(callbackRequests);
      } catch (err) {
        setError("Failed to load callback requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty array ensures this runs once when the component is mounted

  // If loading, show loading message
  if (loading) return <div>Loading...</div>;

  // If error, show error message
  if (error) return <div>Error: {error}</div>;

  // Filter tickets based on the statusFilter
  const filteredTickets = tickets.filter(
    (ticket) => ticket.status === statusFilter
  );

  return (
    <div className="container mt-5">
      {message && <div className="alert alert-success">{message}</div>}

      <div className="bg-white p-4 rounded shadow mb-4">
        <h4 className="mb-4" style={{ color: "blue" }}>
          Callback Requests
        </h4>

        {/* Buttons for filtering */}
        <div className="mb-3">
          <button
            className={`btn btn-${statusFilter === "Pending" ? "primary" : "secondary"} mr-2`}
            onClick={() => setStatusFilter("Pending")}
          >
            Pending
          </button>
          <button
            className={`btn btn-${statusFilter === "Callback done" ? "primary" : "secondary"}`}
            onClick={() => setStatusFilter("Callback done")}
          >
            Callback Done
          </button>
        </div>

        <table className="table table-bordered table-striped">
          <thead className="bg-light">
            <tr>
              <th>Ticket ID</th>
              <th>User Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>User Query</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
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
                  <td>{ticket.user_name}</td>
                  <td>{ticket.contact}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.userquery || "No query"}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        ticket.status === "Callback done"
                          ? "success"
                          : "warning"
                      }`}
                    >
                      {ticket.status} {/* Dynamically show the status */}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No callback requests available.</td> {/* Updated column span */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
