import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPage from './components/AdminPage';
import StudentPage from './components/StudentList';
import Login from './components/Login';
import AdminList from "./components/AdminList";
import StudentProfile from "./components/StudentProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="/adminList" element={<AdminList />} />
        <Route path="/studentProfile" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
