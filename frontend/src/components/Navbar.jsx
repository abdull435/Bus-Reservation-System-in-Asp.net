import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // move here
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      setIsLoggedin(true);
    } catch (err) {
      console.error("Invalid token");
      setIsLoggedin(false);
    }
  } else {
    setIsLoggedin(false);
  }

  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    navigate('/home');
    
  };

  const mobileView =()=>{
      setMobileNav(!mobileNav);
  }


  return (
    <nav className="bg-black/60 shadow-md fixed top-0 w-full z-10 min-h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 text-white">

          <img className=" w-15  h-auto" src="./Images/bus-logo.png"/>

          <div className="hidden md:block space-x-6">
            <a href="" className="hover:text-green-500 transition-all durantion-300">Home</a>
            <a href="" className="hover:text-green-500 transition-all durantion-300">Terminal</a>
            <a href="" className="hover:text-green-500 transition-all durantion-300">Services</a>
            <a href="" className="hover:text-green-500 transition-all durantion-300">About Us</a>
          </div>

          <div className="md:hidden">
            <img src="./Images/hambar.png" onClick={mobileView} />
          </div>

          <div className="hidden md:block">
            {isLoggedin ?
              <Link onClick={() => handleLogout()}
                className="bg-lime-600 text-white font-semibold px-4 py-2 rounded transition duration-300 hover:bg-lime-700"
              >Logout</Link>
              :
              <Link to="/login"
                className="bg-lime-600 text-white font-semibold px-4 py-2 rounded transition duration-300 hover:bg-lime-700"
              >Login</Link>

            }
          </div>
        </div>
      </div>
      {mobileNav && (<div className="flex text-white flex-col text-center space-y-2 ">
            <a href="" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Home</a>
            <a href="" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Terminal</a>
            <a href="" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Services</a>
            <a href="" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">About Us</a>
            {isLoggedin ?
              <Link onClick={() => handleLogout()}
                className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
              >Logout</Link>
              :
              <Link to="/login"
                className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
              >Login</Link>}
          </div>)}
    </nav>
  );
}
