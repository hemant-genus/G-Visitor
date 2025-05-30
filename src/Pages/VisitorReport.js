import React, { useState } from "react";
import * as XLSX from "xlsx";
import HomeService from "../Service/HomeService";
import "./VisitorReport.css";
import genusLogo_II from "./genus-power-logo.png"; // ✅ Import the logo
// import { QRCodeCanvas } from 'qrcode.react';
// import ReactDOMServer from 'react-dom/server';
import QRCode from 'qrcode';


export const VisitorReport = () => {
  const getFormattedDate = (date) => date.toISOString().split("T")[0];

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [fromDate, setFromDate] = useState(getFormattedDate(yesterday));
  const [toDate, setToDate] = useState(getFormattedDate(tomorrow));
  const [visitorData, setVisitorData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const userPlant = localStorage.getItem('PlantCode');

  const fetchVisitorReport = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both From and To dates.");
      return;
    }

    setLoading(true);
    try {
      const response = await HomeService.GetVisitorReport(fromDate, toDate);
      debugger;
      console.log(response.data[0]); // See full field names and values

      if (response.success) {
        setVisitorData(response.data);
      } else {
        alert("No records found for the selected date range.");
        setVisitorData([]);
      }
    } catch (error) {
      console.error("Error fetching visitor report:", error);
      alert("An error occurred while fetching the report.");
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0]; // HH:MM:SS
    //  const millis = String(date.getMilliseconds()).padStart(3, '0');
    return `${day}-${month}-${year} ${time}`;
  };

  const downloadExcel = () => {
    if (visitorData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const cleanedData = visitorData.map(({ imageHash, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Report");
    XLSX.writeFile(workbook, "VisitorReport.xlsx");
  };

  const printVisitorPass = (visitor) => {
  const visitorInfo = `
    Name: ${visitor.name}
    Mobile: ${visitor.mobile}
    Email: ${visitor.email}
    Address: ${visitor.address}
    Purpose: ${visitor.purpose}
    CarryingItems: ${visitor.CarryingItems}
    Entry: ${formatDate(visitor.entry_On)}
  `;

  // ✅ Generate QR as Base64 PNG directly
  QRCode.toDataURL(visitorInfo, { width: 120 }, (err, qrDataUrl) => {
    if (err) {
      alert("Failed to generate QR code.");
      return;
    }

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Visitor Pass - GENUS</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            .visitor-card {
              border: 2px solid black;
              padding: 20px;
              width: 400px;
              margin: auto;
              text-align: left;
              box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
              border-radius: 8px;
            }
            .logo { text-align: center; margin-bottom: 15px; }
            .logo img { width: 120px; }
            .visitor-info {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 15px;
            }
            .visitor-photo {
              width: 120px;
              height: 120px;
              border-radius: 10px;
            }
            .qr-code {
              width: 120px;
              height: 120px;
            }
            .visitor-card p {
              font-size: 16px;
              margin: 8px 0;
            }
            .visitor-card strong {
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="visitor-card">
            <div class="logo">
              <img src="${genusLogo_II}" alt="GENUS Logo"/>
            </div>
            <h2 style="text-align: center;">Visitor Pass</h2>
            <div class="visitor-info">
              ${
                visitor.imageHash
                  ? `<img class="visitor-photo" src="data:image/jpeg;base64,${visitor.imageHash}" alt="Visitor Photo"/>`
                  : `<div>No Photo</div>`
              }
              <img class="qr-code" src="${qrDataUrl}" alt="QR Code"/>
            </div>
            <p><strong>Visitor Name:</strong> ${visitor.name}</p>
            <p><strong>Entry On:</strong> ${formatDate(visitor.entry_On)}</p>
            <p><strong>Plant:</strong> ${userPlant || 'N/A'}</p>
            <p><strong>Meet to Whom:</strong> ${visitor.meetwith}</p>
            <p><strong>Visitor Email:</strong> ${visitor.email}</p>
            <p><strong>Visitor Mobile:</strong> ${visitor.mobile}</p>
            <p><strong>Items Carrying:</strong> ${visitor.carryingItems}</p>
            <p><strong>Visitor Address/Company:</strong> ${visitor.address}</p>
            <p><strong>Visitor Purpose:</strong> ${visitor.purpose}</p>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  });
};



  return (
    <div className="report-container">
      <h2>Visitor Report</h2>

      <div className="date-filter">
        <label>From:</label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label>To:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        <button className="fetch-btn" onClick={fetchVisitorReport} disabled={loading}>
          {loading ? "Loading..." : "Fetch Report"}
        </button>
        <button className="download-btn" onClick={downloadExcel}>Download Excel</button>
      </div>

      <div className="table-container">
        <table className="visitor-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Image</th>
              <th>Plant</th>
              <th>Visitor Name</th>
              <th>Entry Date</th>
              <th>Meet to Whom</th>
              <th>Items Carrying</th>
              <th>Purpose</th>
              <th>Visitor Mobile</th>
              <th>Visitor Email</th>              
              <th>Visitor Address/Company</th>
            </tr>
          </thead>
          <tbody>
            {visitorData.length > 0 ? (
              visitorData.map((visitor, index) => (
                <tr key={index}>
                  <td>
                    <button className="print-btn" onClick={() => printVisitorPass(visitor)}>Print Pass</button>
                  </td>
                  <td>
                    {visitor.imageHash ? (
                      <img
                        src={`data:image/jpeg;base64,${visitor.imageHash}`}
                        alt="Visitor"
                        width="50"
                        height="50"
                        style={{ borderRadius: "5px" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{userPlant ? userPlant : 'N/A'}</td>
                  <td>{visitor.name}</td>
                  <td><b>{formatDate(visitor.entry_On)}</b></td>
                  <td>{visitor.meetwith}</td>
                  <td>{visitor.carryingItems ? visitor.carryingItems : 'None'}</td>
                  <td>{visitor.purpose}</td>
                  <td>{visitor.mobile}</td>
                  <td>{visitor.email}</td>                  
                  <td>{visitor.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
