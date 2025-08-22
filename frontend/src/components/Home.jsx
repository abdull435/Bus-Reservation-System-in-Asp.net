import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Schedule from './Schedules';
const Home = () => {

  const [cities, setCities] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [showSchedules, setShowSchedules] = useState(false);

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 4);
  const maxDate = maxDateObj.toISOString().split("T")[0];

  useEffect(() => {
                
    axios.get('https://bus-reservation-system-in-aspnet-production.up.railway.app/get-cities')
      .then(res => {
        if (res.data.success) {
          setCities(res.data.routes);
        }
      })
      .catch(err => console.error('Error fetching cities:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && date) {
      setShowSchedules(true);
    } else {
      alert("Please fill all fields.");
    }
  };


  return (
    <>
      <div className="min-h-screen flex items-center   bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/3.jpg')" }}>
        <div className="w-full max-w-sm md:max-w-md mx-auto mt-[10vh] rounded-xl shadow-lg p-6 bg-black/60">

          <h1 className="text-2xl font-bold text-center text-white mb-6">Ready, Steady, Go</h1>

          <form className="space-y-4 text-white" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-sm font-bold mb-2">Travel From</label>
              <input
                list="fromOptions"
                name="from" required
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
              />
              <datalist id="fromOptions">
                {cities.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>

            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Travel To
              </label>
              <input list="toOptions" name="to" required
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
              />
              <datalist id="toOptions">
                {cities.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Departure Date
              </label>
              <input type="date" id="date" name="date" required
                onChange={(e) => setDate(e.target.value)}
                min={minDate}
                max={maxDate}
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
              />
            </div>

            <button type="submit"
              className="w-full bg-lime-600 hover:bg-lime-700 cursor-pointer text-white font-bold py-3 px-4 rounded-md transition duration-300"
            >FIND YOUR JOURNEY
            </button>
          </form>
        </div>

      </div>
      {showSchedules && (
        <div
          className="p-2 md:p-20">
          <Schedule from={from} to={to} date={date} />
        </div>
      )}
    </>
  );
};

export default Home;