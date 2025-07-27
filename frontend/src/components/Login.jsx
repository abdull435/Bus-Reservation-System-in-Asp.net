import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if(email=="admin@gmail.com" && password=="admin"){
      navigate('/admin');
      return;
    }

    console.log('Trying login with:', email, password);
    
    try {
      

      const res = await axios.post('http://192.168.0.116:5212/Login', {
        email,
        password
      },{
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});
      if (res.data.success) {
        alert(res.data.message);
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type=""
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
