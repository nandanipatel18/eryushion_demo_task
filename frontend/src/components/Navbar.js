import React, { useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AddUserForm from './addUserForm';
import '../styles/Navbar.css'
import { fetchStudents, fetchAdmins } from '../redux/actions';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const username = (JSON.parse(localStorage.getItem('user'))).username
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };
  const refreshLists = () => {
    dispatch(fetchAdmins());  
    dispatch(fetchStudents()); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaUserCircle className="user-icon" />
        <span className="username">{username}</span>
      </div>
      <h2 className="title">{userType === 'Admin' ? 'Admin Dashboard' : 'Profile'}</h2>
      <div>
      {
      userType === 'Admin'&& (<button onClick={openModal} className="AddUserButton">Add User</button>)}
      <button onClick={handleLogout} className="logoutButton">
        Logout
      </button>
      {isModalOpen && <AddUserForm closeModal={closeModal} refreshLists={refreshLists} />}
      </div>
    </nav>
  );
};



export default Navbar;
