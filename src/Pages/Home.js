import React from "react";
import "./Home.css"; // ✅ Import the CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content" >
        <h1>Welcome to Genus</h1>
        <p>Manage visitor entries efficiently with our system.</p>
      </div>
    </div>
  );
};

export default Home;
