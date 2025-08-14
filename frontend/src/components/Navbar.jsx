import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import CustomerHistory from "./CustomerHistory";

export default function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    setShowSetting(false);
    navigate('/home');
    
  };

  return (
    <div className="flex justify-end">
      <nav className="bg-black/60 shadow-md fixed top-0 w-full min-h-[10vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 text-white">
            <img className=" w-15  h-auto" src="./Images/bus-logo.png" />
            <div className="hidden md:block space-x-6">
              <Link to="/home" className="hover:text-green-500 transition-all durantion-300">Home</Link>
              <Link to="" className="hover:text-green-500 transition-all durantion-300">Terminal</Link>
              <Link to="" className="hover:text-green-500 transition-all durantion-300">Services</Link>
              <Link to="" className="hover:text-green-500 transition-all durantion-300">About Us</Link>
            </div>

            <div className="md:hidden">
              <img src="./Images/hambar.png" onClick={()=>setMobileNav(!mobileNav)} />
            </div>

            <div className="hidden md:block">
              {isLoggedin ?
                (<div className="space-x-2">
                  <Link  onClick={() => setShowSetting(!showSetting)}
                    className="bg-lime-600 text-white font-semibold px-4 py-2 rounded transition duration-300 hover:bg-lime-700"
                  >Setting</Link>
                </div>)
                :
                <Link to="/login"
                  className="bg-lime-600 text-white font-semibold px-4 py-2 rounded transition duration-300 hover:bg-lime-700"
                >Login</Link>
              }
            </div>
          </div>
        </div>
        {mobileNav && (<div className="flex text-white flex-col text-center space-y-2 ">
          <Link to="/home" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Home</Link>
          <a href="" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Terminal</a>
          <a href="" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">Services</a>
          <a href="" className="hover:text-green-500 transition-all durantion-300 p-1 border-b">About Us</a>
          {isLoggedin ?
            <div className="flex flex-col">
              <button onClick={() => handleLogout()}
                className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
              >Logout</button>
              <Link to="/SeeReservations" onClick={() => setMobileNav(!mobileNav)}
                className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
              >Show History</Link>
            </div>
            :
            <Link to="/login"
              className="hover:text-green-500 transition-all durantion-300 p-1 border-b"
            >Login</Link>}
        </div>)}
      </nav>
      {showSetting &&
        <div className="fixed flex flex-col text-center w-[12%] h-[30vh] rounded bg-black/60 text-white mt-[10vh] mr-10 
        transition duration-300 ease-in-out transform origin-top-right">
          <Link to="/seeReservations" onClick={() => setShowSetting(false)} className="border-b">Booking History</Link>
          <Link onClick={() => setShowSetting(false)} className="border-b">Account Setting</Link>
          <button onClick={()=>handleLogout()} className="border-b">Logout</button>
        </div>
      }
    </div>
  );
}
