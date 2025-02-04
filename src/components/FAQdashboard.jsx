import React, { useState } from "react";

export default function FAQdashboard() {
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Welcome to ATJOIN AI. How can we help you?",
      answers: ["Our Services", "Book a Demo"],
    },
    {
      id: 2,
      question: "Our Services",
      answers: [
        "Website Development",
        "Mobile App Development",
        "Social Media Marketing",
        "ECommerce",
        "AI-Based Custom Solution",
        "Documents Automation",
        "Cyber Security Service",
        "Update an Existing Application",
        "Other",
      ],
    },
    {
      id: 3,
      question: "AI-Based Custom Solution",
      answers: ["When do you wish to start?", "Immediately", "Within 1 month"],
    },
    {
      id: 4,
      question: "Mobile App Development",
      answers: ["Do you have an existing app?", "Yes", "No"],
    },
    {
      id: 5,
      question: "Social Media Marketing",
      answers: [
        "What platform are you interested in?",
        "Facebook",
        "Instagram",
        "LinkedIn",
      ],
    },
    {
      id: 6,
      question: "Cyber Security Service",
      answers: ["Do you need consultation?", "Yes", "No"],
    },
    {
      id: 7,
      question: "ECommerce Solutions",
      answers: [
        "What type of ECommerce platform?",
        "Shopify",
        "WooCommerce",
        "Magento",
      ],
    },
    {
      id: 8,
      question: "Documents Automation",
      answers: [
        "What type of document do you want to automate?",
        "Legal Documents",
        "Financial Reports",
        "Contracts",
      ],
    },
    {
      id: 9,
      question: "Do you need Cybersecurity assessment?",
      answers: ["Yes", "No"],
    },
    {
      id: 10,
      question: "When do you wish to start?",
      answers: ["Immediately", "Within 1 month"],
    },
    {
      id: 11,
      question: "How can we assist you with your website development?",
      answers: ["Custom Website", "Template-Based Website", "ECommerce Website"],
    },
    {
      id: 12,
      question: "Would you like to book a demo for our AI-based solution?",
      answers: ["Yes, Book a Demo", "No, Just Information"],
    },
    {
      id: 13,
      question: "What is the preferred timeline for your mobile app development?",
      answers: ["Within 3 months", "6 months", "1 year"],
    },
    {
      id: 14,
      question: "Would you like to integrate social media campaigns into your business?",
      answers: ["Yes", "No", "Maybe Later"],
    },
  ]);

  const [currentFaq, setCurrentFaq] = useState({ question: "", answers: [] });
  const [editingFaqId, setEditingFaqId] = useState(null);

  const handleAddOrEdit = () => {
    if (editingFaqId) {
      // Save Edited FAQ
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.id === editingFaqId ? { ...faq, ...currentFaq } : faq
        )
      );
    } else {
      // Add New FAQ
      setFaqs([
        ...faqs,
        {
          id: faqs.length + 1,
          ...currentFaq,
        },
      ]);
    }
    resetForm();
  };

  const resetForm = () => {
    setCurrentFaq({ question: "", answers: [] });
    setEditingFaqId(null);
  };

  const handleEdit = (faqId) => {
    const faqToEdit = faqs.find((faq) => faq.id === faqId);
    setCurrentFaq({ question: faqToEdit.question, answers: faqToEdit.answers });
    setEditingFaqId(faqId);
  };

  return (
    <div
      className="container pt-4 ml-0"
      style={{ maxWidth: "1000px", margin: "auto" }}
    >
      <h1 className="text-center mb-4 pl-10">FAQ Dashboard</h1>

      {/* Updated FAQ List with Scrollable Container */}
      <div
        className="faq-list mr-5"
        style={{
          maxHeight: "700px", // Set maximum height for the container
          overflowY: "auto", // Enable vertical scrolling
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="faq-item"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "10px",
              backgroundColor: "#fff",
            }}
          >
            <h5>{faq.question}</h5>
            <ul>
              {faq.answers.map((answer, idx) => (
                <li key={idx}>{answer}</li>
              ))}
            </ul>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleEdit(faq.id)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div
        className="faq-form mt-0"
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          marginTop: "20px",
          backgroundColor: "#f1f1f1",
          height: "300px",
        }}
      >
        <h5>{editingFaqId ? "Edit FAQ" : "Add New FAQ"}</h5>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter question"
            value={currentFaq.question}
            onChange={(e) =>
              setCurrentFaq({ ...currentFaq, question: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter answers (comma-separated)"
            value={currentFaq.answers.join(", ")}
            onChange={(e) =>
              setCurrentFaq({
                ...currentFaq,
                answers: e.target.value
                  .split(",")
                  .map((ans) => ans.trim())
                  .filter((ans) => typeof ans === "string" && ans !== ""),
              })
            }
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleAddOrEdit}
          style={{ marginRight: "10px" }}
        >
          {editingFaqId ? "Save Changes" : "Add FAQ"}
        </button>
        {editingFaqId && (
          <button className="btn btn-secondary" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}