import React, { useEffect, useState } from "react";
import { getAllTicketsInfo } from "../services/Services"; // Assuming this function fetches all tickets

const RatedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ticket data when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTicketsInfo();
        // Filter tickets to only show rated ones (assuming rated tickets have a rating or feedback)
        const ratedTickets = fetchedTickets.filter((ticket) => ticket.rating > 0); // Example condition
        setTickets(ratedTickets);
      } catch (err) {
        setError("Error fetching tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
      <h4 style={{color: 'blue'}}>Rated Tickets</h4>
      <table className="table table-bordered table-striped">
        <thead className="bg-light">
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Updated</th>
            <th>Action</th>
            <th>Status</th>
            <th>Rating</th> {/* Added column for rating */}
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.ticket_id}>
                <td>{ticket.ticket_id}</td>
                <td>{ticket.ticket_title}</td>
                <td>{new Date(ticket.updated).toLocaleString()}</td>
                <td>{ticket.action}</td>
                <td>{ticket.status}</td>
                <td>{ticket.rating || "Not rated"}</td> {/* Display rating */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No rated tickets available.</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};

export default RatedTicket;


