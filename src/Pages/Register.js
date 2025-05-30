import React, { useState, useEffect, useRef } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import RegisterData from '../Service/RegisterData';
import showToast from '../Utilities/ToastUtilities';
import HomeService from "../Service/HomeService";
export const Register = () => {
  const [userData, setUserData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Number of users per page
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchuserFeedbackReportData = async () => {
      try {
        const response = await RegisterData.getUserFeedbackReportData();
        if (response.success) {
          setUserData(response.data || []);
        } else {
          showToast("Failed to load data", 'error', { autoClose: 500 });
        }
      } catch (error) {
        console.error("Error fetching user feedback report:", error);
        showToast("Failed to fetch user feedback report.", 'error', { autoClose: 500 });
      }
    };

    if (!hasFetched.current) {
      fetchuserFeedbackReportData();
      hasFetched.current = true;
    }
  }, []);
  // Handle Edit button click
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedUser({ ...userData[index] });
  };

  // Handle Save button click after editing
  const handleSave = (index) => {
    const updatedUsers = [...userData];
    updatedUsers[index] = editedUser;
    UpdateData(editedUser)

    setUserData(updatedUsers);
    setEditIndex(null);
    showToast("Data updated successfully", 'success', { autoClose: 500 });
  };

  // Handle Delete button click
  const handleDelete = (index) => {
    debugger;
    const deletearr=userData[index];
    DeleteData(deletearr);
    const updatedUsers = userData.filter((_, i) => i !== index);
    setUserData(updatedUsers);
    showToast("Data deleted successfully", 'success', { autoClose: 500 });
  };

  

  const UpdateData = async (loginRequest) => {
    try {
      debugger;
      const loginSuccess = await HomeService.Updateregister(loginRequest);
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
  const DeleteData = async (loginRequest) => {
    try {
      debugger;
      const loginSuccess = await HomeService.Deleteregister(loginRequest);
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

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ padding: '20px', marginBottom: '100px' }}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {editIndex === indexOfFirstUser + index ? (
                      <TextField
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, name: e.target.value })
                        }
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === indexOfFirstUser + index ? (
                      <TextField
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, email: e.target.value })
                        }
                      />
                    ) : (
                      row.email
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === indexOfFirstUser + index ? (
                      <TextField
                        value={editedUser.gender}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, gender: e.target.value })
                        }
                      />
                    ) : (
                      row.gender
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === indexOfFirstUser + index ? (
                      <TextField
                        value={editedUser.state}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, state: e.target.value })
                        }
                      />
                    ) : (
                      row.state
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === indexOfFirstUser + index ? (
                      <TextField
                        value={editedUser.mobile}
                        onChange={(e) =>
                          setEditedUser({ ...editedUser, mobile: e.target.value })
                        }
                      />
                    ) : (
                      row.mobile
                    )}
                  </TableCell>
                  <TableCell>
                    {editIndex === indexOfFirstUser + index ? (
                      <Button onClick={() => handleSave(indexOfFirstUser + index)}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEdit(indexOfFirstUser + index)}>Edit</Button>
                    )}
                    <Button onClick={() => handleDelete(indexOfFirstUser + index)} color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="pagination" style={{ marginTop: '20px' }}>
        {[...Array(Math.ceil(userData.length / usersPerPage))].map((_, pageIndex) => (
          <Button
            key={pageIndex}
            onClick={() => paginate(pageIndex + 1)}
            variant={currentPage === pageIndex + 1 ? 'contained' : 'outlined'}
          >
            {pageIndex + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};
