import React from 'react';

export default function Header() {
  return (
    <div style={styles.header}>
      <h2 style={styles.title}>Welcome To Agent Dashboard</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search here"
          style={styles.searchInput}
        />
        {/* Font Awesome icon directly used from CDN */}
        <i className="fas fa-search" style={styles.searchIcon}></i>
      </div>
      <div style={styles.profile}>
        <img
          src="#"
          alt="User"
          style={styles.profileImage}
        />
       {/* <div style={styles.iconWrapper}>
  {/* <i className="fas fa-chevron-down" style={styles.icon}></i>
</div>  */}
      </div>
    </div>
  );
}

const styles = {
  header: {
    padding: '15px 30px',
    background: 'linear-gradient(to right, #007bff, #0056b3)', // Gradient background
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '5px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', // Shadow for header
  },

  title: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    color: '#FFFFFF',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '5px',
    padding: '5px 10px',
    marginLeft: '500px', // Space between title and search bar
    width: '250px', // Fixed width to keep search bar from expanding too wide
  },

  searchInput: {
    border: 'none',
    outline: 'none',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '5px',
    width: '200px', // Fixed width for the input field
    marginRight: '10px', // Space between input field and icon
  },

  searchIcon: {
    fontSize: '18px',
    color: '#007bff', // Blue color for the search icon
  },

  profile: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },

  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #fff',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },

  dropdownIcon: {
    marginLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  icon: {
    fontSize: '16px',
    color: '#fff',
    transition: 'transform 0.3s ease',
  },
};
