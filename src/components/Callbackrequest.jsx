import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCallbackRequests, updateCallbackRequestStatus } from "../services/Services"; // Import the services

export default function Callbackrequest() {
  const [tickets, setTickets] = useState([]); // Store an array of tickets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);  // Store the success message after update

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
  }, []);

  // Function to handle status update (Resolved / Pending)
  const handleStatusUpdate = async (ticket_id, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle status (True -> False or False -> True)
      const response = await updateCallbackRequestStatus(ticket_id, newStatus);
      setMessage(response.message); // Display success message

      // Update the status in the table without re-fetching all tickets
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.ticket_id === ticket_id
            ? { ...ticket, callback_request_resolution_status: newStatus, status: newStatus ? "Resolved" : "Pending" }
            : ticket
        )
      );
    } catch (error) {
      setMessage("Failed to update the ticket status.");
    }
  };

  // If loading, show loading message
  if (loading) return <div>Loading...</div>;
  // If error, show error message
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      <div className="bg-white p-4 rounded shadow mb-4">
        <h4 className="mb-4" style={{color: 'blue'}}>Callback Requests</h4>
        <table className="table table-bordered table-striped">
          <thead className="bg-light">
            <tr>
              <th>Ticket ID</th>
              <th>User Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>User Query</th>
              <th>Status</th> {/* Status column */}
              {/* <th>Action</th> Action column for updating status */}
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td>
                    <Link to={`/user_conversation/${ticket.ticket_id}`} className="text-decoration-none text-primary">
                      {ticket.ticket_id}
                    </Link>
                  </td>
                  <td>{ticket.user_name}</td>
                  <td>{ticket.contact}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.userquery || "No query"}</td>
                  <td>
                    <span
                      className={`badge bg-${ticket.callback_request_resolution_status ? "success" : "warning"}`}
                    >
                      {ticket.status} {/* Dynamically show status */}
                    </span>
                  </td>
                  {/* <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleStatusUpdate(ticket.ticket_id, ticket.callback_request_resolution_status)}
                    >
                      {ticket.callback_request_resolution_status ? "Mark as Pending" : "Mark as Resolved"}
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No callback requests available.</td> {/* Updated column span */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
