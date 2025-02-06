import React from "react";

export default function Sidebar() {
  const links = [
    { name: "Chatbot", url: "/FAQdashboard" },
    { name: "Tickets", url: "/Tickets" },
    { name: "Callback Request", url: "/Callbackrequest" },
    { name: "Help", url: "/help" },
  ];

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
          {links.map((link, index) => (
            <li key={index} style={styles.navItem}>
              <a href={link.url} style={styles.navLink}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    height: "150vh",
    background: "linear-gradient(90deg,rgb(25, 146, 35) 0%,rgb(26, 125, 17) 100%)",
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
    color: "#EDF2F7",
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
    fontSize: "18px",
    display: "block",
    padding: "12px 20px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  navLinkHover: {
    backgroundColor: "#3C366B",
    paddingLeft: "25px",
  },
};
