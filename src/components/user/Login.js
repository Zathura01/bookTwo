import React from 'react';
import Inputuser from './Inputuser';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../user/Login.css'


function Login() {
  const navigate = useNavigate();
  const user = Inputuser('');
  const password = Inputuser('');
  const { setAuthData } = useAuth(); // ✅ destructure

  const handleSub = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4500/api/userlog/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.user,
          password: password.user,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      const { userId, token } = data; // ✅ make sure backend sends these

      setAuthData(userId, token); // ✅ save to context
      alert('Login successful');
      navigate('/home');
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong');
    }
  };

  const handleForgotPassword=()=>{
    navigate('/forgotPassword');
  }

  
   return (
    <>
  <div className="login-container">
    <h2>Login</h2>
    <form onSubmit={handleSub} className="login-form">
      
      <input
        placeholder="Enter your username or email"
        type="text"
        {...user.bind}
      />
      <input
        placeholder="Enter your password"
        type="password"
        {...password.bind}
      />
      <button type='button' onClick={handleForgotPassword}><label>Forgot Password?</label></button>
      <button type="submit">Submit</button>
    </form>
  </div>
  </>


  );
}

export default Login;
