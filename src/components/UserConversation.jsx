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
} from "react-icons/fa";

const UserConversation = ({ updateStarredCount }) => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agent_remarks, set_agent_Remarks] = useState("");
  const [status, setStatus] = useState("Pending");
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
        console.log("Fetching remarks for userId:", userId);
        const response = await getTicketRemark(userId);
        console.log("Remarks fetched:", response);
        setRemarksList(response.agent_remarks || []);
      } catch (err) {
        console.error("Error fetching remarks:", err);
      }
    };

    if (userId) {
      console.log("Fetching data for userId:", userId);
      fetchUserDetails();
      fetchConversation();
      fetchStarredCount();
      fetchConversationDuration();
      fetchRemarks();
    }
  }, [userId, updateStarredCount]);

  
  // Handle remark change
  const handleRemarkChange = (e) => {
    console.log("Remark changed:", e.target.value);
    set_agent_Remarks(e.target.value);
  };

  // Handle status change
  // const handleStatusChange = (e) => {
  //   console.log("Status changed:", e.target.value);
  //   setStatus(e.target.value);
  // };

  /** Handle Status Change */
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      console.log(`Updating resolution status for userId: ${userId} to ${newStatus}`);
      const response = await updateResolutionStatus(userId, newStatus);
      console.log("Resolution status updated successfully:", response);
    } catch (error) {
      console.error("Error updating resolution status:", error);
    }
  };

  // Handle rated toggle change
  const handleCheckboxChange = () => {
    setRated((prev) => !prev);
    console.log("Rated toggle changed:", !rated);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Calling API with userId:", userId);

    console.log("Form submitted with values:");
    console.log("userId:", userId);
    console.log("agent_remarks:", agent_remarks);
    console.log("status:",status);
    console.log("rated:", rated);
  
    try {
      if (rated) {
        console.log("Marking as important...");
        await markAsImportant(userId);
      } else {
        console.log("Unmarking as important...");
        await unMarkAsImportant(userId);
      }
  
      console.log("Saving remark...");
      await saveTicketRemark(userId, agent_remarks);

      console.log("Fetching updated remarks...");
      const updatedRemarks = await getTicketRemark(userId);
      console.log("Updated Remarks:", updatedRemarks);
  
      setRemarksList(updatedRemarks.agent_remarks || []);
  
      console.log("Resetting agent_remarks...");
      set_agent_Remarks("");
  
      // console.log("Fetching updated starred ticket count...");
      const updatedCount = await getStarredTicketCount();
     
      
      setStarredCount(updatedCount.starred_ticket_count);
      console.log("Updated Starred Ticket Count:", updatedCount.starred_ticket_count);
  
      console.log("Saving remark to localStorage...");
      localStorage.setItem(`remark_${userId}`, agent_remarks);
  
      console.log("Navigating to Tickets.jsx...");
      navigate("/Tickets", { replace: true });
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      console.log("Form submission completed. Stopping loading spinner.");
      setLoading(false);
    }
  };
  

  
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // Render the conversation as a simple chat between user and chatbot
  return (
    <div className="user-conversation-container">
  {/* Back Button */}
  <button onClick={() => navigate(-1)} className="btn btn-secondary back-button">
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
          <th><FaUser className="me-1" /> Customer Name</th>
          <th><FaEnvelope className="me-1" /> Email</th>
          <th><FaPhone className="me-1" /> Contact</th>
          <th><FaClock className="me-1" /> Conversation Duration</th>
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
            const messageClass = isChatbotMessage ? "chatbot-message" : "user-message";
            
            const cleanedMessage = message.replace(/^\[?Chatbot:?\s?/i, "").replace(/[\[\]'""]/g, "").trim();

            return (
              <div key={index} className={`chat-message ${messageClass}`}>
                <FaComment className="me-1" /> {cleanedMessage}
              </div>
            );
          })
        ) : (
          <div className="text-center">
            <FaExclamationTriangle className="text-warning me-2" /> No conversation data available.
          </div>
        )}
      </div>
    </div>

    {/* Form Section */}
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Remark Input */}
        <div className="form-group">
          <label><FaComment /> Remark</label>
          <textarea
            className="form-control"
            rows="3"
            value={agent_remarks}
            onChange={handleRemarkChange}
            placeholder="Enter your remark"
          />
        </div>

        {/* Status Select */}
        <div className="form-group">
          <label><FaClipboardList /> Status</label>
          <select className="form-control" value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="Opened">Opened</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Mark as Important Checkbox */}
        <div className="form-group">
          <label><FaExclamationTriangle /> Mark as Important:</label>
          <span className="important-toggle" onClick={handleCheckboxChange}>
            {rated ? <FaCheckSquare className="text-success" /> : <FaRegSquare className="text-secondary" />}
          </span>
        </div>

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
