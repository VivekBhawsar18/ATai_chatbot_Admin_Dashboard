// import React, { useState } from "react";
// import { Form, Table, Button } from "react-bootstrap";
// import { FaFileAlt } from "react-icons/fa"; // Import report icon

// const SelfAssessmentReport = () => {
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const handleMonthChange = (e) => {
//     setSelectedMonth(e.target.value);
//   };

//   const handleFromDateChange = (e) => {
//     setFromDate(e.target.value);
//   };

//   const handleToDateChange = (e) => {
//     setToDate(e.target.value);
//   };

//   return (
//     <div className="container mt-4">
//       {/* Filters Row */}
//       <div className="row mb-3">
//         {/* <div className="col-md-3">
//           <Form.Group>
//             <Form.Label>Select Month</Form.Label>
//             <Form.Control as="select" value={selectedMonth} onChange={handleMonthChange}>
//               <option value="">Choose Month</option>
//               <option value="January">January</option>
//               <option value="February">February</option>
//               <option value="March">March</option>
//               <option value="April">April</option>
//               <option value="May">May</option>
//               <option value="June">June</option>
//               <option value="July">July</option>
//               <option value="August">August</option>
//               <option value="September">September</option>
//               <option value="October">October</option>
//               <option value="November">November</option>
//               <option value="December">December</option>
//             </Form.Control>
//           </Form.Group>
//         </div> */}

//         <div className="col-md-3">
//           <Form.Group>
//             <Form.Label>From Date</Form.Label>
//             <Form.Control type="date" value={fromDate} onChange={handleFromDateChange} />
//           </Form.Group>
//         </div>

//         <div className="col-md-3">
//           <Form.Group>
//             <Form.Label>To Date</Form.Label>
//             <Form.Control type="date" value={toDate} onChange={handleToDateChange} />
//           </Form.Group>
//         </div>

//         <div className="col-md-3 ">
//           <Button className="btn btn-primary">
//             <FaFileAlt className="me-2" /> Show Report
//           </Button>
//         </div>
//                {/* Table Section in a New Row */}
//        <div className="row mb-4">
//        <div className="col-12">
//           <div className="table-container border rounded p-3">
//             <Table striped bordered hover>
//               <thead className="bg-dark text-white text-center">
//                 <tr>
//                   <th>Sr. No.</th>
//                   <th>Staff Id</th>
//                   <th>Staff Name</th>
//                   <th>Client Name</th>
//                   <th>Time Duration</th>
//                   <th>Date</th>
//                   <th>Client Feedback</th>
//                   <th>Client Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Sample Row */}
//                 <tr className="text-center">
//                   <td>1</td>
//                   <td>101</td>
//                   <td>John Doe</td>
//                   <td>ABC Corp</td>
//                   <td>2 Hours</td>
//                   <td>2024-03-26</td>
//                   <td>Positive</td>
//                   <td>Active</td>
//                 </tr>
//               </tbody>
//             </Table>
//           </div>
//         </div>
// </div>
//       </div>

// </div>
//   );
// }
// export default SelfAssessmentReport;


// import React, { useState } from "react";
// import { Form, Table, Button } from "react-bootstrap";
// import { FaFileAlt } from "react-icons/fa";

// const ticketData = [
//   { ticket_id: 1, ticket_title: "Issue A", updated: "2024-03-20", status: "Open" },
//   { ticket_id: 2, ticket_title: "Issue B", updated: "2024-03-22", status: "Closed" },
//   { ticket_id: 3, ticket_title: "Issue C", updated: "2024-03-25", status: "In Progress" },
//   { ticket_id: 4, ticket_title: "Issue D", updated: "2024-03-26", status: "Open" },
//   { ticket_id: 5, ticket_title: "Issue E", updated: "2024-03-27", status: "Closed" },
//   { ticket_id: 6, ticket_title: "Issue F", updated: "2024-03-28", status: "Open" },
//   { ticket_id: 7, ticket_title: "Issue G", updated: "2024-03-29", status: "In Progress" },
//   { ticket_id: 8, ticket_title: "Issue H", updated: "2024-03-30", status: "Closed" },
//   { ticket_id: 9, ticket_title: "Issue I", updated: "2024-03-31", status: "Open" },
//   { ticket_id: 10, ticket_title: "Issue J", updated: "2024-04-01", status: "In Progress" },
// ];

// const SelfAssessmentReport = () => {
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [filteredData, setFilteredData] = useState([]);

//   const handleFilter = () => {
//     if (!fromDate || !toDate) return;

//     const filtered = ticketData.filter((ticket) => {
//       const ticketDate = new Date(ticket.updated);
//       return ticketDate >= new Date(fromDate) && ticketDate <= new Date(toDate);
//     });
//     setFilteredData(filtered);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row mb-3">
//         <div className="col-md-3">
//           <Form.Group>
//             <Form.Label>From Date</Form.Label>
//             <Form.Control type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
//           </Form.Group>
//         </div>

//         <div className="col-md-3">
//           <Form.Group>
//             <Form.Label>To Date</Form.Label>
//             <Form.Control type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
//           </Form.Group>
//         </div>

//         <div className="col-md-3 ">
//           <Button className="btn btn-primary" onClick={handleFilter}>
//             <FaFileAlt className="me-2" /> Show Report
//           </Button>
//         </div>
//       </div>

//       <div className="row mb-4">
//         <div className="col-12">
//           <div className="table-container border rounded p-3">
//             <Table striped bordered hover>
//               <thead className="bg-dark text-white text-center">
//                 <tr>
//                   <th>Ticket ID</th>
//                   <th>Ticket Title</th>
//                   <th>Updated Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.length > 0 ? (
//                   filteredData.map((ticket, index) => (
//                     <tr className="text-center" key={index}>
//                       <td>{ticket.ticket_id}</td>
//                       <td>{ticket.ticket_title}</td>
//                       <td>{ticket.updated}</td>
//                       <td>{ticket.status}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center">
//                       No records found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SelfAssessmentReport;


import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { getAllTicketsInfo } from "../services/Services"; // API function to fetch ticket data

const SelfAssessmentReport = () => {
  const [ticketData, setTicketData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await getAllTicketsInfo(); // Fetch tickets from API
        setTicketData(response || []);
        setFilteredData(response || []);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";

    // Extract date part only
    const datePart = dateStr.split(" ")[0]; // Remove time
    if (!datePart) return "";

    const [year, month, day] = datePart.split("-"); // Split into components
    return `${day}-${month}-${year}`; // Format as "DD-MM-YYYY"
  };

  const handleFilter = () => {
    if (!fromDate || !toDate) {
      console.error("From Date or To Date is missing!");
      return;
    }
  
    // Create Date objects from input values.
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    // Include the full end day.
    toDateObj.setHours(23, 59, 59, 999);
  
    // Filter tickets based on the updated date.
    const filtered = ticketData.filter((ticket) => {
      if (!ticket.updated) return false;
      // If ticket.updated is ISO formatted, no need to replace " ".
      const ticketDate = new Date(ticket.updated);
      return ticketDate >= fromDateObj && ticketDate <= toDateObj;
    });
  
    console.log("Filtered Data:", filtered);
    setFilteredData(filtered);
  };
  
  
  

  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-md-3">
          <Form.Group>
            <Form.Label>From Date</Form.Label>
            <Form.Control
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="col-md-3">
          <Form.Group>
            <Form.Label>To Date</Form.Label>
            <Form.Control
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="col-md-3">
          <Button className="btn btn-primary mt-4" onClick={handleFilter}>
            Show Report
          </Button>
        </div>
        <div className="table-container border rounded p-3">
        <Table striped bordered hover>
          <thead className="bg-dark text-white text-center">
            <tr>
              <th>Ticket ID</th>
              <th>Ticket Title</th>
              <th> Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(4)].map((_, index) => (
                <tr key={index}>
                  <td><Skeleton width={50} /></td>
                  <td><Skeleton width="80%" /></td>
                  <td><Skeleton width={100} /></td>
                  <td><Skeleton width="60%" /></td>
                </tr>
              ))
            ) : filteredData.length > 0 ? (
              filteredData.map((ticket) => (
                <tr key={ticket.ticket_id}>
                  <td>{ticket.ticket_id}</td>
                  <td>{ticket.ticket_title}</td>
                  <td>{formatDateForDisplay(ticket.updated)}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No records found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      </div>

     
    </div>
  );
};

export default SelfAssessmentReport;



// import React, { useState, useEffect } from "react";
// import { Table, Form, Button, Nav } from "react-bootstrap";
// import Skeleton from "react-loading-skeleton";
// import { Link } from "react-router-dom";
// import { getAllTicketsInfo } from "../services/Services"; // Your API function to fetch tickets

// // Mapping month names to their corresponding index (0 for January, 1 for February, etc.)
// const monthMapping = {
//   January: 0,
//   February: 1,
//   March: 2,
//   April: 3,
//   May: 4,
//   June: 5,
//   July: 6,
//   August: 7,
//   September: 8,
//   October: 9,
//   November: 10,
//   December: 11,
// };

// const SelfAssessmentReport = () => {
//   const [ticketData, setTicketData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // State for month filter
//   const [selectedMonth, setSelectedMonth] = useState("");
//   // State for single date filter
//   const [selectedDate, setSelectedDate] = useState("");
//   // Active Tab State: "month" or "day"
//   const [activeTab, setActiveTab] = useState("month");

//   useEffect(() => {
//     // Fetch ticket data on component mount
//     const getData = async () => {
//       setLoading(true);
//       try {
//         const response = await getAllTicketsInfo();
//         setTicketData(response || []);
//         setFilteredData(response || []);
//       } catch (error) {
//         console.error("Error fetching ticket data:", error);
//       }
//       setLoading(false);
//     };
//     getData();
//   }, []);

//   // Filter by month using the mapping object
//   const handleMonthFilter = () => {
//     // If "All Months" is selected (or nothing is selected), show all data
//     if (!selectedMonth) {
//       setFilteredData(ticketData);
//       return;
//     }

//     const selectedMonthIndex = monthMapping[selectedMonth];
//     const filtered = ticketData.filter((ticket) => {
//       const ticketDate = new Date(ticket.updated);
//       return ticketDate.getMonth() === selectedMonthIndex;
//     });
//     setFilteredData(filtered);
//   };

//   // Filter by a single day
//   const handleDateFilter = () => {
//     if (!selectedDate) return;
//     const filtered = ticketData.filter((ticket) => {
//       const ticketDate = new Date(ticket.updated).toISOString().split("T")[0];
//       return ticketDate === selectedDate;
//     });
//     setFilteredData(filtered);
//   };

//   return (
//     <div className="container mt-4">
//       {/* Tab Navigation */}
//       <Nav variant="tabs" activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)}>
//         {/* <Nav.Item>
//           <Nav.Link eventKey="month">Report by Month</Nav.Link>
//         </Nav.Item> */}
//         <Nav.Item>
//           <Nav.Link eventKey="day">Report by Day</Nav.Link>
//         </Nav.Item>
//       </Nav>

//       {/* Report by Month */}
//       {/* {activeTab === "month" && (
//         <div className="row mt-3 align-items-end">
//           <div className="col-md-4">
//             <Form.Group>
//               <Form.Label>Select Month</Form.Label>
//               <Form.Control
//                 as="select"
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//               >
//                 <option value="">All Months</option>
//                 {Object.keys(monthMapping).map((month) => (
//                   <option key={month} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//           </div>
//           <div className="col-md-3">
//             <Button className="btn btn-primary" onClick={handleMonthFilter}>
//               Show Report
//             </Button>
//           </div>
//         </div>
//       )} */}

//       {/* Report by Day */}
//       {activeTab === "day" && (
//         <div className="row mt-3 align-items-end">
//           <div className="col-md-3">
//             <Form.Group>
//               <Form.Label>Select Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               />
//             </Form.Group>
//           </div>
//           <div className="col-md-3">
//             <Button className="btn btn-primary" onClick={handleDateFilter}>
//               Show Report
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* Ticket Table */}
//       <div className="table-container border rounded p-3 mt-3">
//         <Table striped bordered hover>
//           <thead className="bg-dark text-white text-center">
//             <tr>
//               <th>Ticket ID</th>
//               <th>Ticket Title</th>
//               <th>Updated Date</th>
             
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               [...Array(5)].map((_, index) => (
//                 <tr key={index}>
//                   <td><Skeleton width={50} /></td>
//                   <td><Skeleton width="80%" /></td>
//                   <td><Skeleton width={100} /></td>
                 
//                   <td><Skeleton width="60%" /></td>
//                 </tr>
//               ))
//             ) : filteredData.length > 0 ? (
//               filteredData.map((ticket) => (
//                 <tr key={ticket.ticket_id}>
//                   <td>
//                     <Link to={`/dashboardlayout/user_conversation?user_id=${ticket.ticket_id}`}>
//                       {ticket.ticket_id}
//                     </Link>
//                   </td>
//                   <td>{ticket.ticket_title}</td>
//                   <td>
//                     {new Date(ticket.updated).toLocaleDateString("en-GB")}<br />
//                     {new Date(ticket.updated).toLocaleTimeString("en-US", {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })}
//                   </td>
                 
//                   <td>{ticket.status}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center">
//                   No records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default SelfAssessmentReport;



