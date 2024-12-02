import React, { useState } from 'react';
import StudentList from './StudentList';
import AdminList from './AdminList';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { fetchStudents, fetchAdmins } from '../redux/actions'; 

const AdminPage = () => {
  const dispatch = useDispatch();

  const refreshLists = () => {
    dispatch(fetchAdmins());  
    dispatch(fetchStudents()); 
  };
  
  return (
    <div>
       <Navbar userType="Admin" refreshLists={refreshLists} />
      <AdminList />
      <StudentList />
    </div>
  );
};

export default AdminPage;
