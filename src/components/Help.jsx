import React from "react";

export default function HelpSection() {
  return (
    <div className="container-fluid mt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <h2 style={{color: 'blue'}}>Admin Dashboard Help</h2>
      <p>Welcome to the Help Section. Here you will find all the necessary details on how to operate the Admin Dashboard.</p>

      <div className="d-flex flex-column my-4">
        {/* Overview of Admin Dashboard */}
        <div className="my-3">
        <h3 style={{color: 'blue'}}>1. Overview of Admin Dashboard</h3>
          <p>
            Welcome to the Admin Dashboard! This dashboard allows you to manage, monitor,
            and update various user-related requests and tickets.
            Below is a guide on how to navigate and utilize the different sections:
          </p>
        </div>

        {/* Ticket Management */}
        <div className="my-3">
        <h3 style={{color: 'blue'}}>2. Ticket Management</h3>
          <p>
            The Tickets section is where all ticket-related data is stored and managed. You can view, track, and manage tickets based on their current status.
          </p>

          <p><strong>a. What Can You Do in the Tickets Section?</strong></p>
          <ul>
            <li>View Ticket Categories: You can see the total count of tickets and tickets grouped by their statuses, such as:</li>
            <ul>
              <li>Opened Tickets: Tickets that are still awaiting resolution.</li>
              <li>Answered Tickets: Tickets that have been responded to but may not be resolved.</li>
              <li>Unanswered Tickets: Tickets that have not received any response.</li>
              <li>Closed Tickets: Tickets that have been resolved and are closed.</li>
              <li>Rated Tickets: Tickets that have received feedback or ratings.</li>
            </ul>
          </ul>

          <p><strong>b. Interacting with Tickets</strong></p>
          <ul>
            <li>View Ticket Details: Clicking on a specific ticket's ID (e.g., #Deep1) will take you to the User Conversation section where you can view detailed conversations with users.</li>
            <li>Filter Tickets: Use the navigation to quickly access tickets based on their status.</li>
            <li>Update Ticket Status: For each ticket, you can update its status (e.g., "Mark as Resolved" or "Mark as Unresolved") depending on the progress of the ticket.</li>
          </ul>
        </div>

        {/* User Conversations */}
        <div className="my-3">
        <h3 style={{color: 'blue'}}>3. User Conversations</h3>
          <p>
            The User Conversations section shows the communication history between the admin and the users for a specific ticket.
          </p>

          <p><strong>a. What Can You Do in the User Conversations Section?</strong></p>
          <ul>
            <li>View User Conversations: You can see the conversation history between the admin and the user for each ticket. This will display the messages exchanged, identifying whether the message was sent by the user or the admin.</li>
          </ul>

          <p><strong>b. Ticket Details and Messages</strong></p>
          <ul>
            <li>Ticket ID at the Top: The Ticket ID is displayed at the top, making it easy to identify which ticket the conversation is linked to.</li>
            <li>Messages Displayed in Chat Format: The conversation is displayed in a chat format, with each message appearing from either the user or the admin, helping you track interactions in a conversational format.</li>
            <li>View Ticket Information: Alongside the conversation, detailed information related to the ticket, such as the user’s name, email, and contact number, will be displayed.</li>
          </ul>
        </div>

        {/* Callback Requests */}
        <div className="my-3">
        <h3 style={{color: 'blue'}}>4. Callback Requests</h3>
          <p>
            In the Callback Requests section, you can manage requests where users have asked for callbacks.
          </p>

          <p><strong>a. What Can You Do in the Callback Requests Section?</strong></p>
          <ul>
            <li>View Callback Requests: This section shows all the tickets where users have requested a callback.</li>
            <li>See Request Status: Each request will show if it’s Pending or Resolved. You can click on any request to view detailed information.</li>
            <li>Update Status: You can change the status of the callback request (e.g., mark it as Resolved if you've handled the request).</li>
          </ul>

          <p><strong>b. Actions for Callback Requests</strong></p>
          <ul>
            <li>Mark Callback Request as Resolved: If you’ve addressed the request, mark it as resolved.</li>
            <li>Mark Callback Request as Pending: If the request is not yet addressed, mark it as pending.</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="my-3">
        <h3 style={{color: 'blue'}}>5. Contact Support</h3>
          <p>
            If you need further assistance or encounter issues not covered in this guide, please feel free to contact the support team.
          </p>
          <p><strong>Support:</strong> +91 83 90 42 6222</p>
          <p><strong>Email Us:</strong> <a href="mailto:info@atjoin.in">info@atjoin.in</a></p>
        </div>
      </div>
    </div>
  );
}
