import React, { useEffect, useState } from "react";
import { getStarredTicketCount } from "../services/Services"; // Import the API function to fetch rated tickets

const RatedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rated ticket data when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getStarredTicketCount(); // API call to fetch starred/rated tickets
        
        // Assuming the response contains a list of rated tickets
        const ratedTickets = response.tickets || []; // Adjust according to the API response structure
        setTickets(ratedTickets); // Update state with fetched rated tickets
      } catch (err) {
        setError("Error fetching rated tickets");
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
        <h4 style={{ color: "blue" }}>Rated Tickets</h4>
        <table className="table table-bordered table-striped">
          <thead className="bg-light">
            <tr>
              <th>Ticket ID</th>
              <th>Title</th>
              <th>Updated</th>
              <th>Action</th>
              <th>Status</th>
              <th>Rating</th> {/* Column for rating */}
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
