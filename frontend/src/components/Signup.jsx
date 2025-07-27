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
      const res = await axios.post('http://192.168.0.116:5212/signup', {
        name,
        email,
        password,
        mobile,
        cinic
      },{withCredentials: true});
      if (res.data.succes) {
        alert('Signup successful now Please log in.');
        navigate('/login')
      } else {
        alert(res.data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error signing up');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
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
          <input
            type="phone"
            placeholder="Mobile"
            required
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Password"
            required
            onChange={(e) => setCinic(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;