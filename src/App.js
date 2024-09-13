import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let [form, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    message: ''
  });

  const phoneEmailAlreadyExists = () => toast.error('Email or Phone Number already exists');
  const phoneEmailAdded = () => toast.success('Email or Phone Number added successfully');
  const deleteSuccess = () => toast.success('User deleted successfully');
  let [userData, setUserData] = useState([]);

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setFormData((prevForm) => ({
      ...prevForm,
      [inputName]: inputValue
    }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let checkFilterUser = userData.filter(
      (user) => user.email === form.email || user.phoneNumber === form.phoneNumber
    );

    if (checkFilterUser.length > 0) {
      phoneEmailAlreadyExists();
    } else {
      let currentUserFormData = {
        username: form.username,
        email: form.email,
        phoneNumber: form.phoneNumber,
        message: form.message
      };

      setUserData((prevUserData) => [...prevUserData, currentUserFormData]);
      setFormData({
        username: '',
        email: '',
        phoneNumber: '',
        message: ''
      });
      phoneEmailAdded();
    }
  };

  let handleDelete = (index) => {
    setUserData((prevUserData) => prevUserData.filter((_, i) => i !== index));
    deleteSuccess();
  };

  let updateUserDetails = (index) => {
    let updatedUserData = [...userData];
    updatedUserData[index] = form;
    setUserData(updatedUserData);
    setFormData({
      username: '',
      email: '',
      phoneNumber: '',
      message: ''
    });
  }

  let handleEdit = (index) => {
    let userToEdit = userData[index];
    setFormData(userToEdit);
    setUserData((prevUserData) => prevUserData.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="inquiryFormContainer">
        <h1>Fill the Form</h1>
        <form className="inquiryForm" onSubmit={handleSubmit}>
          <input
            className="inputContainer"
            name="username"
            onChange={getValue}
            value={form.username}
            placeholder="Username"
          />
          <input
            className="inputContainer"
            name="email"
            onChange={getValue}
            value={form.email}
            placeholder="Email"
          />
          <input
            className="inputContainer"
            name="phoneNumber"
            onChange={getValue}
            value={form.phoneNumber}
            placeholder="PhoneNumber"
          />
          <input
            className="inputContainer"
            name="message"
            onChange={getValue}
            value={form.message}
            placeholder="Message"
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
          {userData.filter(
            (user) => user.email === form.email || user.phoneNumber === form.phoneNumber
          ).length > 0 && <p>Email or Phone Number already exists</p>}
        </form>
        {userData.length}
      </div>
      <TableContainer component={Paper} className="tableContainer">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Message</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={5}>
                  No data Found
                </TableCell>
              </TableRow>
            ) : (
              userData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.username}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.message}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => handleDelete(index)}>delete</button>
                    <button onClick={() => handleEdit(index)}>edit</button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;