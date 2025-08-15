import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [cinic, setCinic] = useState('');

  const handleSignup = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bus-reservation-system-in-aspnet-production.up.railway.app/signup', {
        name,
        email,
        password,
        mobile,
        cinic
      },{withCredentials: true});
      if (res.data.success) {
        alert(res.data.message);
        navigate('/login')
      } else {
        alert(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/Images/21.jpg')" }}>
      <div className="max-w-md bg-black/80 rounded-xl shadow-md m-2 p-6 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <input
            type="text"
            placeholder="Cnic"
            required
            onChange={(e) => setCinic(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <input
            type="tel"
            placeholder="Mobile"
            required
            maxLength={11}
            pattern="[0-9]{11}"
            title="Enter a valid mobile number with 11 digits"
            onChange={(e) => setMobile(e.target.value)}
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
          type='submit'
            className="w-full bg-lime-600 text-white py-2 rounded-md cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-lime-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;