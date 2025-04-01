import axios from "axios";


const BASE_URL = "https://dev-atai-api.raghavsolars.com/public/api";

const fetchData = async (method, url, data = {}) => {
  try {
    const response = await axios({ method, url: `${BASE_URL}${url}`, data , headers: { "Content-Type": "application/json" },});
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



export const createTicket = (ticketData) =>
  fetchData("POST", "/tickets/create_ticket", ticketData);


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
  
    return fetchData("POST", `/tickets/ticket_resolution_status`, {
      ticket_id: encodeURIComponent(ticketId), 
      resolution_status: newStatus,
    });
  };
   

export const saveTicketRemark = async (ticketId, agent_remarks,followUpDate) => {
  if (!ticketId) {
    console.error("Error: ticketId is missing!");
    return Promise.reject("ticket ID is required");
  }
  return fetchData("POST", `/tickets/save_remark_and_followup`, {
    ticket_id: encodeURIComponent(ticketId),
    remark:agent_remarks,
    follow_up_date:followUpDate,
  });
};

export const getTicketRemark = async (ticketId) => {
  if (!ticketId) {
    console.error("Error: ticketId is missing!");
    return Promise.reject("ticket ID is required");
  }


  return fetchData("GET",`/tickets/get_remarks/${ticketId}`
  );
};



export const getFollowUpTickets = async () => {
  const response = await fetchData("GET", "/tickets/follow_up_tickets");

  console.log("API Response for Follow-Up Tickets:", response);

  // Check if response contains the expected array
  return Array.isArray(response.tickets) ? response.tickets : [];
};

// export const getTicketStatusOptions = async () => {
//   try {
//     const response = await fetch("/status/get_descriptions", { method: "GET" });
//     const data = await response.json();

//     console.log("Fetched Status Options:", data);

//     // Extract only the status descriptions
//     return data.statuses.map((status) => status.description) || [];
//   } catch (error) {
//     console.error("Error fetching ticket status options:", error);
//     return [];
//   }
// };

export async function getTicketStatusOptions() {
  const url = `${BASE_URL}/status/get_descriptions`;
  const headers = { Accept: "application/json" };

  try {
    const response = await fetch(url, { method: "GET", headers });
    console.log(`GetStatusDescriptions - Status Code: ${response.status}`);

    // Read the response body as text, log it for debugging, then parse it.
    const responseBody = await response.text();
    console.log(`GetStatusDescriptions - Response Body: ${responseBody}`);

    if (response.ok) {
      const data = JSON.parse(responseBody);
      // Extract and return only the descriptions
      return data.statuses.map((s) => s.description);
    } else {
      throw new Error(
        `Failed to fetch status descriptions: ${response.status} - ${responseBody}`
      );
    }
  } catch (error) {
    console.error("Error in getStatusDescriptions:", error);
    throw error;
  }
}

