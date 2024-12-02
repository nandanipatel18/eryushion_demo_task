import React, { useState } from 'react';
import { useDispatch } from 'react-redux';  
import { loginUser } from '../redux/actions'; 
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(username, password, type))
      if(result && result.data.message == "login success"){
        console.log(result)
        localStorage.setItem('user', JSON.stringify(result.data.user));
        navigate(result.data.user.type === 'Admin' ? '/admin' : '/studentProfile');
      }
      else{
        alert('login failed')
      }
    
  };

  return (
    <div className="login-body">
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="" disabled>Select Type</option>
          <option value="Admin">Admin</option>
          <option value="Student">Student</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default Login;
