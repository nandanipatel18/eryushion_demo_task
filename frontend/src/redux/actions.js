import axios from 'axios';

export const loginUser = (username, password, type) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:5000/login', { username, password, type });
    console.log(response)
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return response;
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', error });
  }
};

export const registerUser = (formData) => async dispatch => {
  try {
    const response = await axios.put('http://localhost:5000/register', { formData });
    console.log(response)
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    return response;
  } catch (error) {
    dispatch({ type: 'REGISTER_FAILURE', error });
  }
};

export const fetchStudents = () => async dispatch => {
  try {
    console.log("in fetch student")
    const response = await axios.get('http://localhost:5000/students');
    dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_STUDENTS_FAILURE', error });
  }
};

export const fetchStudentDetails = (id) => async dispatch => {
  try {
    const response = await axios.get(`http://localhost:5000/students/${id}`);
    dispatch({ type: 'FETCH_STUDENTS_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_STUDENTS_FAILURE', error });
  }
};

// Update student
export const updateStudent = (id, studentData) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:5000/students/${id}`, studentData);
    dispatch({ type: 'UPDATE_STUDENT_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

// Delete student
export const deleteStudent = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/students/${id}`);
    dispatch({ type: 'DELETE_STUDENT_SUCCESS', payload: id });
  } catch (error) {
    console.error('Error deleting student:', error);
  }
};

// Fetch admins
export const fetchAdmins = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/admins');
    dispatch({ type: 'FETCH_ADMINS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error fetching admins:', error);
  }
};

// Update admin
export const updateAdmin = (id, adminData) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:5000/admins/${id}`, adminData);
    dispatch({ type: 'UPDATE_ADMIN_SUCCESS', payload: response.data });
  } catch (error) {
    console.error('Error updating admin:', error);
  }
};

// Delete admin
export const deleteAdmin = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/admins/${id}`);
    dispatch({ type: 'DELETE_ADMIN_SUCCESS', payload: id });
  } catch (error) {
    console.error('Error deleting admin:', error);
  }
};

export const logout = () => ({
  type: 'LOGOUT',
});
