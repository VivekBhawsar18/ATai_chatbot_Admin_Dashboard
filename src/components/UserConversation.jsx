import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  markAsImportant,
  unMarkAsImportant,
  getStarredTicketCount,
  getTicketUserInfo,
  getConversationDuration,
  getUserConversation,
  getTicketRemark,
  saveTicketRemark,
} from "../services/Services";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaArrowLeft,
  FaComment,
  FaClipboardList,
  FaCheckCircle,
  FaExclamationTriangle,
  // FaToggleOn,
  // FaToggleOff,
  FaCheckSquare,
  FaRegSquare,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClock ,
} from "react-icons/fa";

const UserConversation = ({ updateStarredCount }) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [rated, setRated] = useState(false);
  const [starredCount, setStarredCount] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [remarksList, setRemarksList] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        const data = await getUserConversation(userId);
        setConversation(data.user_conversation);
        if (data.is_important !== undefined) {
          setRated(data.is_important);
        }
      } catch (err) {
        setError("Error fetching conversation.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const data = await getTicketUserInfo(userId);

        if (data && typeof data === "object") {
          setUserDetails(data);
          console.log("Fetched user details:", data);
        } else {
          setError("No user details found.");
          setUserDetails(null);
        }
      } catch (err) {
        setError("Error fetching user details.");
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchStarredCount = async () => {
      try {
        const updatedCount = await getStarredTicketCount();
        setStarredCount(updatedCount.starred_ticket_count);
      } catch (err) {
        console.error("Error fetching starred ticket count:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchConversationDuration = async () => {
      try {
        const response = await getConversationDuration(userId);
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          conversation_duration: response.conversation_duration,
        }));
      } catch (err) {
        console.error("Error fetching conversation duration:", err);
      }
    };
    const fetchRemarks = async () => {
      try {
        const response = await getTicketRemark(userId);
        setRemarksList(response.remarks || []);
      } catch (err) {
        console.error("Error fetching remarks:", err);
      }
    };

    if (userId) {
      fetchUserDetails();
      fetchConversation();

      fetchStarredCount();
      fetchConversationDuration();
      fetchRemarks();
    }
  }, [userId, updateStarredCount]);
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

      await saveTicketRemark(userId, remark);
      const updatedRemarks = await getTicketRemark(userId);
      setRemarksList(updatedRemarks.remarks || []);
      setRemark("");

      const updatedCount = await getStarredTicketCount();
      updateStarredCount(updatedCount.starred_ticket_count);

      localStorage.setItem(`remark_${userId}`, remark);

      setTimeout(() => {
        navigate("/Tickets");
      }, 500);
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  // try {
  //   if (rated) {
  //     await markAsImportant(userId);
  //   } else {
  //     await unMarkAsImportant(userId);
  //   }
  // await saveRemark(userId, remark);
  // const updatedRemarks = await getRemarks(userId);
  // setRemarksList(updatedRemarks.remarks || []);
  // setRemark("");

  // Save the new remark
  // await saveTicketRemark(userId, remark);

  // Fetch updated remarks list
  // const updatedRemarks = await getTicketRemark(userId);
  // setRemarksList(updatedRemarks.remarks || []);

  // Reset remark input after saving
  // setRemark("");
  // Fetch updated starred count
  // const updatedCount = await getStarredTicketCount();
  // updateStarredCount(updatedCount.starred_ticket_count);

  // ✅ Notify `Tickets.jsx` that a remark was added
  //     localStorage.setItem(`remark_${userId}`, remark);

  //     navigate("/Tickets", { replace: true });
  //   } catch (error) {
  //     console.error("Error submitting:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Handle remark change
  // const handleRemarkChange = (e) => {
  //   setRemark(e.target.value);
  // };

  // // Handle status change
  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value);
  // };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // Render the conversation as a simple chat between user and chatbot
  return (
    <div className="container mt-5 justify-content-center text align-content-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-3"
        style={{ position: "absolute", right: "100px", top: "90px" }}
      >
        Back
      </button>

      {/* Ticket ID at the top */}
      <div>
        <h4 className="text-center mb-4" style={{ color: "blue" }}>
          <FaClipboardList className="me-2" /> Details of Ticket ID: {userId}
        </h4>
        {/* User Details Table */}

        <div className="table-responsive">
          <table className="table table-bordered text-center">
            <thead className="thead-dark">
              <tr>
                {/* <th><FaIdBadge /> ID</th> */}
                <th>
                  <FaUser className="me-1" /> Customer Name
                </th>
                <th>
                  <FaEnvelope className="me-1" /> Email
                </th>
                <th>
                  <FaPhone className="me-1" /> Contact
                </th>
                <th>
                  <FaClock className="me-1" /> Conversation Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5">Loading...</td>
                </tr>
              ) : userDetails ? (
                <tr>
                  {console.log("Rendering user details:", userDetails)}
                  {/* <td>{userDetails.user_id}</td> */}
                  <td>{userDetails.user_name}</td>
                  <td>{userDetails.email}</td>
                  <td>{userDetails.contact}</td>
                  <td>{userDetails.conversation_duration}</td>
                </tr>
              ) : (
                <tr>
                  {console.log("No user details available.")}
                  <td colSpan="5">No data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Main content container */}
        <div>
          <h4 className="text-left mb-6" style={{ color: "blue" }}>
            <FaClipboardList className="me-2" /> User Conversation
          </h4>
        </div>
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
                height: "400px",
                overflowY: "auto",
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
                    backgroundColor: isChatbotMessage ? "#f1f1f1" : "#e0f7fa",
                    textAlign: isChatbotMessage ? "left" : "right",
                  };

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
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group">
                <label>
                  <FaComment /> Remark
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter your remark"
                />
              </div>
              <div className="form-group mt-3">
                <label>
                  <FaClipboardList /> Status
                </label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Opened">Opened</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label>
                  <FaExclamationTriangle /> Mark as Important:
                </label>
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    marginLeft: "10px",
                  }}
                  onClick={handleCheckboxChange}
                >
                  {rated ? (
                    <FaCheckSquare className="text-success" />
                  ) : (
                    <FaRegSquare className="text-secondary" />
                  )}
                </span>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversation;
