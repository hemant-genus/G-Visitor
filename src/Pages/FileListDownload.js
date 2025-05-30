import React, { useEffect, useState } from 'react';

const FileListDownload = () => {
    const [files, setFiles] = useState([]);
    const token = localStorage.getItem('Token');
    // Fetch files from the backend
    useEffect(() => {
        debugger;
        fetch('https://localhost:44375/api/TQM/list-files', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}` // No need to set 'Content-Type'
            }
        })
            .then(response => response.json())
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                console.error('Error fetching file list:', error);
            });
    }, []);

    // Function to handle file download
    const downloadFile = (fileName) => {
        debugger;
        fetch(`https://localhost:44375/api/TQM/download/${fileName}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}` // No need to set 'Content-Type'
            }
        })
            .then(response => response.blob())
            .then(blob => {
                // Create a URL for the file and trigger download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.click();
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div>
      <h2>Files List</h2>
      <table border="1" style={{ width: '50%', margin: 'auto' }}>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file}</td>
              <td>
                <button onClick={() => downloadFile(file)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    );
};

export default FileListDownload;
