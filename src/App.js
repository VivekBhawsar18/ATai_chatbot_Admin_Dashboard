// import React from "react";
// import Sidebar from "./comp/Sidebar";
// import Header from "./comp/Header";
// import DashboardContent from "./comp/DashboardContent";
// import Footer from "./comp/Footer";

// const App = () => {
//   return (
//     <div style={styles.container}>
//       <Sidebar />
//       <div style={styles.main}>
//         <Header />
//         <DashboardContent />
//         <Footer />
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     height: "100vh",
//   },
//   main: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: "#f9f9f9",
//   },
// };

// export default App;

import './App.css';

import Router from './router/Router';



function App() {
  return (
    <div>
      
      <Router/>
      
    </div>
   
  );
}

export default App;

