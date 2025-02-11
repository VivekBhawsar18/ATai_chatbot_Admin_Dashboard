import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserConversation } from "../services/Services";

const UserConversation = () => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState(""); // State for remark text box
  const [status, setStatus] = useState(""); // State for status field
  const [callbackDone, setCallbackDone] = useState(false); // State for Callback Done toggle
  const [userQuerySolved, setUserQuerySolved] = useState(false); // State for User Query Solved toggle

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

  // Handle callback done toggle change
  const handleCallbackDoneChange = () => {
    setCallbackDone((prev) => !prev);
  };

  // Handle user query solved toggle change
  const handleUserQuerySolvedChange = () => {
    setUserQuerySolved((prev) => !prev);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission (e.g., sending data to a server)
    alert(
      `Remark: ${remark}\nStatus: ${status}\nCallback Done: ${callbackDone}\nUser Query Solved: ${userQuerySolved}`
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Render the conversation as a simple chat between user and chatbot
  return (
    <>
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
          {/* //   className="ticket-info"
        //   style={{ marginBottom: 0, justifyContent: 'center' }}
        // > */}
          <h4 className="text-center mb-4" style={{ color: "blue" }}>
            User Conversation and Remark status of Ticket ID: {userId}
          </h4>
          {/* <h4>User Conversation and Remark status of Ticket ID: {userId}</h4> */}

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
                      .replace(/[\[\]]/g, "")
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
                {/* Callback Done Toggle
                <div className="form-group mt-3">
                  <label htmlFor="callbackDone">
                    <b>Callback Done</b>
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      id="callbackDone"
                      checked={callbackDone}
                      onChange={handleCallbackDoneChange}
                    />
                    <span className="ml-2">{callbackDone ? "Yes" : "No"}</span>
                  </div>
                </div>

                {/* User Query Solved Toggle */}
                {/* <div className="form-group mt-3">
                  <label htmlFor="userQuerySolved">
                    <b>User Query Solved</b>
                  </label>
                  <div>
                    <input
                      type="checkbox"
                      id="userQuerySolved"
                      checked={userQuerySolved}
                      onChange={handleUserQuerySolvedChange}
                    />
                    <span className="ml-2">
                      {userQuerySolved ? "Yes" : "No"}
                    </span>
                  </div>
                </div> */} 

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
                   <option value="pending">Pending</option>
                    <option value="open">Open</option>
                    
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserConversation;
