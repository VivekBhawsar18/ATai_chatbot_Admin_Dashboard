// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { getUserConversation } from "./Services"; // Assuming this service exists

// const UserConversation = () => {
//   const [conversation, setConversation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const userId = queryParams.get("user_id");

//   // Example ticket data (to be fetched from API)
//   const ticketData = {
//     ticketId: "123456",
//     title: "Issue with Login",
//     updated: "2025-01-30",
//     action: "Respond",
//     status: "Open"
//   };

//   useEffect(() => {
//     const fetchConversation = async () => {
//       if (!userId) {
//         setError("User ID is required");
//         setLoading(false);
//         return;  // If there's no user_id, we stop the request
//       }

//       try {
//         const response = await getUserConversation(userId);
//         setConversation(response.user_conversation);
//       } catch (err) {
//         setError("Error fetching conversation: " + err.message);  // Include the error message
//         console.error("Error fetching conversation:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConversation();
//   }, [userId]);  // Trigger effect when userId changes

//   if (loading) return <div>Loading conversation...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="container mt-5">
//       {/* Ticket ID */}
//       <h2>Ticket ID: {ticketData.ticketId}</h2>

//       {/* Ticket Information Table */}
//       <table className="table table-bordered table-striped mt-3">
//         <thead>
//           <tr>
//             <th>Ticket ID</th>
//             <th>Title</th>
//             <th>Updated</th>
//             <th>Action</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{ticketData.ticketId}</td>
//             <td>{ticketData.title}</td>
//             <td>{ticketData.updated}</td>
//             <td>{ticketData.action}</td>
//             <td>{ticketData.status}</td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Chatbot Section */}
//       <div className="chatbot-section mt-5" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
//         <h3>Chatbot</h3>
//         <p>Chatbot will appear here</p>
//         {/* You can integrate your chatbot component here */}
//       </div>
//     </div>
//   );
// };

// export default UserConversation;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Function to get the user's conversation from the API
const getUserConversation = async (userId) => {
  try {
    const response = await fetch(getUserConversation);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch conversation: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw error;
  }
};

const UserConversation = () => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id"); // Extract the user_id query parameter

  useEffect(() => {
    if (!userId) {
      setError("User ID is required");
      setLoading(false);
      return;
    }

    const fetchConversation = async () => {
      try {
        setLoading(true);
        const data = await getUserConversation(userId);
        setConversation(data);
      } catch (err) {
        setError("Failed to load conversation");
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [userId]); // Dependency on userId, so it refetches when it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User Conversation</h2>
      <pre>{JSON.stringify(conversation, null, 2)}</pre>
    </div>
  );
};

export default UserConversation;


