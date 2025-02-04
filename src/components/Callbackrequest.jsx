import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import { getCallbackRequests, updateTicketTitle } from "./Services"; // Import the services

export default function CallbackRequestsTable() {
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

  // Function to handle title updates
  // const handleTitleUpdate = async (ticket_id, newTitle) => {
  //   try {
  //     const response = await updateTicketTitle(ticket_id, newTitle);
  //     setMessage(response.message); // Show success message after title update
  //     // Optionally, update the ticket list with new title
  //     setTickets((prevTickets) =>
  //       prevTickets.map((ticket) =>
  //         ticket.ticket_id === ticket_id
  //           ? { ...ticket, ticket_title: newTitle }  // Update the title in the UI
  //           : ticket
  //       )
  //     );
  //   } catch (error) {
  //     setMessage("Failed to update the ticket title.");
  //   }
  // };

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
        <h4 className="mb-4">Callback Requests</h4>
        <table className="table table-bordered table-striped">
          <thead className="bg-light">
            <tr>
              <th>Ticket ID</th>
              <th>User Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>User Query</th>
              {/* <th>Status</th>
              <th>Created At</th>
              <th>Action</th> */}
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
                  <td>{ticket.userquery || "No query"}</td>  {/* If userquery is null, show "No query" */}
                  {/* <td>
                    <span
                      className={`badge bg-${ticket.callback_request_resolution_status ? "success" : "warning"}`}
                    >
                      {ticket.callback_request_resolution_status ? "Resolved" : "Pending"}
                    </span>
                  </td>
                  <td>{new Date(ticket.created_at).toLocaleString()}</td> {/* Adjust this based on the actual field for created_at */}
                  {/* <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleTitleUpdate(ticket.ticket_id, "New Title")}
                    >
                      Update Title
                    </button>
                  </td>  */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No callback requests available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
