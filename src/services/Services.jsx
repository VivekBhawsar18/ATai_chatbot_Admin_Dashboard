import axios from "axios";

// Define the base URL for your API
const BASE_URL = "https://chatbot-api-b1jc.onrender.com";

// Utility function to handle HTTP requests
const fetchData = async (method, url, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error(error.response?.data?.message || "An error occurred.");
  }
};

// Function to get ticket details by ticket ID
export const getTicketDetails = async (ticketId) => {
  return fetchData("GET", `/tickets/get_ticket_details`, { ticket_id: ticketId });
};

// Function to get user conversation data by user ID
export const getUserConversation = async (userId) => {
  return fetchData("GET", `/tickets/get_user_conversation`, { user_id: userId });
};

// Function to update resolution status of a callback request
export const updateResolutionStatus = async (ticketId, status) => {
  const data = { ticket_id: ticketId, resolution_status: status };
  return fetchData("POST", `/tickets/update_resolution_status`, data);
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

// Function to get the total ticket count
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
  return fetchData("GET", `/tickets/all_callback_requests`);
};

// Function to update callback request status
export const updateCallbackRequestStatus = async (ticketId, status) => {
  const data = { ticket_id: ticketId, status };
  return fetchData("POST", `/tickets/callback_request_resolution_status`, data);
};
