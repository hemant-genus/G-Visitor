import React from "react";
import { ThreeDots } from 'react-loader-spinner';

const LoadingOverlay = ({ loading, message = "Loading...", color = "#00BFFF" }) => {
    if (!loading) return null; 
  
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000 // Ensure it's above other elements
      }}>
        <div style={{ textAlign: 'center' }}>
          <ThreeDots color={color} height={50} width={50} />
          <p>{message}</p> {/* Optional message to show loading status */}
        </div>
      </div>
    );
  };
  
  export default LoadingOverlay;