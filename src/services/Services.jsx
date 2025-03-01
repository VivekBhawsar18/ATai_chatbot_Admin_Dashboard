import axios from "axios";


const BASE_URL = "https://chatbot-api-b1jc.onrender.com";

const fetchData = async (method, url, data = {}) => {
  try {
    const response = await axios({ method, url: `${BASE_URL}${url}`, data });
    return response.data;
  } catch (error) {
    console.error("Error:", error);

    
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong!";

    throw new Error(errorMessage);
  }
};

export const getUserConversation = (userId) => {
  if (!userId) {
    console.error("Error: userId is missing!");
    return Promise.reject("User ID is required");
  }
  return fetchData(
    "GET",
    `/tickets/get_user_conversation?user_id=${encodeURIComponent(userId)}`
  );
};




export const getAllTicketsInfo = () =>
  fetchData("GET", "/tickets/get_all_tickets_info");


export const getTicketCount = () =>
  fetchData("GET", "/tickets/total_ticket_count");


export const getCallbackRequests = () =>
  fetchData("GET", "/tickets/all_callback_requests");


export const updateCallbackRequestStatus = (ticketId, status) =>
  fetchData("POST", "/tickets/callback_request_resolution_status", {
    ticket_id: ticketId,
    status,
  });
export const updateUserqueryStatus = (ticketId, status) =>
  fetchData("POST", "/tickets/userquery_resolution_status", {
    ticket_id: ticketId,
    status,
  });

export const getStarredTicketCount = () =>
  fetchData("GET", "/tickets/starred_ticket_count");

export const markAsImportant = (ticketId) => {
  if (!ticketId) {
    return Promise.reject("ticket ID is required");
  }

//   return fetchData(
//     "POST",
//     `/tickets/star_ticket?ticket_id=${encodeURIComponent(ticketId)}`
//   );
// };
return fetchData("POST", "/tickets/star_ticket", {
  ticket_id: ticketId, // Send ticket_id in the body
});
};

export const unMarkAsImportant = (ticketId) => {
  if (!ticketId) {
    return Promise.reject("ticketId is required");
  }
//   return fetchData(
//     "POST",
//     `/tickets/un_star_ticket?ticket_id=${encodeURIComponent(ticketId)}`
//   );
// };
return fetchData("POST", "/tickets/un_star_ticket", {
  ticket_id: ticketId, 
});
};

export const getUnresolvedTicketCount = () =>
  fetchData("GET", "/tickets/unresolved_ticket_count");

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

export const getConversationDuration = (userId) =>
  fetchData(
    "GET",
    `/tickets/conversation_duration?user_id=${encodeURIComponent(userId)}`
  );

export const getTicketUserInfo = async (ticketId) => {
  if (!ticketId) {
    console.error("Error: ticketId is missing!");
    return Promise.reject("ticket ID is required");
  }
  return fetchData(
    "GET",
    `/tickets/get_ticket_userInfo?ticket_id=${encodeURIComponent(ticketId)}`
  );
};


export const updateResolutionStatus = async (ticketId,newStatus) => {
  if (!ticketId) {
    console.error("Error: ticketId is missing!");
    return Promise.reject("ticket ID is required");
  }
  
    return fetchData("POST", `/tickets/update_resolution_status`, {
      ticket_id: ticketId, 
      resolution_status: newStatus,
    });
  };
   

export const saveTicketRemark = async (ticketId, agent_remarks) => {
  if (!ticketId) {
    console.error("Error: ticketId is missing!");
    return Promise.reject("ticket ID is required");
  }
  return fetchData("POST", `/tickets/save_remark`, {
    ticket_id: encodeURIComponent(ticketId),
    remark: agent_remarks,
  });
};

export const getTicketRemark = async (ticketId) => {
  if (!ticketId) {
    console.error("Error: ticketId is missing!");
    return Promise.reject("ticket ID is required");
  }

  // const response = await fetchData(
  //   "GET",
  //   `/tickets/get_remarks?ticket_id=${encodeURIComponent(ticketId)}`
  // );
  // return response.agent_remarks ?? "No remark available"; // Return a fallback message
  return fetchData("GET",`/tickets/get_remarks/${ticketId}`
  );
};
