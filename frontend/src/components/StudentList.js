import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, updateStudent, deleteStudent } from '../redux/actions';
import '../styles/studentList.css'; 

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.student);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const updatedData = {
      ...selectedStudent,
      student_dob: new Date(selectedStudent.student_dob).toISOString().split('T')[0] 
    };
    dispatch(updateStudent(selectedStudent.id, updatedData));
    handleModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  if (!students || students.length === 0) {
    return <div>No students found.</div>; 
  }


  return (
    <div>
      <h2>Students List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.student_name}</td>
              <td>{new Date(student.student_dob).toLocaleDateString()}</td>
              <td>{student.student_email}</td>
              <td>{student.student_phone}</td>
              <td>{student.student_gender}</td>
              <td>
                <button className="btn-update" onClick={() => handleUpdate(student)}>
                  Update
                </button>
                <button className="btn-delete" onClick={() => handleDelete(student.user_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && selectedStudent && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Student</h3>
            <form onSubmit={handleSubmitUpdate}>
              <label>
                Name:
                <input
                  type="text"
                  name="student_name"
                  value={selectedStudent.student_name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="student_email"
                  value={selectedStudent.student_email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="student_phone"
                  value={selectedStudent.student_phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Gender:
                <select
                  name="student_gender"
                  value={selectedStudent.student_gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                DOB:
                <input
                  type="date"
                  name="student_dob"
                  value={selectedStudent.student_dob.split('T')[0]}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <button type="submit" className="btn-save">
                Save
              </button>
              <button type="button" className="btn-cancel" onClick={handleModalClose}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
