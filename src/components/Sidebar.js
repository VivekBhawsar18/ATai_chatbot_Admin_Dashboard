import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom

export default function Sidebar() {
  const links = [
    { name: "Chatbot", url: "/FAQdashboard" },
    { name: "Tickets", url: "/Tickets" },
    { name: "Callback Request", url: "/Callbackrequest" },
    { name: "Help", url: "/help" },
  ];

  // Get the current location from useLocation hook
  const location = useLocation();

  return (
    <div>
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <img
            src="/styles/ATai ChatBot.png"
            alt="Logo"
            style={{ width: "50px", borderRadius: "50%" }}
          />
          <h3 style={styles.logoText}> ATai ChatBot</h3>
        </div>
        <ul style={styles.nav}>
          {links.map((link, index) => {
            // Check if the link's URL matches the current location
            const isActive = location.pathname === link.url;

            return (
              <li key={index} style={styles.navItem}>
                <Link
                  to={link.url} // Use `Link` component from react-router-dom
                  style={{
                    ...styles.navLink,
                    ...(isActive ? styles.activeNavLink : {}),
                  }}
                  // Handle mouse enter and leave events for hover effect
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = "#d2b48c"; // Apply hover effect on mouse enter
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = ""; // Reset background color on mouse leave
                    }
                  }}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    height: "150vh",
    backgroundColor: "black", 
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    borderRight: "3px solid #2D3748",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
  },
  logoText: {
    marginLeft: "10px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  nav: {
    listStyleType: "none",
    padding: 0,
    marginTop: "30px",
  },
  navItem: {
    margin: "15px 0",
  },
  navLink: {
    textDecoration: "none",
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: "16px",
    display: "block",
    padding: "12px 20px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  activeNavLink: {
    backgroundColor: "#00bfff", // Background color for the active tab
    paddingLeft: "25px", // Indentation when active
  },
};
