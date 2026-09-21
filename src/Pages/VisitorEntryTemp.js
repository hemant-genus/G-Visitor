import React, { useState, useRef, useCallback, useEffect } from "react";
import Select from "react-select";
import Webcam from "react-webcam";
import debounce from "lodash.debounce";
import HomeService from "../Service/HomeService";
import "./VisitorEntry.css";



// Full-screen overlay loader
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

export const VisitorEntry = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("Rajasthan");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [carryingItems, setItems] = useState("");
  const [visitorImage, setVisitorImage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedData, setSubmittedData] = useState({});
  const [countdown, setCountdown] = useState(10);

  //  const userPlant = localStorage.getItem("PlantCode") || "Plant Code";
  const webcamRef = useRef(null);

  const Login_User = localStorage.getItem('UserCode');
  const Token = localStorage.getItem('Token');
  
const fetchUserPlants = async () => {
  //  debugger
  try {
    const res = await HomeService.FetchUserPlants(Login_User, Token); // 🔥 API CALL

    if (res?.success && Array.isArray(res.data)) {
      setPlants(res.data);

      // Auto-select if only ONE plant
      if (res.data.length === 1) {
        setSelectedPlant(res.data[0].plantCode);
      }
    } else {
      setPlants([]);
    }
  } catch (err) {
    console.error("Error fetching plants:", err);
    setPlants([]);
  }
};

  // Convert Data URL to File
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  // Capture Image from Webcam
  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const imageFile = dataURLtoFile(imageSrc, "visitor.jpg");
      setVisitorImage(imageFile);
    }
  }, [webcamRef]);

  // Fetch Employees
  const fetchEmployees = async (inputValue) => {
    if (!inputValue) return;
    try {
      const response = await HomeService.GetEmployees(inputValue);
      if (response?.success && response.data) {
        setEmployees(
          response.data.map((emp) => ({ value: emp.id, label: emp.name }))
        );
      } else setEmployees([]);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };

  const debouncedFetchEmployees = useCallback(debounce(fetchEmployees, 500), []);
  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue);
    if (inputValue.length >= 2) debouncedFetchEmployees(inputValue);
    else setEmployees([]);
  };

  // Submit handler
  const handleSubmit = async (e) => 
  {
      e.preventDefault();
     // ✅ Validation: stop submission if "Meet to Whom" is empty
      if (!selectedEmployee) {
        alert("Please select 'Meet to Whom' before submitting.");
        return; // stop form submission
      }
      if (!selectedPlant || selectedPlant === "0") {
        alert("Please select a Plant before submitting.");
        return;
      }

    if (loading) return;
    setLoading(true);
      //debugger;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("purpose", purpose);
    formData.append("carryingItems", carryingItems);
  //formData.append("userPlant", userPlant);
    formData.append("userPlant", selectedPlant);
    formData.append("empId", selectedEmployee ? selectedEmployee.value : "");
    formData.append("Login_User", Login_User);
    if (visitorImage) formData.append("visitorImage", visitorImage);

    try {
      debugger;
      const saveResponse = await HomeService.SaveVisitor(formData);
      debugger;
      if (saveResponse?.success) {
        setSubmittedData({
          name,
          email,
          gender,
          mobile,
          state,
          address,
          purpose,
          carryingItems,
          employee: selectedEmployee?.label || "",
          image: visitorImage ? URL.createObjectURL(visitorImage) : null,
          selectedPlant,
          Login_User
        });
        setShowPopup(true);
        setCountdown(6);

        // Reset form
        setName("");
        setEmail("");
        setGender("");
        setMobile("");
        setState("Rajasthan");
        setAddress("");
        setPurpose("");
        setItems("");
        setSelectedEmployee(null);
        setVisitorImage(null);
      }
    } catch (error) {
      console.error("Error saving visitor:", error);
    } finally {
      setLoading(false);
    }
  };
