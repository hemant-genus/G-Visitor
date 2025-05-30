import React, { useState } from 'react';

const ImageUploadDownload = () => {
    const [uploadStatus, setUploadStatus] = useState('');

    // Handle file upload
    const uploadFile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('Token');
        const formData = new FormData();
    
        // Get files from the file input
        const fileInput = document.querySelector('#files');
        const files = fileInput.files;
    
        if (files.length === 0) {
            alert('Please select a file');
            return;
        }
    
        // Append files to formData (can append multiple files if needed)
        for (let i = 0; i < files.length; i++) {
            formData.append('uploadFile', files[i]);
        }
    
        try {
            const response = await fetch('https://localhost:44375/api/TQM/UploadFile', {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}` // No need to set 'Content-Type'
                }
            });
    
            if (!response.ok) {
                throw new Error('Upload failed');
            }
    
            const data = await response.json();
            console.log(data);
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file');
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Image Upload & Download</h2>
            <form onSubmit={uploadFile}>
                <label>Select File</label>
                <br /><br />
                <input type='file' id='files' multiple required name="uploadFile" />
                <br /><br />
                <input type="submit" value="Upload" />
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default ImageUploadDownload;
