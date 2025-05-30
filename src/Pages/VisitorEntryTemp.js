import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import HomeService from "../Service/HomeService";
import "./VisitorEntry.css";

export const VisitorEntryTemp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [state, setState] = useState("Rajasthan");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [meetingWith, setMeetingWith] = useState("");
  const [visitorImage, setVisitorImage] = useState(null);
  const [meetingDetails, setMeetingDetails] = useState(null);

  const webcamRef = useRef(null);

  const fetchMeetingDetails = async (name) => {
    if (name.length > 2) {
      try {
        const response = await HomeService.GetMeetingPersonDetails(name);
        setMeetingDetails(response.data);
      } catch (error) {
        console.error("Error fetching meeting details:", error);
      }
    } else {
      setMeetingDetails(null);
    }
  };

  const handleMeetingWithChange = (e) => {
    const value = e.target.value;
    setMeetingWith(value);
    fetchMeetingDetails(value);
  };

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

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageFile = dataURLtoFile(imageSrc, "visitor.jpg");
    setVisitorImage(imageFile);
  }, [webcamRef]);

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
    formData.append("meetingWith", meetingWith);
    if (visitorImage) {
      formData.append("visitorImage", visitorImage);
    }

    try {
      const saveResponse = await HomeService.SaveVisitor(formData);
      if (saveResponse && saveResponse.success) {
        alert("Visitor Pass Registration Successful!");
        setName("");
        setEmail("");
        setGender("");
        setMobile("");
        setState("Rajasthan");
        setAddress("");
        setPurpose("");
        setMeetingWith("");
        setVisitorImage(null);
      }
    } catch (error) {
      console.error("Error saving visitor:", error);
    }
  };

  return (
    <div className="visitor-container">
      <h2>Visitor Entry</h2>
      <form onSubmit={handleSubmit} className="visitor-form">
        <div className="form-group">
          <label>Meeting With:</label>
          <input type="text" value={meetingWith} onChange={handleMeetingWithChange} required />
          {meetingDetails && <p>Designation: {meetingDetails.designation}</p>}
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};
