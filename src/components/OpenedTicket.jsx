import React, { useEffect, useState } from "react";
import { getAllTicketsInfo } from "../services/Services"; // Assuming this function fetches all tickets

const OpenedTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch ticket data when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const fetchedTickets = await getAllTicketsInfo();
        // Filter tickets to only show opened ones
        const openedTickets = fetchedTickets.filter(
          (ticket) => ticket.status === "Opened"
        );
        setTickets(openedTickets);
      } catch (err) {
        setError("Error fetching tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">{error}</div>;

  return (
    <div className="container mt-5">
      {/* Heading */}
      <div className="text-center mb-4">
        <h4 style={{color: 'blue'}}>Opened Tickets</h4>
              {/* Table displaying opened tickets */}
      <div>
        <table className="table table-bordered table-striped table-responsive">
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
                  <td>{ticket.ticket_id}</td>
                  <td>{ticket.ticket_title}</td>
                  <td>{new Date(ticket.updated).toLocaleString()}</td>
                  <td>{ticket.action}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No opened tickets available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>


    </div>
  );
};

export default OpenedTicket;


