import axios from "axios";

// Define the base URL for your API
const BASE_URL = "https://chatbot-api-b1jc.onrender.com";

// Function to get ticket details by ticket ID
// export const getTicketDetails = async (ticketId) => {
//   try {
//     const response = await axios.get(`${BASE_URL}tickets/get_ticket_details`, {
//       params: { ticket_id: ticketId },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to fetch ticket details.");
//   }
// };

// Function to get user conversation data by ticket ID
export const getUserConversation = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}tickets/get_user_conversation`, {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user conversation.");
  }
};

// Function to update resolution status of a callback request
export const updateResolutionStatus = async (ticketId, status) => {
  try {
    const response = await axios.post(`${BASE_URL}tickets/update_resolution_status`, {
      ticket_id: ticketId,
      resolution_status: status,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "An error occurred while updating resolution status.");
  }
};

// Function to get all tickets information
export const getAllTicketsInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}tickets/getAllTicketsInfo`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch all tickets information.");
  }
};

// Function to get the ticket count
export const getTicketCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}tickets/ticket_count`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch ticket count.");
  }
};

// Fetch all callback requests
export const getCallbackRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}tickets/all_callback_requests`); // Use GET here as defined in the backend
    return response.data || [];
  } catch (error) {
    throw new Error("Failed to load callback requests.");
  }
};

// Function to update callback request status
export const updateCallbackRequestStatus = async (ticket_id, status) => {
  try {
    const response = await axios.post(`${BASE_URL}tickets/callback_request_resolution_status`, {
      ticket_id: ticket_id,
      status: status,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update the callback request status.");
  }
};
