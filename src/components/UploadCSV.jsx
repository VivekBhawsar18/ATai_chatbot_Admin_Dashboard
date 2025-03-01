import React, { useState } from "react";
import Papa from "papaparse";
import "./UploadCSV.css";

export default function UploadCSV() {
  const [csvFileName, setCsvFileName] = useState("No file chosen");
  const [userManualName, setUserManualName] = useState("No file chosen");
  const [csvData, setCsvData] = useState([]);
  const [userManualUrl, setUserManualUrl] = useState(null);
  const [userManualText, setUserManualText] = useState("");

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.type === "text/csv") {
      setCsvFileName(file.name);
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        Papa.parse(target.result, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setCsvData(result.data);
          },
        });
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleUserManualUpload = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      ["application/pdf", "application/msword", "text/plain"].includes(
        file.type
      )
    ) {
      setUserManualName(file.name);
      setUserManualUrl(URL.createObjectURL(file));

      if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => setUserManualText(e.target.result);
        reader.readAsText(file);
      } else {
        setUserManualText("");
      }
    } else {
      alert("Please upload a valid User Manual file (PDF, DOCX, TXT).");
    }
  };

  return (
    <div className="upload-container">
    {/* Page Title */}
    <h2 className="upload-title">Upload CSV & User Manual</h2>
  
    {/* Upload Sections */}
    <div className="upload-section">
      
      {/* CSV Upload Section */}
      <div className="upload-box">
        <h3>📂 Upload CSV File</h3>
        <div className="upload-file-wrapper">
          <span className="upload-file-name">{csvFileName}</span>
          <label className="upload-button csv">
            Choose File
            <input type="file" accept=".csv" onChange={handleCsvUpload} style={{ display: "none" }} />
          </label>
        </div>
      </div>
  
      {/* User Manual Upload Section */}
      <div className="upload-box">
        <h3>📖 Upload User Manual</h3>
        <div className="upload-file-wrapper">
          <span className="upload-file-name">{userManualName}</span>
          <label className="upload-button manual">
            Choose File
            <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleUserManualUpload} style={{ display: "none" }} />
          </label>
        </div>
      </div>
    </div>
  
    {/* CSV Data Preview */}
    {csvData.length > 0 && (
      <div className="csv-preview-container">
        <div className="csv-preview-title">📊 CSV Data Preview</div>
        <div className="csv-table-container">
          <table className="csv-table">
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} title={value}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  
    {/* User Manual Preview */}
    {userManualUrl && (
      <div className="user-manual-preview">
        <h3 className="user-manual-title">📘 User Manual Preview</h3>
  
        {userManualUrl.endsWith(".pdf") && (
          <iframe src={userManualUrl} title="User Manual PDF Preview"></iframe>
        )}
  
        {userManualText && <div className="user-manual-text"><p>{userManualText}</p></div>}
  
        {(userManualUrl.endsWith(".docx") || userManualUrl.endsWith(".doc")) && (
          <p className="user-manual-download">
            📘 DOCX file uploaded.{" "}
            <a href={userManualUrl} download>Click here to download</a>.
          </p>
        )}
      </div>
    )}
  </div>
  
  );
}