//  (window.location.href = `${window.location.origin}/G-Visitor/#/VisitorReport`)
  // Countdown redirect
  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
          clearInterval(timer);


          window.location.href = `${window.location.origin}/G-Visitor/#/VisitorReport`;
          return 0;
        }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showPopup]);

    useEffect(() => {
        fetchUserPlants();
      }, []);


  return (
    <div className="container position-relative">
      <LoaderOverlay loading={loading} />

      <h2 className="my-3 text-center">Visitor Entry</h2>

      <div className="visitor-entry-wrapper">
  <form onSubmit={handleSubmit} className="visitor-form">

    {/* LEFT SIDE - FORM FIELDS */}
    <div className="form-section">

      {/* Plant */}
      <div>
        <label className="form-label">
          Plant: <span className="text-danger">*</span>
        </label>
        <select
          className="form-select"
          value={selectedPlant}
          onChange={(e) => setSelectedPlant(e.target.value)}
          required
        >
          <option value="">-- Select Plant --</option>
          {plants.map((p) => (
            <option key={p.plantCode} value={p.plantCode}>
              {p.plantCode} - {p.plantName}
            </option>
          ))}
        </select>
      </div>

      {/* Meet To */}
      <div>
        <label className="form-label">Meet to Whom:</label>
        <Select
          options={employees}
          value={selectedEmployee}
          onInputChange={handleInputChange}
          onChange={setSelectedEmployee}
          placeholder="Type employee name..."
          isSearchable
        />
      </div>

      {/* Visitor Name */}
      <div>
        <label className="form-label">
          Visitor Name: <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>

      {/* Email */}
      <div>
        <label className="form-label">Visitor Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Gender */}
      <div>
        <label className="form-label">
          Visitor Gender: <span className="text-danger">*</span>
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Mobile */}
      <div>
        <label className="form-label">
          Visitor Contact No.: <span className="text-danger">*</span>
        </label>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={mobile}
          required
          className="form-control"
          onChange={(e) =>
            setMobile(e.target.value.replace(/\D/g, ""))
          }
        />
      </div>

      {/* State */}
      <div>
        <label className="form-label">Visitor State:</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="form-select"
        >
          <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Other">Other</option>
        </select>
      </div>

      {/* Address */}
      <div>
        <label className="form-label">
          Visitor Address/Company: *
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="form-control"
        />
      </div>

      {/* Purpose */}
      <div>
        <label className="form-label">
          Visitor Purpose: *
        </label>
        <input
          type="text"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          required
          className="form-control"
        />
      </div>

      {/* Carrying Items */}
      <div>
        <label className="form-label">
          Visitor Carrying Items: *
        </label>
        <input
          type="text"
          value={carryingItems}
          onChange={(e) => setItems(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <button
        type="button"
        onClick={captureImage}
        className="btn btn-secondary w-100"
        disabled={loading}
      >
        Capture Image
      </button>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading || !selectedPlant}
      >
        Register
      </button>

    </div>

    {/* RIGHT SIDE - CAMERA & BUTTONS */}
    <div className="camera-section">

      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="webcam-box"
      />

      {visitorImage && (
        <img
          src={URL.createObjectURL(visitorImage)}
          alt="Captured Visitor"
          className="preview-image"
        />
      )}

      

    </div>

  </form>
</div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2 className="text-center">Visitor Pass Details</h2>
            {submittedData.image && (
              <img src={submittedData.image} alt="Visitor" className="img-thumbnail mb-3" />
            )}
            <p><strong>Name:</strong> {submittedData.name}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Gender:</strong> {submittedData.gender}</p>
            <p><strong>Mobile:</strong> {submittedData.mobile}</p>
            <p><strong>State:</strong> {submittedData.state}</p>
            <p><strong>Address:</strong> {submittedData.address}</p>
            <p><strong>Purpose:</strong> {submittedData.purpose}</p>
            <p><strong>Carrying Items:</strong> {submittedData.carryingItems}</p>
            <p><strong>Employee:</strong> {submittedData.employee}</p>
            <p className="text-center mt-3">Redirecting in {countdown} seconds...</p>
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-secondary"
                onClick={() =>
                (window.location.href = `${window.location.origin}/G-Visitor/#/VisitorReport`)
              }
              >
                Close Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
