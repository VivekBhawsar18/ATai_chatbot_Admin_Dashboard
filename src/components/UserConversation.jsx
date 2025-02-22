import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserConversation } from "../services/Services";

import {
  markAsImportant,
  unMarkAsImportant,
  getStarredTicketCount,
} from "../services/Services"; // Importing the service functions
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {  FaCheckSquare, FaRegSquare} from "react-icons/fa";
import {
  FaArrowLeft,
  FaComment,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";

const UserConversation = ({ updateStarredCount }) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState(""); // State for remark text box
  const [status, setStatus] = useState(""); // State for status field
  const [rated, setRated] = useState(false);// State for rated toggle button
  const [starredCount, setStarredCount] = useState(0);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id"); // Get the user_id from the URL

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        const data = await getUserConversation(userId); // Fetch conversation data from the API
        setConversation(data.user_conversation); // Set the conversation in the state
        if (data.is_important !== undefined) {
          setRated(data.is_important); // Set the correct initial state
        }
      } catch (err) {
        setError("Error fetching conversation.");
      } finally {
        setLoading(false);
      }
    };
    const fetchStarredCount = async () => {
      try {
        const count = await getStarredTicketCount();
        setStarredCount(count);
      } catch (err) {
        console.error("Error fetching starred ticket count:", err);
      }
    };

    if (userId) {
      fetchConversation();
      fetchStarredCount();
    }
  }, [userId]);

  // Handle remark change
  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };

  // Handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // Handle rated toggle change
  const handleCheckboxChange = () => {
    setRated((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (rated) {
        await markAsImportant(userId);
      } else {
        await unMarkAsImportant(userId);
      }

      // Fetch updated starred count
      const updatedCount = await getStarredTicketCount();
      updateStarredCount(updatedCount.starred_ticket_count);

      navigate("/Tickets?updatedCount==true");
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // Render the conversation as a simple chat between user and chatbot
  return (
    <div className="container mt-5 justify-content-center text align-content-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Navigate back to previous page
        className="btn btn-secondary mb-3"
        style={{ position: "absolute", right: "100px", top: "90px" }}
      >
        Back
      </button>

      {/* Ticket ID at the top */}
      <div>
        <h4 className="text-center mb-4" style={{ color: "blue" }}>
          <FaClipboardList className="me-2" /> User Conversation and Remark
          status of Ticket ID: {userId}
        </h4>

        {/* Main content container */}
        <div
          className="chat-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          {/* Left side: Chatbot */}
          <div
            className="chatbot-container"
            style={{
              flex: 1,
              padding: "20px",
              borderRight: "1px solid #ddd",
            }}
          >
            <div
              className="chat-box-container"
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "5px",
                height: "400px", // Fixed height for the chat window
                overflowY: "auto", // Enable vertical scrolling
                backgroundColor: "#f9f9f9",
              }}
            >
              {loading ? (
                <Skeleton
                  count={6}
                  height={40}
                  style={{ marginBottom: "10px" }}
                />
              ) : conversation ? (
                conversation.split("\n").map((message, index) => {
                  const isChatbotMessage = message.startsWith("Chatbot:");
                  const messageStyle = {
                    marginBottom: "10px",
                    padding: "8px",
                    borderRadius: "5px",
                    backgroundColor: isChatbotMessage ? "#f1f1f1" : "#e0f7fa", // Light color for user messages and chatbot messages
                    textAlign: isChatbotMessage ? "left" : "right", // Align chatbot on left, user on right
                  };

                  // Clean up the message and remove square brackets or prefixes like "Chatbot: "
                  const cleanedMessage = message
                    .replace(/^\[?Chatbot:?\s?/i, "")
                    .replace(/[\]'"]/g, "")
                    .trim();
                  return (
                    <div key={index} style={messageStyle}>
                      <FaComment className="me-1" /> {cleanedMessage}
                    </div>
                  );
                })
              ) : (
                <div className="text-center">
                  <FaExclamationTriangle className="text-warning me-2" /> No
                  conversation data available.
                </div>
              )}
            </div>
          </div>
          {/* Right side: Form */}
          <div className="form-container" style={{ flex: 1, padding: "20px" }}>
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="form-group">
                <label htmlFor="remark">
                  <b>
                    <FaComment className="me-1" /> Remark
                  </b>
                </label>
                {loading ? (
                  <Skeleton height={80} />
                ) : (
                  <textarea
                    id="remark"
                    className="form-control"
                    rows="4"
                    value={remark}
                    onChange={handleRemarkChange}
                    placeholder="Enter your remark"
                  />
                )}
              </div>

              <div className="form-group mt-3">
                <label htmlFor="status">
                  <b>
                    <FaClipboardList className="me-1" /> Status
                  </b>
                </label>
                {loading ? (
                  <Skeleton height={40} />
                ) : (
                  <select
                    id="status"
                    className="form-control"
                    value={status}
                    onChange={handleStatusChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Opened">Opened</option>
                    <option value="Closed">Closed</option>
                  </select>
                )}
              </div>

              <div className="form-group mt-3 d-flex align-items-center">
                <label htmlFor="rated" className="me-2">
                  <b>
                    <FaExclamationTriangle className="me-1" /> Mark as
                    Important:
                  </b>
                </label>

                <div
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  onClick={handleCheckboxChange}
                >
                  {rated ? (
                    <FaCheckSquare className="text-success" />
                  ) : (
                    <FaRegSquare className="text-secondary" />
                  )}
                </div>
              </div>
              {loading ? (
                <Skeleton
                  height={40}
                  width={150}
                  style={{ marginTop: "10px" }}
                />
              ) : (
                <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmit}>
                Submit
              </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversation;
