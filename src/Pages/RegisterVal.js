import React, { useState } from 'react';
import HomeService from '../Service/HomeService'
export const RegisterVal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [mobile, setMobile] = useState('');
    const [state, setState] = useState('');
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Create an object with the form data
      const formData = {
        name: name,
        email: email,
        gender: gender,
        mobile: mobile,
        state: state,
      };


     debugger;
      setData(formData)
      // Simulate saving the data (e.g., send to an API or save to localStorage)
      console.log('User Registered:', formData);
      localStorage.setItem('userData', JSON.stringify(formData));
  
      // Clear the form (optional)
      setName('');
      setEmail('');
      setGender('');
      setMobile('');
      setState('');
  
      alert('Registration Successful!');
    };
  
    const setData = async (loginRequest) => {
        try {
    debugger;
    const loginSuccess = await HomeService.register(loginRequest);
    if (loginSuccess.success) {
        // Save the user data globally using setLoginData
        const result = loginSuccess?.data?.data;
        const message = result[0].message; 
        alert(message);
console.log(message)
    }
} catch (err) {
    
  } finally {
    
  }
}

    return (
      <div className="register-container" style={{ width: '50%',paddingLeft:'30px',marginBottom:'100px' }}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
  
          {/* Email Field */}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
  
          {/* Gender Field */}
          <div className="form-group">
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
  
          {/* Mobile Field */}
          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>
  
          {/* State Field */}
          <div className="form-group">
            <label>State:</label>
            <select value={state} onChange={(e) => setState(e.target.value)} required>
              <option value="">Select State</option>
              <option value="Delhi">Delhi</option>
              <option value="Rajsthan">Rajsthan</option>
              <option value="UP">UP</option>
              <option value="Other">Other</option>
            </select>
          </div>
  
          {/* Submit Button */}
          <button type="submit">Register</button>
        </form>
      </div>
    );
  };
  
