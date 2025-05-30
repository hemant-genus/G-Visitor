import React from 'react';
import './About.css'; // Optional: For styling

export const About = () => {
  return (
    <div className="about-container">
      <h1>About Our Application</h1>
      <p>
        Welcome to our application! This app is designed to help users manage their tasks and stay productive. 
        Our goal is to create a seamless and intuitive experience for users across various platforms.
      </p>
      <p>
        <strong>Features:</strong>
        <ul>
          <li>Task management</li>
          <li>Real-time notifications</li>
          <li>Collaborative features</li>
          <li>Responsive design for mobile and desktop</li>
        </ul>
      </p>
      <p>
        This project is continuously evolving. We are always working on new features and enhancements to make it better for you. 
        Stay tuned for more updates!
      </p>
      <p>
        For more information or support, feel free to contact us at <a href="mailto:support@app.com">support@app.com</a>.
      </p>
    </div>
  );
};


