import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation from react-router-dom

export default function Sidebar() {
  const links = [
    { name: "Tickets", url: "/Tickets", icon: "fas fa-ticket-alt" }, // Added Font Awesome icon
    { name: "Callback Request", url: "/Callbackrequest", icon: "fas fa-phone-alt" }, // Added Font Awesome icon
    { name: "Help and Support", url: "/help", icon: "fas fa-question-circle" }, // Added Font Awesome icon
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
          <h3 style={styles.logoText}> ATai </h3>
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
                  {/* Font Awesome icon before the text */}
                  <i className={link.icon} style={styles.icon}></i> 
                  {link.name}
                </Link>
                {/* Partition/Separator between nav items */}
                {index < links.length - 1 && <div style={styles.separator}></div>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: "#f8f9fa",
  },
  sidebar: {
    backgroundColor: "#222", // Updated to the provided background color
    minHeight: "160vh",
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
    color: "white",
    fontWeight: "500",
    fontSize: "16px",
    display: "block",
    padding: "12px 20px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    display: "flex", // Ensures proper alignment of icon and text
    alignItems: "center", // Vertically centers the icon and text
  },
  activeNavLink: {
    backgroundColor: " #0056b3", // Updated to match hover effect color
    paddingLeft: "25px", // Indentation when active
  },
  icon: {
    marginRight: "10px", // Adds space between the icon and the text
  },
  // For hover effect
  navLinkHover: {
    backgroundColor: " #0056b3", // Hover effect color
  },
  // Separator style between nav links
  separator: {
    borderBottom: "1px solid #dcdcdc", // Dark white separator (light gray)
    margin: "10px 0", // Adjust spacing between the nav links and the separator
  },
};


