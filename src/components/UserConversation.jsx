import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserConversation } from '../services/Services'; // Make sure this function exists in Services

const UserConversation = () => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("user_id"); // Get the user_id from the URL

  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        const data = await getUserConversation(userId);  // Fetch conversation data from the API
        setConversation(data.user_conversation); // Set the conversation in the state
      } catch (err) {
        setError("Error fetching conversation.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchConversation();
    }
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Render the conversation as a simple chat between user and chatbot
  return (
    <div className="container mt-5">
      <h3>Conversation with User: {userId}</h3>
      <div className="chat-box" style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
        {conversation ? (
          conversation.split("\n").map((message, index) => {
            const isChatbotMessage = message.startsWith("Chatbot:");
            const messageStyle = {
              marginBottom: '10px',
              padding: '8px',
              borderRadius: '5px',
              backgroundColor: isChatbotMessage ? '#f1f1f1' : '#e0f7fa',  // Light color for user messages and chatbot messages
              textAlign: isChatbotMessage ? 'left' : 'right',  // Align chatbot on left, user on right
            };

            return (
              <div key={index} style={messageStyle}>
                {message.replace(/^Chatbot: /, '').replace(/^User: /, '')}  {/* Clean up the message */}
              </div>
            );
          })
        ) : (
          <div>No conversation data available.</div>
        )}
      </div>
    </div>
  );
};

export default UserConversation;
