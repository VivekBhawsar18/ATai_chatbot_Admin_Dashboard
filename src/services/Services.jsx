import axios from "axios";

// Define the base URL for the API
const BASE_URL = "https://chatbot-api-b1jc.onrender.com";

// Utility function for API requests
const fetchData = async (method, url, data = {}) => {
  try {
    const response = await axios({ method, url: `${BASE_URL}${url}`, data });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    
    // Handle error gracefully, check if error.response exists and fallback to a default message
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong!";
    
    // Throw a new error with the custom or fallback message
    throw new Error(errorMessage);
  }
};


// Fetch ticket details by ID
export const getTicketDetails = (ticketId) =>
  fetchData("GET", `/tickets/get_ticket_details`, { ticket_id: ticketId });

// Fetch user conversation by user ID
// export const getUserConversation = (userId) =>
//   fetchData("GET",  `/tickets/get_user_conversation?user_id=${userId}`, { user_id: userId });

export const getUserConversation = (userId) => {
  if (!userId) {
    console.error("Error: userId is missing!");
    return Promise.reject("User ID is required");
  }
  return fetchData("GET", `/tickets/get_user_conversation?user_id=${encodeURIComponent(userId)}`);
};


// Update resolution status of a ticket
export const updateResolutionStatus = (ticketId, status) =>
  fetchData("POST", `/tickets/update_resolution_status`, {
    ticket_id: ticketId,
    resolution_status: status,
  });

// Get all tickets info
export const getAllTicketsInfo = () =>
  fetchData("GET", "/tickets/get_all_tickets_info");

// Get the total ticket count
export const getTicketCount = () =>
  fetchData("GET", "/tickets/total_ticket_count");

// Fetch all callback requests
export const getCallbackRequests = () =>
  fetchData("GET", "/tickets/all_callback_requests");

// Update the status of a callback request
export const updateCallbackRequestStatus = (ticketId, status) =>
  fetchData("POST", "/tickets/callback_request_resolution_status", {
    ticket_id: ticketId,
    status,
  });
  export const updateUserqueryStatus = (ticketId, status) =>
    fetchData("POST","/tickets/userquery_resolution_status", {
      ticket_id: ticketId,
      status,
    });
    // Fetch starred ticket count
    export const getStarredTicketCount = () =>
      fetchData("GET", "/tickets/starred_ticket_count");

export const markAsImportant = (userId) =>
  fetchData("POST", `/star_ticket?user_id=${encodeURIComponent(userId)}`);

export const unMarkAsImportant = (userId) =>
  fetchData("POST", `/un_star_ticket?user_id=${encodeURIComponent(userId)}`);
  
// Fetch unresolved ticket count
export const getUnresolvedTicketCount = () =>
  fetchData("GET", "/tickets/unresolved_ticket_count");


// Fetch resolved ticket count
export const getResolvedTicketCount = () =>
  fetchData("GET", "/tickets/resolved_ticket_count");

export const createTicket = async (ticketData) => {
  try {
    const response = await fetch(`${BASE_URL}/tickets/create_ticket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });

    if (!response.ok) throw new Error("Failed to create ticket");
    return response.json(); // Return the response data
  } catch (error) {
    console.error("Error creating ticket:", error);
    throw error;
  }
};