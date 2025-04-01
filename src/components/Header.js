// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';

// // export default function Header() {
// //   const navigate = useNavigate();

// //   // Logout Function
// //   const handleLogout = () => {
// //     localStorage.removeItem("clientId"); // Clear stored Client ID
// //     setTimeout(() => {
// //       navigate("/"); // Ensure the navigation happens after state updates
// //     }, 0);
// //   };

// //   return (
// //     <div style={styles.header}>
// //       <h2 style={styles.title}>Welcome To Agent Dashboard</h2>
      
// //       <div style={styles.searchContainer}>
// //         <input
// //           type="text"
// //           placeholder="Search here"
// //           style={styles.searchInput}
// //         />
// //         <i className="fas fa-search" style={styles.searchIcon}></i>
// //       </div>

// //       <div style={styles.profile}>
// //         <img
// //           src="#"
// //           alt="User"
// //           style={styles.profileImage}
// //         />
// //         <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   header: {
// //     padding: '15px 30px',
// //     background: 'linear-gradient(to right, #007bff, #0056b3)', // Gradient background
// //     color: 'white',
// //     display: 'flex',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     borderRadius: '5px',
// //     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Shadow for header
// //   },

// //   title: {
// //     fontSize: '20px',
// //     fontWeight: '700',
// //     margin: 0,
// //     color: '#FFFFFF',
// //   },
// //   searchContainer: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     backgroundColor: 'white',
// //     borderRadius: '5px',
// //     padding: '5px 10px',
// //     marginLeft: '500px', // Space between title and search bar
// //     width: '250px', // Fixed width to keep search bar from expanding too wide
// //   },

// //   searchInput: {
// //     border: 'none',
// //     outline: 'none',
// //     padding: '8px 12px',
// //     fontSize: '14px',
// //     borderRadius: '5px',
// //     width: '200px', // Fixed width for the input field
// //     marginRight: '10px', // Space between input field and icon
// //   },

// //   searchIcon: {
// //     fontSize: '18px',
// //     color: '#007bff', // Blue color for the search icon
// //   },

// //   profile: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     position: 'relative',
// //   },

// //   profileImage: {
// //     width: '40px',
// //     height: '40px',
// //     borderRadius: '50%',
// //     border: '2px solid #fff',
// //     transition: 'transform 0.3s ease',
// //     cursor: 'pointer',
// //   },

// //   dropdownIcon: {
// //     marginLeft: '10px',
// //     display: 'flex',
// //     alignItems: 'center',
// //     cursor: 'pointer',
// //   },

// //   icon: {
// //     fontSize: '16px',
// //     color: '#fff',
// //     transition: 'transform 0.3s ease',
// //   },

// // logoutButton: {
// //   backgroundColor: '#dc3545',
// //   color: 'white',
// //   border: 'none',
// //   padding: '10px 15px',
// //   borderRadius: '5px',
// //   cursor: 'pointer',
// //   fontSize: '14px',
// //   fontWeight: '600',
// //   transition: 'background 0.3s ease',
// // },
// // };

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {FaSearch} from "react-icons/fa";


// export default function Header({ onSearch }) { // Accepting onSearch as a prop
//   const navigate = useNavigate();
//   // const [searchTerm, setSearchTerm] = useState("");
//     const [searchQuery, setSearchQuery] = useState("");

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("clientId");
//     setTimeout(() => {
//       navigate("/");
//     }, 0);
//   };

// //   // Handle search input change
// //  {/* Search Bar */}
// //        <div className="search-container">
// //          <input
// //            type="text"
// //            placeholder="Search by ID or Title..."
// //            className="search-input"
// //            value={searchQuery}
// //            onChange={(e) => setSearchQuery(e.target.value)}
// //          />
// //          <FaSearch className="search-icon" />
// //        </div>

// const handleSearchChange = (e) => {
//   setSearchQuery(e.target.value);
//   onSearch(e.target.value); // Pass search query to parent (Tickets.jsx)
// };

//   return (
//     <div style={styles.header}>
//       <h2 style={styles.title}>Welcome To Agent Dashboard</h2>

//       {/* Search Bar */}
//       {/* <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search by ID or Title..."
//           className="search-input"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <FaSearch className="search-icon" />
//       </div> */}

