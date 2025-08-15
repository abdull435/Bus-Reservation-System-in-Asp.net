import React, { useState, useEffect } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const UpdateUser = () => {
  const navigate = useNavigate();
  
  const userInfo = localStorage.getItem("token");

  const decode = jwtDecode(userInfo)

  const [name, setName] = useState(decode.name);
  const [email, setEmail] = useState(decode.email);
  const [mobile, setMobile] = useState(decode.mobile);
  const [cinic, setCinic] = useState(decode.cinic);
  const [password, setPassword] = useState('');

  const handleSignup = async(e) => {
    e.preventDefault();
    const user_id=decode.user_id;
    try {
      const res = await axios.put(`http://localhost:5212/UpdateUser/${user_id}`, {
        name,
        email,
        mobile,
        cinic,
        password
      },{withCredentials: true});
      if (res.data.success) {
        alert(res.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(res.data.message || 'Update User failed');
      }
    } catch (err) {
      alert(err.response.message);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/Images/21.jpg')" }}>
      <div className="max-w-md bg-black/80 rounded-xl shadow-md m-2 p-6 text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Update User Info</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <input
            type="text"
            placeholder="Cinic"
            value={cinic}
            required
            onChange={(e) => setCinic(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
          />
          <input
            type="tel"
            placeholder="Mobile"
            value={mobile}
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;