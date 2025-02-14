import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserConversation } from "../services/Services";
import { markAsImportant, unMarkAsImportant } from "../services/Services"; // Importing the service functions

const UserConversation = ({ updateTicketRemarkAndStatus }) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState(""); // State for remark text box
  const [status, setStatus] = useState(""); // State for status field
  const [rated, setRated] = useState(false); // State for rated toggle button
  
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
      } catch (err) {
        setError("Error fetching conversation.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchConversation();
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
  const handleRatedChange = () => {
    setRated((prevState) => {
      const newState = !prevState;
      
      // If the state is now true, mark as important, else unmark
      if (newState) {
        markAsImportant(userId); // Mark as important
      } else {
        unMarkAsImportant(userId); // Unmark as important
      }
      
      return newState;
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent function to update the ticket
    updateTicketRemarkAndStatus(userId, remark, status);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
          User Conversation and Remark status of Ticket ID: {userId}
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
              {conversation ? (
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
                      {cleanedMessage} {/* Display the cleaned message */}
                    </div>
                  );
                })
              ) : (
                <div>No conversation data available.</div>
              )}
            </div>
          </div>

          {/* Right side: Form */}
          <div
            className="form-container"
            style={{ flex: 1, padding: "20px" }}
          >
            <form onSubmit={handleSubmit} className="mt-2">
              <div className="form-group">
                <label htmlFor="remark">
                  <b>Remark</b>
                </label>
                <textarea
                  id="remark"
                  className="form-control"
                  rows="4"
                  value={remark}
                  onChange={handleRemarkChange}
                  placeholder="Enter your remark"
                />
              </div>
          
              <div className="form-group mt-3">
                <label htmlFor="status">
                  <b>Status</b>
                </label>
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
              </div>

              <div className="form-group mt-3 d-flex align-items-center">
                <label htmlFor="rated" className="me-2">
                  <b>Mark as Imp:</b>
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={rated}
                    onChange={handleRatedChange}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Update Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversation;
