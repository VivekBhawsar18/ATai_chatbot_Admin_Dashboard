import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserConversation.css";
import {
  markAsImportant,
  unMarkAsImportant,
  getStarredTicketCount,
  getTicketUserInfo,
  getConversationDuration,
  getUserConversation,
  getTicketRemark,
  saveTicketRemark,
  updateResolutionStatus,
  getFollowUpTickets,
  getTicketStatusOptions,
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
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const UserConversation = ({ updateStarredCount }) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agent_remarks, set_agent_Remarks] = useState("");
  const [status, setStatus] = useState("All");
  const [rated, setRated] = useState(false);
  const [starredCount, setStarredCount] = useState(0);
  const [userDetails, setUserDetails] = useState(null);
  const [remarksList, setRemarksList] = useState([]);
  const [followUpDate, setFollowUpDate] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);
  const [follow_up_date, set_follow_up_date] = useState([]);
  const [Followup, setFollowup] = useState([]);
  const [newStatus, setnewStatus] = useState(null);
  const [tickets, setTickets] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        const data = await getUserConversation(userId);

        console.log("Fetched conversation data:", data);
        setConversation(data.user_conversation);
        // if (data.is_important !== undefined) {
        //   setRated(data.is_important);
        // }
        setRated(data.is_important ?? false);
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
        console.log("Fetching remarks for userId:", userId);
        const response = await getTicketRemark(userId);
        console.log("Remarks fetched:", response);
        setRemarksList(response.agent_remarks || []);
        setFollowup(response.follow_up_date || []);
      } catch (err) {
        console.error("Error fetching remarks:", err);
      }
    };

    const fetchStatusOptions = async () => {
      try {
        console.log("Fetching status options...");
        const option = await getTicketStatusOptions();
        console.log("Fetched Status Options:", option);
        setStatusOptions(option);
      } catch (error) {
        console.error("Error fetching status options:", error);
      }
    };

    if (userId) {
      console.log("Fetching data for userId:", userId);
      fetchUserDetails();
      fetchConversation();
      fetchStarredCount();
      fetchConversationDuration();
      fetchRemarks();
      // fetchFollowUpDate();
      fetchStatusOptions();
    }
  }, [userId, updateStarredCount]);

  // Handle remark change
  const handleRemarkChange = (e) => {
    console.log("Remark changed:", e.target.value);
    set_agent_Remarks(e.target.value);
    set_follow_up_date(e.target.value);
  };

  

  /** Handle Status Change */
  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;
    setnewStatus(selectedStatus); // Update local state immediately
  
    try {
      console.log(`Updating resolution status for userId: ${userId} to ${selectedStatus}`);
  
      // Call API to update resolution status
      const response = await updateResolutionStatus(userId, selectedStatus);
  
      // If the API call is successful, update the UI state
      if (response.success || response.updated) {
        console.log("Resolution status updated successfully!");
  
        // Update tickets list if it's not null
        setTickets((prevTickets) =>
          prevTickets
            ? prevTickets.map((ticket) =>
                ticket.ticket_id === userId
                  ? { ...ticket, resolution_status: selectedStatus }
                  : ticket
              )
            : null
        );
  
        // Update the user details object to reflect the status change
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          resolution_status: selectedStatus,
        }));
      } else {
        console.error("API update did not return a success status");
      }
    } catch (error) {
      console.error("Error updating resolution status:", error);
    }
  };
  
  

  // Handle rated toggle change
  // const handleCheckboxChange = async () => {
  //   try {
  //     let updatedRated = !rated;

  //     if (updatedRated) {
  //       console.log("Marking as important...");
  //       await markAsImportant(userId);
  //     } else {
  //       console.log("Unmarking as important...");
  //       await unMarkAsImportant(userId);
  //     }

  //     setRated(updatedRated); // ✅ Update state after API call success
  //     console.log("Rated toggle changed:", updatedRated);
  //   } catch (error) {
  //     console.error("Error toggling important status:", error);
  //   }
  // };

  const handleFollowUpChange = (e) => {
    setFollowUpDate(e.target.value);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Saving remark...");
      await saveTicketRemark(userId, agent_remarks, followUpDate);

      console.log("Updating resolution status...");
      await updateResolutionStatus(userId, newStatus);

      console.log("Fetching updated starred ticket count...");
      const updatedCount = await getStarredTicketCount();
      setStarredCount(updatedCount.starred_ticket_count);

      console.log("Navigating to Tickets.jsx...");
      navigate("/dashboardlayout/Tickets", { replace: true });
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // Render the conversation as a simple chat between user and chatbot
  return (
    <div className="user-conversation-container">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary back-button"
      >
        Back
      </button>

      {/* Ticket ID at the top */}
      <h4 className="ticket-id-title">
        <FaClipboardList className="me-2" /> Details of Ticket ID: {userId}
      </h4>

      {/* User Details Table */}
      <div className="table-responsive">
        <table className="user-table">
          <thead>
            <tr>
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
                <td>{userDetails.user_name}</td>
                <td>{userDetails.email}</td>
                <td>{userDetails.contact}</td>
                <td>{userDetails.conversation_duration}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="5">No data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Chat & Form Section */}
      <div className="chat-container">
        {/* Chatbot Section */}
        <div className="chatbot-container">
          <div className="chat-box-container">
            {loading ? (
              <Skeleton count={6} height={40} />
            ) : conversation ? (
              conversation.split("\n").map((message, index) => {
                const isChatbotMessage = message.startsWith("Chatbot:");
                const messageClass = isChatbotMessage
                  ? "chatbot-message"
                  : "user-message";

                const cleanedMessage = message
                  .replace(/^\[?Chatbot:?\s?/i, "")
                  .replace(/[\[\]'""]/g, "")
                  .trim();

                return (
                  <div key={index} className={`chat-message ${messageClass}`}>
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

        {/* Form Section */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* Remark Input */}
            <div className="form-group">
              <label>
                <FaComment /> Remark
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={agent_remarks}
                onChange={handleRemarkChange}
                placeholder="Enter your remark"
              />
            </div>

           
            <div className="form-group">
            <label>
              <FaClipboardList /> Status
            </label>
            <select
              className="form-control"
              value={newStatus}
              onChange={handleStatusChange}
            >
              <option value="">Select Status</option>
              {statusOptions.map((options, index) => (
                <option key={index} value={options}>
                  {options}
                </option>
              ))}
            </select>
          </div>


            <div className="form-group">
              <label>
                <FaCalendarAlt /> Follow-Up Date
              </label>
              <input
                type="date"
                className="form-control"
                value={followUpDate}
                onChange={handleFollowUpChange}
              />
            </div>

            {/* Mark as Important Checkbox */}
            {/* <div className="form-group">
              <label>
                <FaExclamationTriangle /> Mark as Important:
              </label>
              <span className="important-toggle" onClick={handleCheckboxChange}>
                {rated ? (
                  <FaCheckSquare className="text-success" />
                ) : (
                  <FaRegSquare className="text-secondary" />
                )}
              </span>
            </div> */}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserConversation;
