import React from "react";

export default function HelpSection() {
  return (
    <div className="container-fluid mt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <h2 style={{ color: 'blue' }}>Admin Dashboard Help</h2>
      <p>Welcome to the Help Section. Here you will find all the necessary details on how to operate the Admin Dashboard.</p>

      <div className="d-flex flex-column my-4">
        {/* Overview of Admin Dashboard */}
        <div className="my-3">
          <h3 style={{ color: 'blue' }}>1. Overview of Admin Dashboard</h3>
          <p>
            Welcome to the Admin Dashboard! This dashboard allows you to manage, monitor,
            and update various user-related requests and tickets.
            Below is a guide on how to navigate and utilize the different sections:
          </p>
        </div>

        {/* Ticket Management */}
        <div className="my-3">
          <h3 style={{ color: 'blue' }}>2. Ticket Management</h3>
          <p>
            The Tickets section is where all ticket-related data is stored and managed. You can view, track, and manage tickets based on their current status.
          </p>

          <p><strong>a. What Can You Do in the Tickets Section?</strong></p>
          <ul>
            <li>View Ticket Categories: You can see the total count of tickets and tickets grouped by their statuses, such as:</li>
            <ul>
              <li><strong>Opened Tickets:</strong> Tickets that are still awaiting resolution.</li>
              <li><strong>Answered Tickets:</strong> Tickets that have been responded to but may not be resolved.</li>
              <li><strong>Unanswered Tickets:</strong> Tickets that have not received any response.</li>
              <li><strong>Closed Tickets:</strong> Tickets that have been resolved and are closed.</li>
              <li><strong>Rated Tickets:</strong> Tickets that have received feedback or ratings.</li>
            </ul>
          </ul>

          <p><strong>b. Interacting with Tickets</strong></p>
          <ul>
            <li><strong>View Ticket Details:</strong> Clicking on a specific ticket's ID (e.g., #User1) will take you to the User Conversation section where you can view detailed conversations with users.</li>
            <li><strong>Filter Tickets:</strong> Use the navigation to quickly access tickets based on their status.</li>
            
          </ul>
        </div>

        {/* User Conversations */}
        <div className="my-3">
          <h3 style={{ color: 'blue' }}>3. User Conversations</h3>
          <p>
            The User Conversations section shows the communication history between the admin and the users for a specific ticket.
          </p>

          <p><strong>a. What Can You Do in the User Conversations Section?</strong></p>
          <ul>
            <li><strong>View User Conversations:</strong> You can see the full conversation history between the admin and the user for a given ticket. The chat is displayed in a clear, conversational format, showing which messages were sent by the user and which were sent by the admin.</li>
            <li><strong>Mark Callback Status:</strong> You can toggle the "Callback Done" option if the callback has been successfully completed.</li>
            <li><strong>Mark User Query as Solved:</strong> You can toggle the "User Query Solved" option to mark the user's query as resolved once the issue has been addressed.</li>
            <li><strong>Add Remarks:</strong> You can add any additional remarks about the ticket or conversation, which can be used for internal tracking or notes.</li>
            <li><strong>Change Ticket Status:</strong> You can update the ticket's current status (e.g., Open, Pending, Closed) to reflect the progress of the request.</li>
          </ul>

          <p><strong>b. Ticket Details and Messages</strong></p>
          <ul>
            <li><strong>Ticket ID at the Top:</strong> The Ticket ID is displayed at the top of the conversation screen. This helps you quickly identify which ticket the conversation is associated with.</li>
            <li><strong>Messages Displayed in Chat Format:</strong> The conversation is displayed in a chat format. Each message is attributed to either the user or the admin, allowing for easy tracking of the conversation flow. Messages from the chatbot are styled differently for clear distinction.</li>
            <li><strong>View Ticket Information:</strong> You can view important ticket information, such as the user's name, email, and contact number, alongside the conversation to ensure that you have all necessary details for effective communication.</li>
          </ul>

          <p><strong>c. Actions You Can Take on a Ticket</strong></p>
          <ul>
            <li><strong>Callback Done Toggle:</strong> If you’ve completed the callback request for a ticket, toggle the "Callback Done" checkbox to reflect that the action has been completed.</li>
            <li><strong>User Query Solved Toggle:</strong> Once the user’s query has been resolved, you can toggle the "User Query Solved" checkbox to indicate that the issue is closed.</li>
            <li><strong>Status Update:</strong> Update the status of the ticket by selecting an appropriate option (Open, Pending, Closed) from the dropdown. This helps keep track of the ticket’s progress.</li>
            <li><strong>Submit the Changes:</strong> After adding remarks, toggling status options, or updating the ticket, make sure to submit the form to save the changes.</li>
          </ul>
        </div>

        {/* Callback Requests */}
        <div className="my-3">
          <h3 style={{ color: 'blue' }}>4. Callback Requests</h3>
          <p>
            In the Callback Requests section, you can manage requests where users have asked for callbacks.
          </p>

          <p><strong>a. What Can You Do in the Callback Requests Section?</strong></p>
          <ul>
            <li><strong>View Callback Requests:</strong> This section shows all the tickets where users have requested a callback. Each row in the table represents a callback request, displaying relevant information such as the user’s name, contact, email, and query.</li>
            <li><strong>See Request Status:</strong> Each request will show the current status (e.g., "Callback done" or "Pending"). The status is color-coded for easy identification, with a green badge for resolved (Callback done) requests and a yellow badge for pending ones.</li>
            <li><strong>Click to View Details:</strong> You can click on any ticket ID in the table to view detailed information about the specific callback request. This opens a conversation page where you can interact with the user directly.</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="my-3">
          <h3 style={{ color: 'blue' }}>5. Contact Support</h3>
          <p>
            If you need further assistance or encounter issues not covered in this guide, please feel free to contact the support team.
          </p>
          <p><strong>Support:</strong> +91 83 90 42 6222</p>
          <p><strong>Email Us:</strong> <a href="mailto:info.ai@atjoin.in">info.ai@atjoin.in</a></p>
        </div>
      </div>
    </div>
  );
}
