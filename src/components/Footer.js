import React from 'react';

export default function Footer() {
  return (
    <div style={styles.footer}>
      <p className="mb-1">
        Copyright ©2025. All Rights Reserved by ATJOIN PVT LTD🧡
      </p>
    </div>
  );
}

const styles = {
  footer: {
    padding: "10px",
    backgroundColor: "white",
    textAlign: "center",
    color: "black",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)", // subtle shadow for better visibility
    position: "fixed", // Make it sticky at the bottom
    bottom: 0,         // Position it at the bottom of the page
    width: "100%",     // Ensure it spans the full width
  },
};

//   button: {
//     padding: "5px 10px",
//     backgroundColor: "#5A67D8",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },



// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="bg-dark text-white py-1 mt-5">
//       <div className="container text-center">
//         <div className="row">
//           {/* <div className="col">
//             <a href="/privacy-policy" className="text-white text-decoration-none">
//               Privacy Policy
//             </a>
//           </div>
//           <div className="col">
//             <a href="/terms-conditions" className="text-white text-decoration-none">
//               Terms & Conditions
//             </a>
//           </div> */}
//         </div>
//         <hr className="py-1" />
//         <p className="mb-0">
//           Copyright ©2025. All Rights Reserved by ATJOIN PVT LTD🧡
//         </p>
//       </div>
//     </footer>
//   );
// }


