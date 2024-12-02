import React, { useState } from 'react';
import '../styles/AddUserForm.css';
import { fetchStudents, fetchAdmins } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions';

const AddUserForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('admin'); 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    type: 'admin',
    admin_name: '',
    admin_email: '',
    student_name: '',
    student_dob: '',
    student_gender: 'Male',
    student_email: '',
    student_phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
    setFormData({
      ...formData,
      type: e.target.value,
    });
  };

  // Handle form submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    const result = await dispatch(registerUser(formData));
    console.log("result", result)
    if(result && result.data.message == "User registered successfully."){
      refreshLists();
      closeModal();
    }
    else{
      alert('user registration faild')
    }
  };

  const refreshLists = () => {
    dispatch(fetchAdmins());  
    dispatch(fetchStudents()); 
  };

  return (
    <div className="addUserForm-modal-overlay">
    <div className="addUserForm-modal-content">
        <div className='addUserFormHeader'>
      <h2> Registration</h2>
      <button className="addUserForm-close-button" onClick={closeModal}>X</button>
        </div>
        <form onSubmit={handleSubmit} className="addUserForm">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <label>User Type:</label>
          <select name="type" value={userType} onChange={handleTypeChange}>
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </select>

          {userType === 'admin' ? (
            <>
              <label>Admin Name:</label>
              <input
                type="text"
                name="admin_name"
                value={formData.admin_name}
                onChange={handleChange}
                required
              />
              <label>Admin Email:</label>
              <input
                type="email"
                name="admin_email"
                value={formData.admin_email}
                onChange={handleChange}
                required
              />
            </>
          ) : (
            <>
              <label>Student Name:</label>
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                required
              />
              <label>Date of Birth:</label>
              <input
                type="date"
                name="student_dob"
                value={formData.student_dob}
                max={new Date().toISOString().split('T')[0]}
                onChange={handleChange}
                required
              />
              <label>Gender:</label>
              <select
                name="student_gender"
                value={formData.student_gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label>Email:</label>
              <input
                type="email"
                name="student_email"
                value={formData.student_email}
                onChange={handleChange}
                required
              />
              <label>Phone:</label>
              <input
                type="text"
                name="student_phone"
                value={formData.student_phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
