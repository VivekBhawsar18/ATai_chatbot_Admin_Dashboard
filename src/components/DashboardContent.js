// import React, { useState, useEffect } from 'react';

// // DashboardContent Component
// export default function DashboardContent() {
//   const [faqs, setFaqs] = useState([]); // List of FAQs
//   const [currentQuestionId, setCurrentQuestionId] = useState(null); // Active question ID
//   const [chatHistory, setChatHistory] = useState([]); // Chat history
//   const [newQuestion, setNewQuestion] = useState(''); // Input for new question
//   const [newAnswer, setNewAnswer] = useState(''); // Input for new answer

//   // Fetch FAQs from the API
//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/faqs');
//         if (!response.ok) {
//           throw new Error(`Failed to fetch FAQs: ${response.status}`);
//         }
//         const data = await response.json();
//         setFaqs(data); // Assuming data is an array of FAQ objects
//       } catch (error) {
//         console.error('Error fetching FAQs:', error);
//       }
//     };

//     fetchFaqs();
//   }, []);

//   // Handle question click
//   const handleQuestionClick = (faqId) => {
//     const selectedFaq = faqs.find((faq) => faq.id === faqId);
//     if (selectedFaq) {
//       setChatHistory((prev) => [
//         ...prev,
//         { type: 'question', text: selectedFaq.question },
//         { type: 'answer', text: selectedFaq.answers[0] },
//       ]);
//       setCurrentQuestionId(faqId);
//     }
//   };

//   // Handle option selection
//   const handleOptionSelect = (faqId, option) => {
//     const selectedFaq = faqs.find((faq) => faq.id === faqId);
//     if (selectedFaq) {
//       setChatHistory((prev) => [
//         ...prev,
//         { type: 'option', text: option },
//       ]);

//       // Example logic for options
//       if (faqId === 2 && option === 'Book a Demo') {
//         const nextFaq = faqs.find((faq) => faq.id === 4);
//         if (nextFaq) {
//           setChatHistory((prev) => [
//             ...prev,
//             { type: 'answer', text: nextFaq.answers[0] },
//           ]);
//           setCurrentQuestionId(4);
//         }
//       } else if (faqId === 6) {
//         setChatHistory((prev) => [
//           ...prev,
//           {
//             type: 'answer',
//             text: option === 'Yes'
//               ? 'Great! We will arrange a call back for you shortly.'
//               : 'No problem! Let us know if you need further assistance.',
//           },
//         ]);
//       }
//     }
//   };

//   // Add a new FAQ
//   const addFaq = () => {
//     if (newQuestion.trim() && newAnswer.trim()) {
//       const newFaq = {
//         id: faqs.length + 1,
//         question: newQuestion.trim(),
//         answers: [newAnswer.trim()],
//         options: [], // Add options if needed
//       };
//       setFaqs((prev) => [...prev, newFaq]);
//       setNewQuestion('');
//       setNewAnswer('');
//     } else {
//       alert('Please enter both a question and an answer.');
//     }
//   };

//   return (
//     <div className="container d-flex flex-column align-items-center" style={{ minHeight: '100vh', paddingTop: '50px' }}>
//       <h1 className="text-center mb-4">FAQ Dashboard</h1>

//       <div className="row w-100">
//         {/* FAQ Section */}
//         <div className="col-md-6">
//           <h3>Select a Question:</h3>
//           <div id="faqPanel" className="accordion">
//             {faqs.length > 0 ? (
//               faqs.map((faq) => (
//                 <div key={faq.id} className="accordion-item">
//                   <h2 className="accordion-header">
//                     <button
//                       className="accordion-button"
//                       type="button"
//                       onClick={() => handleQuestionClick(faq.id)}
//                     >
//                       {faq.question}
//                     </button>
//                   </h2>
//                   {currentQuestionId === faq.id && (
//                     <div className="accordion-body">
//                       {faq.options && faq.options.length > 0 && (
//                         <div>
//                           <p>Choose an option:</p>
//                           {faq.options.map((option, index) => (
//                             <button
//                               key={index}
//                               className="btn btn-secondary me-2"
//                               onClick={() => handleOptionSelect(faq.id, option)}
//                             >
//                               {option}
//                             </button>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <p>No FAQs available.</p>
//             )}
//           </div>
//         </div>

//         {/* Chat Section */}
//         <div className="col-md-6">
//           <h3>AI Chat Bot:</h3>
//           <div
//             className="chat-box"
//             style={{
//               border: '1px solid #ddd',
//               borderRadius: '8px',
//               padding: '20px',
//               height: '300px',
//               overflowY: 'auto',
//               boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//             }}
//           >
//             {chatHistory.map((message, index) => (
//               <p
//                 key={index}
//                 className={`chat-message ${message.type}`}
//                 style={{
//                   backgroundColor:
//                     message.type === 'answer'
//                       ? '#e9f7ef'
//                       : message.type === 'question'
//                       ? '#c1e0f4'
//                       : '#f7f7f7',
//                   padding: '10px',
//                   borderRadius: '8px',
//                   marginBottom: '10px',
//                 }}
//               >
//                 <strong>
//                   {message.type === 'question' ? 'User: ' : 'AI: '}
//                 </strong>
//                 {message.text}
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Admin Panel */}
//       <div className="mt-4 w-50">
//         <h5>Add New FAQ</h5>
//         <input
//           type="text"
//           className="form-control mb-2"
//           placeholder="Enter your question"
//           value={newQuestion}
//           onChange={(e) => setNewQuestion(e.target.value)}
//         />
//         <input
//           type="text"
//           className="form-control mb-2"
//           placeholder="Enter the answer"
//           value={newAnswer}
//           onChange={(e) => setNewAnswer(e.target.value)}
//         />
//         <button className="btn btn-primary w-100" onClick={addFaq}>
//           Add FAQ
//         </button>
//       </div>
//     </div>
//   );
// }
import React from 'react';


export default function DashboardContent() {
  return (
    <div>
      <video width="100%" controls>
        <source src="/styles/ATai ChatBot.png" type="ATai" />
        </video>
       
    </div>
  );
}





