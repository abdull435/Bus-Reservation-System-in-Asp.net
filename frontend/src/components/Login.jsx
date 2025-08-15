import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Loading from './Loading';

const Login = () => {

  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setShowLoading(true);
    try {
      const res = await axios.post('https://bus-reservation-system-in-aspnet-production.up.railway.app/Login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        const decode = jwtDecode(res.data.token);
        const role = decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        if (role == "Admin") {
          navigate('/admin')
        } else {
          navigate('/');
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong. Please try again.");
    }
    finally{
      setShowLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Images/21.jpg')" }}>
      <div className="max-w-md bg-black/80 rounded-xl shadow-md p-6 m-2 text-white">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700 text-white py-2 rounded-md "
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-lime-400 hover:underline">Sign up</Link>
        </p>
      </div>
      {showLoading &&
        <Loading />
      }
    </div>
  );
};

export default Login;
