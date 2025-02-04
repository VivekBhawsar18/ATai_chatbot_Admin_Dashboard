
import React from 'react'

export default function Footer() {
  return (
    <div style={styles.footer}>
      {/* <p>
        This website uses cookies to improve your web experience.{" "}
        <button style={styles.button}>Accept</button>
      </p> */}
    </div>
  )
}



const styles = {
  footer: {
    padding: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "linear-gradient(90deg,rgb(27, 27, 29) 0%,rgb(82, 82, 87) 100%)",
  },
  button: {
    padding: "5px 10px",
    backgroundColor: "#5A67D8",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};


