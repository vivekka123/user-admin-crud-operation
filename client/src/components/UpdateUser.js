import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = () => {
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    password: '',
    email:'',
    phoneNumber: '',
  });
  
  const UpdateData =({username,id,password,email,phoneNumber})=>{
    localStorage.setItem('ID',id)
    localStorage.setItem('username',username)
    localStorage.setItem('password',password)
    localStorage.setItem('email',email)
    localStorage.setItem('phoneNumber',phoneNumber)

  }
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/users/${userData.id}`, userData);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Update User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="text" name="id" value={userData.id} onChange={handleChange} required />

        <label>Username:</label>
        <input type="text" name="username" value={userData.username} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={userData.password} onChange={handleChange} required />
         
        <label>Email:</label>
        <input type="email" name="email" value={userData.email} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} required />

        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
