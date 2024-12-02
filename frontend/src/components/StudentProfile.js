import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudentDetails, updateStudent, deleteStudent, logout } from '../redux/actions';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const student = useSelector((state) => state.students.student);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: '',
    student_phone: '',
    student_dob: '',
    student_gender: ''
  });

  useEffect(() => {
    // let student = JSON.parse(localStorage.getItem('user'))
    // console.log(student)
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch(fetchStudentDetails(user.id)); 
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(student)
    if (student) {
      setFormData({
        student_name: student.student_name,
        student_email: student.student_email,
        student_phone: student.student_phone,
        student_dob: student.student_dob,
        student_gender: student.student_gender
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      student_dob: new Date(formData.student_dob).toISOString().split('T')[0] 
    };
    dispatch(updateStudent(student.id, updatedData));
    setIsEditing(false); 
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteStudent(student.user_id)); 
     handleLogout();
    }
  };
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <div>
      <Navbar userType="Student" />
      <div className="profile-container">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="student_email"
                value={formData.student_email}
                onChange={handleChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="student_phone"
                value={formData.student_phone}
                onChange={handleChange}
              />
            </label>
            <label>
              Gender:
              <select
                name="student_gender"
                value={formData.student_gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Date of Birth:
              <input
                type="date"
                name="student_dob"
                value={formData.student_dob.split('T')[0]}
                max={new Date().toISOString().split('T')[0]}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="btn-save">Save Changes</button>
            <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div className="student-details">
            <p>Name: {student?.student_name}</p>
            <p>Email: {student?.student_email}</p>
            <p>Phone: {student?.student_phone}</p>
            <p>Gender: {student?.student_gender}</p>
            <p>Date of Birth: {new Date(student?.student_dob).toLocaleDateString()}</p>
            <button className="btn-edit" onClick={() => setIsEditing(true)}>Edit Details</button>
            <button onClick={handleDelete} className="btn-delete">Delete Account</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