//  {/* Search Bar (Now in Header) */}
//  <div style={styles.searchContainer}>
//         <input
//           type="text"
//           placeholder="Search tickets..."
//           value={searchQuery}
//           onChange={handleSearchChange}
//           style={styles.searchInput}
//         />
//         <i className="fas fa-search" style={styles.searchIcon}></i>
//       </div>

      
//       <div style={styles.profile}>
//         <img src="#" alt="User" style={styles.profileImage} />
//         <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   header: {
//     padding: '15px 30px',
//     background: 'linear-gradient(to right, #007bff, #0056b3)',
//     color: 'white',
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderRadius: '5px',
//     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
//   },

//   title: {
//     fontSize: '20px',
//     fontWeight: '700',
//     margin: 0,
//     color: '#FFFFFF',
//   },

//   searchContainer: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     borderRadius: '5px',
//     padding: '5px 10px',
//     width: '250px',
//   },

//   searchInput: {
//     border: 'none',
//     outline: 'none',
//     padding: '8px 12px',
//     fontSize: '14px',
//     borderRadius: '5px',
//     width: '200px',
//     marginRight: '10px',
//   },

//   searchIcon: {
//     fontSize: '18px',
//     color: '#007bff',
//   },

//   profile: {
//     display: 'flex',
//     alignItems: 'center',
//     position: 'relative',
//   },

//   profileImage: {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     border: '2px solid #fff',
//     cursor: 'pointer',
//   },

//   logoutButton: {
//     backgroundColor: '#dc3545',
//     color: 'white',
//     border: 'none',
//     padding: '10px 15px',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '14px',
//     fontWeight: '600',
//     transition: 'background 0.3s ease',
//   },
// };


import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header({ onSearch }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  const notifications = [
    "New ticket assigned to you",
    "Ticket #12345 updated",
    "Client sent a message",
    "Reminder: Follow up on ticket #67890",
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("clientId");
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  // Toggle Notifications Dropdown
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={styles.header}>
      <h2 style={styles.title}>Welcome To Agent Dashboard</h2>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <FaSearch style={styles.searchIcon} />
      </div>

      {/* Notification Bell */}
      <div style={styles.notificationContainer} ref={notificationRef}>
        <FaBell style={styles.bellIcon} onClick={toggleNotifications} />
        {showNotifications && (
          <div style={styles.notificationsDropdown}>
            <h4 style={styles.dropdownHeader}>Notifications</h4>
            {notifications.length > 0 ? (
              notifications.map((note, index) => (
                <div key={index} style={styles.notificationItem}>
                  {note}
                </div>
              ))
            ) : (
              <div style={styles.emptyNotification}>No new notifications</div>
            )}
          </div>
        )}
      </div>

      {/* Profile & Logout */}
      <div style={styles.profile}>
        <img src="#" alt="User" style={styles.profileImage} />
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

// Styles
const styles = {
  header: {
    padding: "15px 30px",
    background: "linear-gradient(to right, #007bff, #0056b3)",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "5px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    margin: 0,
    color: "#FFFFFF",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "5px 10px",
    width: "250px",
  },
  searchInput: {
    border: "none",
    outline: "none",
    padding: "8px 12px",
    fontSize: "14px",
    borderRadius: "5px",
    width: "200px",
    marginLeft: "10px",
  },
  searchIcon: {
    fontSize: "18px",
    color: "#007bff",
  },
  profile: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #fff",
    cursor: "pointer",
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "background 0.3s ease",
  },
  notificationContainer: {
    position: "relative",
    cursor: "pointer",
  },
  bellIcon: {
    fontSize: "24px",
    color: "white",
    cursor: "pointer",
    marginLeft: "400px",
  },
  notificationsDropdown: {
    position: "absolute",
    top: "40px",
    right: "0",
    width: "250px",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    padding: "10px",
    zIndex: "1000",
  },
  dropdownHeader: {
    fontSize: "16px",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "5px",
  },
  notificationItem: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    cursor: "pointer",
  },
  emptyNotification: {
    padding: "10px",
    fontSize: "14px",
    color: "#555",
    textAlign: "center",
  },
};



