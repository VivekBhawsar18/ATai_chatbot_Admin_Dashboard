import React from 'react';

export default function Header() {
  return (
    <div style={styles.header}>
      <h2 style={styles.title}>Welcome To Admin Dashboard</h2>
      <div style={styles.profile}>
        <img src="/styles/ATai ChatBot.png" alt="User" style={styles.profileImage} />
        <div style={styles.dropdownIcon}>
          <i className="fas fa-chevron-down" style={styles.icon}></i>
        </div>
      </div>
    </div>
  );
}

const styles = {
  header: {
    padding: "20px 30px",
    background: "linear-gradient(90deg,rgb(43, 143, 16) 0%,rgb(33, 154, 33) 100%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    color: "#fff",
    borderTopLeftRadius: "2px",
    borderTopRightRadius: "2px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
    color: "#fff",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #fff",
    transition: "transform 0.3s ease",
    cursor: "pointer",
  },
  profileImageHover: {
    transform: "scale(1.1)",
  },
  dropdownIcon: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    fontSize: "16px",
    color: "#fff",
    transition: "transform 0.3s ease",
  },
};
