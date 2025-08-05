import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  // const token = localStorage.getItem("item");
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
    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/Logout', { withCredentials: true })
      .then(res => {
        if (res.data.succes) {
          setIsLoggedin(false);
          alert(res.data.message);
        }
      })
  };



  return (
    <nav className="bg-blue-600 shadow-md fixed top-0 w-full z-10 min-h-[10vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="text-white font-bold text-xl">Bus Online</div>

          <div className=" md:flex space-x-6">
            <a href="" className="text-white hover:text-yellow-300">Home</a>
            <a href="" className="text-white hover:text-yellow-300">Terminal</a>
            <a href="" className="text-white hover:text-yellow-300">Services</a>
            <a href="" className="text-white hover:text-yellow-300">About Us</a>
          </div>


          <div className="md:block">
            {isLoggedin ?
              <a onClick={() => handleLogout()}
                className="bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded hover:bg-yellow-300"
              >Logout</a>
              :
              <a href="/login"
                className="bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded hover:bg-yellow-300"
              >Login</a>

            }

          </div>


        </div>
      </div>


    </nav>
  );
}
