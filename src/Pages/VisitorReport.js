import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import HomeService from "../Service/HomeService";
import "./VisitorReport.css";
import genusLogo_II from "./genus-power-logo.png";
import QRCode from "qrcode";
import Swal from "sweetalert2";

import ExcelJS from "exceljs";
import { saveAs } from "file-saver";


// ✅ Full-screen overlay loader component
const LoaderOverlay = ({ loading }) => {
  if (!loading) return null;
  return (
    <div
      className="fixed-top w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
    >
      <div
        className="spinner-border text-light"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-white mt-3 fs-5">Please wait...</p>
    </div>
  );
};

export const VisitorReport = () => {  
    const [plants, setPlants] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState("");

  const getFormattedDate = (date) => date.toISOString().split("T")[0];
  const today = new Date();
  const [fromDate, setFromDate] = useState(getFormattedDate(today));
  const [toDate, setToDate] = useState(getFormattedDate(today));
  const [visitorData, setVisitorData] = useState([]);
  const [loading, setLoading] = useState(false);

  //  const userPlant = localStorage.getItem("PlantCode");

  const userPlant = selectedPlant;
    debugger;

  const userCode = localStorage.getItem("UserCode");
  const firstLoad = useRef(true); // ✅ track first page load

  
  const empcode = localStorage.getItem('UserCode');
  const Token = localStorage.getItem('Token');
  // Fetch user plants
  
    // const fetchUserPlants = async () => {
    //   //  debugger
    //   try {
    //     const res = await HomeService.FetchUserPlants(empcode, Token); // 🔥 API CALL

    //     if (res?.success && Array.isArray(res.data)) {
    //       setPlants(res.data);

    //       // Auto-select if only ONE plant
    //       if (res.data.length === 1) {
    //         setSelectedPlant(res.data[0].plantCode);
    //       }
    //     } else {
    //       setPlants([]);
    //     }
    //   } catch (err) {
    //     console.error("Error fetching plants:", err);
    //     setPlants([]);
    //   }
    // };




    const fetchUserPlants = async () => {
  try {
    const res = await HomeService.FetchUserPlants(empcode, Token);

    if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
      setPlants(res.data);

      // ✅ Always pick FIRST plant by default
      const firstPlant = res.data[0].plantCode;
      setSelectedPlant(firstPlant);

      return firstPlant; // 🔥 return it
    } else {
      setPlants([]);
      return "";
    }
  } catch (err) {
    console.error("Error fetching plants:", err);
    setPlants([]);
    return "";
  }
};



  // Fetch visitor report
  // const fetchVisitorReport = async () => {
  //   fetchUserPlants();
  // const userPlant = selectedPlant;
  //   debugger;

  //   if (!fromDate || !toDate) return;
  //   setLoading(true);
  //   try {
  //     const response = await HomeService.GetVisitorReport(fromDate, toDate, userPlant, userCode);
  //     if (response.success) {
  //       setVisitorData(response.data);
  //     } else {
  //       setVisitorData([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching visitor report:", error);
  //     setVisitorData([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };



    const fetchVisitorReport = async (plantCode = selectedPlant) => {
  if (!fromDate || !toDate || !plantCode) 
    {
          Swal.fire("Warning", "Please select a plant.", "warning");
          return;
    }
//  plantCode = selectedPlant; // Fallback to selectedPlant if 




  setLoading(true);
  try {
    debugger;
    const response = await HomeService.GetVisitorReport(
      fromDate,
      toDate,
      plantCode,
      userCode
    );

    if (response.success) {
      setVisitorData(response.data);
    } else {
      setVisitorData([]);
    }
  } catch (error) {
    console.error("Error fetching visitor report:", error);
    setVisitorData([]);
  } finally {
    setLoading(false);
  }
};




  // Auto-fetch only on first page load
  // useEffect(() => {
  //   if (firstLoad.current) {
  //     firstLoad.current = false;
  //       fetchUserPlants();
  //     fetchVisitorReport();
  //   }
  // }, []);

    useEffect(() => {
      const init = async () => {
        const plantCode = await fetchUserPlants(); // ⏳ wait
        if (plantCode) {
          fetchVisitorReport(plantCode); // ✅ correct plant
        }
      };

      init();
    }, []);


  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0];
    return `${day}-${month}-${year} ${time}`;
  };

  const handleExit = async (visitor) => {
    try {
      const confirmExit = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to mark this visitor as exited?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark exit",
        cancelButtonText: "Cancel"
      });

      if (!confirmExit.isConfirmed) return;

      setLoading(true);
      debugger;
      const response = await HomeService.GetExit(visitor.id);
      if (response.success) {
        Swal.fire("Success!", "Exit time recorded successfully.", "success");
        fetchVisitorReport();
      } else {
        Swal.fire("Failed!", "Failed to record exit.", "error");
      }
    } catch (error) {
      console.error("Error in marking exit:", error);
      Swal.fire("Error!", "An error occurred while updating exit.", "error");
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel_Old = () => {
    if (visitorData.length === 0) return;
    const cleanedData = visitorData.map(({ imageHash, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Report");
    XLSX.writeFile(workbook, "VisitorReport.xlsx");
  };

  //------------------------------hemant----------------
    const getDurationHM = (entry, exit) => {
    if (!entry || !exit) return "--";

    const start = new Date(entry);
    const end = new Date(exit);

    const diffMs = end - start;
    if (diffMs <= 0) return "--";

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
  };


  const downloadExcel = async () => {
  if (visitorData.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Visitor Report");
  worksheet.views = [{ state: "frozen", ySplit: 1 }];

  /* ===========================
     HEADER STYLE (SHADED)
  ============================ */
  worksheet.getRow(1).eachCell(cell => {
    cell.font = { bold: true };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      bgColor: { argb: "C0C0C0" }, 
      fgColor: { argb: "000000" } // Light gray

    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };
  });

  // Columns
  worksheet.columns = [
    { header: "Photo", key: "photo", width: 15 },
    { header: "Visitor Name", key: "name", width: 20 },
    // { header: "Gender", key: "gender", width: 10 },
    { header: "Plant", key: "plant", width: 12 },    
    { header: "Entry Date", key: "entry", width: 22 },
    { header: "Exit Date", key: "exit", width: 22 },
    { header: "Duration (HH:MM)", key: "duration", width: 18 },
    { header: "Meet To Whom", key: "meetwith", width: 22 },    
    { header: "Purpose", key: "purpose", width: 20 },
    { header: "Mobile", key: "mobile", width: 15 },    
    { header: "Address / Company", key: "address", width: 30 },
    { header: "Items Carrying", key: "items", width: 20 },
    { header: "Email", key: "email", width: 25 }
  ];

  for (let i = 0; i < visitorData.length; i++) {
    const v = visitorData[i];

    const row = worksheet.addRow({
      plant: v.userPlant || "N/A",
      name: (v.name || "").toUpperCase(), // UPPERCASE
      gender: v.gender,
      entry: formatDate(v.entry_On),
      exit: v.exit_On ? formatDate(v.exit_On) : "",
      duration: getDurationHM(v.entry_On, v.exit_On),
      meetwith: v.meetwith,
      items: v.carryingItems || "None",
      purpose: v.purpose,
      mobile: v.mobile,
      email: v.email,
      address: v.address
    });

    row.height = 80; // Space for photo

    row.eachCell(cell => {
      // Cell borders
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };
      cell.alignment = { vertical: "middle" };
    });

    worksheet.getCell(`B${row.number}`).font = {
      bold: true
    };
    
    worksheet.getCell(`D${row.number}`).font = {
      color: { argb: "FF0000FF" }
    };
    worksheet.getCell(`E${row.number}`).font = {
      color: { argb: "FF0000" }
    };
    
    // 🖼 ADD PHOTO
    if (v.imageHash) {
      const imageId = workbook.addImage({
        base64: `data:image/jpeg;base64,${v.imageHash}`,
        extension: "jpeg"
      });

      worksheet.addImage(imageId, {
        tl: { col: 0, row: row.number - 1 },
        ext: { width: 90, height: 90 }
      });
    }
  }

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }),
    "VisitorReport.xlsx"
  );
};


  const printVisitorPass = async (visitor) => {
  const visitorInfo = `
    Name: ${visitor.name}
    Mobile: ${visitor.mobile}
    Email: ${visitor.email}
    Address: ${visitor.address}
    Purpose: ${visitor.purpose}
    CarryingItems: ${visitor.carryingItems}
    Entry: ${formatDate(visitor.entry_On)}
  `;

  try {
    const qrDataUrl = await QRCode.toDataURL(visitorInfo, { width: 120 });

    const printWindow = window.open("", "_blank");
    printWindow.document.open();

    printWindow.document.write(`
      <html>
        <head>
          <title>Visitor Pass - GENUS</title>
          <style>
            body { font-family: Arial; padding:20px; }
            .visitor-card { border:2px solid black; padding:20px; width:400px; margin:auto; border-radius:8px; }
            .logo { text-align:center; margin-bottom:15px; }
            .logo img { width:120px; }
            .visitor-info { display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; }
            .visitor-photo, .qr-code { width:120px; height:120px; }
            p { font-size:14px; margin:6px 0; }
            .signature-box { height:70px; border-bottom:1.5px solid #000; margin-top:25px; }
          </style>
        </head>
        <body>
          <div class="visitor-card">
            <div class="logo">
              <img id="logoImg" />
            </div>

            <h3 style="text-align:center;">Visitor Pass</h3>

            <div class="visitor-info">
              ${
                visitor.imageHash
                  ? `<img id="photoImg" class="visitor-photo" />`
                  : `<div>No Photo</div>`
              }
              <img id="qrImg" class="qr-code" />
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

            <div class="signature-box"></div>
            <div><b>Visitor Signature</b></div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();

    // 🔴 IMPORTANT: Set image sources AFTER DOM is ready
    const waitForImages = () =>
      new Promise((resolve) => {
        const images = printWindow.document.images;
        let loaded = 0;

        for (let img of images) {
          img.onload = img.onerror = () => {
            loaded++;
            if (loaded === images.length) resolve();
          };
        }
      });

    printWindow.document.getElementById("logoImg").src = genusLogo_II;
    printWindow.document.getElementById("qrImg").src = qrDataUrl;

    if (visitor.imageHash) {
      printWindow.document.getElementById("photoImg").src =
        `data:image/jpeg;base64,${visitor.imageHash}`;
    }

    await waitForImages();

    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();

  } catch (err) {
    alert("Failed to generate QR Code");
  }
};


  return (
    <div className="report-container position-relative">
      <LoaderOverlay loading={loading} />

      <h2>Visitor Report</h2>

      <div className="date-filter">
        <label>From:</label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <label>To:</label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <label className="form-label">Plant:</label>
        <select className="form-select" value={selectedPlant} onChange={(e) => setSelectedPlant(e.target.value)} required >
          <option value="">-- Select Plant --</option>
          {plants.map((p) => (<option key={p.plantCode} 
          value={p.plantCode}>{p.plantCode} - {p.plantName} </option> ))}</select>





        <button
  className="fetch-btn"
  onClick={() => fetchVisitorReport(selectedPlant)}
  disabled={loading} >
  {loading ? "Loading..." : "Fetch Report"}
</button>

        <button className="download-btn" onClick={downloadExcel}>Download Excel</button>
      </div>

      <div className="table-container">
        <table className="visitor-table">
          <thead>
            <tr>
              <th>Action</th>
              <th>Exit On</th>
              <th>Image</th>
              <th>Plant</th>
              <th>Visitor Name</th>
              <th>Entry Date</th>
              <th>Meet to Whom</th>
              <th>Items Carrying</th>
              <th>Purpose</th>
              <th>Visitor Mobile</th>
              <th> Email</th>              
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
                    {visitor.exit_On ? (
                      <span><b>{formatDate(visitor.exit_On)}</b></span>
                    ) : (
                      <button className="exit-btn" onClick={() => handleExit(visitor)}>Exit</button>
                    )}
                  </td>
                  <td>
                    {visitor.imageHash ? (
                      <img src={`data:image/jpeg;base64,${visitor.imageHash}`} alt="Visitor" width="50" height="50" style={{ borderRadius: "5px" }} />
                    ) : "No Image"}
                  </td>
                  <td>{visitor.userPlant || 'N/A'}</td>
                  <td>{visitor.name}</td>
                  <td><b>{formatDate(visitor.entry_On)}</b></td>
                  <td>{visitor.meetwith}</td>
                  <td>{visitor.carryingItems || 'None'}</td>
                  <td>{visitor.purpose}</td>
                  <td>{visitor.mobile}</td>
                  <td>{visitor.email}</td>                  
                  <td>{visitor.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
