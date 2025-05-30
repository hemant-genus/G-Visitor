import React from 'react';
import '../Pages/Css/ConfirmationModal.css';        

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={dialogStyle}>
                <div style={alertIconStyle}>
                    <span style={alertIconTextStyle}>!</span>
                </div>
                <h3 style={headerStyle}>{message}</h3>
                <div style={buttonContainerStyle}>
                    <button style={cancelButtonStyle} onClick={onClose}>Cancel</button>
                    <button style={confirmButtonStyle} onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const dialogStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '400px',
};

const headerStyle = {
    marginBottom: '20px',
    fontSize: '18px',
};

const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
};

// Style for Cancel button
const cancelButtonStyle = {
    background: '#dc3545', // Change to your desired color (e.g., red)
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};

// Style for Confirm button
const confirmButtonStyle = {
    background: 'rgb(41 8 141 / 85%)', // Semi-transparent green
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
};


const alertIconStyle = {
    width: '40px',
    height: '40px',
    display: 'inline-flex',
    backgroundColor: 'red', // or 'red' for a warning
    color: 'black',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px', // Adjust font size to fit
};

const alertIconTextStyle = {
    fontWeight: 'bold',
};

export default ConfirmationModal;
