import React, { useState, useRef, useCallback, useEffect } from "react";
import Select from "react-select";
import Webcam from "react-webcam";
import debounce from "lodash.debounce"; // Import debounce
import HomeService from "../Service/HomeService"; // Ensure this API call fetches employees
import "./VisitorEntry.css"; // Import the CSS file

export const VisitorEntry = () => {
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


  const userPlant = localStorage.getItem('PlantCode');


  const webcamRef = useRef(null);

  // Convert Data URL to File
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // Capture Image from Webcam
  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageFile = dataURLtoFile(imageSrc, "visitor.jpg");
    setVisitorImage(imageFile);
  }, [webcamRef]);

  // Fetch Employees based on user input with debounce
  const fetchEmployees = async (inputValue) => {
    if (!inputValue) return;
    try {
      const response = await HomeService.GetEmployees(inputValue); // API Call
      if (response?.success && response.data) {
        setEmployees(response.data.map(emp => ({ value: emp.id, label: emp.name })));
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    }
  };


  
  // Debounce API call (delay 500ms after typing)
  const debouncedFetchEmployees = useCallback(debounce(fetchEmployees, 500), []);
  // Handle input change for the dropdown
  const handleInputChange = (inputValue) => {
    setSearchInput(inputValue);
    if (inputValue.length >= 2) {
      debouncedFetchEmployees(inputValue);
    } else {
      setEmployees([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("mobile", mobile);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("purpose", purpose);
    formData.append("carryingItems", carryingItems);
    formData.append("empId", selectedEmployee ? selectedEmployee.value : ""); // Store selected Employee ID
    if (visitorImage) {
      formData.append("visitorImage", visitorImage);
    }

    try {
      const saveResponse = await HomeService.SaveVisitor(formData);
      debugger;
      if (saveResponse?.success) {
        alert("Visitor Pass Registration Successful!");
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
    }
  };

  return (
    <div className="container">
  <h2 className="my-3">Visitor Entry</h2>
  <form onSubmit={handleSubmit}>

    {/* Row 1: Plant, Meet to Whom, Name */}
    <div className="row mb-3">
      <div className="col-md-4">
        <label className="form-label">Plant:</label>
        <input type="text" value={userPlant} disabled className="form-control" />
      </div>
      <div className="col-md-4">
        <label className="form-label">Meet to Whom:</label>
        <Select
          className="form-control"
          options={employees}
          value={selectedEmployee}
          onInputChange={handleInputChange}
          onChange={setSelectedEmployee}
          placeholder="Type employee name..."
          isSearchable
        />
      </div>
      <div className="col-md-4">
        <label className="form-label">Visitor Name: <span className="text-danger">*</span></label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="form-control" />
      </div>
    </div>

    {/* Row 2: Email, Gender, Contact */}
    <div className="row mb-3">
      <div className="col-md-4">
        <label className="form-label">Visitor Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
      </div>
      <div className="col-md-4">
        <label className="form-label">Visitor Gender: <span className="text-danger">*</span></label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required className="form-select">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Visitor Contact No.: <span className="text-danger">*</span></label>
        <input type="tel" maxLength={10} value={mobile} onChange={(e) => setMobile(e.target.value)} required className="form-control" />
      </div>
    </div>

    {/* Row 3: State, Address, Purpose */}
    <div className="row mb-3">
      <div className="col-md-4">
        <label className="form-label">Visitor State: </label>
        <select value={state} onChange={(e) => setState(e.target.value)} >
        <option value="0">-- Select State --</option>
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
        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
        <option value="Delhi">Delhi</option>
        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
        <option value="Ladakh">Ladakh</option>
        <option value="Lakshadweep">Lakshadweep</option>
        <option value="Puducherry">Puducherry</option>
        </select>
      </div>
      <div className="col-md-4">
        <label className="form-label">Visitor Address/Company: <span className="text-danger">*</span></label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="form-control" />
      </div>
      <div className="col-md-4">
        <label className="form-label">Visitor Purpose: <span className="text-danger">*</span></label>
        <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} required className="form-control" />
      </div>
    </div>

{/* Row 4: Visitor carryingItems goods */}
    <div className="row mb-3">
      <div className="col-md-4">
      <label className="form-label">Visitor Carrying Items: <span className="text-danger">*</span></label>
      <input type="text" value={carryingItems} onChange={(e) => setItems(e.target.value)} required className="form-control" />
      </div>

      </div>

{/* Row 4: Visitor carryingItems goods */}
    <div className="row mb-3">
      <div className="col-md-4">
          <button type="button" onClick={captureImage} className="btn btn-secondary w-100 mb-2">
          Capture Image
        </button>      
      </div>

<div className="col-md-4">
        
      </div>

      {/* Row 5: Submit Button */}
      <div className="col-md-4">
        <button type="submit" className="btn btn-primary w-100">Register</button>        
      </div>

</div>

{/* Row 4: Visitor Photo */}
  <div className="row mb-3">
      <div className="col-md-4">
        {/* <label className="form-label">Visitor Image:</label> */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="img-fluid mb-4"
        />
      </div>      
      <div className="col-md-4">

      </div>
      <div className="col-md-4">
        {visitorImage && (
          <img
            src={URL.createObjectURL(visitorImage)}
            alt="Captured Visitor"
            className="img-thumbnail"
            style={{ width: '400px' }}
          />
        )}
      </div>



    </div>

    
    
    <div className="row">
      <div className="col-md-12">
        
      </div>
    </div>
  </form>
</div>


  );
};

export default VisitorEntry;
