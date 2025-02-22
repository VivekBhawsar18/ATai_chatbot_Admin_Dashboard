import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCallbackRequests } from "../services/Services"; // Import only the necessary API
import { FaUser, FaPhone, FaEnvelope, FaQuestionCircle, FaCheckCircle, FaClock } from "react-icons/fa";
import "./Callbackrequest.css";

export default function Callbackrequest() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Pending");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredTickets = tickets.filter((ticket) => ticket.status === statusFilter);

  return (
    <div className="full-page-container">
      <div className="content">
        {message && <div className="alert alert-success">{message}</div>}

        <div className="bg-white p-4 rounded shadow mb-4 my-5">
          <h4 className="mb-4 text-primary">Callback Requests</h4>

          {/* Buttons for filtering */}
          <div className="mb-3">
            <button
              className={`btn ${statusFilter === "Pending" ? "btn-primary" : "btn-secondary"} mr-2`}
              onClick={() => setStatusFilter("Pending")}
            >
              <FaClock /> Pending
            </button>
            <button
              className={`btn ${statusFilter === "Callback done" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setStatusFilter("Callback done")}
            >
              <FaCheckCircle /> Callback Done
            </button>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-striped w-100">
              <thead className="bg-light">
                <tr>
                <th><i className="fas fa-hashtag"></i> ID</th>
                  <th><FaUser /> User Name</th>
                  <th><FaPhone /> Contact</th>
                  <th><FaEnvelope /> Email</th>
                  <th><FaQuestionCircle /> User Query</th>
                  <th>
                        <i className="fas fa-info-circle"></i> Status
                      </th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.ticket_id}>
                      <td>
                        <Link to={`/user_conversation?user_id=${encodeURIComponent(ticket.ticket_id)}`}>
                          {ticket.ticket_id}
                        </Link>
                      </td>
                      <td>{ticket.user_name}</td>
                      <td>{ticket.contact}</td>
                      <td>{ticket.email}</td>
                      <td>{ticket.userquery || "No query"}</td>
                      <td>
                        <span
                          className={`badge bg-${ticket.status === "Callback done" ? "success" : "warning"}`}
                        >
                          {ticket.status === "Callback done" ? <FaCheckCircle /> : <FaClock />} {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No callback requests available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
